## \[18\] const��ȷ��  
(Part of [_C++ FAQ Lite_](http://www.sunistudio.com/cppfaq/index.html), [Copyright © 1991-2001](http://www.sunistudio.com/cppfaq/copy-permissions.html#%5B1.2%5D), [Marshall Cline](http://www.parashift.com/), [cline@parashift.com](mailto:cline@parashift.com))

�������İ淭�룺[Alex](mailto:alexleewalk@163.com)

* * *

### FAQs in section \[18\]:

-   [\[18.1\] ʲô�ǡ�const��ȷ�ԡ���](#[18.1])
-   [\[18.2\] ��const��ȷ�ԡ����������ͨ�����Ͱ�ȫ�к���ϵ��](#[18.2])
-   [\[18.3\] ��Ӧ�á����硱���ǡ��Ƴ١�ȷ��const��ȷ�ԣ�](#[18.3])
-   [\[18.4\] ��const Fred\* p����ʲô��˼��](#[18.4])
-   [\[18.5\] ��const Fred\* p������Fred\* const p���͡�const Fred\* const p����ʲô��ͬ��](#[18.5])
-   [\[18.6\] ��const Fred& x����ʲô��˼��](#[18.6])
-   [\[18.7\] ��Fred& const x����������](#[18.7])
-   [\[18.8\] ��Fred const& x����ʲô��˼��](#[18.8])
-   [\[18.9\] ��Fred const\* x����ʲô��˼��](#[18.9])
-   [\[18.10\] ʲô�ǡ�const��Ա��������](#[18.10])
-   [\[18.11\] �������õĳ�Ա������const��Ա����֮����ʲô��ϵ��](#[18.11])
-   [\[18.12\] ��const���ء�����ʲô�õģ�](#[18.12])
-   [\[18.13\] ���������һ��const��Ա���������ݳ�Ա�������ɼ������޸ģ�Ӧ����ô�죿](#[18.13])
-   [\[18.14\] const\_cast�ᵼ���޷��Ż�ô��](#[18.14])
-   [\[18.15\] ������const int\*ָ��һ��int��Ϊʲô���������������޸����int��](#[18.15])
-   [\[18.16\] ��const Fred\* p������˼��\*p����ı�ô��](#[18.16])
-   [\[18.17\] ����Foo\*\*ת����const Foo\*\*ʱΪʲô�������](#[18.17])

* * *

### \[18.1\] ʲô�ǡ�const��ȷ�ԡ���

���Ǹ��ö�������˼����const�ؼ�������ֹconst�����޸ġ�

���磬�����Ҫ��дһ������f()��������std::string���͵Ĳ�����������Ҫ�Ե����߱�֤�����޸ĵ����ߴ�������std::string���������԰����·�������f()

-   void f1(const std::string& s);     //��const����
-   void f2(const std::string\* sptr);  //��constָ��
-   void f3(std::string s);            //��ֵ

��_��const����_��_��constָ��_������£��κ���ͼ��f()�ڲ��޸�std::string����Ϊ�����ڱ���ʱ�����������Ϊ��������ȫ���ڱ���ʱ���ģ�����ʹ��constû������ʱ�Ŀռ���ٶ���ʧ����_��ֵ_ʱ��f3()���������ú�������˵�����std::string��һ�ݿ�����Ҳ����˵��f3()�����޸����������������ʱ��������ᱻ���١�������f3()�޷��޸ĵ����ߵ�std::string����

�ٸ������������Ҫ��дһ������g()��Ҳ�ǽ���std::string������Ҫ��֪������g()�п��ܻ��޸ĵ����ߵ�std::string������ʱ�����԰����·�������g():

-   void g1(std::string& s);       //����const����
-   void g2(std::string\* sptr);    //����constָ��

����Щ������ʡȥconst�����Ǹ��߱���������������ǿ�ƣ������޸ĵ����ߵ�std::string������ˣ���Щg()�������԰����ǵ�std::string���ݸ��κ�f()��������ֻ��f3()��ͨ����ֵ���ղ������ܹ�����������ݸ�g1()��g2()�����f1()��f2()��Ҫ����g()�����������g()����һ��std::string�ı��ؿ�����f1()��f2()�Ĳ�������ֱ�Ӵ��ݸ�g()���������磺

 void g1(std::string& s);

   void f1(const std::string& s)  
 {  
   g1(s);

_// ���������Ϊs��const��_

     std::string localCopy = s;  
   g1(localCopy);

_// ��ȷ����ΪlocalCopy����const��_

 }

��Ȼ��������������У��κ�g1()�������޸Ķ��ᷴӳ��f1()�����ڵ�localCopy�����ر��ǣ�ͨ��const���ô��ݸ�f1()�Ĳ������ᱻ�޸ġ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.2\] ��const��ȷ�ԡ����������ͨ�����Ͱ�ȫ�к���ϵ��

����������Ϊconst��������һ����ʽ�����Ͱ�ȫ����ͺ���const std::string����std::string��ͬ����һ������Ϊconst����ȱ��һЩ��const���������е�һЩ����Բ��������磬�����������£�const std::stringû�и�ֵ����������

����㷢����ͨ�����Ͱ�ȫ�����ڹ�����ȷ��ϵͳ����ȷ�а����������Ƕ��ڴ���ϵͳ��˵������ᷢ��const��ȷ��Ҳ�а�����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.3\] ��Ӧ�á����硱���ǡ��Ƴ١�ȷ��const��ȷ�ԣ�

Ӧ���������ʼ��

�º�֤const��ȷ�Իᵼ��һ�ֹ�ѩ��ЧӦ��ÿ������һ���ط�������const����Ҫ���ĸ�����ĵط�Ҳ����const��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.4\] ��const Fred\* p����ʲô��˼��

��˼��p��һ��ָ��Fred���ָ�룬������ͨ��p���޸�Fred���󣨵�ȻpҲ������NULLָ�룩��

���磬����Fred����һ������inspect()��[const��Ա����](#[18.10])����ôдp->inspect()�ǿ��Եġ������Fred����һ��[��const��Ա����](#[18.10])mutate()����ôдp->mutate()���Ǹ����󣨱������Ჶ�����ִ��󣻲���������ʱ���ԣ����const���ή�������ٶȣ���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.5\] ��const Fred\* p������Fred\* const p���͡�const Fred\* const p����ʲô��ͬ��

Ӧ�ô��������ָ��������

-   const Fred\* p����pָ��һ��const��Fred���󡪡�Fred������[ͨ��p](#[18.16])�޸ġ�
-   Fred\* const p����p��һ��ָ��Fred�����constָ�롪������[ͨ��p](#[18.16])�޸�Fred���󣬵������޸�p������
-   cosnt Fred\* const p������p��һ��ָ��const Fred�����constָ�롱���������޸�p��Ҳ����[ͨ��p](#[18.16])�޸�Fred����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.6\] ��const Fred& x����ʲô��˼��

��˼��x��Fred�����һ��������������ͨ��x���޸�Fred����

���磬����Fred����һ������inspect()��[const��Ա����](#[18.10])����ôдx.inspect()�ǿ��Եġ������Fred����һ��[��const��Ա����](#[18.10])mutate()����ôдx.mutate()���Ǹ����󣨱������Ჶ�����ִ��󣻲���������ʱ��飻���const���ή�������ٶȣ���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.7\] ��Fred& const x����������

û���塣

Ϊ�����������������Ҫ[���������](#[18.5])�����������ˡ�Fred& const x������˼�ǡ�x��һ��ָ��Fred��const���á��������Ƕ���ģ���Ϊ���ñ�������const�ġ�[�㲻�����°�һ�����á�](http://www.sunistudio.com/cppfaq/references.html#[8.5])������û��const�������С�

���仰˵����Fred& cosnt x���ڹ������롰Fred& x����һ���ġ���Ϊ��&�������constûʲô�ã����Ϊ�˱����Ի�Ͳ�Ӧ�ö��һ�١����˿��ܻ���Ϊ�������const��ָ���Fred�������const���ˣ��ͺ���const Fred& x��һ����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.8\] ��Fred const& x����ʲô��˼��

��Fred cosnt& x���ڹ�������[const Fred& x](#[18.6])��ͬ��Ȼ����������������_Ӧ��_����һ�֡�

�𰸣���_û���κ���_�ܹ�Ϊ�����ڵĻ��������������������˽���Ļ�����û�з�֮�ĺ�����׼�Ĺ���û�ж����л���������ȷ���Ĵ𰸡����Բ�Ҫ��_�κ���_���ִٵ�ѡ�񡣡�˼����Think��������һ������ĸ�ĵ��ʡ�

���磬һЩ�������ص���һ���ԣ������Ѿ��д�������ʹ�á�const Fred&���ˡ�����������˵�������Ƿ����ŵ㣬��Fred const&�������Ǹ���ѡ�񡣻��кܶ���������ҵ������һЩ�����ڡ�Fred const&���������������ڡ�const Fred&����

�����ʺ��������_��ͨά������Ա_��д��������ר�ң�����ɵ�ϣ�����ά���������ͨ����Ա�����������������ǲ���Ӷ���ˣ������Ҫȷ��_����_�ܹ�������Ĵ��롣����ʵ���������ҵ�����������Ǹ�������ʲô�˵ļ��衣

ʹ�á�Fred const&����Ҫ�˷�һЩ���ԡ����ڴ����C++�鼮��ʹ��const Fred&�����������ԱѧC++ʱ�Ӵ��ľ��������﷨��������Ȼ��ô�á��Ⲣ����˵const Fred&һ������Ļ����á����ڸ��ģ����ַ���ڼ䣬��/������������ʱ����ȷ���ܻ�����һЩ���ҡ�һЩ������Ϊ��Fred const&�����ĺô�����������������ô��Ϊ��

��һ�����棺���������Fred const&��ȷ����ȡ��ʩʹ���ǲ�����д��[û����ġ�Fred& const x��](#[18.7])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.9\] ��Fred const\* x����ʲô��˼��

��Fred cosnt\* x���ڹ�������[const Fred\* x](#[18.4])��ͬ��Ȼ����������������_Ӧ��_����һ�֡�

�𰸣���_û���κ���_�ܹ�Ϊ�����ڵĻ��������������������˽���Ļ�����û�з�֮�ĺ�����׼�Ĺ���û�ж����л���������ȷ���Ĵ𰸡����Բ�Ҫ��_�κ���_���ִٵ�ѡ�񡣡�˼����Think��������һ������ĸ�ĵ��ʡ�

���磬һЩ�������ص���һ���ԣ������Ѿ��д�������ʹ�á�const Fred\*���ˡ�����������˵�������Ƿ����ŵ㣬��Fred const\*�������Ǹ���ѡ�񡣻��кܶ���������ҵ������һЩ�����ڡ�Fred const\*���������������ڡ�const Fred\*����

�����ʺ��������_��ͨά������Ա_��д��������ר�ң�����ɵ�ϣ�����ά���������ͨ����Ա�����������������ǲ���Ӷ���ˣ������Ҫȷ��_����_�ܹ�������Ĵ��롣����ʵ���������ҵ�����������Ǹ�������ʲô�˵ļ��衣

ʹ�á�Fred const\*����Ҫ�˷�һЩ���ԡ����ڴ����C++�鼮��ʹ��const Fred\*�����������ԱѧC++ʱ�Ӵ��ľ��������﷨��������Ȼ��ô�á��Ⲣ����˵const Fred\*һ������Ļ����á����ڸ��ģ����ַ���ڼ䣬��/������������ʱ����ȷ���ܻ�����һЩ���ҡ�һЩ������Ϊ��Fred const\*�����ĺô�����������������ô��Ϊ��

��һ�����棺���������Fred const\*��ȷ����ȡ��ʩʹ���ǲ�����д��[���岻ͬ���﷨���Ƶġ�Fred\* const x��](#[18.5])����������Ȼ��һ�ۿ���ȥ�ǳ����ƣ���[������ȫ��ͬ](#[18.5])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.10\] ʲô�ǡ�const��Ա��������

��ָ���鿴�������ı䣩����ĳ�Ա������

const��Ա�������ڽ������������б��ĺ����һ��const�ؼ��֡���const��׺�ĳ�Ա������������const��Ա�����������ǡ��鿴��������inspector����û��const��׺�ĳ�Ա��������������const�������򡰱����������mutator����

 class Fred {  
 public:  
   void inspect() const;   

_// �ó�Ա��֤���޸�\*this_

   void mutate();          

_// �ó�Ա���ܻ��޸�\*this_

 };

   void userCode(Fred& changeable, const Fred& unchangeable)  
 {  
   changeable.inspect();

_// ��ȷ��û���޸�һ�����޸Ķ���_

   changeable.mutate();    

_// ��ȷ���޸�һ�����޸Ķ���_

     unchangeable.inspect();

_// ��ȷ��û���޸�һ�������޸Ķ���_

   unchangeable.mutate();  

_// ������ͼ�޸�һ�������޸Ķ���_

 }

unchangeable.mutate()��������ڱ����ڱ����֡�const����������ʱ��ʱ��Ч����ʧ��

��inspect()��Ա���������const��׺��ʾ����ı����ģ����÷��ɼ��ģ�_����_״̬���Ⲣ�Ǳ�֤���ı����ġ��ײ������λ����C++�������������������Ϊ����λ�������䣩�������ܽ���������⣬����������һ���޷�����������ܴ��ڻ��޸Ķ���״̬�ķ�const������������һ�������ֱ�������ģ���Ҫ����ʶ�ǣ���һ����ָ��const�����ָ�롱�����ܱ�֤���󲻸ı䣬��ֻ�Ǳ�֤���󲻻�_ͨ����ָ��_���ı䡣

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.11\] �������õĳ�Ա������const��Ա����֮����ʲô��ϵ��

�����Ҫ��һ��[�鿴����](#[18.10])�з���this��������ã���ôӦ�÷���ָ��cosnst��������ã���const X&��

 class Person {  
 public:  
   const std::string& name\_good() const;  

_← ��ȷ�������߲����޸�name_

   std::string& name\_evil() const;        

_← ���󣺵������ܹ��޸�name_

   

_..._

 };

   void myCode(const Person& p)

_← ���ﱣ֤�����޸�Person ����..._

 {  
   p.name\_evil() = "Igor";     

_← ...�������޸��ˣ���_

 }

����Ϣ�ǵ��㷸���ִ���ʱ��������_ͨ��_�ܹ����֡������������С�ķ�����this����ķ�const���ã����������Person::name\_evil()���������ڱ��������Ա����ʱ��_ͨ��_�ܹ����ֲ�����һ���������

����Ϣ�Ǳ����������ܷ����������ִ�����һЩ����±������޷�����һ��������Ϣ��

�������Ҫ˼��������ס��FAQ������ԭ�������ͨ�����÷��صĶ�����_�߼���_��this�����һ���֣����������Ƿ��������Ϸ�����this �����ڣ���ôconst����Ӧ�÷���const���û�ֱ�Ӱ�ֵ���ء���this����ġ��߼������������ġ�����״̬����ء������[ǰһ��FAQ](#[18.10])����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.12\] ��const���ء�����ʲô�õģ�

��һ��[�鿴����](#[18.10])��һ��[�������](#[18.10])������ͬ���Ҳ�������������Ҳ��ͬʱ�������ˡ��������ߵĲ�֮ͬ��������һ����const��һ��û��const��

const���ص�һ������Ӧ�����±��������ͨ��Ӧ�þ���ʹ��[��׼ģ������](http://www.sunistudio.com/cppfaq/class-libraries.html#[37.1])������std::vector������ʱ����Ҫ���Լ�������֧���±��������һ�����鷨���ǣ�**�±������ͨ���ɶԳ���**��

 class Fred { ... };

   class MyFredList {  
 public:  
   const Fred& operator\[\] (unsigned index) const;

_←�±������ͨ���ɶԳ���_

   Fred&       operator\[\] (unsigned index);        

_←�±������ͨ���ɶԳ���_

   

_..._

 };

����һ����const��MyFredList����ʹ���±������ʱ������������÷�const���±����������Ϊ���ص���һ����ͨFred&�������ܹ��鿴���޸Ķ�Ӧ��Fred�������磬����Fred����һ���鿴����Fred::inspect() const��һ���������Fred::mutate()��

 void f(MyFredList& a)  

_← MyFredList�Ƿ�const��_

 {   

_// ���Ե��ò��޸�a\[3\]��Fred����ķ�����_

   Fred x = a\[3\];  
   a\[3\].inspect();

_// ���Ե����޸�a\[3\]��Fred����ķ���:_

   Fred y;  
   a\[3\] = y;  
   a\[3\].mutate();  
 }

���ǣ�����һ��const��MyFredList����ʹ���±������ʱ�������������const���±����������Ϊ�᷵��const Fred&�����Կ��Բ鿴��Ӧ��Fred����������޸�����

 void f(const MyFredList& a)  

_← MyFredList��const��_

 {   

_// ���Ե��ò��޸�a\[3\]��Fred����ķ���:_

   Fred x = a\[3\];  
   a\[3\].inspect();

_// ���󣨺����ˣ�������ͼ�ı�a\[3\]����Fred����:_

   Fred y;  
   a\[3\] = y;       

_← ���˵��Ǳ������ڱ���ʱ�������������_

   a\[3\].mutate();  

_← ���˵��Ǳ������ڱ���ʱ�������������_

 }

������FAQ����ʾ������±�������ͺ��������������const���أ�[\[13.10\]](http://www.sunistudio.com/cppfaq/operator-overloading.html#[13.10]), [\[16.17\]](http://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.17]), [\[16.18\]](http://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.18]), [\[16.19\]](http://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.19])��[\[35.2\]](http://www.sunistudio.com/cppfaq/templates.html#[35.2])

��Ȼ�����±����������������Ҳ���Խ���const���ء�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.13\] ���������һ��const��Ա���������ݳ�Ա�������ɼ������޸ģ�Ӧ����ô�죿

��mutable������ʵ��û�취�ˣ������һ��const\_cast��

�����鿴������Ҫ�����ݳ�Ա���ʵ����޸ģ����磬һ��Set���������Ҫ������һ�β鿴�����ݣ��Ա���һ�β鿴ʱ�ܹ�������ܣ�������ʵ�������˼�ǣ��������޸Ĳ���Ӷ���Ľӿ��Ϸ�ӳ���ⲿ������ó�Ա������Ӧ����һ����������������ǲ鿴�����ˣ���

��ʱ����Ҫ�޸ĵ����ݳ�ԱӦ���Ϊmutable����mutable�ؼ��ַ������ݳ�Ա������ǰ������const��λ��һ���������֪ͨ������˵������ݳ�Ա������const��Ա�����б��޸ġ������������֧��mutable�ؼ��֣���ô����ͨ��const\_castȥ����this��const�����Ǽ��Ŷ������**ע������**����������Set::lookup() const�У�������ôд��

 Set\* self = const\_cast<Set\*>(this);   

_// ����ô��֮ǰ�����Ŷ������**ע������**_

Ȼ��self��this����һ������self == thisΪ�棩����self������Set\*������const Set\*����������������const Set\* const���������ұߵ�const������������޹أ�����˿���ʹ��self���޸�this��ָ��Ķ���

**ע�⣺**const\_cast���ܻᵼ��һ�ַǳ������Ĵ��������������������ټ�������ͬʱ����ʱ���֣����ݳ�Ա��Ӧ����mutable������������˵�ģ�����������֧��mutable�����Ҷ���ԭ���Ͷ���Ϊconst������ͨ��һ��ָ��const�����ָ�������ʵ���ͨconst���󣩡���Ȼ������Ϸǳ�������������Զ���ᷢ�����������ķ����ˣ���ô���ִ�����ܾͲ����������У���׼˵������Ϊ��δ����ģ���

�����Ҫ��const\_cast����ôӦ����mutable��������仰˵�������Ҫ�޸�һ������ĳ�Ա��������ͨ��ָ��const�����ָ�����������������ô�ȫ����򵥵��������Ǹ��ó�Ա������ǰ����mutable�������ȷ��ʵ�ʶ�����const�ģ������ܹ�ȷ�������������������ģ�Set s;������ôҲ������const\_cast�����������������const�ģ������������Ϊ��const Set s;������ô��Ӧ����mutable������const\_cast��

�벻Ҫ������˵Y��������X�汾��Z�����������޸�const����ķ�mutable��Ա���Ҳ�������������ݱ�׼���Ǵ���ģ������һ����������������ͬһ�������Ĳ�ͬ�汾�������棩����Ĵ���Ϳ��ܻ�ʧ�ܡ���Ҫ��ô������mutable�ɡ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.14\] const\_cast�ᵼ���޷��Ż�ô��

���������ǵģ���ʵ���в��ᡣ

��ʹ���Ա�����ֹ��const\_cast��Ҫ���ڵ���const��Ա����ʱ�����д�Ĵ�����Ψһ�취�ǽ���������⣨��Ҫ֤��û������ָ��ö���ķ�constָ�룩����ֻ���ڼ���������²��ܰ쵽�����ڵ���const��Ա����ʱ������������ڹ������͵���const��Ա����֮����õķ�const��Ա�����Ǿ�̬�󶨵ģ�����������Щ���ð������캯�����������ģ�ͬʱ���캯�����õ��κγ�Ա����ҲҪ�������ģ���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.15\] ������const int\*ָ��һ��int��Ϊʲô���������������޸����int��

��Ϊ��const int\* p����˼�ǡ�p��֤�����޸�\*p������_����˵_��\*p��֤���䡱��

��const int\*ָ��һ��int������ʹ���int��Ϊconst��int����ͨ��const int\*���޸ģ������������һ��int\*��ע��û��const��ָ���int������ǡ�������������ô���int\*ָ����������޸�int�����磺

 void f(const int\* p1, int\* p2)  
 {  
   int i = \*p1;         

_// ���\*p1�ģ�ԭʼ��ֵ\*p1_

   \*p2 = 7;             

_// ���p1 == p2����ͻ��޸�\*p1��_

   int j = \*p1;         

_// ��ȡ\*p1�������Ǹ��º󣩵�ֵ��_

   if (i != j) {  
     std::cout << "\*p1 changed, but it didn't change via pointer p1!\\n";  
     assert(p1 == p2);  

_// ����\*p1���ܻ�仯��Ψһ�취��_

   }  
 }

   int main()  
 {  
   int x = 5;  
   f(&x, &x);

_// ����ȫ�Ϸ��������Ǻ������ģ���_

   

_..._

 }

ע��main()��f(const int\*, int\*)�������ڲ�ͬ�ı��뵥Ԫ�У����Ҳ�����ͬһ�����ġ���ˣ����������޷��ڱ���ʱ���ֱ���������޷��������н�ֹ�������顣ʵ���ϣ���������������������һ��������Ϊһ����˵�������ܶ�ָ��ָ��ͬһ����������һ�����ܡ���ָ�뱣֤˵��ȥ�޸���ָ����ʱ����ֻ�Ǹ�_ָ��_�����ı�֤����_����_���������ı�֤��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.16\] ��const Fred\* p������˼��\*p����ı�ô��

���ǣ��������[intָ��ı�������](#[18.15])��أ�

��const Fred\* p����˼�ǲ���ͨ��ָ��p���޸�Fred�����п��ܲ�����const������һ����constָ��Fred\*��������ͨ������;��������object�����磬���������ָ�롰const Fred\* p���͡�Fred\* q����ָ��ͬһ��Fred���󣨱���������ôָ��q���������޸�Fred���󣬵�ָ��p���ܡ�

 class Fred {  
 public:  
   void inspect() const;   

_// [const��Ա����](#[18.10])_

   void mutate();          

_// [��const��Ա����](https://www.sunistudio.com/cppfaq/const-correctness.html#[18.10])_

 };

   int main()  
 {  
   Fred f;  
   const Fred\* p = &f;  
         Fred\* q = &f;

     p->inspect();

_// ���ԣ����ı�\*p_

   p->mutate();     

_// ���󣺲���ͨ��p���޸�\*p_

     q->inspect();

_// ���ԣ�����ʹ��q���鿴����_

   q->mutate();     

_// ���ԣ�����ʹ��q���޸Ķ���_

     f.inspect();

_// ���ԣ�����ʹ��f���鿴����_

   f.mutate();      

_// ���ԣ�����ʹ��f���޸Ķ���_

_..._

 }

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

### \[18.17\] ����Foo\*\*ת����const Foo\*\*ʱΪʲô�������

��Ϊ��Foo\*\*ת����const Foo\*\*�ǷǷ���Σ�յġ�

C++����Foo\*��const Foo\*��ת�������ǰ�ȫ�ģ����������Ҫ��Foo\*\*��ʽת����const Foo\*\*��ᱨ����

��ô����ԭ��������ʾ�������ȣ������и�����ͨ�Ľ���취��ֻҪ��const Foo\*\*�ĳ�const Foo\* const\*�Ϳ����ˡ�

 class Foo { 

_/\* ... \*/_

 };

   void f(const Foo\*\* p);  
 void g(const Foo\* const\* p);

   int main()  
 {  
   Foo\*\* p =

_/\*...\*/_

;   

_..._

   f(p);  

_// ���󣺽�Foo\*\*ת����const Foo\*\*�ǷǷ���а���_

   g(p);  

_// ���ԣ���Foo\*\*ת����const Foo\* const\*�ǺϷ��Һ�����_

   

_..._

 }

֮����Foo\*\*��const Foo\*\*��ת����Σ�յģ�����Ϊ���ʹ��û�о���ת�����ڲ�������޸���const Foo����

 class Foo {  
 public:  
   void modify();  

_// �޸�this����_

 };

   int main()  
 {  
   const Foo x;  
   Foo\* p;  
   const Foo\*\* q = &p;

_// ��ʱqָ��p�����ҿ������Ǹ�����_

   \*q = &x;             

_// ��ʱpָ��x_

   p->modify();         

_// �����޸���const Foo����_

   

_..._

 }

��ס��_�벻Ҫ_��ָ��ת���ƹ��������ô�������ˣ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](http://www.sunistudio.com/cppfaq/references.html) | [Next section](http://www.sunistudio.com/cppfaq/ctors.html) \]

* * *

 [![E-Mail](https://www.sunistudio.com/cppfaq/mbox.gif) E-mail the author](mailto:cline@parashift.com)  
\[ [_C++ FAQ Lite_](http://www.sunistudio.com/cppfaq/index.html) | [Table of contents](http://www.sunistudio.com/cppfaq/index.html#table-of-contents) | [Subject index](http://www.sunistudio.com/cppfaq/subject-index.html) | [About the author](http://www.sunistudio.com/cppfaq/copy-permissions.html#%5B1.1%5D) | [©](http://www.sunistudio.com/cppfaq/copy-permissions.html#%5B1.2%5D) | [Download your own copy](http://www.sunistudio.com/cppfaq/on-line-availability.html#%5B2.2%5D) \]  
Revised Jan 2, 2009
