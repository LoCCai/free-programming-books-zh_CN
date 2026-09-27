## \[16\] ���ɴ洢��Freestore������  
(Part of [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html), [Copyright © 1991-2001](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]), [Marshall Cline](http://www.parashift.com/), [cline@parashift.com](mailto:cline@parashift.com))

�������İ淭�룺[��F](http://nicrosoft.net)��[nicrosoft@sunistudio.com](mailto:nicrosoft@sunistudio.com)

* * *

### FAQs in section \[16\]:

* * *

### \[16.1\] delete p ɾ��ָ�� p������ɾ��ָ����ָ������� \*p?

ָ��ָ������ݡ�

�ؼ���Ӧ���� delete\_the\_thing\_pointed\_to\_by��ͬ�������Ҳ������ C���ͷ�ָ����ָ���ڴ棺 free(p)ʵ������ָfree\_the\_stuff\_pointed\_to\_by(p)��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.2\] ���� free() һ���� new �����ָ���𣿿��� delete һ���� malloc() �����ָ����

_����_

��һ��������ͬʱʹ�� malloc() �� delete ����ͬʱʹ�� new �� free() �Ǻ�������Ϸ��ġ����ǣ����� new �����ָ����� free()������� malloc() �����ָ����� delete���������ġ��Ƿ��ġ����ӵġ�

���ģ���ż���յ�һЩ�˵�e-mail�����Ǹ����������ǵĻ��� X �Ϻͱ����� Y �Ϲ������������Ⲣ����ʹ������Ϊ��ȷ�ģ���ʱ����˵��������ֻ����һ���ַ�������ѡ���������Ȼ��ˣ�Ҳ��Ҫ��ͬһ��ָ���ϻ��malloc() �� delete������ͬһ��ָ���ϻ��new �� free()�����ͨ��p = new char\[n\]���䣬�����ʹ��delete\[\] p��������ʹ��free(p)�����ͨ������p = malloc(n)�������ʹ��free(p)��������ʹ��delete\[\] p �� delete p�������ǻ�ϣ����������ŵ��µĻ����ϣ��µı������ϣ���ֻ��ͬ�����������°汾�ϣ������ܵ�������ʱ�����Ե�ʧ�ܡ�

��ס������档

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.3\] ΪʲôҪ�� new ȡ��ԭ����ֵ�������� malloc()��

���캯�����������������Ͱ�ȫ���ɸ����ԣ�Overridability����

-   ���캯���������������� malloc(sizeof(Fred))��һ����new Fred() ���� Fred �Ĺ��캯����ͬ����delete p ���� \*p ������������
-   ���Ͱ�ȫ��malloc() ����һ��û�����Ͱ�ȫ�� void\* ��new Fred() ����һ����ȷ���ͣ�һ�� Fred\*����ָ�롣
-   �ɸ����ԣ�new ��һ���ɱ�����д�����ǵ������operator������ malloc() ������û�пɸ����ԡ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.4\] ������һ���� new �����ָ����ʹ�� realloc() ��

���ɣ�

realloc() ����ʱ��ʹ�õ���λ������_bitwise_ copy ����������������� C++ ����C++����Ӧ�ñ��������������Լ�������ʹ���Լ��Ŀ������캯�����߸�ֵ�����

����֮�⣬new ʹ�õĶѿ��ܺ� malloc() �� realloc() ʹ�õĶѲ�ͬ��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.5\] ��Ҫ�� p = new Fred()֮����NULL��![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.6]).\]_

�������������ֻ�оɵı�����������ܲ��ò�[ǿ�� new ������ڴ����ʱ�׳�һ���쳣](#[16.6])����

������ÿһ��new ����֮��д��ʽ�� NULL ����ʵ���Ƿǳ�ʹ���.���µĴ����Ƿǳ�������ζ�ģ�

 Fred\* p = new Fred();  
 if (p == NULL)  
   throw std::bad\_alloc();

�����ı�������֧�֣��������ܾ�ʹ�ã�[�쳣](https://www.sunistudio.com/cppfaq/exceptions.html)�� ��Ĵ�����ܻ��������ζ��

 Fred\* p = new Fred();  
 if (p == NULL) {  
   std::cerr << "Couldn't allocate memory for a Fred" << endl;  
   abort();  
 }

����һ�¡��� C++�У��������ʱϵͳ�޷�Ϊp = new Fred()���� sizeof(Fred) �ֽڵ��ڴ棬���׳�һ�� std::bad\_alloc �쳣���� malloc()��ͬ��new _��Զ����_���� NULL��

�����ֻҪ�򵥵�д��

 Fred\* p = new Fred();   

_// ����Ҫ��� p �Ƿ�Ϊ NULL_

Ȼ���������ı������ܹ��ϣ������ܻ���֧�������������ı��������ĵ��ҵ���new���������ֻ�й��ϵı��������ͱ���[ǿ�Ʊ�����ӵ��������Ϊ](#[16.6])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.6\] �����ȷ���ҵģ����ϵģ����������Զ���� new �Ƿ񷵻� NULL �� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed the example to use throw rather than abort() thanks to [Stan Brown](mailto:brahms@mindspring.com); changed to use new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.13]).\]_

������ı�������֧�ֵġ�

�����ֻ�й��ϵĲ��Զ�ִ��[NULL ����](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.5])�ı������Ļ�������԰�װһ����new handler��������ǿ������ʱϵͳ�����ԡ���ġ�new handler�������������κ������������飬�����׳�һ���쳣�� delete һЩ���󲢷��أ���operator new����ͼ�ٷ��������£�����ӡһ����Ϣ���ߴӳ����� abort() �ȵȡ�

������һ����new handler�������ӣ�����ӡ��Ϣ���׳�һ���쳣����ʹ�� std::set\_new\_handler() ����װ��

 #include <new>       

_// �õ� std::set\_new\_handler_

 #include <cstdlib>   

_// �õ� abort()_

 #include <iostream>  

_// �õ� std::cerr_

   class alloc\_error : public std::exception {  
 public:  
   alloc\_error() : exception() { }  
 };

   void myNewHandler()  
 {

_// �������Լ��� handler�����������κ�����Ҫ�������顣_

   throw alloc\_error();  
 }

   int main()  
 {  
   std::set\_new\_handler(myNewHandler);

_// ��װ��� "new handler"_

   

_// ..._

 }

��std::set\_new\_handler()��ִ�к���������ڴ治��ʱ��operator new���������myNewHandler()������ζ��new ���᷵��NULL��

 Fred\* p = new Fred();   

_// ����Ҫ��� p �Ƿ�Ϊ NULL_

ע�⣺�����ı�������֧��[�쳣����](https://www.sunistudio.com/cppfaq/exceptions.html)����Ϊ������������Խ� throw ...; ��һ�и�Ϊ��

��

 std::cerr << "Attempt to allocate memory failed!" << std::endl;  
 abort();

ע�⣺���ĳЩȫ�ֵģ���̬�Ķ���Ĺ��캯��ʹ����new���������ǵĹ��캯����main()��ʼ֮ǰ�����ã����������ʹ��myNewHandler()���������ҵ��ǣ�û�м��ķ���ȷ��std::set\_new\_handler() �ڵ�һ��ʹ�� new ֮ǰ�����á����磬��ʹ�㽫std::set\_new\_handler()�ĵ��÷���ȫ�ֶ���Ĺ��캯���У�����Ȼ�޷�֪��������ȫ�ֶ����ģ�飨�����뵥Ԫ���������Ȼ�������ǻ����м�ĳ��λ�ñ����͡���ˣ�����Ȼ�޷���֤std::set\_new\_handler() �ĵ��û����κ�����ȫ�ֶ���Ĺ��캯������֮ǰ��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.7\] ��delete p֮ǰ��Ҫ���NULL��

����Ҫ��

C++���Ե��������p����NULL����delete p�����κ����顣����֮����Եõ����ԣ����Ҵ�����Ĳ��Է����۶�ǿ����ʽ����ÿ����֧�㣬����㲻Ӧ�ü��϶���� if ���ԡ�

����ģ�

��

 if (p != NULL)  
   delete p;

��ȷ�ģ�

 delete p;

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.8\] delete p ִ�������������裿

delete p ��һ�������Ĺ��̣���������������Ȼ���ͷ��ڴ档delete p�����Ĵ��뿴��ȥ�������ģ�������Fred\*���͵ģ���

��

 

_// ԭʼ�룺delete p;_

 if (p != NULL) {  
   p->~Fred();  
   operator delete(p);  
 }

p->~Fred() ������ p ָ���Fred ���������������

operator delete(p) �������ڴ��ͷ�ԭ�� void operator delete(void\* p)����ԭ������free(void\* p)����Ȼ��ע�⣬�����������ܻ�����������˵��û��˭�����������ڴ��ͷ�ԭ���ʹ��ͬһ���ѣ�����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.9\] �� p = new Fred() �У����Fred ���캯���׳��쳣���Ƿ���ڴ桰й©����

