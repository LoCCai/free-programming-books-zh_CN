memcached���
==========
memcached��Ϊ�����ܵķֲ�ʽ����ϵͳ�������û���Twitter��Flickr��Wikipedia��weibo�ȵȣ������������ﵽһ�������ĳ��̶���ʹ�ã��������þ���ͨ���������ݿ��ѯ������������ݿ���ʴ���������߶�̬WebӦ�õ��ٶȡ�������Ӧ�����������ӣ��÷���������I/Oʵ�֣��ͻ��˵���Ҳ�ǳ��򵥣����õķ���Ҳ����set��get��delete��replace��  
####��װ��
1. ����:[libevent](https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz)
2. ����:[memcached](https://memcached.googlecode.com/files/memcached-1.4.15.tar.gz)
3. ��װ

        #��װlibevent
        ./configure --prefix=/usr
        make
        sudo make install

        #��װmemcached��
        ./configure --with-libevent=/usr
        make
        sudo make install

4. ����memcache:

         memcached -d -m 1024 -u root -l 192.168.0.200 -p 11211 -c 1024 -P /tmp/memcached.pid
         ����
         memcached -p 11211 -m 64m -d

- -d ��Ϊ�ػ�(daemon)�����ں�̨����  
- -u ����memcache���û�  
- -p Сд, TCP�˿ڣ�Ĭ����11211  

- -m ���ʹ���ڴ棬Ĭ��64M��memcached�ǻ����ڴ�Ļ���ϵͳ  
- -c ��󲢷�������  
- -l �����ķ�����IP��ַ  
- -P ����memcache��pid�ļ�  

####memcached����

- -v    ���error/warning
- -vv   ����������Ӧ
- -vvv  ����ڲ�״̬ 

ʹ�÷���������IO�����ڴ��п���һ��ռ䣬����һ��HashTable��Memcached���̹�����ЩHashTable��  

####memcached��Python�ͻ��ˣ�  
- [pylibmc](http://sendapatch.se/projects/pylibmc/)�����Ƕ�[libemcached](http://libmemcached.org/libMemcached.html)��һ����װ����github fork���������ġ���Ȼ��������libemcached����ô��������[libmemecached](https://launchpad.net/libmemcached/1.0/1.0.17/+download/libmemcached-1.0.17.tar.gz)��   
���� pylibmc��ʱ�����쳣��

        ImportError: libmemcached.so.11: cannot open shared object file: No such file or directory
- [python-libmemcached](http://code.google.com/p/python-libmemcached/)�������־�֪��Ҳ�Ƕ�libmemcached�ķ�װ����pylibmc��ͬ����������Ҫ����Pyrex   
- [cmemcache](http://gijsbert.org/cmemcache/)��   
- [python-memcache](http://www.tummy.com/software/python-memcached/)������Ǵ�pythonʵ�ֵĿͻ��ˣ�  


�������¾���������python-memcache����װ   

    pip install python-memcache

����ʱ����ѧϰ��Դ����:[memcache.py](https://github.com/linsomniac/python-memcached/blob/master/memcache.py)  

������ʹ�÷�����  

    import memcache
        mc = memcache.Client(['127.0.0.1:11211'], debug=0)
    
        mc.set("some_key", "Some value")
        #set�������и�Ĭ�ϵĹ���ʱ��Ϊ0,��ʾû�й���ʱ��,���ֵ��60*60*24*30 Ҳ����һ����
        value = mc.get("some_key")
    
        mc.set("another_key", 3)
        mc.delete("another_key")
    
        mc.set("key", "1")   # note that the key used for incr/decr must be a string.
        mc.incr("key")
        mc.decr("key")       #�����decr��������0�Ͳ����¼���
    
    The standard way to use memcache with a database is like this::
    
        key = derive_key(obj)
        obj = mc.get(key)
        if not obj:
            obj = backend_api.get(...)
            mc.set(key, obj)
    
        # we now have obj, and future passes through this code
        # will use the object from the cache.

Client�������memcache servers �أ��ӹ��췽�����յ���һ������Ϳ��Կ�����һ��pool��  

key ��ֵ�����ǣ�  
1. �򵥵Ĺ�ϡ���ͣ�string,integer�ȣ�  
2. ����

���ķ������Ի���Ϊһ�¼��飺  
���ã�`__init__`, set_servers, forget_dead_hosts, disconnect_all, debuglog  
���룺set, add, replace, set_muti  
��ȡ��get, get_multi  
������incr, decr  
�Ƴ���delete, delete_multi  
####pyramid_beaker
Beaker��Pyramid�ĺ��session������ͬ��Ҳ�ǻ���������  
#####��װ

    pip install pyramid_beaker
    #Ҳ������setup.py��requires�м���pyramid_beaker
#####����
��`__init__.py`�ļ��м���

    config = Configurator()
    config.inlucde('pyramid_beaker')

����ο�����:  
http://returnfoo.com/2012/02/memcached-memory-allocation-and-optimization-2/
http://www.adayinthelifeof.nl/2011/02/06/memcache-internals/
