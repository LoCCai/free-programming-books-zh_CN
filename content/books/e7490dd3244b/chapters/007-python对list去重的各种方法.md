今天遇到一个问题，在同事随意的提示下，用了 `itertools.groupby` 这个函数。不过这个东西最终还是没用上。

问题就是对一个list中的新闻id进行去重，去重之后要保证顺序不变。

## _直观方法_

最简单的思路就是：

.. code:: python

```
ids = [1,2,3,3,4,2,3,4,5,6,1]
news_ids = []
for id in ids:
    if id not in news_ids:
        news_ids.append(id)

print news_ids
```

这样也可行，但是看起来不够爽。

## _用set_

另外一个解决方案就是用set：

.. code:: python

```
ids = [1,4,3,3,4,2,3,4,5,6,1]
ids = list(set(ids))
```

这样的结果是没有保持原来的顺序。

## _按照索引再次排序_

最后通过这种方式解决：

.. code:: python

```
ids = [1,4,3,3,4,2,3,4,5,6,1]
news_ids = list(set(ids))
news_ids.sort(key=ids.index)   # 感谢网友：@Magic 指正。
```

## _使用itertools.grouby_

文章一开始就提到itertools.grouby, 如果不考虑列表顺序的话可用这个：

.. code:: python

```
ids = [1,4,3,3,4,2,3,4,5,6,1]
ids.sort()
it = itertools.groupby(ids)

for k, g in it:
    print k
```

关于itertools.groupby的原理可以看这里：http://docs.python.org/2/library/itertools.html#itertools.groupby

## _网友补充：用reduce_

网友reatlk留言给了另外的解决方案。我补充并解释到这里：

.. code:: python

```
In [5]: ids = [1,4,3,3,4,2,3,4,5,6,1]

In [6]: func = lambda x,y:x if y in x else x + [y]

In [7]: reduce(func, [[], ] + ids)
Out[7]: [1, 4, 3, 2, 5, 6]
```

上面是我在ipython中运行的代码，其中的 `lambda x,y:x if y in x else x + [y]` 等价于 `lambda x,y: y in x and x or x+[y]` 。

思路其实就是先把ids变为\[\[\], 1,4,3,......\] ,然后在利用reduce的特性。reduce解释参看这里：http://docs.python.org/2/library/functions.html#reduce

## 2017-05-15更新：

我录了一套Django开发的视频教程，有兴趣可以到我的公众号查看。