���ᡣ

����쳣������p = new Fred()�� Fred ���캯���У� C++����ȷ���ѷ���� sizeof(Fred)�ֽڵ��ڴ���Զ��Ӷ��л��ա�

����������ϸ�ڣ�new Fred()��һ�������Ĺ��̣�

1.  sizeof(Fred) �ֽڵ��ڴ�ʹ��void\* operator new(size\_t nbytes)ԭ�ﱻ���䡣��ԭ��������malloc(size\_t nbytes)����Ȼ��ע�⣬�����������ܻ�����������˵��û��˭�����������ڴ����ԭ���ʹ��ͬһ���ѣ�����
2.  ��ͨ������Fred���캯�����ڴ��н������󡣵�һ�����ص�ָ�뱻��Ϊ this �������ݸ����캯������һ����������һ�������Դ����ⲽ���׳��쳣�������

���ʵ�ʲ����Ĵ���������������ģ�

 

_// ԭʼ���룺Fred\* p = new Fred();_

 Fred\* p = (Fred\*) operator new(sizeof(Fred));  
 try {  
   new(p) Fred();       

_// [Placement new](https://www.sunistudio.com/cppfaq/dtors.html#[11.10])_

 } catch (...) {  
   operator delete(p);  

_// �ͷ��ڴ�_

   throw;               

_// �����׳��쳣_

 }

���Ϊ��[Placement new](https://www.sunistudio.com/cppfaq/dtors.html#[11.10])��������������� Fred ���캯����ָ�� p ���˹�ռ���� Fred::Fred()�ڲ���thisָ�롣

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.10\] ��η��䣯�ͷ�һ����������飿

ʹ�� p = new T\[n\] �� delete\[\] p:

 Fred\* p = new Fred\[100\]; 

_// ..._

 delete\[\] p;

�κ�ʱ����ͨ��new ������һ����������飨ͨ���ڱ���ʽ����\[_n_\]�������� delete ����б���ʹ��\[\]�����﷨�Ǳ���ģ���Ϊû��ʲô�﷨��������ָ��һ�������ָ���ָ��һ�����������ָ�루�� C ��������ĳЩ��������

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.11\] ��� delete һ����new T\[n\]��������飬©��\[\]����Σ�

�������������Ե���ֹ��

��ȷ������new T\[n\]��delete\[\] p�ǳ���Ա�ġ������Ǳ������ġ������Ρ������Ū���ˣ����������ڱ���ʱ������ʱ����������Ϣ���ѣ�Heap�����ƻ��ǿ��ܵĽ�������߸���⣬��ĳ�����ܻ�������

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.12\] ��deleteһ���ڽ����� (char, int, ��)������ʱ����ȥ�� \[\] ��

_���У�_

��ʱ����Ա����Ϊ��delete\[\] p �д���\[\] ������Ϊ�˱�����Ϊ�����е�ÿ��Ԫ�ص����ʵ��������������������ԭ��������ΪһЩ�ڽ����͵����飬�� char��int���Բ���Ҫ\[\]��������˵��������Ϊ�����ǺϷ��Ĵ��룺

��

 void userCode(int n)  
 {  
   char\* p = new char\[n\];   

_// ..._

   delete p;     

_// <— ����Ӧ���� delete\[\] p ��_

 }

