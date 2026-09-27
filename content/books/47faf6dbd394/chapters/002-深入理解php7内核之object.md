-   本文地址: [https://www.laruence.com/2020/03/23/5605.html](https://www.laruence.com/2020/03/23/5605.html "Permanet Link to 深入理解PHP7内核之OBJECT")
-   转载请注明出处

前面的几篇，我系统的介绍了PHP7以后的[ZVAL](https://www.laruence.com/2018/04/08/3170.html), [Hashtable](https://www.laruence.com/2020/02/25/3182.html), 以及[Reference](https://www.laruence.com/2018/04/08/3179.html), 今天我来讲讲Object(对象)的一些变化。

### PHP5

按照惯例，我先带大家回顾下PHP5时的zend\_object（此部分内容之前的文章中也有涉及，如果熟悉可以跳过), 之前如果有兴趣也可以看看我10年前写的[深入理解PHP原理之对象](https://www.laruence.com/2010/05/18/1482.html).

PHP5中，对象的定义如下：

typedef struct \_zend\_object {
    zend\_class\_entry \*ce;
    HashTable \*properties;
    zval \*\*properties\_table;
    HashTable \*guards;
} zend\_object;

其中ce存储了这个对象所属的类， 关于properties\_table和properties, properties\_table是申明的属性，properties是动态属性，也就是比如:

<?php
class Foo {
    public $a = 'defaul property';
}
$a = New Foo();
$a->b = 'dynamic property';

因为在Foo的定义中，我们申明了public $a, 那么$a就是已知的申明属性，它的可见性，包括在properties\_table中存储的位置都是在申明后就确定的。

而$a->b, 是我们动态给添加的属性，它不属于已经申明的属性，这个会存储在properties中。

其实从类型上也能看出来， properties\_table是zval\*的数组，而properties是Hashtable。

guards主要用在魔术方法调用的时候嵌套保护, 比如\_\_isset/\_\_get/\_\_set。

总体来说， zend\_object(以下简称object)在PHP5中其实是一种相对特殊的存在， 在PHP5中，只有resource和object是引用传递，也就是说在赋值，传递的时候都是传递的本身，也正因为如此，Object和Resource除了使用了Zval的引用计数以外，还采用了一套独立自身的计数系统。

这个我们从zval中也能看出object和其他的类似字符串的的不同：

typedef union \_zvalue\_value {
    long lval;
    double dval;
    struct {
        char \*val;
        int len;
    } str;
    HashTable \*ht;
    zend\_object\_value obj;
} zvalue\_value;

对于字符串和数组，zval中都直接保存它们的指针，而对于object却是一个zend\_object\_value的结构体:

typedef unsigned int zend\_object\_handle;

typedef struct \_zend\_object\_value {
    zend\_object\_handle handle;
    const zend\_object\_handlers \*handlers;
} zend\_object\_value;

真正获取对象是需要通过这个zend\_object\_handle，也就是一个int的索引去全局的object buckets中查找:

ZEND\_API void \*zend\_object\_store\_get\_object\_by\_handle(zend\_object\_handle handle TSRMLS\_DC)
{
    return EG(objects\_store).object\_buckets\[handle\].bucket.obj.object;
}

而EG(objects\_store).object\_buckets则是一个数组，保存着:

typedef struct \_zend\_object\_store\_bucket {
    zend\_bool destructor\_called;
    zend\_bool valid;
    zend\_uchar apply\_count;
    union \_store\_bucket {
        struct \_store\_object {
            void \*object;
            zend\_objects\_store\_dtor\_t dtor;
            zend\_objects\_free\_object\_storage\_t free\_storage;
            zend\_objects\_store\_clone\_t clone;
            const zend\_object\_handlers \*handlers;
            zend\_uint refcount;
            gc\_root\_buffer \*buffered;
        } obj;
        struct {
            int next;
        } free\_list;
    } bucket;
} zend\_object\_store\_bucket;

其中，zend\_object\_store\_bucket.bucket.obj.object才保存着真正的zend\_object的指针，注意到此处是void \*, 这是因为我们很多扩展的自定义对象，也是可以保存在这里的。

另外我们也注意到zend\_object\_store\_bueckt.bucket.obj.refcount, 这个既是我刚刚讲的object自身的引用计数，也就是zval有一套自己的引用计数，object也有一套引用计数。

<?php
$o1 = new Stdclass();
//o1.refcount == 1, object.refcount == 1
$o2 = $o1;
//o1.refcount == o2.refcoun == 2; object.refcount = 1;
$o3 = &$o2;
//o3.isref == o2.isref==1
//o3.refcount == o2.refcount == 2
//o1.isref == 0; o1.refcount == 1
//object.refcount == 2

这样，可以让object可以保证不同于普通的zval的COW机制，可以保证object可以全局传引用。

可见，从一个zval到取到实际的object，我们需要首先获取zval.value.obj.handle, 然后拿着这个索引再去EG(objects\_store)查询，效率比较低下。

对于另外一个常见的操作，就是获取一个zval对象的类的时候，我们也需要需要调用一个函数:

#define Z\_OBJCE(zval) zend\_get\_class\_entry(&(zval) TSRMLS\_CC)

### PHP7

到了PHP7，如我前面的文章[深入理解PHP7内核之ZVAL](https://www.laruence.com/2018/04/08/3170.html)所说， zval中直接保存了zend\_object对象的指针:

struct \_zend\_object {
    zend\_refcounted\_h gc;
    uint32\_t          handle;
    zend\_class\_entry \*ce;
    const zend\_object\_handlers \*handlers;
    HashTable        \*properties;
    zval              properties\_table\[1\];
};

而EG(objects\_store)也只是简单的保存了一个zend\_object\*\*等指针:

typedef struct \_zend\_objects\_store {
    zend\_object \*\*object\_buckets;
    uint32\_t top;
    uint32\_t size;
    int free\_list\_head;
} zend\_objects\_store;

而对于前面的COW的例子，对于IS\_OBJECT来说， 用IS\_TYPE\_COPYABLE来区分，也就是，当发生COW的时候，如果这个类型没有设置 IS\_TYPE\_COPYABLE，那么就不会发生"复制".

#define IS\_ARRAY\_EX  (IS\_ARRAY | ((IS\_TYPE\_REFCOUNTED | IS\_TYPE\_COLLECTABLE | IS\_TYPE\_COPYABLE) << Z\_TYPE\_FLAGS\_SHIFT))
#define IS\_OBJECT\_EX (IS\_OBJECT | ((IS\_TYPE\_REFCOUNTED | IS\_TYPE\_COLLECTABLE) << Z\_TYPE\_FLAGS\_SHIFT))

如上，大家可以看到对于ARRAY来说定义了IS\_TYPE\_REFCOUNTED, IS\_TYPE\_COLLECTABLE和IS\_TYPE\_COPYABLE， 但是对于OBJECT, 则缺少了IS\_TYPE\_COPYABLE.

在SEPARATE\_ZVAL中:

#define SEPARATE\_ZVAL(zv) do {                          \\
        zval \*\_zv = (zv);                               \\
        if (Z\_REFCOUNTED\_P(\_zv) ||                      \\
            Z\_IMMUTABLE\_P(\_zv)) {                       \\
            if (Z\_REFCOUNT\_P(\_zv) > 1) {                \\
                if (Z\_COPYABLE\_P(\_zv) ||                \\
                    Z\_IMMUTABLE\_P(\_zv)) {               \\
                    if (!Z\_IMMUTABLE\_P(\_zv)) {          \\
                        Z\_DELREF\_P(\_zv);                \\
                    }                                   \\
                    zval\_copy\_ctor\_func(\_zv);           \\
                } else if (Z\_ISREF\_P(\_zv)) {            \\
                    Z\_DELREF\_P(\_zv);                    \\
                    ZVAL\_DUP(\_zv, Z\_REFVAL\_P(\_zv));     \\
                }                                       \\
            }                                           \\
        }                                               \\
    } while (0)

如果不是Z\_COPYABLE\_P， 那么就不发生写时分离。

这里有的同学会问，那既然已经在zval中直接保存了zend\_object\*了，那为啥还需要EG(objects\_store)呢？

这里有2个主要原因:

-   1\. 我们需要在PHP请求结束的时候保证所有的对象的析构函数都被调用，因为object存在循环引用的情况，那如何快速的遍历所有存活的对象呢？ EG(objects\_store)是一个很不错的选择。
-   2\. 在PHPNG开发的时候，为了保证最大向后兼容，我们还是需要保证获取一个对象的handle的接口, 并且这个handle还是要保证原有的语义。

但实际上来说呢， 其实EG(objects\_store)已经没啥太大的用处了， 我们是可以在将来去掉它的。

好，接下来出现了另外一个问题，我们再看看zend\_object的定义, 注意到末尾的properties\_table\[1\], 也就是说，我们现在会把object的属性跟对象一起分配内存。这样做对缓存友好。 但带来一个变化就是， zend\_object这个结构体现在是可能变长的。

那在当时写PHPNG的时候就给我带来了一个问题, 在PHP5时代，很多的自定义对象是这么定义的(mysqli为例):

typedef struct \_mysqli\_object {
    zend\_object         zo;
    void                \*ptr;
    HashTable           \*prop\_handler;
} mysqli\_object; /\* extends zend\_object \*/

也就是说zend\_object都在自定义的内部类的头部，这样当然有一个好处是可以很方便的做cast, 但是因为目前zend\_object变成变长了，并且更严重的是你并不知道用户在PHP继承了你这个类以后，他新增了多少属性的定义。

于是没有办法，在写PHPNG的时候，我做了大量的调整如下(体力活）:

typedef struct \_mysqli\_object {
    void                \*ptr;
    HashTable           \*prop\_handler;
    zend\_object         zo;
} mysqli\_object; /\* extends zend\_object \*/

也就是把zend\_object从头部，挪到了尾部，那为了可以从zend\_object取得自定义对象，我们需要新增定义:

static inline mysqli\_object \*php\_mysqli\_fetch\_object(zend\_object \*obj) {
    return (mysqli\_object \*)((char\*)(obj) - XtOffsetOf(mysqli\_object, zo));
}

这样类似的代码大家应该可以在很多使用了自定义对象的扩展中看到。

这样一来就规避了这个问题， 而在实际的分配自定义对象的时候，我们也需要采用如下的方法:

obj = ecalloc(1, sizeof(mysqli\_object) + zend\_object\_properties\_size(class\_type));

这块，大家在写扩展的时候，如果用到自定义的类，一定要注意。

而之前在PHP5中的guard, 我们也知道并不是所有的类都会申明魔术方法，在PHP5中把guard放在object中会在大部分情况下都是浪费内存， 所以在PHP7中会，我们会根据一个类是否申明了魔术方法(IS\_OBJ\_HAS\_GUARDS)来决定要不要分配，而具体的分配地方也放在了properties\_table的末尾:

if (GC\_FLAGS(zobj) & IS\_OBJ\_HAS\_GUARDS) {
        guards = Z\_PTR(zobj->properties\_table\[zobj->ce->default\_properties\_count\]);
....
}

从而可以在大部分情况下，节省一个指针的内存分配。

最后就是， PHP7中在取一个对象的类的时候，就会非常方便了, 直接zvalu.value.obj->ce即可，一些类所自定的handler也就可以很便捷的访问到了， 性能提升明显。
