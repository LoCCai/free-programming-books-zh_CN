## \[21\] �̳� — �ʵ��ļ̳кͿ��û���  
(Part of [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html), [Copyright © 1991-2001](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]), [Marshall Cline](http://www.parashift.com/), [cline@parashift.com](mailto:cline@parashift.com))

�������İ淭�룺[��F](http://nicrosoft.net)��[nicrosoft@sunistudio.com](mailto:nicrosoft@sunistudio.com)

* * *

### FAQs in section \[21\]:

* * *

### \[21.1\] ��Ӧ�����ػ���Ĺ��г�Ա������

��Ҫ����Ҫ����Ҫ����������Զ��Ҫ��

��ͼ���أ��������ϳ���˽�л����̳ж����Ĺ��г�Ա�����Ƿǳ���������ƴ���ͨ��������ڽ����Դ���

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.2\] Derived\* —> Base\* ���Ժܺõع���; Ϊʲô Derived\*\* —> Base\*\* ���У�

����Derived������һ��Base����C++����Derived\* ת���� Base\*��Ȼ������ Derived\*\* ת���� Base\*\* ���������󡣾�������������Զ��׼��ģ���δ�����Ǽ����¡����磬������ܹ���Car\*\*ת���� Vehicle\*\*����ע��Vehicle��Ϊ��ͨ���ߣ��������������ͬ���Ľ�NuclearSubmarine\*\*����ע��NuclearSubmarine��Ϊ��Ǳͧ�� ת����Vehicle\*\*����ô����ܸ�������ָ�븳ֵ��������ʹ Car\* ָ��ָ�� NuclearSubmarine��

��

 class Vehicle {  
 public:  
   virtual ~Vehicle() { }  
   virtual void startEngine() = 0;  
 };

   class Car : public Vehicle {  
 public:  
   virtual void startEngine();  
   virtual void openGasCap();  
 };

   class NuclearSubmarine : public Vehicle {  
 public:  
   virtual void startEngine();  
   virtual void fireNuclearMissle();  
 };

   int main()  
 {  
   Car   car;  
   Car\*  carPtr = &car;  
   Car\*\* carPtrPtr = &carPtr;  
   Vehicle\*\* vehiclePtrPtr = carPtrPtr;

_//_ _����C++����һ������_

   NuclearSubmarine  sub;  
   NuclearSubmarine\* subPtr = &sub;  
   \*vehiclePtrPtr = subPtr;   

_// ������н�����carPtrָ�� sub !_

   carPtr->openGasCap();  

_// �⽫���� fireNuclearMissle()! ����ע��Ҳ���Ƿ���˵���_

 }

���仰˵�������Derived\*\* ��Base\*\*��ת���ǺϷ��ģ���ôBase\*\*�����ܱ�������ã��ױ�� Base\*�������� Base\*���ܱ�ָ��ͬ������������⽫�������صĹ��Ұ�ȫ���⣨��֪������������NuclearSubmarine����Ǳͧ������� openGasCap()��Ա�����ᷢ��ʲô!!����ȴ��Ϊ����һ��Car����!!������һ�����ϵĴ��룬�����ᷢ��ʲô����������ı����������NuclearSubmarine::fireNuclearMissle()!

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.3\] parking-lot-of-Car��ͣ��������һ�� parking-lot-of-Vehicle����ͨ����ͣ��������

����

��֪��������������֣���������ʵ������Խ��⿴��Ϊ���� FAQ��ֱ�ӽ��ۣ�������������������⣺����������һ�֡���ϵ�����Ļ�����ô�Ϳ��Խ� parking-lot-of-Vehicle ���͵�ָ��ָ��һ�� parking-lot-of-Car�����ǣ�parking-lot-of-Vehicle �� addNewVehicleToParkingLot(Vehicle&)��Ա����������ͣ���������κ� Vehicle����ͨ���ߣ������������������� parking-lot-of-Car��ͣ������ͣ��һ��NuclearSubmarine����Ǳͧ������Ȼ����ĳ����Ϊ�� parking-lot-of-Car ɾ��һ��Car���󣬶�ʵ����һ��NuclearSubmarineʱ������ǳ����ȡ�

