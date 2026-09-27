## \[15\] ͨ�� <iostream> �� <cstdio>���룯���  
(Part of [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html), [Copyright © 1991-2001](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]), [Marshall Cline](http://www.parashift.com/), [cline@parashift.com](mailto:cline@parashift.com))

�������İ淭�룺[��F](http://nicrosoft.net)��[nicrosoft@sunistudio.com](mailto:nicrosoft@sunistudio.com)

* * *

### FAQs in section \[15\]:

* * *

### \[15.1\] ΪʲôӦ�� <iostream> �����Ǵ�ͳ�� <cstdio>? ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently renamed "subclassable" to "inheritable" and revamped to use new-style headers (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.2]).\]_

��Ϊ<iostream>��ǿ�����Ͱ�ȫ�������˴������������ܣ�����չ�������ṩ�̳С�

printf() ������scanf() ��������ܵ��´���Ҳ�����м�ֵ�ģ�Ȼ������ C++ I��O����ע��I��O�����룯����� ����������˵�����ǵĹ��ܶ��Ƿǳ����޵ġ������C ��ʹ�� printf() �� scanf()����˵��C++ I��O ��ʹ�� << �� \>>���ǣ�

-   _���õ����Ͱ�ȫ��_ʹ�� <iostream>����������̬��֪���� I��O �Ķ�������͡��෴��<cstdio>ʹ�á�%��������̬��ָ�����͡�
-   _���ٵĴ�������_ʹ�� <iostream>��û�ж���ı�����ʵ�ʱ� I��O�Ķ�����һ�µġ�%����ȥ������ģ���ζ��ȥ����һ�����
-   _����չ��_C++ <iostream> ���������ڲ��ƻ����д��������£��µ��û����������ܹ���I��O������������һ�£�ÿ����ͬ�������µĲ����ݵġ�%�� ��printf() �� scanf()���������Ļ��ҳ��棿������
-   _�ɼ̳У�_C++ <iostream> �����ǽ��������������ϵģ��� std::ostream �� std::istream������ <cstdio>�� FILE\*�����������࣬��˿ɼ̳С�����ζ������������ӵ���������û�����Ŀ���ȥ�Լ���Ч�����������Ķ����������������κ�����Ҫ����ֵĺ���Ȥ�����顣�㽫�Զ��ĵõ������е���������ʶ���û�д�� I��O���룬���ң����ǲ���Ҫ��ʶ��д�ġ�extended stream���ࡣ

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.2\] ������Ƿ��ַ�ʱ��Ϊ���ҵĳ��������ѭ����![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.3]).\]_

�ٸ����ӣ������������µĴ��룬��std::cin��ȡһ��������

 #include <iostream>

   int main()  
 {  
   std::cout << "Enter numbers separated by whitespace (use -1 to quit): ";  
   int i = 0;  
   while (i != -1) {  
     std::cin >> i;

_// ��������ʽ — ������ע��_

     std::cout << "You entered " << i << '\\n';  
   }  
 }

�ó���û�м�������Ƿ��ǺϷ��ַ��������ǣ����ĳ�˼���Ĳ����������硰x������std::cin�����롰ʧ��״̬��������������е����볢�Զ������κ�������������ء����仰˵�������������ѭ�������42�����ɹ����������֣�����ᷴ����ӡ��You entered 42����Ϣ��

���Ϸ������һ���򵥷����ǽ���������� while ѭ�������Ƶ� while ѭ���Ŀ��Ʊ���ʽ���磺

��

 #include <iostream>

   int main()  
 {  
   std::cout << "Enter a number, or -1 to quit: ";  
   int i = 0;  
   while (std::cin >> i) {

_//_ _���õ���ʽ_

     if (i == -1) break;  
     std::cout << "You entered " << i << '\\n';  
   }  
 }

�����Ľ�����ǵ����û�end-of-file�������һ��������������� \-1 ʱ�� while ѭ�����˳���

����Ȼ����Ҳ���Բ���break������whileѭ������ʽwhile (std::cin >> i)��Ϊ((std::cin >> i) && (i != -1))�����ⲻ�Ǳ�FAQ���ص㣬�� FAQ ����iostream��������һ��Ľṹ�����ָ�ϡ���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.3\] �Ǹ��Źֵ�while (std::cin >> foo)�﷨��ι����� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.4]).\]_