�����ϴ����Ǵ���ģ����һᵼ��һ������ʱ�����ѡ�����ϸ����˵��delete p���õ���operator delete(void\*)����delete\[\] p���õ���operator delete\[\](http://www.sunistudio.com/cppfaq/void/*)����Ȼ���ߵ�Ĭ����Ϊ�ǵ���ǰ�ߣ����������ò�ͬ����Ϊȡ���Ǳ������ģ����������ͨ��Ҳ�Ὣ��Ӧ��operator new\[\](http://www.sunistudio.com/cppfaq/size/_t)�е� new ȡ�����������ȡ����delete\[\]  ������delete ���벻���ݣ����ҵ��ô�����Ǹ������磬��д��delete p������delete\[\] p����������ʱ�����군��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.13\] p = new Fred\[n\]֮�󣬱�������delete\[\] p��ʱ�����֪���и�����������![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed "popluar" to "popular" thanks to [Fabrice Clerc](mailto:fclerc@cybercable.fr) (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.15]).\]_

����Ļش�ħ����

��ϸ�Ļش�����ʱϵͳ����������� n ������ĳ��ͨ��ָ�� p ���Ի�ȡ�ĵط����������ձ�ļ�����ʵ�֡���Щ����������ҵ��������ʹ�ã�����Ȩ�⣬������������Щ�����ǣ�

-   [����������鲢�� n ���ڵ�һ��Fred�������ߡ�](https://www.sunistudio.com/cppfaq/compiler-dependencies.html#[33.6])
-   [ʹ�ù������飬 p ��Ϊ���� n ��Ϊֵ��](https://www.sunistudio.com/cppfaq/compiler-dependencies.html#[33.7])

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.14\] ��Ա��������delete this�Ϸ���

ֻҪ��С�ģ�һ������������ɱ(delete this).�ǿ��Եġ�

�������Ҷԡ�С�ġ��Ķ��壺

1.  �����100%��ȷ����this�������� new����ģ�������new\[\]��Ҳ������[��λ���� new](https://www.sunistudio.com/cppfaq/dtors.html#[11.10])��Ҳ����һ��ջ�ϵľֲ�����Ҳ����ȫ�ֵģ�Ҳ������һ������ĳ�Ա���������׵���ͨ��new����
2.  �����100%��ȷ�����ó�Ա������this���������õĵĳ�Ա������
3.  �����100%��ȷ����ʣ�µĳ�Ա������delete this֮��ģ����Ӵ��� this�����κ�һ�飨���������κ�������Ա����������κ����ݳ�Ա����
4.  ����� 100%��ȷ������delete this֮����ȥ����thisָ�롣���仰˵���㲻��ȥ�����������������ָ��Ƚϣ��� NULL�Ƚϣ���ӡ����ת�������������κ��¡�

��Ȼ���������������Ҫϰ���Եظ�룺�����ָ����һ��ָ��������͵�ָ�룬��û��[����������](https://www.sunistudio.com/cppfaq/virtual-functions.html#[20.4])ʱ��Ҳ������ delete this����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.15\] �����new�����ά���飿 ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently fixed a leak in the third manipulateArray() by moving another for loop into the try block (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.16]).\]_

�����෽����ȡ��������Ҫ�������ж�������ԡ�һ�������ǣ�������ڱ���ʱ��֪����������е�ά��������Ծ�̬�أ�����ͬ��C�У������ά���飺

��

 class Fred { 

_/\*...\*/_

 };  
 void someFunction(Fred& fred);

   void manipulateArray()  
 {  
   const unsigned nrows = 10;

_// �����Ǳ����ڳ���_

   const unsigned ncols = 20;  

_// �����Ǳ����ڳ���_

   Fred matrix\[nrows\]\[ncols\];

     for (unsigned i = 0; i < nrows; ++i) {  
     for (unsigned j = 0; j < ncols; ++j) {

_// ����(i,j)Ԫ�صķ�����_

       someFunction( matrix\[i\]\[j\] );

_// ���԰�ȫ�ء����ء�������Ҫ�ر��delete���룺_

       if (today == "Tuesday" && moon.isFull())  
         return;     

_// ��Բ�����ڶ��Ͻ��˳�_

     }  
   }

_// �ں���ĩβҲû����ʽ��delete����_

 }

��һ��ģ�����Ĵ�Сֻ�е�����ʱ��֪������ȷ������һ�����Ρ���������£�����Ҫʹ�öѣ������ɴ洢������heap��freestore��������������԰�����Ԫ�ط��������ɴ洢���С�

 void manipulateArray(unsigned nrows, unsigned ncols)  
 {  
   Fred\* matrix = new Fred\[nrows \* ncols\];

_// ������������ʹ���˼򵥵�ָ�룬���������Ҫ�ǳ�_

   

_// С�ı���©�� delete ���롣_

   

_// �����ΪʲôҪ���������쳣��_

   try {

_// ����(i,j) Ԫ�صķ�����_

     for (unsigned i = 0; i < nrows; ++i) {  
       for (unsigned j = 0; j < ncols; ++j) {  
         someFunction( matrix\[i\*ncols + j\] );  
       }  
     }

_// �����������Բ�����ڶ�����˳���_

     

_// ��Ҫȷ���ڷ��ص�����;������ delete ��_

     if (today == "Tuesday" && moon.isFull()) {  
       delete\[\] matrix;  
       return;  
     }

_// ..._

     }  
   catch (...) {

_// ȷ�����쳣�׳���delete ��_

     delete\[\] matrix;  
     throw;    

_// �����׳���ǰ�쳣_

   }

_// ȷ���ں���ĩβҲ���� delete ��_

   delete\[\] matrix;  
 }

�������һ�����ˣ������������ȷ�������Ǿ��εġ����磬���ÿ�п����в�ͬ�ĳ��ȣ������ҪΪ����ط���ÿһ�С������µĺ����У�ncols\[i\] �ǵ� i �е�������i �Ŀɱ䷶Χ�� 0 �� nrows-1��

 void manipulateArray(unsigned nrows, unsigned ncols\[\])  
 {  
   typedef Fred\* FredPtr;

_// ��������׳��쳣����Ҫ��Ϊ©����_

   FredPtr\* matrix = new FredPtr\[nrows\];

_// �Է���һ�Ժ�����쳣����ÿ��Ԫ������Ϊ NULL��_

   

_// (�� try �鶥�˵�ע�͡�)_

   for (unsigned i = 0; i < nrows; ++i)  
     matrix\[i\] = NULL;

_// ������������ʹ���˼򵥵�ָ�룬������Ҫ_

   

_// �ǳ�С�ĵر���©��delete ���롣_

   

_// �����Ϊʲô����Ҫ�������е��쳣��_

   try {

_// ����������װ���顣�������֮һ�׳��쳣�����е�_

     

_// �ѷ����Ԫ�ض��ᱻ�ͷ� (�����µ� catch )��_

     for (unsigned i = 0; i < nrows; ++i)  
       matrix\[i\] = new Fred\[ ncols\[i\] \];

_// ����(i,j) Ԫ�صķ�����_

     for (unsigned i = 0; i < nrows; ++i) {  
       for (unsigned j = 0; j < ncols\[i\]; ++j) {  
         someFunction( matrix\[i\]\[j\] );  
       }  
     }

_// �����������Բ�����ڶ���Щ�˳���_

     

_// ȷ���ڷ��ص�����;������ delete��_

     if (today == "Tuesday" && moon.isFull()) {  
       for (unsigned i = nrows; i > 0; --i)  
         delete\[\] matrix\[i-1\];  
       delete\[\] matrix;  
       return;  
     }

_// ..._

     }  
   catch (...) {

_// ȷ�������쳣�׳�ʱ�� delete ��_

     

_// ע�� matrix\[...\] �е�һЩָ�������_

     

_// NULL, ������delete NULL�ǺϷ��ģ�����û���⡣_

     for (unsigned i = nrows; i > 0; --i)  
       delete\[\] matrix\[i-1\];  
     delete\[\] matrix;  
     throw;    

_// �����׳���ǰ�쳣_

   }

_// ȷ���ں���ĩβҲ�� delete ��_

   

_// ע���ͷ�����䷴��_

   for (unsigned i = nrows; i > 0; --i)  
     delete\[\] matrix\[i-1\];  
   delete\[\] matrix;  
 }

ע���ͷŹ����� matrix\[i-1\]��ʹ�á��������Է�ֹ�޷���ֵ i �Ĳ���ΪС��0 �Ļ��ơ�

���ע��[ָ��������ǻ�����鷳��](https://www.sunistudio.com/cppfaq/containers-and-templates.html#[31.1])��ͨ������ý����ָ���װ��һ�����Ű�ȫ�ĺͼ򵥵Ľӿڵ����С�[��һ��FAQ](#[16.16])�����������������

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.16\] ��ǰһ��FAQ�Ĵ���̫�������׳������и��򵥵ķ����� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently clarified the last paragraph (on 7/00) and fixed the Star Trek movie number thanks to [Chris Sheppard](mailto:chris@quack.com) (on 4/01) and wordsmithed last paragraph at the suggestion of [prapp](mailto:prapp@erols.com) (on 4/01). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.17]).\]_

�С�

[ǰһ��FAQ](#[16.15])֮����̫�����ɶ����׳�������Ϊ��ʹ����ָ�룬����֪��[ָ������������鷳](https://www.sunistudio.com/cppfaq/containers-and-templates.html#[31.1])������취�ǽ�ָ���װ��һ�����Ű�ȫ�ĺͼ򵥵Ľӿڵ����С����磬���ǿ��Զ���һ�� Matrix �����������εľ����û����뽫��[ǰһ��FAQ�еľ��ξ���Ĵ���](#[16.15])�򵥵öࣺ

 

_// Matrix ��Ĵ�����������ʾ..._

 void someFunction(Fred& fred);

   void manipulateArray(unsigned nrows, unsigned ncols)  
 {  
   Matrix matrix(nrows, ncols);

_// ����һ�� matrix_

     for (unsigned i = 0; i < nrows; ++i) {  
     for (unsigned j = 0; j < ncols; ++j) {

_// ����(i,j) Ԫ�صķ�����_

       someFunction( matrix(i,j) );

_// ����Բ���д�κε� delete ���밲ȫ�ء����ء���_

       if (today == "Tuesday" && moon.isFull())  
         return;     

_// ��Բ�����ڶ���Щ�˳�_

     }  
   }

_// �ں���ĩβҲû����ʽ��delete����_

 }

��Ҫע�����Ҫ��������Ĵ���Ķ�С�����磬�����ϵĴ�����û���κ� delete ��䣬Ҳ�������ڴ�й©�������������ǻ�������������ȷ��������Ĺ�����

���¾���ʹ�����ϳ�Ϊ���ܵ�Matrix�Ĵ��룺

 class Matrix {  
 public:  
   Matrix(unsigned nrows, unsigned ncols);   

_// ����κ�һ���ߴ�Ϊ 0�����׳� BadSize ������쳣��_

   class BadSize { };

_// ����[����������ע����������ͬʱ���ڣ���](https://www.sunistudio.com/cppfaq/coding-standards.html#[25.9])_

  ~Matrix();  
   Matrix(const Matrix& m);  
   Matrix& operator= (const Matrix& m);

_// ȡ�� (i,j) Ԫ�صķ��ʷ�����_

   Fred&       operator() (unsigned i, unsigned j);  
   const Fred& operator() (unsigned i, unsigned j) const;   

_// ���i ��j ̫���׳�BoundsViolation ����_

   class BoundsViolation { };

   private:  
   Fred\* data\_;  
   unsigned nrows\_, ncols\_;  
 };

   inline Fred& Matrix::operator() (unsigned row, unsigned col)  
 {  
   if (row >= nrows\_ || col >= ncols\_) throw BoundsViolation();  
   return data\_\[row\*ncols\_ + col\];  
 }

   inline const Fred& Matrix::operator() (unsigned row, unsigned col) const  
 {  
   if (row >= nrows\_ || col >= ncols\_) throw BoundsViolation();  
   return data\_\[row\*ncols\_ + col\];  
 }

   Matrix::Matrix(unsigned nrows, unsigned ncols)  
   : data\_  (new Fred\[nrows \* ncols\]),  
     nrows\_ (nrows),  
     ncols\_ (ncols)  
 {  
   if (nrows == 0 || ncols == 0)  
     throw BadSize();  
 }

   Matrix::~Matrix()  
 {  
   delete\[\] data\_;  
 }

ע�����ϵ�Matrix����������£��������Ե��ڴ��������ӿͻ����루���磬main()���Ƶ����У����������ϼ����˱�̡���ڶ������Ҫ�����磬���� Matrix����΢�Ŀ������ԣ��������Դ�Matrix���û��ǣ۸����ݴ��Ƶ���Matrix�����۵����ݾ͵��ڽ������ԴӶ�ķ����Ƶ��ٵķ��档�κο����Ǽ�����2���˶�֪����������������������߸�������档

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.17\] �������Matrix�������Fred�ģ��а취ʹ��ͨ���� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently rewrote (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.18]).\]_