����һ�ַ������������ʵ��һ���������������һ���κ������������Ҳ�����ѽ��ܣ���������ʵ��

����Բ�ϲ�������������������

������OO/C++ѵ���γ�ʹ�õ����һ�����ӣ���һ��ƻ������һ��ˮ���������һ��ƻ���ܹ������ݸ�һ��ˮ���Ļ����Ϳ��԰��㽶������У���ʹ������Ϊ����ֻ�ܷ�ƻ����

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.4\] Derived������һ�� Base������![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax and reworded references to STL (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/proper-inheritance.html#[21.5]).\]_

����

��������FAQ�Ľ��ۡ����ҵ�����������������������һ�������

 class Base {  
 public:  
   virtual void f();             

_// 1_

 };

   class Derived : public Base {  
 public:

_// ..._

 private:  
   int i\_;                       

_// 2_

 };

   void userCode(Base\* arrayOfBase)  
 {  
   arrayOfBase\[1\].f();

_// 3_

 }

   int main()  
 {  
   Derived arrayOfDerived\[10\];

_// 4_

   userCode(arrayOfDerived);     

_// 5_

 }

����������Ϊ�������������Ͱ�ȫ����� 5����һ�н� Derived\* ת��Ϊ Base\*����ʵ�����������ǿ��µģ����� Derived��Base ���ڱ��3����һ�е�ָ�������Ǵ���ģ������������� arrayOfBase\[1\]�ĵ�ַʱʹ�� sizeof(Base)����������ʵ��һ��Derived���飬����ζ���ڱ��3����һ�е�������ĵ�ַ���Լ�֮��ĳ�Ա���� f() �ĵ��ã��������κζ������ʼλ�ã�����Derived������м䡣������ı�����ʹ��ͨ���ķ���Ѱ��[�麯��](https://www.sunistudio.com/cppfaq/virtual-functions.html)����ô�����µ�һ��Derived����� int i\_ �����½��ͣ���������ָ���麯������ָ�룬�����������ָ�롱����ζ���������ڷ���һ��������ڴ�λ�ã��������ڴ����Ǹ�λ�õ�ǰ�����ֽڽ���Ϊ C++��Ա�����ĵ�ַ��Ȼ�����ǣ�������ڴ��ַ��װ�ص�ָ��Ĵ�������ʼ���Ǹ��ڴ�����������ָ�������������ļ����൱�ߡ�

���������� C++�޷�����ָ�������ָ���ָ�����������ָ�롣��Ȼ�ģ�C++�Ǵ�C�̳�����һ������

ע�⣺�������ʹ���������飨array-like�����ࣨ���磬[��׼��](https://www.sunistudio.com/cppfaq/class-libraries.html#[32.1])�е�std::vector<Derived>��������ԭʼ�����飬������⽫�ᱻ��Ϊ����ʱ�����ҳ�����������ʱ�����ѡ�

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.5\] ���������飨array-of-Derived��������һ�֡��������飨array-of-Base���Ƿ���ζ�����鲻�ã�![UPDATED!](https://www.sunistudio.com/cppfaq/updated.gif)

_\[Recently changed so it uses new-style headers and the std:: syntax and reworded references to STL (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/proper-inheritance.html#[21.9]).\]_

�ǵģ�[����ܲ](https://www.sunistudio.com/cppfaq/containers-and-templates.html#[31.1])����������Ц����

��ϵ���˵�������ָ��ǳ��ӽ�������ָ����Ѵ������������������ȫ������Ϊʲô����ƽǶ�����������FAQ��˵�Ļ���һ�����⣨���磬��������֪��Ϊʲô�������������һ���κ����������������������Ϊ��ά����Ĵ���������˶���ȫ������ЩOO�������ʵ�Ļ�����ô���������ʹ�����顣�����������������һ���Ļ�����Ӧ��ʹ������[��׼��](https://www.sunistudio.com/cppfaq/class-libraries.html#[32.1])��std::vector<T>������ģ�������������ԭʼ�����顣

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.6\] Circle��Բ����һ�� Ellipse����Բ����

�����Բ�����ı�Բ�ʣ����ǡ�

���磬������Բ��һ��setSize(x,y)��Ա���������������Ա����������Բ�� width()��x��height() ��y������������£�Բ�޷���һ����Բ���ܼ򵥣������Բ����ĳЩԲ���������£���Բ����һ����Բ��

�ݴ��Ƴ�Բ����Բ�����֣��Ϸ��ģ���ϵ��

-   ʹԲ�����Բ����ȫ�޹�
-   ʹԲ����Բ����һ�������������û����ǡ�����ִ�в��Գ�setSize()�������Բ��

�ڵ�һ������£���Բ���Դ�AsymmetricShape�����Գ�ͼ�Σ���������setSize(x,y)������AsymmetricShape������������Բ���Դ���setSize(size)��Ա������SymmetricShape���Գ�ͼ�Σ���������

�ڵڶ�������£�Oval�����Σ������ֻ��setSize(size)��ͬʱ���� width()��height()�Ĵ�С����Բ��Բ���̳���Oval����Բ��������Բ����������setSize(x,y)���㣨�����setSize()��Ա���������ظ�������[���ع���](https://www.sunistudio.com/cppfaq/strange-inheritance.html#[23.5])��  

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

(ע��: setSize(x,y)��������ʥ�ġ����������Ŀ�꣬��ֹ�û��ı���Բ�ĳߴ�Ҳ�ǿ��Եġ���ĳЩ����£���Բû��setSize(x,y)��������Ч�����ѡ��Ȼ�����ϵ�е������ǵ�����Ϊһ���Ѵ��ڵ��ཨ��һ�������ಢ�һ��ຬ��һ�����޷����ܡ��ķ���ʱ�������������Ȼ�����������ڻ��಻����ʱ�ͷ���������⡣���������������ġ���)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.7\] ���ڡ�Բ��/����һ����Բ������������⣬������˵����

���������������Բ�ǿ��Ա�ѹ�ɲ��ԳƵģ�����������Բ��һ����Բ������������Բ���ܱ�ѹ�ɲ��ԳƵġ���������������ʵ�����ǳ��أ��������֮һ���ɴˣ���Ҫôȥ��Ellipse::setSize(x,y)��ȥ��Բ����Բ�ļ̳й�ϵ��Ҫô������� Circles��Բ����������Բ��

����������OO/C++�������ͨ������������塣���ǻ���ͼ�ô���ļ������ֲ���Ƶ�ȱ�ݣ����ǻ��ض���Circle::setSize(x,y)���׳��쳣������abort()��ȡ����������ƽ����������ʲô�������������ҵ��ǣ������û����� width() == x���� height() == y��������Щ���ɻ�ʹ�û����ȡ������û������ǲ������ġ�

������֡�Բ��һ����Բ���ļ̳й�ϵ������˵�ǳ���Ҫ����ô��ֻ��������Բ��setSize(x,y)�����ĳ�ŵ�����磬����Ըı��ŵΪ�����ó�Բ�������԰� width()����Ϊx ����/��� height()����Ϊy������ʲô���顱�����ҵ��������û�û���κ��������Ϊ�����п���������嵭��Լ�����������ζ����û�м�ֵ�����ĳ�����㵽��������ʲô������ֻ�����ʼ��Ļ��������˵����ȡʹ���������

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

(ע��: setSize(x,y)��������ʥ�ġ����������Ŀ�꣬��ֹ�û��ı���Բ�ĳߴ�Ҳ�ǿ��Եġ���ĳЩ����£���Բû��setSize(x,y)��������Ч�����ѡ��Ȼ�����ϵ�е������ǵ�����Ϊһ���Ѵ��ڵ��ཨ��һ�������ಢ�һ��ຬ��һ�����޷����ܡ��ķ���ʱ�������������Ȼ�����������ڻ��಻����ʱ�ͷ���������⡣���������������ġ���)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.8\] ��������ѧ��ʿ��������Բ��һ����Բ�����Ƿ���ζ��Marshall Cline��ɵ�ϣ�����C++��ɵ�ϣ�����OO��ɵ�ϣ�

��ʵ�ϣ��Ⲣ����ζ����Щ��������ζ�����ֱ���Ǵ���ġ�

�������յ����ظ��˴����Ĺ����������������e-mail�����Ѿ���������ǧ������ר�ҽ��������ٴΡ���֪����Υ�������ֱ�����������ң����ֱ���Ǵ���ġ�

���������������ֱ���еġ���һ�֣�kind of�����ĸ������OO�е��ʵ��ļ̳У�ѧ���ϳ�Ϊ��������(subtyping)��������������������������ǿ���ȡ���������ġ���Բ/��Բ������£�

setSize(x,y)

��Ա����Υ����������û��ԡ�

��������ѡ��\[1\]��

Ellipse

����Բ������ɾ��

setSize(x,y)

��Ա�������Ӷ���������

setSize(x,y)

��Ա�������Ѵ��ڴ��룩��\[2\]����

Circle

��Բ���ĸߺͿ���ͬ��һ�����ԳƵ�Բ��������\[3\]ȥ���̳й�ϵ����Ǹ����û������ѡ�����������һ��ѡ���Բ����Բ���ӵ�����ͨ�û�������������ֻ����������ѡ��\[3\]�ı��ְ��ˡ�

��һ��˵�����ǣ���Ҫôʹ������һЩ�����������˵�㲻��Ϊ��Բ�ĸߺͿ����ò�ͬ��ֵ����Ҫôʹ������ǿһЩ�����������ʹԲͬʱ���жԳƵĺͲ��ԳƵ�������������Щ���޷��������⣨����Բ/��Բ���ӣ���ͨ���ͼ򵥵������̳й�ϵ������̳й�ϵ������ڣ���ֻ�ܴӻ�����ɾ�����γ�Ա������

setHeight(y)

��

setWidth(x)�� 

��

setSize(x,y)

��  

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

(ע��: setSize(x,y)��������ʥ�ġ����������Ŀ�꣬��ֹ�û��ı���Բ�ĳߴ�Ҳ�ǿ��Եġ���ĳЩ����£���Բû��setSize(x,y)��������Ч�����ѡ��Ȼ�����ϵ�е������ǵ�����Ϊһ���Ѵ��ڵ��ཨ��һ�������ಢ�һ��ຬ��һ�����޷����ܡ��ķ���ʱ�������������Ȼ�����������ڻ��಻����ʱ�ͷ���������⡣���������������ġ���)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.9\] Ҳ����ԲӦ�ô�Բ�̳У�![NEW!](https://www.sunistudio.com/cppfaq/new.gif)

_\[Recently created (on 7/00). [Click here to go to the next FAQ in the "chain" of recent changes](https://www.sunistudio.com/cppfaq/abcs.html#[22.3]).\]_

���Բ�ǻ��࣬��Բ��������Ļ�����ô������������µ����⡣���磬����Բ��radius()��������ע�����ð뾶�ĳ�Ա����������ô��ԲҲ����radius()����������û�����壺һ����Բ�����ܲ��Գƣ��İ뾶��ʲô��˼��

�����˷�����ϰ���Ҳ����ʹ��Ellipse::radius()��������͸����ƽ��ֵ�������취������ôradius()�� area()����ע���õ�����ĳ�Ա������֮��Ĺ����ͻ������⡣���磬����Բ��area()�������ص���3.14159����radius()����ֵ��ƽ������Ellipse::area()�����᷵����Բ����ʵ���������������ס��radius()���ط���������ʽ��ĳ��ֵ��

��ʹ��˷���������⣨Ҳ����ʹ��Ellipse::radius()��������Բ���������pi��ƽ���������㻹ҪӦ��circumference()��������ע�������ܳ��ĳ�Ա�����������磬����Բ��circumference()��������2����pi����radius()�ķ���ֵ����������鷳�ǣ�������Բû�а취����ˮ��ƽ�ˣ���Բ�಻�ò�������������ܳ����������ߵļ��������ѡ�����ע��������Բ��������ܳ��ļ����޷�ͬʱ�õ���ȷ�𰸣���Ϊ���Ƕ�ʹ����radius()�ķ���ֵ�������Ƕ���radius()�ķ���ֵ��Ҫ��ȴ����ͬ��radius()�޷�ͬʱ�������ǵ���Ҫ��

���ߣ�ֻҪ���������ػ���ĳ�ŵ����Ϳ���ʹ�ü̳С������ܽ�����Ϊ��о�����̳л������Ϊ����ʹ�ô��뱻���þ�ʹ�ü̳С�ֻ����(a)������ķ��������ػ������������г�ŵ������(b)�û����ᱻ����Ϳ������(c)ʹ�ü̳������Ի��ʵ�ڵ�ʱ���ϵģ���Ǯ�ϵĻ�����ϵĸĽ�ʱ����Ӧ��ʹ�ü̳С�

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

### \[21.10\] ���ҵ�������Բ����Բ�޹أ��������ĵ����Ӷ�����ʲô�ô���

�����е�С��ᡣ����ΪԲ/��Բ���������ĵģ���ʵ���ϣ�������������ͬ���ʵġ�

�Ҳ�������ļ̳�������ʲô�������У��ǵģ����У������ļ̳ж����Թ��Ϊ��Բ����һ����Բ�������ӡ�

�����Ϊʲô�������ļ̳�����һ���ж���������������һ������������ĳ�Ա��������ʱ��һ��������Ա���������ĳ�ŵ���Ļ��࣬��������ȴ�޷�����������Ҫôʹ������һЩ��������ǿһЩ��Ҫô�����̳й�ϵ���Ҽ����ܶ�ܶ�ܶ಻���ļ̳з����������ң����Ƕ����Թ��ΪԲ/��Բ�����ӡ�

��ˣ���������������Բ/��Բ�����ӣ�������ҳ����еĲ����̳С������û������Բ/��Բ���⣬��ô��ܿ��ܷ�һЩ���صĲ��Ұ���ļ̳д���

�������ˣ�������ġ�

(ע��: �� FAQ ���������빫�м̳У�public inheritance���й�; [˽�кͱ����̳�](https://www.sunistudio.com/cppfaq/private-inheritance.html)������ͬ)

\[ [Top](#top) | [Bottom](#bottom) | [Previous section](https://www.sunistudio.com/cppfaq/virtual-functions.html) | [Next section](https://www.sunistudio.com/cppfaq/abcs.html) \]

* * *

 [![E-Mail](https://www.sunistudio.com/cppfaq/mbox.gif) E-mail the author](mailto:cline@parashift.com)  
\[ [_C++ FAQ Lite_](https://www.sunistudio.com/cppfaq/index.html) | [Table of contents](https://www.sunistudio.com/cppfaq/index.html#table-of-contents) | [Subject index](https://www.sunistudio.com/cppfaq/subject-index.html) | [About the author](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.1]) | [©](https://www.sunistudio.com/cppfaq/copy-permissions.html#[1.2]) | [Download your own copy](https://www.sunistudio.com/cppfaq/on-line-availability.html#[2.2]) \]  
Revised Apr 8, 2001
