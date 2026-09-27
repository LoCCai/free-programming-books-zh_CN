来源：[http://www.paintcodeapp.com/news/iphone-6-screens-demystified](http://www.paintcodeapp.com/news/iphone-6-screens-demystified)  
双语译文：[http://code.wileam.com/iphone-6-screen/](http://code.wileam.com/iphone-6-screen/)（无图），欢迎批评指正。  
译者：[小雪-Joanna](http://www.wileam.com/)

* * *

几天前，Apple发布了iPhone 6 Plus. 新的iPhone大幅改变了图像在屏幕上渲染的方式。我们做了一个图表进行详细分析。

* * *

320 × 480 375 × 667 414 × 736 320 × 480 750 × 1334 1242 × 2208 1080 × 1920 3.5″ 4.7″ 5.5″ iPhone 6 Plus的屏幕像素分辨率比之前步骤渲染的图像分辨率低。 在图像显示在屏幕之前，图像必须重新调整大小到更低的像素分辨率。 物理像素 最初，所有图像的坐标都是用点的方式确定的。 点是绝对单位，他们只在数学的坐标空间里有意义。 在最初的iPhone上，点和实际屏幕的像素是完全一致的，但现在不再是这样了。 点 以点为基础的图像渲染 成为像素，这个过程就是光栅化 （rasterization）。  点坐标乘以一定的比例系数 得到相应的像素坐标。更高的比例系数可以得到更好的细节呈现。 典型的比例系数有 1×, 2× 和 3×. 渲染像素 最后一步是将计算的像素显示在物理屏幕上。 每一个屏幕都有一个每英寸像素(PPI)的特性。这个数字告诉你一英寸显示多少像素，也就是一像素在真实世界里显示的大小。 物理设备 render at 1× 缩小 / 1.15 在设备上显示 在设备上显示 在设备上显示 (pixels) (pixels) (pixels) (points) (device pixels) (points) (points) 最初的 iPhone iPhone 6 iPhone 6 Plus 3.5″ 4.7″ 5.5″ 163 PPI 326 PPI 401 PPI render at 3× render at 2×

* * *

a iPhone 6 Plus 在显示在屏幕上之前缩小了已渲染的图像。 物理像素 内容是按照数学上的点坐标来定义的。 点 内容用比例系数渲染成像素，这个过程叫做光栅化（rasterization）。 渲染像素 光栅化之后的图像显示在物理设备上。 物理设备 render 2× 缩小 / 1.15 在设备上显示 在设备上显示 在设备上显示 最初的iPhone iPhone 6 iPhone 6 Plus 3.5″ 4.7″ 5.5″ render 3× render 1× a a

* * *

### 一根线的渲染

为了说明多种设备的不同像素渲染情况，我们比较了一个一像素宽的线是怎样渲染的：

-   最初的iPhone - 没有高清屏，比例系数是1。
-   iPhone 5 - 有高清屏，比例系数是2。  
    
-   iPhone 6 Plus - 超高清屏（Retina display HD）。比例系数是3，并且图像会先渲染为2208 × 1242像素然后缩小为1920 × 1080像素。

缩小的比例是1920 / 2208 = 1080 / 1242 = 20 / 23. 这意味着最初渲染的每23像素会分布到20物理像素中。换句话说图像会缩小为大约原尺寸的87%。

* * *

23 pixels 20 pixels 最初的 iPhone 3.5″ iPhone 5 4″ iPhone 6 Plus 5.5″ 理论上完美的 3倍显示 ???