�У��Ǿ���ʹ��[ģ��](https://www.sunistudio.com/cppfaq/containers-and-templates.html)��

���¾����������ģ�壺

 #include "Fred.hpp"     

_// �õ�Fred_

_��Ķ���_

_// Matrix<T> �Ĵ����ں�����ʾ..._

 void someFunction(Fred& fred);

   void manipulateArray(unsigned nrows, unsigned ncols)  
 {  
   Matrix<Fred> matrix(nrows, ncols);

_// ����һ����Ϊmatrix�� Matrix<Fred>_ 

     for (unsigned i = 0; i < nrows; ++i) {  
     for (unsigned j = 0; j < ncols; ++j) {

_// ���� (i,j) Ԫ�صķ�����_

       someFunction( matrix(i,j) );

_// ����Բ����κε�delete �Ĵ��밲ȫ�ء����ء���_

       if (today == "Tuesday" && moon.isFull())  
         return;     

_// ��Բ�����ڶ���Щ�˳�_

     }  
   }

_// ����ĩβҲû����ʽ��delete����_

 }

���ں�����Ϊ�� Fred ����ʹ�� Matrix<T>�����磬����Ϊstd::string ʹ��һ�� Matrix ��std::string �Ǳ�׼�ַ����ࣩ��

��

 #include <string>

   void someFunction(std::string& s);

   void manipulateArray(unsigned nrows, unsigned ncols)  
 {  
   Matrix<std::string> matrix(nrows, ncols);

_// ����һ�� Matrix<std::string>_

     for (unsigned i = 0; i < nrows; ++i) {  
     for (unsigned j = 0; j < ncols; ++j) {

_// ���� (i,j) Ԫ�صķ�����_

       someFunction( matrix(i,j) );

_//_ _����Բ����κε�delete �Ĵ��밲ȫ�ء����ء���_

       if (today == "Tuesday" && moon.isFull())  
         return;     

_//_ _��Բ�����ڶ���Щ�˳�_

     }  
   }

_//_ _����ĩβҲû����ʽ��delete����_

 }

��ˣ�����Դ�[ģ��](https://www.sunistudio.com/cppfaq/containers-and-templates.html)�õ�����������塣���磬 Matrix<Fred>, Matrix<std::string>, Matrix< Matrix<std::string> >�ȵȡ�

������ʵ�ָ�[ģ��](https://www.sunistudio.com/cppfaq/containers-and-templates.html)��һ�ַ�����

 template<class T>  

_// ��� [ģ��һ��](https://www.sunistudio.com/cppfaq/containers-and-templates.html)_

 class Matrix {  
 public:  
   Matrix(unsigned nrows, unsigned ncols);   

_// ����κ�һ���ߴ�Ϊ 0�����׳� BadSize ����_

   class BadSize { };

_// ����[����������ע����������ͬʱ���ڣ���](https://www.sunistudio.com/cppfaq/coding-standards.html#[25.9])_

  ~Matrix();  
   Matrix(const Matrix<T>& m);  
   Matrix<T>& operator= (const Matrix<T>& m);

_// ��ȡ (i,j) Ԫ�صķ��ʷ�����_

   T&       operator() (unsigned i, unsigned j);  
   const T& operator() (unsigned i, unsigned j) const;   

_// ��� i �� j ̫�����׳� BoundsViolation ����_

   class BoundsViolation { };

   private:  
   T\* data\_;  
   unsigned nrows\_, ncols\_;  
 };

   template<class T>  
 inline T& Matrix<T>::operator() (unsigned row, unsigned col)  
 {  
   if (row >= nrows\_ || col >= ncols\_) throw BoundsViolation();  
   return data\_\[row\*ncols\_ + col\];  
 }

   template<class T>  
 inline const T& Matrix<T>::operator() (unsigned row, unsigned col) const  
 {  
   if (row >= nrows\_ || col >= ncols\_) throw BoundsViolation();  
   return data\_\[row\*ncols\_ + col\];  
 }

   template<class T>  
 inline Matrix<T>::Matrix(unsigned nrows, unsigned ncols)  
   : data\_  (new T\[nrows \* ncols\])  
   , nrows\_ (nrows)  
   , ncols\_ (ncols)  
 {  
   if (nrows == 0 || ncols == 0)  
     throw BadSize();  
 }

   template<class T>  
 inline Matrix<T>::~Matrix()  
 {  
   delete\[\] data\_;  
 }

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.18\] ���������������� Matrix ģ���� ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created thanks to [Jesper Rasmussen](mailto:repsej@daimi.au.dk) (on 4/01). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.19]).\]_

