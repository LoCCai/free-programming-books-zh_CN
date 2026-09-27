## \[12\] ��ֵ���  
(Part of [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html), [Copyright © 1991-2001](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]), [Marshall Cline](http://www.parashift.com/), [cline@parashift.com](mailto:cline@parashift.com))

�������İ淭�룺[��F](http://nicrosoft.net)��[nicrosoft@sunistudio.com](mailto:nicrosoft@sunistudio.com)

* * *

### FAQs in section \[12\]:

-   [\[12.1\] ʲô�ǡ��Ը�ֵ����](https://www.sunistudio.com/cppfaq/assignment-operators.html#[12.1])
-   [\[12.2\] ΪʲôӦ�õ��ġ��Ը�ֵ����](https://www.sunistudio.com/cppfaq/assignment-operators.html#[12.2])
-   [\[12.3\] �ã��ã��һᴦ���Ը�ֵ�ġ���������أ�](https://www.sunistudio.com/cppfaq/assignment-operators.html#[12.3]) ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

* * *

### \[12.1\] ʲô�ǡ��Ը�ֵ����

�Ը�ֵ���ǽ�����ֵ�����������磬

 #include "Fred.hpp"    

_// ���� Fred ��_ 

   void userCode(Fred& x)  
 {  
   x = x;

_// �Ը�ֵ_

 }

�����ԣ����ϴ����������ʽ���Ը�ֵ������Ȼ���ָ������ÿ���ָ����ͬ���󣨱���������ô�������Ը�ֵ���Լ�ȴ��֪�������Ҳ�ǿ��ܵģ�

��

 #include "Fred.hpp"    

_//_ _����_ _Fred ��_

   void userCode(Fred& x, Fred& y)  
 {  
   x = y;

_// ���&x == &y�Ϳ������Ը�ֵ_

 }

   int main()  
 {  
   Fred z;  
   userCode(z, z);  
 }

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/dtors.html) | [Next section](https://www.sunistudio.com/cppfaq/operator-overloading.html) \]

* * *

### \[12.2\] ΪʲôӦ�õ��ġ��Ը�ֵ����

�����ע��[�Ը�ֵ](#[12.1])������ʹ����û����ܷǳ�΢��Ĳ���һ����˵�ǳ����ص�bug�����磬���µ������Ը�ֵ������½��������ѣ�

 class Wilma { };

   class Fred {  
 public:  
   Fred()                : p\_(new Wilma())      { }  
   Fred(const Fred& f)   : p\_(new Wilma(\*f.p\_)) { }  
  ~Fred()                { delete p\_; }  
   Fred& operator= (const Fred& f)  
     {

_// ��Ĵ��룺û�д����Ը�ֵ��_

       delete p\_;                

_// Line #1_

       p\_ = new Wilma(\*f.p\_);    

_// Line #2_

       return \*this;  
     }  
 private:  
   Wilma\* p\_;  
 };

������˽� Fred ���󸳸��䱾��������\*this�� f ��ͬһ������line #1ͬʱɾ����this->p\_��f.p\_���� line #2ʹ�����Ѿ������ڵĶ���\*f.p\_�������ܿ��ܵ������ص����ѡ�

��Ϊ Fred ������ߣ���������������[ȷ����Fred�������Ը�ֵ���޺���](#[12.3])����Ҫ�����û������ڶ�������������������������Ը�ֵ������������_���_��ʧ��

> ���⣺������Fred::operator= (const Fred&)���еڶ������⣺�����ִ��new Wilma(\*f.p\_)ʱ��[�׳����쳣](https://www.sunistudio.com/cppfaq/exceptions.html)�����磬[�ڴ治�����쳣](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.5])����[Wilma�Ŀ������캯���е��쳣](https://www.sunistudio.com/cppfaq/exceptions.html#[17.2])���� this->p\_����Ϊ����ָ�롪������ָ����ڴ治���ǿ��õġ������ͨ����ɾ���Ͷ���ǰ���������������

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/dtors.html) | [Next section](https://www.sunistudio.com/cppfaq/operator-overloading.html) \]

* * *

### \[12.3\] �ã��ã��һᴦ���Ը�ֵ�ġ���������أ� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently reworded the last paragraph (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/operator-overloading.html#[13.3]).\]_

[���㴴�����ÿʱÿ�̣���Ӧ�õ����Ը�ֵ](#[12.2])���Ⲣ����ζ����ҪΪ�����е��඼���Ӷ���Ĵ��룺ֻҪ�������ŵش����Ը�ֵ���������Ƿ�������Ӷ���Ĵ��롣

�������ҪΪ��ֵ������Ӷ�����룬������һ���򵥶���Ч�ļ��ɣ�

 Fred& Fred::operator= (const Fred& f)  
 {  
   if (this == &f) return \*this;   

_// ���ŵش���[�Ը�ֵ](#[12.1])_

_// �˴�д������ֵ�Ĵ���..._

     return \*this;  
 }

��ʽ�Ĳ��Բ������Ǳ�Ҫ�ġ����磬�������[ǰһ�� FAQ�еĸ�ֵ���](#[12.2])ʹ֮[����new�׳����쳣](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.5])�ͣ���Wilma���[�������캯���׳����쳣](https://www.sunistudio.com/cppfaq/exceptions.html#[17.2])�����ܻ�д�����µĴ��롣ע����δ����У����˸��˵ģ��Զ������Ը�ֵ�ĸ���Ч����

��

 Fred& Fred::operator= (const Fred& f)  
 {   

_// ��δ������ŵأ��������ģ�����[�Ը�ֵ](#[12.1])_

   Wilma\* tmp = new Wilma(\*f.p\_);   

_// ���[�쳣](https://www.sunistudio.com/cppfaq/exceptions.html)�ڴ˴����׳�Ҳû������_

   delete p\_;  
   p\_ = tmp;  
   return \*this;  
 }

����������ӵ�����£��Ը�ֵ���޺��ĵ��ǵ�Ч����һЩ����Ա��ͨ����������Ĳ���Ҫ�Ĳ��ԣ��硰if (this == &f) return \*this;���������Ը�ֵʱ��Ч�ʡ�ͨ����˵��ʹ�Ը�ֵ�������Ч��ʹ�÷��Ը�ֵ�������Ч�������Ǵ���ġ����磬ΪFred��ĸ�ֵ����������ϵ�if���Ի�ʹ�÷��Ը�ֵ�������Ч��һ�������(���Ҳ���Ҫ��)������֧��������Ը�ֵʵ����һǧ�βŷ���һ�Σ���ô if ���˷�99.9%��ʱ�����ڡ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/dtors.html) | [Next section](https://www.sunistudio.com/cppfaq/operator-overloading.html) \]

* * *

 [![E-Mail](https://www.sunistudio.com/cppfaq/mbox.gif) E-mail the author](mailto:cline@parashift.com)  
\[ [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html) | [Table of contents](https://www.sunistudio.com/cppfaq/index.html#table-of-contents) | [Subject index](https://www.sunistudio.com/cppfaq/subject-index.html) | [About the author](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.1]) | [©](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]) | [Download your own copy](https://www.sunistudio.com/cppfaq/on-line-availability.html#[2.2]) \]  
Revised Apr 8, 2001