���Źֵ� while (std::cin >> foo)�﷨�������Ӽ�[ǰһ��FAQ](#[15.2])��

(std::cin >> foo)����ʽ�������ʵ���operator>>�����磬����������ߴ���std::istream�����Լ��������������int�������ұ���һ��int&��operator>>����std::istream operator>>�����������ط�����ߵĲ����������������std::cin����һ��������ע�⵽���ص� std::istream����һ�������͵��������У���˱�������std::istreamת��Ϊһ������ֵ��

����������һ����Ϊstd::istream::operator void\*()�ĳ�Ա��������std::istreamת���ɲ�����������һ����ת���ɲ�����void\*ָ�루NULL��Ϊfalse���κ�������ָ���Ϊtrue������������������������std::cin.operator void\*()�ĵ��ã�����ͬ����(void\*) std::cin������ʽ��ǿ������ת����

���stream��������״̬����ôת�����operator void\*()���ط�ָ�룬�������ʧ��״̬���򷵻� NULL�����磬�������̫��Σ�Ҳ����˵���Ѿ�����end-of-file������ʵ�����뵽������Ϣ����foo�ĺϷ����ͣ��磬��� foo��һ��int����������һ����x���ַ������������ʧ��״̬����ת������᷵��NULL��

  operator>>���Ǽ򵥵ط���һ��bool���� void\*����֧���Ƿ�ɹ���ʧ�ܵ�ԭ����Ϊ��֧�֡��������﷨��

   std::cin >> foo >> bar;

operator>>�������ϵģ���ζ�����ϵĴ�������Ϊ��

   (std::cin >> foo) >> bar;

���仰˵��������ǽ�operator>>��Ϊһ����ͨ�ĺ������ƣ���readFrom()������Ϊ�����ı���ʽ��

   readFrom( readFrom(std::cin, foo), bar);

�������Ǵ����ڲ���ʼ�������ʽ����Ϊ operator>>�������ԣ��ͳ�������߱���ʽstd::cin >> foo���ñ���ʽ����std::cin �������ʵģ�������һ������߲��������ã�����һ������ʽ����һ������ʽҲ���أ�һ�����ã���std::cin�����ڶ������ñ������ˣ���Ϊ�������������ʽ��䡱������ߵı���ʽ�ˡ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.4\] Ϊ���ҵ����봦���ᳬ���ļ�ĩβ�� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.5]).\]_

��Ϊֻ������ͼ�����ļ�ĩβ��eof��ǲŻᱻ���á�Ҳ���ǣ��ڴ��ļ������һ���ֽ�ʱ����û������ eof ��ǡ����磬����������ӳ�䵽���̡�������������£���������˵��C++�ⲻ����Ԥ֪���û���������ַ��Ƿ������һ���ַ���

�磬���µĴ�����ڼ����� i ���С����� 1���Ĵ���

 int i = 0;  
 while (! std::cin.eof()) {   

_// ���󣡣����ɿ���_

   std::cin >> x;  
   ++i;   

_// Work with x ..._

 }

��ʵ����Ҫ���ǣ�

 int i = 0;  
 while (std::cin >> x) {      

_// ��ȷ�����ɿ���_

   ++i;   

_// Work with x ..._

 }

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.5\] Ϊʲô�ҵĳ����ڵ�һ��ѭ���󣬻�������������أ�![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.6]).\]_

��Ϊ���ֵ���ȡ�������������������뻺����֮��

�����Ĵ��뿴��ȥ��������

 char name\[1000\];  
 int age;

   for (;;) {  
   std::cout << "Name: ";  
   std::cin >> name;  
   std::cout << "Age: ";  
   std::cin >> age;  
 }

����ʵ����Ҫ���ǣ�

 for (;;) {  
   std::cout << "Name: ";  
   std::cin >> name;  
   std::cout << "Age: ";  
   std::cin >> age;  
   std::cin.ignore(INT\_MAX, '\\n');  
 }

��Ȼ����Ҳ���뽫for (;;)����Ϊwhile (std::cin)������Ҫ�������ѭ��ĩβͨ��std::cin.ignore(...);��һ�������������ַ���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.6\] ���Ϊclass Fred�ṩ��ӡ�� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.7]).\]_