�ñ�׼��vector ģ�壬����һ��������������

���´���ʹ����һ��vector<vector<T> >��ע������ \> ����֮��Ŀո񣩡�

 #include <vector>

   template<class T>

_// ���[ģ��һ��](https://www.sunistudio.com/cppfaq/containers-and-templates.html)_

 class Matrix {  
 public:  
   Matrix(unsigned nrows, unsigned ncols);   

_// ����κεĳߴ�Ϊ 0���׳� BadSize ����_

   class BadSize { };

_// ����Ҫ[��������](https://www.sunistudio.com/cppfaq/coding-standards.html#[25.9])��_

_// �õ� (i,j) Ԫ�صķ��ʷ�����_

   T&       operator() (unsigned i, unsigned j);  
   const T& operator() (unsigned i, unsigned j) const;   

_// ��� i �� j ̫�����׳� BoundsViolation ����_

   class BoundsViolation { };

   private:  
   vector<vector<T> > data\_;  
 };

   template<class T>  
 inline T& Matrix<T>::operator() (unsigned row, unsigned col)  
 {  
   if (row >= nrows\_ || col >= ncols\_) throw BoundsViolation();  
   return data\_\[row\]\[col\];  
 }

   template<class T>  
 inline const T& Matrix<T>::operator() (unsigned row, unsigned col) const  
 {  
   if (row >= nrows\_ || col >= ncols\_) throw BoundsViolation();  
   return data\_\[row\]\[col\];  
 }

   template<class T>  
 Matrix<T>::Matrix(unsigned nrows, unsigned ncols)  
   : data\_ (nrows)  
 {  
   if (nrows == 0 || ncols == 0)  
     throw BadSize();  
   for (unsigned i = 0; i < nrows; ++i)  
     data\_\[i\].resize(ncols);  
 }

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.19\] C++ ���ܹ���������ָ�����ȵ������� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax and reworded references to STL (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.21]).\]_

�У��ǻ���[��׼��](https://www.sunistudio.com/cppfaq/class-libraries.html#[32.1])��һ�� std::vector ģ������ṩ������Ϊ����ʶ��

û�У��ǻ����ڽ�����������Ҫ�ڱ�����ָ���䳤�ȵ���ʶ��

�У��ǻ��ڼ�ʹ�����ڽ���������Ҳ������������ָ����һά�����߽����ʶ�����磬��һ��ǰһ��FAQ�������ֻ��Ҫ����ĵ�һά��ά����������ԣ����������һ���µ���������飬������һ��ָ���������ָ�����飺

��

 const unsigned ncols = 100;           

_// ncols = ���������_

   class Fred {

_/\*...\*/_

 };

   void manipulateArray(unsigned nrows)

_// nrows = ���������_

 {  
   Fred (\*matrix)\[ncols\] = new Fred\[nrows\]\[ncols\];   

_// ..._

   delete\[\] matrix;  
 }

���������Ҫ�Ĳ����������ڸı�����ĵ�һάά����������ô����

�����򲻵��ѣ���Ҫ�����顣��Ϊ[�����ǻ�����鷳��](https://www.sunistudio.com/cppfaq/containers-and-templates.html#[31.1])��������ԵĻ���ʹ��ĳЩ��Ķ����򲻵��Ѳ������顣

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.20\] ���ʹ��Ķ�������ͨ�� new �����������Ǿֲ��Ļ���ȫ�ֵģ���̬�Ķ���

ʹ��[�����Ĺ��캯���÷�](https://www.sunistudio.com/cppfaq/ctors.html#[10.8])��

���������Ĺ��캯���÷���ͨ�����������й��캯����private: ��protected:������һ������public static create()��������˳�Ϊ�������Ĺ��캯����named constructors������ÿ�����캯����Ӧһ������ʱ�� create() ����ͨ�� new ������������ڹ��캯������������public�����û��������������������Ķ���

 class Fred {  
 public:   

_// create() �������� "�����Ĺ��캯����named constructors":_

   static Fred\* create()                 { return new Fred();     }  
   static Fred\* create(int i)            { return new Fred(i);    }  
   static Fred\* create(const Fred& fred) { return new Fred(fred); }   

_// ..._

   private:

_// ���캯�������� private �� protected:_

   Fred();  
   Fred(int i);  
   Fred(const Fred& fred);   

_// ..._

 };

���������� Fred �����Ψһ��������ͨ�� Fred::create()��

��

 int main()  
 {  
   Fred\* p = Fred::create(5);   

_// ..._

   delete p;  
 }

�����ϣ�� Fred�������࣬����ȷ�Ϲ��캯���� protected: ���С�

ע�⣬�����������Fred��Ķ����ΪWilma��ĳ�Ա�����԰�Wilma ��Ϊ Fred ��[��Ԫ](https://www.sunistudio.com/cppfaq/friends.html)����Ȼ�����������������Ŀ�꣬Ҳ����ǿ�� Fred ��������ͨ�� new �����䡣

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.21\] ��ν��м򵥵����ü����� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently moved definition of Fred::create() methods below the definition of class FredPtr (on 4/01). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.22]).\]_

���������Ҫ��ֻ�Ƿַ�ָ��ͬһ������Ķ��ָ�룬���ҵ����һ��ָ����ʧ��ʱ�����Զ��ͷŸö���������Ļ��������ʹ���������µġ�ֻ��ָ�루smart pointer�����ࣺ

��

 

_// Fred.h_

   class FredPtr;

   class Fred {  
 public:  
   Fred() : count\_(0)

_/\*...\*/_

 { }  

_// ���еĹ��캯����Ҫ���� count\_ to 0 !_

   

_// ..._

 private:  
   friend FredPtr;     

_// [��Ԫ��](https://www.sunistudio.com/cppfaq/friends.html)_

   unsigned count\_;   

_// count\_ ���뱻���й��캯����ʼ��_

   

_// count\_ ����ָ�� this�Ķ�FredPtr����Ŀ_

 };

   class FredPtr {  
 public:  
   Fred\* operator-> () { return p\_; }  
   Fred& operator\* ()  { return \*p\_; }  
   FredPtr(Fred\* p)    : p\_(p) { ++p\_->count\_; }

_// p ����Ϊ NULL_

  ~FredPtr()           { if (--p\_->count\_ == 0) delete p\_; }  
   FredPtr(const FredPtr& p) : p\_(p.p\_) { ++p\_->count\_; }  
   FredPtr& operator= (const FredPtr& p)  
         { 

_// ��Ҫ�ı���Щ����˳��_

           

_// (��˵�˳���ʵ��Ĵ�����[�Ը�ֵ](https://www.sunistudio.com/cppfaq/assignment-operators.html#[12.1]))_

           ++p.p\_->count\_;  
           if (--p\_->count\_ == 0) delete p\_;  
           p\_ = p.p\_;  
           return \*this;  
         }  
 private:  
   Fred\* p\_;    

_// p\_ ��Զ��Ϊ NULL_

 };

��Ȼ�������ʹ��Ƕ���࣬��FredPtr����ΪFred::Ptr��

ע�⣬�ڹ��캯�����������캯������ֵ�������������������һ���飬�Ϳ�����������ġ���Զ��Ϊ NULL���Ĺ���������������Ļ������ܵ������ڡ�\*���͡�\->������з���һ��p\_ != NULL��飨������һ�� assert()�����Ҳ��Ƽ�operator Fred\*() ����Ϊ�����������������ȡ��Fred\*��

FredPtr������Լ��֮һ��������ָ��ͨ�� new�����Fred�������Ҫ�����İ�ȫ������ʹ���е�Fred���캯����Ϊprivate��Ϊÿ�����캯����һ����new������Fred �����ҷ���һ��FredPtr ������Fred\*����public (static) create() ��������ǿ���Լ�������ְ취�Ǵ���Fred������õ�һ��FredPtr��Ψһ�취����Fred\* p = new Fred()���ᱻ��FredPtr p = Fred::create()��ȡ������������û�˻������ƻ����ü����Ļ����ˡ�

���磬���Fred��һ��Fred::Fred() ��һ��Fred::Fred(int i, int j)��class Fred ���ɣ�

 class Fred {  
 public:  
   static FredPtr create();              

_// �������µ� class FredPtr {...}_

   static FredPtr create(int i, int j);  

_// �������µ� class FredPtr {...}_

   

_// ..._

 private:  
   Fred();  
   Fred(int i, int j);   

_// ..._

 };

   class FredPtr {

_/\* ... \*/_

 };

   inline FredPtr Fred::create()             { return new Fred(); }  
 inline FredPtr Fred::create(int i, int j) { return new Fred(i,j); }

���ս��������������һ�ְ취��ʹ�ü򵥵����ü���Ϊ�����Ķ����ṩ��ָ�����壨pointer semantics������Fred����û���ȷ��ʹ��FredPtr �����������ٵ�����Fred\*ָ�롣�������ĺô����û����Խ������FredPtr������ָ�롱����Ŀ����������һ��FredPtr������ʧʱ������ָ��� Fred ����ᱻ�Զ��ͷš�

�����ϣ�����û��ԡ��������塱�����ǡ�ָ�����塱�Ļ�������ʹ��[���ü����ṩ��дʱ������copy on write����](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.22])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.22\] �����дʱ������copy-on-write�������ṩ���ü����� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently rewrote the first paragraph for clarity thanks to [Fabrice Clerc](mailto:fclerc@cybercable.fr) (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.23]).\]_