��[�������](https://www.sunistudio.com/cppfaq/operator-overloading.html)�ṩһ��[��Ԫ](https://www.sunistudio.com/cppfaq/friends.html)�����л������ operator<<��

 #include <iostream>

   class Fred {  
 public:  
   friend std::ostream& operator<< (std::ostream& o, const Fred& fred);

_// ..._

 private:  
   int i\_;    

_// ֻ��Ϊ��˵��_

 };

   std::ostream& operator<< (std::ostream& o, const Fred& fred)  
 {  
   return o << fred.i\_;  
 }

   int main()  
 {  
   Fred f;  
   std::cout << "My Fred object: " << f << "\\n";  
 }

���� Fred ������ << ������ұߵĲ�����������ʹ�÷ǳ�Ա��������������һ��[��Ԫ](https://www.sunistudio.com/cppfaq/friends.html)������� Fred ��������Ϊ��<<����ߣ��Ǿ��� myFred << std::cout������ std::cout << myFred������ͻ���һ������Ϊoperator<<�ĳ�Ա������

ע�⣬operator<<�����������ʹ���������ܹ���[����](#[15.3])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.7\] ���ҿ�������ʹ�� printOn() ����������һ����Ԫ������ ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created (on 7/00) and fixed a bug thanks to [Richard Hector](mailto:rhector@actrix.gen.nz) (on 4/01). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.8]).\]_

����

ͨ������_����_Ը��ʹ��printOn()����������һ����Ԫ������ԭ������Ϊ���Ǵ����������Ԫ�ƻ��˷�װ���ң�������Ԫ�ǲ����ġ���Щ����������ĺʹ���ģ��ʵ���ʹ�ã�[��Ԫʵ���Ͽ�����ǿ��װ](https://www.sunistudio.com/cppfaq/friends.html#[14.2])��

��Ҳ����˵printOn() ����û�á����磺[Ϊһ�������ļ̳в�ε����ṩ��ӡ](#[15.9])ʱ�������õġ�������㿴��һ��printOn() ��������ͨ��Ӧ����protected�ģ�������public�ġ�

Ϊ���������������printOn() ���������뷨����һ����Ա������ͨ������ΪprintOn()�������ʵ�ʵĴ�ӡ��Ȼ����һ��operator<<������rintOn()��������������������ʱ��printOn()������public �ģ����operator<<����Ҫ��Ϊ��Ԫ��������Ϊһ���򵥵Ķ��������������������Ԫ��Ҳ������ĳ�Ա����������һЩʾ�����룺

��

 #include <iostream>

   class Fred {  
 public:  
   void printOn(std::ostream& o) const;

_// ..._

 };

_// operator<< ���Ա�����Ϊ����Ԫ \[���Ƽ���\]_

 std::ostream& operator<< (std::ostream& o, const Fred& fred);

_// ʵ�ʴ�ӡ���ڲ��� printOn() ������� \[���Ƽ���\]_

 void Fred::printOn(std::ostream& o) const  
 {   

_// ..._

 }

_// operator<< ���� printOn() \[���Ƽ���\]_

 std::ostream& operator<< (std::ostream& o, const Fred& fred)  
 {  
   fred.printOn(o);  
   return o;  
 }

���Ǵ���ؼٶ������ڱ����˳���һ����Ԫ��������������ά���ɱ�������ٶ��Ǵ���ģ���Ϊ��

1.  **��ά���ɱ��ϣ��������������ó�Ա��������������κκô���**���Ǽ��� _N_ �д��������ʵ�ʵĴ�ӡ����ʹ����Ԫ����������£��� _N_ �д��뽫ֱ�ӷ������ private/protected ���֣�����ζ��ĳ�����ۺ�ʱ�ı������ private/protected ���֣��� _N_ �д��뽫��Ҫ��ɨ�貢�ҿ��ܱ��޸ģ���������ά���ɱ���Ȼ����ʹ�� printOn() ������û�иı䣺������Ȼ�� _N_ �д���ֱ�ӷ������ private/protected ���֡���˽��������Ԫ�����Ƶ���Ա���������Ͳ�������ά���ɱ���û�м��١���ά���ɱ���û�кô���������еĻ���printOn()��������һ�㣬��Ϊ������һ�������ԭ��û�еĺ����������и����еĴ�����Ҫ��ά����
2.  **�������������ó�Ա������ʹ������ѱ�ʹ�ã������ǳ���Ա������������ʱ��**���ַ�����һ���������������õ�public������¶������Ա��������Ա�Ķ����public����ʱ�����ǻῴ�����ַ�����ͬһ�����顣�ĵ���Ҫ������˵������������Ǹ�������ȫһ��������Ҫ���������Ӧ�����Ǹ���������ͨ���ĳ���Ա��˵������������Ҳ�Ӧ��ʹ������Ϊʲô���� public�ģ�����ʵ��printOn()������public��Ψһ�����Ǳ��⽫��Ԫ��Ȩ�� operator<<��������Ŷ���ĳЩ������ʹ�������ĳ���Ա��˵����΢��Ĳ�����������ġ�

��֮���������������ó�Ա�������гɱ���û�����档��ˣ�ͨ�������Ǻ����⡣

ע�⣺��� printOn()������protected��private�ģ��ڶ������齫����������Щ����ⷽ���Ǻ����ģ���[Ϊһ�������ļ̳в�ε����ṩ��ӡ](#[15.9])ʱ��ͬ��Ҫע�⣬��printOn()�����Ƿ�public��ʱ�� operator<< ��Ҫ��Ϊ��Ԫ��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.8\] ���Ϊ class Fred�ṩ���룿![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.9]).\]_

ʹ��[�������](https://www.sunistudio.com/cppfaq/operator-overloading.html)�ṩһ��[��Ԫ](https://www.sunistudio.com/cppfaq/friends.html)�����л������operator>>�����˲���û��һ��[const](https://www.sunistudio.com/cppfaq/const-correctness.html)����Fred&�������ǡ�const Fred&����������[������](#[15.6])���ơ�

 #include <iostream>

   class Fred {  
 public:  
   friend std::istream& operator>> (std::istream& i, Fred& fred);

_// ..._

 private:  
   int i\_;    

_// ֻ��Ϊ��˵��_

 };

   std::istream& operator>> (std::istream& i, Fred& fred)  
 {  
   return i >> fred.i\_;  
 }

   int main()  
 {  
   Fred f;  
   std::cout << "Enter a Fred object: ";  
   std::cin >> f;

_// ..._

 }

ע��operator>>�����������ʹ����������ܱ�[�����ͣ�����ѭ���������ʹ��](#[15.3])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.9\] ���Ϊ�����̳в�ε����ṩ��ӡ�� ![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.10]).\]_

�ṩһ��[��Ԫ](https://www.sunistudio.com/cppfaq/friends.html)��[operator<<](https://www.sunistudio.com/cppfaq/input-output.html#[15.6])����һ��protected [virtual](https://www.sunistudio.com/cppfaq/virtual-functions.html)������

 class Base {  
 public:  
   friend std::ostream& operator<< (std::ostream& o, const Base& b);   

_// ..._

 protected:  
   virtual void printOn(std::ostream& o) const;  
 };

   inline std::ostream& operator<< (std::ostream& o, const Base& b)  
 {  
   b.printOn(o);  
   return o;  
 }

   class Derived : public Base {  
 protected:  
   virtual void printOn(std::ostream& o) const;  
 };

���ս����operator<< �����Ƕ�̬�󶨣���ʹ����һ��[��Ԫ](https://www.sunistudio.com/cppfaq/friends.html)�������ⱻ��Ϊ������Ԫ�����÷�����

ע����������д��printOn(std::ostream&) const�������ǣ����ǲ��ṩ�����Լ��� operator<<��

��Ȼ�ģ���� Base��һ��[ABC��������ࣩ](https://www.sunistudio.com/cppfaq/abcs.html#[22.3])��Base::printOn(std::ostream&) const�����á�\= 0���﷨������Ϊ[���麯��](https://www.sunistudio.com/cppfaq/abcs.html#[22.4])��

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.10\] ��DOS �ͣ��� OS/2�����£�����Զ�����ģʽ���ش򿪡� std::cin �� std::cout ��![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.11]).\]_

��������ʵ�֣���鿴��ı��������ĵ���

���磬��������ʹ��std::cin�� std::cout���ж����� I��O����������Ĳ���ϵͳ����DOS �� OS/2����ֽ���std::cin����ġ�\\r\\n������Ϊ��\\n�������� std::cout��std::cerr����ġ�\\n������Ϊ��\\r\\n����

���е���û�б�׼����ʹ��std::cin��std::cout�ͣ���std::cerr�Զ�����ģʽ���򿪡��ر���������ͼ�Զ����Ʒ�ʽ�ش����ǣ����ܻ�õ��������Ļ򲻺���Ҫ�Ľ����

��ϵͳ�����𴦣�ʵ�ֿ����ṩ��һ�ַ���ʹ���ǳ�Ϊ�����������������鿴�ֲ����ҵ���

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.11\] Ϊ���Ҳ������硰..\\test.dat�������Ĳ�ͬ��Ŀ¼���ļ���![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and uses the std:: syntax (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.12]).\]_

��Ϊ��\\t����һ�� tab �ַ���

��Ӧ�����ļ���ʹ����б�ܣ���ʹ��ʹ�÷�б�ܵĲ���ϵͳ���� DOS, Windows, OS/2���С����磺

��

 #include <iostream>  
 #include <fstream>

   int main()  
 {  
   #if 1  
     std::ifstream file("../test.dat");

_// ��ȷ��_

   #else  
     std::ifstream file("..\\test.dat");  

_// ����_

   #endif

_// ..._

 }

��ס����б�ܣ���\\�������������ַ����н��������ַ�����\\n���ǻ��У���\\b�����˸��Լ���\\t����һ��tab����\\a����һ�����棨alert������\\v����һ��vertical-tab�ȡ�����ļ�����\\version\\next\\alpha\\beta\\test.dat��������Ϊһ���������ַ���Ӧ���á�/version/next/alpha/beta/test.dat�����������ʹϵͳ��ʹ�á�\\����ΪĿ¼�ָ�������DOS, Windows, OS/2�ȡ�������Ϊ����ϵͳ�еĿ������ǿɽ����ش�����/���͡�\\���ġ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.12\] ��ν�һ��ֵ���磬һ�����֣�ת��Ϊ std::string? ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created thanks to [Rob Stewart](mailto:rob@giage.com) (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/input-output.html#[15.13]).\]_

�����ַ���������ʹ��<stdio>���߻�<iostream>�⡣ͨ����[��Ӧ��ʹ��<iostream>��](#[15.1])��

  <iostream> ��������ʹ�����µ��﷨��ת��һ��double��ʾ������������滻����Ķ���κ�ʹ��<<����Ķ��������κ�����ö�Ķ���ת��Ϊ std::string��

��

 #include <iostream>  
 #include <sstream>  
 #include <string>

   std::string convertToString(double x)  
 {  
   std::ostringstream o;  
   if (o << x)  
     return o.str();

_// �������һЩ������..._

   return "conversion error";  
 }

std::ostringstream ���� o �ṩ������std::cout�ṩ�ĸ�ʽ�����ߡ������ʹ�ò������͸�ʽ����־�����Ƹ�ʽ���Ľ��������ͬ����std::cout���������ġ�

����������У�����ͨ���������˵Ĳ��������<<���� x _����_�� o����������iostream�ĸ�ʽ�����߽� x ת��Ϊһ��std::string�� [if ����](#[15.3])��֤ת����ȷ�������������ڽ����������ͣ����ǳɹ��ģ��� if ���������õķ��

����ʽos.str()���ذ����˱����뵽�� o �е��κζ�����std::string ��������� x ��ֵ���ַ�����

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

### \[15.13\] ��ν� std::string ת��Ϊ��ֵ�� ![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created thanks to [Rob Stewart](mailto:rob@giage.com) (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/freestore-mgmt.html#[16.5]).\]_

�����ַ���������ʹ��<stdio>���߻�<iostream>�⡣ͨ����[��Ӧ��ʹ��<iostream>��](#[15.1])��

<iostream> ��������ʹ�����µ��﷨��ת��һ�� double��ʾ������������滻����Ķ���κ���ʹ�� \>> �������ȡ�Ķ�������һ��std::stringת��Ϊ����ö���κζ�����

 #include <iostream>  
 #include <sstream>  
 #include <string>

   double convertFromString(const std::string& s)  
 {  
   std::istringstream i(s);  
   double x;  
   if (i >> x)  
     return x;

_// �������һЩ������..._

   return 0.0;  
 }

std::istringstream ���� i �ṩ������std::cin�ṩ�ĸ�ʽ�����ߡ������ʹ�ò������͸�ʽ����־�����Ƹ�ʽ���Ľ��������ͬ����std::cin�������ġ�

�����ʾ���У����Ǵ�����td::string s����ʼ��std::istringstream i �����磬s �������ַ�����123.456������Ȼ������ͨ���������˵ĳ�ȡ����� \>>���� i _��ȡ_�� x����������iostream�ĸ�ʽ�����߶��ַ������о����ܵģ��ʵ��Ļ��� x �����͵�ת����

[if ����](#[15.3])��֤��ת����ȷ�ع��������磬����ַ����������ʺ� x ���͵��ַ���if ���Խ�ʧ�ܡ�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/friends.html) | [Next section](https://www.sunistudio.com/cppfaq/freestore-mgmt.html) \]

* * *

 [![E-Mail](https://www.sunistudio.com/cppfaq/mbox.gif) E-mail the author](mailto:cline@parashift.com)  
\[ [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html) | [Table of contents](https://www.sunistudio.com/cppfaq/index.html#table-of-contents) | [Subject index](https://www.sunistudio.com/cppfaq/subject-index.html) | [About the author](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.1]) | [©](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]) | [Download your own copy](https://www.sunistudio.com/cppfaq/on-line-availability.html#[2.2]) \]  
Revised Apr 8, 2001