���ü���������ָ�����������������ɡ�[ǰһ��FAQ](#[16.21])��ʾ�����ʹ��ָ������������ü�������FAQ����ʾ���ʹ����������������ü�����

����˼���������û���Ϊ�����ڸ���Fred���󣬵�ʵ����������ʵ�ֲ������и��ƣ�ֱ��һЩ�û���ͼ�޸�������Fred ����Ž��������ĸ��ơ�

Fred::Data��װ����Fred �����е����ݡ� Fred::DataҲ��һ������ĳ�Աcount\_�����������ü�����Fred ��������һ��ָ��Fred::Data�ġ�����ָ�롱���ڲ��ģ���

 class Fred {  
 public:

     Fred();

_// [Ĭ�Ϲ��캯��](https://www.sunistudio.com/cppfaq/ctors.html#[10.4])_

   Fred(int i, int j);                   

_// ��ͨ�Ĺ��ں���_

     Fred(const Fred& f);  
   Fred& operator= (const Fred& f);  
  ~Fred();

     void sampleInspectorMethod() const;

_// this ���󲻻��_

   void sampleMutatorMethod();           

_// ��ı� this o����_

_// ..._

   private:

     class Data {  
   public:  
     Data();  
     Data(int i, int j);  
     Data(const Data& d);

_// ����ֻ�� Fred �ܷ��� Fred::Data ����_

     

_// ֻҪ��Ը�⣬�����ʹ�� Fred::Data������Ϊ public��_

     

_// ���������ʹ�㲻ˬ���Ͱ�������Ϊ private_

     

_// ��Ҫ��friend Fred;ʹ Fred ��Ϊ[��Ԫ��](https://www.sunistudio.com/cppfaq/friends.html)_

     

_// ..._

       unsigned count\_;

_// count\_ ��ָ���this��Fred �������Ŀ_

     

_// count\_ m���뱻���еĹ��캯����ʼ��Ϊ 1_

     

_// (�� 1 ��ʼ����Ϊ������������Fred ������ָ)_

   };

     Data\* data\_;  
 };

   Fred::Data::Data()              : count\_(1)

_/\*��ʼ����������\*/_

 { }  
 Fred::Data::Data(int i, int j)  : count\_(1) 

_/\*��ʼ����������\*/_

 { }  
 Fred::Data::Data(const Data& d) : count\_(1) 

_/\*��ʼ����������\*/_

 { }

   Fred::Fred()             : data\_(new Data()) { }  
 Fred::Fred(int i, int j) : data\_(new Data(i, j)) { }

   Fred::Fred(const Fred& f)  
   : data\_(f.data\_)  
 {  
   ++ data\_->count\_;  
 }

   Fred& Fred::operator= (const Fred& f)  
 {

_// ��Ҫ������Щ����˳��_

   

_// (��˵�˳���ʵ��ش�����[�Ը�ֵ](https://www.sunistudio.com/cppfaq/assignment-operators.html#[12.1]))_

   ++ f.data\_->count\_;  
   if (--data\_->count\_ == 0) delete data\_;  
   data\_ = f.data\_;  
   return \*this;  
 }

   Fred::~Fred()  
 {  
   if (--data\_->count\_ == 0) delete data\_;  
 }

   void Fred::sampleInspectorMethod() const  
 {

_// �÷�����ŵ (��const��) ���ı� \*data\_�е��κζ���_

   

_// �������⣬�κ����ݷ��ʽ��򵥵�ʹ�á�data\_->...��_

 }

   void Fred::sampleMutatorMethod()  
 {

_// �÷���������Ҫ�ı� \*data\_�е�����_

   

_// ������ȼ��this�Ƿ�Ψһ��ָ�� \*data\__

   if (data\_->count\_ > 1) {  
     Data\* d = new Data(\*data\_);    

_// ���� Fred::Data�Ŀ������캯��_

     -- data\_->count\_;  
     data\_ = d;  
   }  
   assert(data\_->count\_ == 1);

_// ���ڸ÷����糣���С�data\_->...���ķ���_

 }

����ǳ������ص��� Fred ��[Ĭ�Ϲ��캯��](https://www.sunistudio.com/cppfaq/ctors.html#[10.4])�������Ϊ����ͨ��Fred::Fred()�����Fred ����һ��������Fred::Data ������������Щ new���á�Ϊ���⾲̬��ʼ��˳�����⣬�ù����� Fred::Data ������һ�������ڡ��״�ʹ�á�ʱ�Ŵ��������¾��Ƕ����ϵĴ������ĸı䣨ע�⣬�ù�����Fred::Data���������������Զ���ᱻ���ã�����������Ļ���Ҫô�����̬��ʼ��˳������⣬Ҫô���Է��ص����������ķ�������

 class Fred {  
 public:   

_// ..._

 private:   

_// ..._

   static Data\* defaultData();  
 };

   Fred::Fred()  
 : data\_(defaultData())  
 {  
   ++ data\_->count\_;  
 }

   Fred::Data\* Fred::defaultData()  
 {  
   static Data\* p = NULL;  
   if (p == NULL) {  
     p = new Data();  
     ++ p->count\_;

_// ȷ���������Ϊ 0_

   }  
   return p;  
 }

ע�⣺��� Fred ͨ����Ϊ����Ļ���Ҳ����[Ϊ�����ṩ���ü���](#[16.23])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.23\] ���Ϊ�������ṩдʱ������copy-on-write����������ü����� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.24]).\]_

[ǰһ��FAQ](#[16.22])������������������ü������ԣ�������Ϊֹ����Ե���������Ƿֲ�ε��ࡣ��FAQ��չ֮ǰ�ļ���������Ϊ�����ṩ���ü�����������֮ͬ����������Fred::Data�����εĸ����ſ���ʹ������һЩ[�麯��](https://www.sunistudio.com/cppfaq/virtual-functions.html)��ע�� Fred �౾����Ȼû���κε��麯����

[�鹹�캯���÷�](https://www.sunistudio.com/cppfaq/virtual-functions.html#[20.5])�������� Fred::Data ����Ŀ�����Ҫѡ�񴴽��ĸ������࣬���µ�ʾ������ʹ����[�������캯��](https://www.sunistudio.com/cppfaq/ctors.html#[10.8])�÷����������������������캯���м�һ��switch���ȣ���ʾ��������������������ࣺDer1��Der2��������ķ�������������ü�����

 class Fred {  
 public:

     static Fred create1(const std::string& s, int i);  
   static Fred create2(float x, float y);

     Fred(const Fred& f);  
   Fred& operator= (const Fred& f);  
  ~Fred();

     void sampleInspectorMethod() const;

_// this ���󲻻ᱻ�ı�_

   void sampleMutatorMethod();           

_// ��ı� this ����_

_// ..._

   private:

     class Data {  
   public:  
     Data() : count\_(1) { }  
     Data(const Data& d) : count\_(1) { }

_// ��Ҫ���� 'count\_' ��Ա��_

     Data& operator= (const Data&) { return \*this; }  

_// ��Ҫ���� 'count\_' ��Ա��_

     virtual ~Data() { assert(count\_ == 0); }         

_// [����������](https://www.sunistudio.com/cppfaq/virtual-functions.html#[20.4])_

     virtual Data\* clone() const = 0;                 

_// [�鹹�캯��](https://www.sunistudio.com/cppfaq/virtual-functions.html#[20.5])_

     virtual void sampleInspectorMethod() const = 0;  

_// [���麯��](https://www.sunistudio.com/cppfaq/abcs.html#[22.4])_

     virtual void sampleMutatorMethod() = 0;  
   private:  
     unsigned count\_;   

_// count\_ ����Ҫ�� protected ��_

     friend Fred;       

_// ����Fred ���� count\__

   };

     class Der1 : public Data {  
   public:  
     Der1(const std::string& s, int i);  
     virtual void sampleInspectorMethod() const;  
     virtual void sampleMutatorMethod();  
     virtual Data\* clone() const;

_// ..._

   };

     class Der2 : public Data {  
   public:  
     Der2(float x, float y);  
     virtual void sampleInspectorMethod() const;  
     virtual void sampleMutatorMethod();  
     virtual Data\* clone() const;

_// ..._

   };

     Fred(Data\* data);

_// ����һ��ӵ�� \*data �� Fred ��������_

   

_// ���� private ������ʹ�û�ʹ�� createXXX() ����_

   

_// Ҫ��data ����Ϊ NULL_

     Data\* data\_;

_// Invariant: data\_ is never NULL_

 };

   Fred::Fred(Data\* data) : data\_(data)  { assert(data != NULL); }

   Fred Fred::create1(const std::string& s, int i) { return Fred(new Der1(s, i)); }  
 Fred Fred::create2(float x, float y)            { return Fred(new Der2(x, y)); }

   Fred::Data\* Fred::Der1::clone() const { return new Der1(\*this); }  
 Fred::Data\* Fred::Der2::clone() const { return new Der2(\*this); }

   Fred::Fred(const Fred& f)  
   : data\_(f.data\_)  
 {  
   ++ data\_->count\_;  
 }

   Fred& Fred::operator= (const Fred& f)  
 {

_// ��Ҫ������Щ����˳��_

   

_// (��˵�˳���ʵ��ش�����[�Ը�ֵ](https://www.sunistudio.com/cppfaq/assignment-operators.html#[12.1]))_

   ++ f.data\_->count\_;  
   if (--data\_->count\_ == 0) delete data\_;  
   data\_ = f.data\_;  
   return \*this;  
 }

   Fred::~Fred()  
 {  
   if (--data\_->count\_ == 0) delete data\_;  
 }

   void Fred::sampleInspectorMethod() const  
 {

_// �÷�����ŵ ("const") ���ı�\*data\_�е��κζ���_

   

_// �������ֻҪ��ֱ�Ӱѷ������ݡ��� \*data\_��_

   data\_->sampleInspectorMethod();  
 }

   void Fred::sampleMutatorMethod()  
 {

_// �÷���������Ҫ���� \*data\_�е�����_

   

_// ������ȼ��this �Ƿ�Ψһ��ָ��\*data\__

   if (data\_->count\_ > 1) {  
     Data\* d = data\_->clone();   

_// [�鹹�캯���÷�](https://www.sunistudio.com/cppfaq/virtual-functions.html#[20.5])_

     -- data\_->count\_;  
     data\_ = d;  
   }  
   assert(data\_->count\_ == 1);

_// ���ڡ�ֱ�Ӱѷ������ݸ��� \*data\_��_

   data\_->sampleInspectorMethod();  
 }

��Ȼ��Fred::Der1 ��Fred::Der2 �Ĺ��캯����sampleXXX��������Ҫ����ĳ��;���ʵ���ʵ�֡�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.24\] ���ܾ��Եط�ֹ�����ƻ����ü�������������ܵĻ��������ô���� ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created (on 4/01). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.25]).\]_

���ܣ���ͨ�������ᡣ

�����������İ취�ƻ����ü������ƣ�

1.  ���ĳ�˻����Fred\* �������Ǳ�ǿ��ʹ�õ�FredPtr�����ò��Ծͻᱻ�ƻ������FredPtr���з���һ�� Fred&��operator\*()�Ļ����Ϳ��ܵõ�Fred\*��FredPtr p = Fred::create(); Fred\* p2 = &\*p;���ǵģ���������ġ�����Ԥ�ڵģ��������ܷ�������©�������������ֲ�������Fred::operator&()ʹ������һ��FredPtr����ı�FredPtr::operator\*()�ķ������ͣ�ʹ������һ��FredRef��FredRef��һ��ģ�����õ��ࣻ����Ҫӵ��Fred��ӵ�е����з�����������Ҫ����Щ�����ĵ���ת�͸�������Fred���󣻵ڶ���ѡ����ܳ�Ϊ����ƿ������ȡ���ڱ����������������еı��֣�����һ������������ FredPtr::operator\*() ������Ӧ�Ļ�ʧȥȡ�ú�ʹ�� Fred& ������������ʹ���������ˣ�ĳЩ����Ȼ����ͨ����ʽ�ĵ��� operator->(): FredPtr p = Fred::create(); Fred\* p2 = p.operator->();��ȡ��һ��Fred\* ��
2.  ���ĳ����һ��й©�ĺͣ������յ�FredPtrָ��Ļ����ò��Իᱻ�ƻ�������������˵Fred�ǰ�ȫ�ģ��������޷���ֹ���˶�FredPtr ������ɵ�¡�������������ǿ���ͨ��FredPtrPtr����������Ļ��������FredPtrPtr��Ȼ����ͬ�����⣩�������һ��©�������ĳ��ʹ�� new ������һ��FredPtr ��Ȼ��FredPtr�Ϳ�����й©������������������й©����ͨ�����Ǳ�����ָ��Ҫ��һ��㣩����©������ͨ����FredPtr::operator new() ����Ϊprivate���ֲ����Ӷ���ֹ new FredPtr()���˴���һ��©�������ĳ�˴�����һ���ֲ���FredPtr�������ȡ��FredPtr�ĵ�ַ�����ݸ�FredPtr\*�����FredPtr\*�����ڱ�FredPtr�������Ϳ��ܳ�Ϊ����ָ�롪��������ָ�롣��©������ͨ����ֹȡ�� FredPtr�ĵ�ַ���ֲ�������FredPtr::operator&()Ϊprivate������Ӧ�Ļ���ʧһЩ���ܡ�����ʹ���������ˣ�����ֻҪ��������FredPtr p; ... FredPtr& q = p;�����߽�FredPtr&��������ʲô������Ȼ���Դ��� FredPtr\*��һ��Σ�յ�FredPtr&��

���ң���ʹ�����ֲ���_����_��Щ©����C++ ��������ĳ�Ϊָ��ת����pointer cast�����﷨��ʹ��һ����ָ��ת����һ������ĳ���Ա���Դ���һ��������Դ���һ��������©����

�˴��Ľ�ѵ�ǣ�(a) �������ô������ǧ�ǣ�Ҳ�����ܷ�ֹ�����(b) ����Լ򵥵ķ�ֹ����

����ҽ��飺���׽����õĻ�������ֹ���󣬲�Ҫ������ͼȥ��ֹ�������ʹ���龫�������ˣ�Ҳ����ɹ����ò���ʧ��

�������ʹ��C++���Ա�������ֹ��������������취���С���Ϊ�������þ�ʽ���Ĵ�����ӡ����ڼ������ͨ������һЩ������﷨�ͣ���ָ��ת����ʹ�ú����ϣ�union���������ʹ�ù�����ָ��������ġ��Ƿ�֮�ء���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.25\] ��C++����ʹ�������ռ��� ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created thanks to [Hans Boehm](mailto:hans_boehm@hp.com) (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.26]).\]_

�ܡ�

�����ǰ�������ġ�����ָ�롱�����������ռ�������

-   �����
-   ͨ������Ч �����䵱ƽ���Ķ���ߴ��Сʱ����̻߳����У�
-   �ܴ��������еġ�ѭ����cycles������������ݽṹ���γ�ѭ�������ü�������ͨ�����С�й©����
-   ��ʱ��й©�����������������ռ�����Ҫ�ı����ԣ���ʱ�����һ������ȥ����ָ������λģʽ�ķ��䵥Ԫ��������������䵥Ԫ�ϴ�ʱ�����ܵ��¸÷��䵥Ԫ��й©����
-   ���ִ�Ŀ⹤���ø��ã���������ָ����Ҫ��ʽʹ�ã����ܺ��Ѽ��ɵ��ִ�Ŀ��У�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.26\] C++�����������ռ�����ʲô�� ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created thanks to [Hans Boehm](mailto:hans_boehm@hp.com) (on 7/00) and added a URL for Bartlett's collector thanks to [Abhishek](mailto:abhishek@mail.premiertechnologygroup.com) (on 4/01). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.27]).\]_

ͨ�������������ַ�ζ��C++�����ռ�����

1.  _���ص������ռ�����_��Щ�����ռ�������ջ��C++����ķֲ�֪֮���ٻ�һ����֪��ֻ��Ѱ�ҿ���ȥ��ָ���λģʽ��ʵ������ C �Լ� C++ ���빲ͬ������������ƽ���Ķ���ߴ��Сʱ��������һЩ���ӣ�����ĸ˳��
    
    -   [Boehm-Demers-Weiser collector](http://www.hpl.hp.com/personal/Hans_Boehm/gc)
    -   [Geodesic Systems collector](http://www.geodesic.com/solutions/greatcircle.html)
2.  _��ϵ������ռ�����_��Щ�����ռ���ͨ���ʵ���ɨ��ջ������Ҫ����Ա�ṩ�Ѷ���Ĳ�����Ϣ������Ҫ����Ա���������๤�����������������ܡ�������һЩ���ӣ�����ĸ˳��
    
    -   [Bartlett's mostly copying collector](ftp://gatekeeper.dec.com/pub/DEC/WRL/research-reports/WRL-TR-88.2.pdf)
    -   Attardi and Flagella's CMM (���˭�� URL���뷢���ң���

����C++�����ռ���ͨ���Ǳ��صģ����һ��λģʽ������ȥ�������п�����ָ������һ��δʹ�ÿ��ָ�룬�ͻ���й©����ָ��ĳ���ָ��ʵ�ʳ����˿飨���ǷǷ��ģ���һЩ����Ա��Խ�������ƣ������Լ������٣���һ��ָ�뱻���������Ż������أ�Ҳ��ʹ��������ʵ���У���Щ����ͨ�������أ�Ȼ�������ռ�����һЩ���ڶ��󲼾ֵ���ʾ�Ļ������ܻ������Щ�����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

### \[16.27\] ���������ܵõ������C++�����ռ���Ϣ�� ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/exceptions.html#[17.1]).\]_

������Ϣ�����[�����ռ� FAQ](http://www.iecc.com/gclist/GC-faq.html)��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/input-output.html) | [Next section](https://www.sunistudio.com/cppfaq/exceptions.html) \]

* * *

 [![E-Mail](https://www.sunistudio.com/cppfaq/mbox.gif) E-mail the author](mailto:cline@parashift.com)  
\[ [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html) | [Table of contents](https://www.sunistudio.com/cppfaq/index.html#table-of-contents) | [Subject index](https://www.sunistudio.com/cppfaq/subject-index.html) | [About the author](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.1]) | [©](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]) | [Download your own copy](https://www.sunistudio.com/cppfaq/on-line-availability.html#[2.2]) \]  
Revised Apr 8, 2001
