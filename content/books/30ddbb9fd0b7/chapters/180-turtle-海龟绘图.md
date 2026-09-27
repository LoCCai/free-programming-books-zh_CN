**源码：** [Lib/turtle.py](https://github.com/python/cpython/tree/3.14/Lib/turtle.py)

* * *

Imagine a robotic turtle starting at (0, 0) in the x-y plane. After an `import turtle`, give it the command `turtle.forward(15)`, and it moves (on-screen!) 15 pixels in the direction it is facing, drawing a line as it moves. Give it the command `turtle.right(25)`, and it rotates in-place 25 degrees clockwise.

Turtle graphics is an implementation of [the drawing tools introduced in Logo](https://en.wikipedia.org/wiki/Turtle_\(robot\)) in 1967. It was created as an educational tool, and its instant, visible feedback makes it an effective way for learners to encounter programming concepts. It is also a convenient way to produce simple graphical output without bringing in external libraries.

本文档包括了四个主要部分：

-   [教程](#turtle-tutorial) teaches the basics of turtle drawing.
    
-   [参考](#turtle-reference) describes the functions, methods and classes this module defines.
    
-   [常用方案指引](#turtle-howtos) details how to handle specific tasks.
    
-   [说明](#turtle-explanation) provides background on the object-oriented interface.
    

备注

Turtle graphics requires the [`tkinter`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces") [optional module](https://docs.python.org/zh-cn/3/glossary.html#term-optional-module). The python.org installers for Windows and macOS include it, but some Linux distributions and other platforms may package it separately. If `import turtle` fails with an error mentioning `_tkinter`, look for documentation from your distributor (that is, whoever provided Python to you). Check this in advance if you're planning to use turtle graphics with a learner.

## 教程[¶](#tutorial "Link to this heading")

新用户应当从这里开始。 在本教程中我们将探索海龟绘图的一些基本知识。

### 启动海龟环境[¶](#starting-a-turtle-environment "Link to this heading")

在 Python shell 中，导入 `turtle` 模块的所有对象:

from turtle import \*

如果你遇到了 `No module named '_tkinter'` 错误，则需要在你的系统中安装 [`Tk 接口包`](https://docs.python.org/zh-cn/3/library/tkinter.html#module-tkinter "tkinter: Interface to Tcl/Tk for graphical user interfaces")。

### 基本绘图[¶](#basic-drawing "Link to this heading")

让海龟前进 100 步:

forward(100)

你应该会看到（最可能的情况，是在你的显示器的一个新窗口中）海龟画出一条线段，方向朝东。 改变海龟的方向，让它向左转 120 度（逆时针）:

left(120)

让我们继续画一个三角形:

forward(100)
left(120)
forward(100)

注意以一个箭头表示的海龟是如何随着你的操纵指向不同方向的。

Experiment with those commands, and also with `backward()` and `right()`. Many commands also have terser aliases, such as `fd()` for [`forward()`](#turtle.forward "turtle.forward").

#### 画笔控制[¶](#pen-control "Link to this heading")

试着改变颜色 —— 例如，`color('blue')` 和线宽 —— 例如，`width(3)` 然后再次绘制。

您也可以在不绘制线条的情况下移动海龟，即在移动前抬起画笔: `up()`。 要重新开始绘制，请使用 `down()`。

#### 海龟的位置[¶](#the-turtle-s-position "Link to this heading")

将海龟送回起点（这适用于海龟消失在屏幕之外的情况）:

home()

初始位置在海龟屏幕的中心。 如果你需要知道具体数值，可以这样获取海龟的 x-y 坐标:

pos()

初始点在 `(0, 0)`。

过一段时间后，也许可以考虑清空窗口这样我们就可以重新开始:

clearscreen()

### 使用算法绘制图案[¶](#making-algorithmic-patterns "Link to this heading")

使用循环，可以构建出各种几何图案:

for steps in range(100):
    for c in ('blue', 'red', 'green'):
        color(c)
        forward(steps)
        right(30)

\- 当然，这仅受限于你的想象力！

让我们绘制本页面顶部的星形。 我们想要用红色线条，黄色填充:

color('red')
fillcolor('yellow')

就像用 `up()` 和 `down()` 决定是否画线一样，填充也可以打开或关闭:

begin\_fill()

接下来我们将创建一个循环:

start \= pos()

while True:
    forward(200)
    left(170)
    if distance(start) < 1:
        break

`distance(start) < 1` 是确定海龟何时回到其初始位置的好办法。

最后，完成填充:

end\_fill()

（请注意只有在你给出 `end_fill()` 命令时才会实际进行填充。）

## 常用方案指引[¶](#how-to-guides "Link to this heading")

本节介绍一些典型的海龟使用案例和操作方式。

### 自动开始和结束填充[¶](#automatically-begin-and-end-filling "Link to this heading")

从 Python 3.14 开始，你可以使用 [`fill()`](#turtle.fill "turtle.fill") [context manager](https://docs.python.org/zh-cn/3/glossary.html#term-context-manager) 来代替 [`begin_fill()`](#turtle.begin_fill "turtle.begin_fill") 和 [`end_fill()`](#turtle.end_fill "turtle.end_fill") 以自动开始和结束填充。 下面是一个示例:

with fill():
    for i in range(4):
        forward(100)
        right(90)

forward(200)

上面的代码等价于:

begin\_fill()
for i in range(4):
    forward(100)
    right(90)
end\_fill()

forward(200)

### 使用 `turtle` 模块命名空间[¶](#use-the-turtle-module-namespace "Link to this heading")

使用 `from turtle import *` 是很方便 —— 但要注意它导入的对象集相当大，如果你还在做海龟绘图以外的事情就有发生名称冲突的风险（如果你在可能导入了其他模块的脚本中使用海龟绘图则可能会遇到更大的问题）。

解决办法是使用 `import turtle` —— `fd()` 将变成 `turtle.fd()`，`width()` 将变成 `turtle.width()` 等等。 （如果反复输入“turtle”太过烦琐，还可改成 `import turtle as t` 等。）

### 在脚本中使用海龟绘图[¶](#use-turtle-graphics-in-a-script "Link to this heading")

建议使用上文所述的 `turtle` 模块命名空间，例如:

import turtle as t
from random import random

for i in range(100):
    steps \= int(random() \* 100)
    angle \= int(random() \* 360)
    t.right(angle)
    t.fd(steps)

但还需要另一个步骤 —— 因为一旦脚本结束，Python 将会同时关闭海龟的窗口。 请添加:

t.mainloop()

到脚本的末尾。 现在脚本将等待被关闭而不会自动退出直到被主动终止，例如海龟绘图窗口被关闭。

### 使用面向对象的海龟绘图[¶](#use-object-oriented-turtle-graphics "Link to this heading")

除了非常基本的入门目的，或是尽快尝试操作之外，使用面向对象的方式进行海龟绘图更为常见也更为强大。 例如，这将允许屏幕上同时存在多只海龟。

在这种方式下，各种海龟命令都是对象（主要是 `Turtle` 对象）的方法。 你 _可以_ 在 shell 中使用面向对象的方法，但在 Python 脚本中使用是更为典型的做法。

这样上面的例子就将变成:

from turtle import Turtle
from random import random

t \= Turtle()
for i in range(100):
    steps \= int(random() \* 100)
    angle \= int(random() \* 360)
    t.right(angle)
    t.fd(steps)

t.screen.mainloop()

请注意最后一行。 `t.screen` 是 Turtle 实例所在的 [`Screen`](#turtle.Screen "turtle.Screen") 的实例；它是与海龟一起自动创建的。

海龟的屏幕可以被自定义，例如:

t.screen.title('Object-oriented turtle demo')
t.screen.bgcolor("orange")

## 参考[¶](#reference "Link to this heading")

备注

以下文档给出了函数的参数列表。对于方法来说当然还有额外的第一个参数 _self_，这里省略了。

### Turtle 方法[¶](#turtle-methods "Link to this heading")

海龟动作

移动和绘制

[`forward()`](#turtle.forward "turtle.forward") | [`fd()`](#turtle.fd "turtle.fd") 前进

[`backward()`](#turtle.backward "turtle.backward") | [`bk()`](#turtle.bk "turtle.bk") | [`back()`](#turtle.back "turtle.back") 后退

[`right()`](#turtle.right "turtle.right") | [`rt()`](#turtle.rt "turtle.rt") 右转

[`left()`](#turtle.left "turtle.left") | [`lt()`](#turtle.lt "turtle.lt") 左转

[`goto()`](#turtle.goto "turtle.goto") | [`setpos()`](#turtle.setpos "turtle.setpos") | [`setposition()`](#turtle.setposition "turtle.setposition") 前往/定位

[`setx()`](#turtle.setx "turtle.setx") 设置x坐标

[`sety()`](#turtle.sety "turtle.sety") 设置y坐标

[`setheading()`](#turtle.setheading "turtle.setheading") | [`seth()`](#turtle.seth "turtle.seth") 设置朝向

[`home()`](#turtle.home "turtle.home") 返回原点

[`circle()`](#turtle.circle "turtle.circle") 画圆

[`dot()`](#turtle.dot "turtle.dot") 画点

[`stamp()`](#turtle.stamp "turtle.stamp") 印章

[`clearstamp()`](#turtle.clearstamp "turtle.clearstamp") 清除印章

[`clearstamps()`](#turtle.clearstamps "turtle.clearstamps") 清除多个印章

[`undo()`](#turtle.undo "turtle.undo") 撤消

[`speed()`](#turtle.speed "turtle.speed") 速度

获取海龟的状态

[`position()`](#turtle.position "turtle.position") | [`pos()`](#turtle.pos "turtle.pos") 位置

[`towards()`](#turtle.towards "turtle.towards") 目标方向

[`xcor()`](#turtle.xcor "turtle.xcor") x坐标

[`ycor()`](#turtle.ycor "turtle.ycor") y坐标

[`heading()`](#turtle.heading "turtle.heading") 朝向

[`distance()`](#turtle.distance "turtle.distance") 距离

设置与度量单位

画笔控制

绘图状态

[`pendown()`](#turtle.pendown "turtle.pendown") | [`pd()`](#turtle.pd "turtle.pd") | [`down()`](#turtle.down "turtle.down") 画笔落下

[`penup()`](#turtle.penup "turtle.penup") | [`pu()`](#turtle.pu "turtle.pu") | [`up()`](#turtle.up "turtle.up") 画笔抬起

[`pensize()`](#turtle.pensize "turtle.pensize") | [`width()`](#turtle.width "turtle.width") 画笔粗细

[`pen()`](#turtle.pen "turtle.pen") 画笔

[`isdown()`](#turtle.isdown "turtle.isdown") 画笔是否落下

颜色控制

[`color()`](#turtle.color "turtle.color") 颜色

[`pencolor()`](#turtle.pencolor "turtle.pencolor") 画笔颜色

[`fillcolor()`](#turtle.fillcolor "turtle.fillcolor") 填充颜色

填充

[`filling()`](#turtle.filling "turtle.filling") 是否填充

[`begin_fill()`](#turtle.begin_fill "turtle.begin_fill") 开始填充

[`end_fill()`](#turtle.end_fill "turtle.end_fill") 结束填充

更多绘图控制

[`reset()`](#turtle.reset "turtle.reset") 重置

[`clear()`](#turtle.clear "turtle.clear") 清空

[`write()`](#turtle.write "turtle.write") 书写

海龟状态

可见性

[`showturtle()`](#turtle.showturtle "turtle.showturtle") | [`st()`](#turtle.st "turtle.st") 显示海龟

[`hideturtle()`](#turtle.hideturtle "turtle.hideturtle") | [`ht()`](#turtle.ht "turtle.ht") 隐藏海龟

[`isvisible()`](#turtle.isvisible "turtle.isvisible") 是否可见

外观

使用事件

[`onclick()`](#turtle.onclick "turtle.onclick") 当鼠标点击

[`onrelease()`](#turtle.onrelease "turtle.onrelease") 当鼠标释放

[`ondrag()`](#turtle.ondrag "turtle.ondrag") 当鼠标拖动

特殊海龟方法

[`begin_poly()`](#turtle.begin_poly "turtle.begin_poly") 开始记录多边形

[`end_poly()`](#turtle.end_poly "turtle.end_poly") 结束记录多边形

[`get_poly()`](#turtle.get_poly "turtle.get_poly") 获取多边形

[`clone()`](#turtle.clone "turtle.clone") 克隆

[`getturtle()`](#turtle.getturtle "turtle.getturtle") | [`getpen()`](#turtle.getpen "turtle.getpen") 获取海龟画笔

[`getscreen()`](#turtle.getscreen "turtle.getscreen") 获取屏幕

[`setundobuffer()`](#turtle.setundobuffer "turtle.setundobuffer") 设置撤消缓冲区

[`undobufferentries()`](#turtle.undobufferentries "turtle.undobufferentries") 撤消缓冲区条目数

### TurtleScreen/Screen 方法[¶](#methods-of-turtlescreen-screen "Link to this heading")

窗口控制

[`bgcolor()`](#turtle.bgcolor "turtle.bgcolor") 背景颜色

[`bgpic()`](#turtle.bgpic "turtle.bgpic") 背景图片

[`screensize()`](#turtle.screensize "turtle.screensize") 屏幕大小

[`setworldcoordinates()`](#turtle.setworldcoordinates "turtle.setworldcoordinates") 设置世界坐标系

动画控制

使用屏幕事件

[`listen()`](#turtle.listen "turtle.listen") 监听

[`onkey()`](#turtle.onkey "turtle.onkey") | [`onkeyrelease()`](#turtle.onkeyrelease "turtle.onkeyrelease") 当键盘按下并释放

[`onkeypress()`](#turtle.onkeypress "turtle.onkeypress") 当键盘按下

[`onclick()`](#turtle.onclick "turtle.onclick") | [`onscreenclick()`](#turtle.onscreenclick "turtle.onscreenclick") 当点击屏幕

[`ontimer()`](#turtle.ontimer "turtle.ontimer") 当达到定时

[`mainloop()`](#turtle.mainloop "turtle.mainloop") | [`done()`](#turtle.done "turtle.done") 主循环

设置与特殊方法

输入方法

[`textinput()`](#turtle.textinput "turtle.textinput") 文本输入

[`numinput()`](#turtle.numinput "turtle.numinput") 数字输入

Screen 专有方法

[`bye()`](#turtle.bye "turtle.bye") 退出

[`exitonclick()`](#turtle.exitonclick "turtle.exitonclick") 当点击时退出

[`setup()`](#turtle.setup "turtle.setup") 设置

[`title()`](#turtle.title "turtle.title") 标题

## RawTurtle/Turtle 方法和对应函数[¶](#methods-of-rawturtle-turtle-and-corresponding-functions "Link to this heading")

本节中的大部分示例都使用 Turtle 类的一个实例，命名为 `turtle`。

### 海龟动作[¶](#turtle-motion "Link to this heading")

turtle.forward(_distance_)[¶](#turtle.forward "Link to this definition")

turtle.fd(_distance_)[¶](#turtle.fd "Link to this definition")

参数:

**distance** -- 一个数值 (整型或浮点型)

海龟前进 _distance_ 指定的距离，方向为海龟的朝向。

\>>> turtle.position()
(0.00,0.00)
\>>> turtle.forward(25)
\>>> turtle.position()
(25.00,0.00)
\>>> turtle.forward(\-75)
\>>> turtle.position()
(-50.00,0.00)

turtle.back(_distance_)[¶](#turtle.back "Link to this definition")

turtle.bk(_distance_)[¶](#turtle.bk "Link to this definition")

turtle.backward(_distance_)[¶](#turtle.backward "Link to this definition")

参数:

**distance** -- 一个数值

海龟后退 _distance_ 指定的距离，方向与海龟的朝向相反。不改变海龟的朝向。

\>>> turtle.position()
(0.00,0.00)
\>>> turtle.backward(30)
\>>> turtle.position()
(-30.00,0.00)

turtle.right(_angle_)[¶](#turtle.right "Link to this definition")

turtle.rt(_angle_)[¶](#turtle.rt "Link to this definition")

参数:

**angle** -- 一个数值 (整型或浮点型)

海龟右转 _angle_ 个单位。(单位默认为角度，但可通过 [`degrees()`](#turtle.degrees "turtle.degrees") 和 [`radians()`](#turtle.radians "turtle.radians") 函数改变设置。) 角度的正负由海龟模式确定，参见 [`mode()`](#turtle.mode "turtle.mode")。

\>>> turtle.heading()
22.0
\>>> turtle.right(45)
\>>> turtle.heading()
337.0

turtle.left(_angle_)[¶](#turtle.left "Link to this definition")

turtle.lt(_angle_)[¶](#turtle.lt "Link to this definition")

参数:

**angle** -- 一个数值 (整型或浮点型)

海龟左转 _angle_ 个单位。(单位默认为角度，但可通过 [`degrees()`](#turtle.degrees "turtle.degrees") 和 [`radians()`](#turtle.radians "turtle.radians") 函数改变设置。) 角度的正负由海龟模式确定，参见 [`mode()`](#turtle.mode "turtle.mode")。

\>>> turtle.heading()
22.0
\>>> turtle.left(45)
\>>> turtle.heading()
67.0

turtle.goto(_x_, _y\=None_)[¶](#turtle.goto "Link to this definition")

turtle.setpos(_x_, _y\=None_)[¶](#turtle.setpos "Link to this definition")

turtle.setposition(_x_, _y\=None_)[¶](#turtle.setposition "Link to this definition")

参数:

-   **x** -- 一个数值或数值对/向量
    
-   **y** -- 一个数值或 `None`
    

如果 _y_ 为 `None`，_x_ 应为一个表示坐标的数值对或 [`Vec2D`](#turtle.Vec2D "turtle.Vec2D") 类对象 (例如 [`pos()`](#turtle.pos "turtle.pos") 返回的对象).

海龟移动到一个绝对坐标。如果画笔已落下将会画线。不改变海龟的朝向。

\>>> tp \= turtle.pos()
\>>> tp
(0.00,0.00)
\>>> turtle.setpos(60,30)
\>>> turtle.pos()
(60.00,30.00)
\>>> turtle.setpos((20,80))
\>>> turtle.pos()
(20.00,80.00)
\>>> turtle.setpos(tp)
\>>> turtle.pos()
(0.00,0.00)

turtle.teleport(_x_, _y\=None_, _\*_, _fill\_gap\=False_)[¶](#turtle.teleport "Link to this definition")

参数:

-   **x** -- 一个数值或 `None`
    
-   **y** -- 一个数值或 `None`
    
-   **fill\_gap** -- 布尔
    

将海龟移到某个绝对位置。 不同于 goto(x, y)，这将不会画一条线段。 海龟的方向不变。 如果当前正在填充，离开后原位置上的多边形将被填充，在移位后将再次开始填充。 这可以通过 fill\_gap=True 来禁用，此设置将使在移位期间海龟的移动轨迹线像在 goto(x, y) 中一样被当作填充边缘。

\>>> tp \= turtle.pos()
\>>> tp
(0.00,0.00)
\>>> turtle.teleport(60)
\>>> turtle.pos()
(60.00,0.00)
\>>> turtle.teleport(y\=10)
\>>> turtle.pos()
(60.00,10.00)
\>>> turtle.teleport(20, 30)
\>>> turtle.pos()
(20.00,30.00)

Added in version 3.12.

turtle.setx(_x_)[¶](#turtle.setx "Link to this definition")

参数:

**x** -- 一个数值 (整型或浮点型)

设置海龟的横坐标为 _x_，纵坐标保持不变。

\>>> turtle.position()
(0.00,240.00)
\>>> turtle.setx(10)
\>>> turtle.position()
(10.00,240.00)

turtle.sety(_y_)[¶](#turtle.sety "Link to this definition")

参数:

**y** -- 一个数值 (整型或浮点型)

设置海龟的纵坐标为 _y_，横坐标保持不变。

\>>> turtle.position()
(0.00,40.00)
\>>> turtle.sety(\-10)
\>>> turtle.position()
(0.00,-10.00)

turtle.setheading(_to\_angle_)[¶](#turtle.setheading "Link to this definition")

turtle.seth(_to\_angle_)[¶](#turtle.seth "Link to this definition")

参数:

**to\_angle** -- 一个数值 (整型或浮点型)

设置海龟的朝向为 _to\_angle_。以下是以角度表示的几个常用方向：

| 
标准模式

 | 

logo 模式

 |
| --- | --- |
| 

0 - 东

 | 

0 - 北

 |
| 

90 - 北

 | 

90 - 东

 |
| 

180 - 西

 | 

180 - 南

 |
| 

270 - 南

 | 

270 - 西

 |

\>>> turtle.setheading(90)
\>>> turtle.heading()
90.0

turtle.home()[¶](#turtle.home "Link to this definition")

海龟移至初始坐标 (0,0)，并设置朝向为初始方向 (由海龟模式确定，参见 [`mode()`](#turtle.mode "turtle.mode"))。

\>>> turtle.heading()
90.0
\>>> turtle.position()
(0.00,-10.00)
\>>> turtle.home()
\>>> turtle.position()
(0.00,0.00)
\>>> turtle.heading()
0.0

turtle.circle(_radius_, _extent\=None_, _steps\=None_)[¶](#turtle.circle "Link to this definition")

参数:

-   **radius** -- 一个数值
    
-   **extent** -- 一个数值 (或 `None`)
    
-   **steps** -- 一个整型数 (或 `None`)
    

绘制一个 _radius_ 指定半径的圆。圆心在海龟左边 _radius_ 个单位；_extent_ 为一个夹角，用来决定绘制圆的一部分。如未指定 _extent\*则绘制整个圆。如果 \*extent_ 不是完整圆周，则以当前画笔位置为一个端点绘制圆弧。如果 _radius_ 为正值则朝逆时针方向绘制圆弧，否则朝顺时针方向。最终海龟的朝向会依据 _extent_ 的值而改变。

圆实际是以其内切正多边形来近似表示的，其边的数量由 _steps_ 指定。如果未指定边数则会自动确定。此方法也可用来绘制正多边形。

\>>> turtle.home()
\>>> turtle.position()
(0.00,0.00)
\>>> turtle.heading()
0.0
\>>> turtle.circle(50)
\>>> turtle.position()
(-0.00,0.00)
\>>> turtle.heading()
0.0
\>>> turtle.circle(120, 180)  \# 画一个半圆
\>>> turtle.position()
(0.00,240.00)
\>>> turtle.heading()
180.0

turtle.dot()[¶](#turtle.dot "Link to this definition")

turtle.dot(_size_)

turtle.dot(_color_, _/_)

turtle.dot(_size_, _color_, _/_)

turtle.dot(_size_, _r_, _g_, _b_, _/_)

参数:

-   **size** -- 一个整型数 >= 1 (如果指定)
    
-   **color** -- 一个颜色字符串或颜色数值元组
    

绘制一个直径为 _size_，颜色为 _color_ 的圆点。 如果未给出 _size_，则使用 `pensize+4` 和 `2*pensize` 中的较大值。

\>>> turtle.home()
\>>> turtle.dot()
\>>> turtle.fd(50); turtle.dot(20, "blue"); turtle.fd(50)
\>>> turtle.position()
(100.00,-0.00)
\>>> turtle.heading()
0.0

turtle.stamp()[¶](#turtle.stamp "Link to this definition")

在海龟当前位置印制一个海龟形状。返回该印章的 stamp\_id，印章可以通过调用 `clearstamp(stamp_id)` 来删除。

\>>> turtle.color("blue")
\>>> stamp\_id \= turtle.stamp()
\>>> turtle.fd(50)

turtle.clearstamp(_stampid_)[¶](#turtle.clearstamp "Link to this definition")

参数:

**stampid** -- 一个整型数，必须是之前 [`stamp()`](#turtle.stamp "turtle.stamp") 调用的返回值

删除 _stampid_ 指定的印章。

\>>> turtle.position()
(150.00,-0.00)
\>>> turtle.color("blue")
\>>> astamp \= turtle.stamp()
\>>> turtle.fd(50)
\>>> turtle.position()
(200.00,-0.00)
\>>> turtle.clearstamp(astamp)
\>>> turtle.position()
(200.00,-0.00)

turtle.clearstamps(_n\=None_)[¶](#turtle.clearstamps "Link to this definition")

参数:

**n** -- 一个整型数 (或 `None`)

删除全部或前/后 _n_ 个海龟印章。如果 _n_ 为 `None` 则删除全部印章，如果 _n_ > 0 则删除前 _n_ 个印章，否则如果 _n_ < 0 则删除后 _n_ 个印章。

\>>> for i in range(8):
...     unused\_stamp\_id \= turtle.stamp()
...     turtle.fd(30)
\>>> turtle.clearstamps(2)
\>>> turtle.clearstamps(\-2)
\>>> turtle.clearstamps()

turtle.undo()[¶](#turtle.undo "Link to this definition")

撤消 (或连续撤消) 最近的一个 (或多个) 海龟动作。可撤消的次数由撤消缓冲区的大小决定。

\>>> for i in range(4):
...     turtle.fd(50); turtle.lt(80)
...
\>>> for i in range(8):
...     turtle.undo()

turtle.speed(_speed\=None_)[¶](#turtle.speed "Link to this definition")

参数:

**speed** -- 一个 0..10 范围内的整型数或速度字符串 (见下)

设置海龟移动的速度为 0..10 表示的整型数值。如未指定参数则返回当前速度。

如果输入数值大于 10 或小于 0.5 则速度设为 0。速度字符串与速度值的对应关系如下:

-   "fastest": 0 最快
    
-   "fast": 10 快
    
-   "normal": 6 正常
    
-   "slow": 3 慢
    
-   "slowest": 1 最慢
    

速度值从 1 到 10，画线和海龟转向的动画效果逐级加快。

注意: _speed_ = 0 表示 _没有_ 动画效果。forward/back 将使海龟向前/向后跳跃，同样的 left/right 将使海龟立即改变朝向。

\>>> turtle.speed()
3
\>>> turtle.speed('normal')
\>>> turtle.speed()
6
\>>> turtle.speed(9)
\>>> turtle.speed()
9

### 获取海龟的状态[¶](#tell-turtle-s-state "Link to this heading")

turtle.position()[¶](#turtle.position "Link to this definition")

turtle.pos()[¶](#turtle.pos "Link to this definition")

返回海龟当前的坐标 (x,y) (为 [`Vec2D`](#turtle.Vec2D "turtle.Vec2D") 矢量类对象)。

\>>> turtle.pos()
(440.00,-0.00)

turtle.towards(_x_, _y\=None_)[¶](#turtle.towards "Link to this definition")

参数:

-   **x** -- 一个数值或数值对/矢量，或一个海龟实例
    
-   **y** -- 一个数值——如果 _x_ 是一个数值，否则为 `None`
    

返回从海龟位置到由 (x,y)、矢量或另一海龟所确定位置的连线的夹角。 此数值依赖于海龟的初始朝向，这又取决于 "standard"/"world" 或 "logo" 模式设置。

\>>> turtle.goto(10, 10)
\>>> turtle.towards(0,0)
225.0

turtle.xcor()[¶](#turtle.xcor "Link to this definition")

返回海龟的 x 坐标。

\>>> turtle.home()
\>>> turtle.left(50)
\>>> turtle.forward(100)
\>>> turtle.pos()
(64.28,76.60)
\>>> print(round(turtle.xcor(), 5))
64.27876

turtle.ycor()[¶](#turtle.ycor "Link to this definition")

返回海龟的 y 坐标。

\>>> turtle.home()
\>>> turtle.left(60)
\>>> turtle.forward(100)
\>>> print(turtle.pos())
(50.00,86.60)
\>>> print(round(turtle.ycor(), 5))
86.60254

turtle.heading()[¶](#turtle.heading "Link to this definition")

返回海龟当前的朝向 (数值依赖于海龟模式参见 [`mode()`](#turtle.mode "turtle.mode"))。

\>>> turtle.home()
\>>> turtle.left(67)
\>>> turtle.heading()
67.0

turtle.distance(_x_, _y\=None_)[¶](#turtle.distance "Link to this definition")

参数:

-   **x** -- 一个数值或数值对/矢量，或一个海龟实例
    
-   **y** -- 一个数值——如果 _x_ 是一个数值，否则为 `None`
    

返回从海龟位置到由 (x,y)，矢量或另一海龟对应位置的单位距离。

\>>> turtle.home()
\>>> turtle.distance(30,40)
50.0
\>>> turtle.distance((30,40))
50.0
\>>> joe \= Turtle()
\>>> joe.forward(77)
\>>> turtle.distance(joe)
77.0

### 度量单位设置[¶](#settings-for-measurement "Link to this heading")

turtle.degrees(_fullcircle\=360.0_)[¶](#turtle.degrees "Link to this definition")

参数:

**fullcircle** -- 一个数值

设置角度的度量单位，即设置一个圆周为多少 "度"。默认值为 360 度。

\>>> turtle.home()
\>>> turtle.left(90)
\>>> turtle.heading()
90.0

\>>> \# 将角度计量单位改为 grad (或称 gon, grade
\>>> \# 或 gradian，等于直角的 1/100。）
\>>> turtle.degrees(400.0)
\>>> turtle.heading()
100.0
\>>> turtle.degrees(360)
\>>> turtle.heading()
90.0

turtle.radians()[¶](#turtle.radians "Link to this definition")

设置角度的度量单位为弧度。其值等于 `degrees(2*math.pi)`。

\>>> turtle.home()
\>>> turtle.left(90)
\>>> turtle.heading()
90.0
\>>> turtle.radians()
\>>> turtle.heading()
1.5707963267948966

### 画笔控制[¶](#id1 "Link to this heading")

#### 绘图状态[¶](#drawing-state "Link to this heading")

turtle.pendown()[¶](#turtle.pendown "Link to this definition")

turtle.pd()[¶](#turtle.pd "Link to this definition")

turtle.down()[¶](#turtle.down "Link to this definition")

画笔落下 -- 移动时将画线。

turtle.penup()[¶](#turtle.penup "Link to this definition")

turtle.pu()[¶](#turtle.pu "Link to this definition")

turtle.up()[¶](#turtle.up "Link to this definition")

画笔抬起 -- 移动时不画线。

turtle.pensize(_width\=None_)[¶](#turtle.pensize "Link to this definition")

turtle.width(_width\=None_)[¶](#turtle.width "Link to this definition")

参数:

**width** -- 一个正数值

设置线条的粗细为 _width_ 或返回该值。如果 resizemode 设为 "auto" 并且 turtleshape 为多边形，该多边形也以同样粗细的线条绘制。如未指定参数，则返回当前的 pensize。

\>>> turtle.pensize()
1
\>>> turtle.pensize(10)   \# 从这里开始，画出宽度为10的线

turtle.pen(_pen\=None_, _\*\*pendict_)[¶](#turtle.pen "Link to this definition")

参数:

-   **pen** -- 一个包含部分或全部下列键的字典
    
-   **pendict** -- 一个或多个以下列键为关键字的关键字参数
    

返回或设置画笔的属性，以一个包含以下键值对的 "画笔字典" 表示:

-   "shown": True/False
    
-   "pendown": True/False
    
-   "pencolor": 颜色字符串或颜色元组
    
-   "fillcolor": 颜色字符串或颜色元组
    
-   "pensize": 正数值
    
-   "speed": 0..10 范围内的数值
    
-   "resizemode": "auto" 或 "user" 或 "noresize"
    
-   "stretchfactor": (正数值, 正数值)
    
-   "outline": 正数值
    
-   "tilt": 数值
    

此字典可作为后续调用 [`pen()`](#turtle.pen "turtle.pen") 时的参数，以恢复之前的画笔状态。另外还可将这些属性作为关键词参数提交。使用此方式可以用一条语句设置画笔的多个属性。

\>>> turtle.pen(fillcolor\="black", pencolor\="red", pensize\=10)
\>>> sorted(turtle.pen().items())
\[('fillcolor', 'black'), ('outline', 1), ('pencolor', 'red'),
 ('pendown', True), ('pensize', 10), ('resizemode', 'noresize'),
 ('shearfactor', 0.0), ('shown', True), ('speed', 9),
 ('stretchfactor', (1.0, 1.0)), ('tilt', 0.0)\]
\>>> penstate\=turtle.pen()
\>>> turtle.color("yellow", "")
\>>> turtle.penup()
\>>> sorted(turtle.pen().items())\[:3\]
\[('fillcolor', ''), ('outline', 1), ('pencolor', 'yellow')\]
\>>> turtle.pen(penstate, fillcolor\="green")
\>>> sorted(turtle.pen().items())\[:3\]
\[('fillcolor', 'green'), ('outline', 1), ('pencolor', 'red')\]

turtle.isdown()[¶](#turtle.isdown "Link to this definition")

如果画笔落下返回 `True`，如果画笔抬起返回 `False`。

\>>> turtle.penup()
\>>> turtle.isdown()
False
\>>> turtle.pendown()
\>>> turtle.isdown()
True

#### 颜色控制[¶](#color-control "Link to this heading")

turtle.pencolor()[¶](#turtle.pencolor "Link to this definition")

turtle.pencolor(_color_, _/_)

turtle.pencolor(_r_, _g_, _b_, _/_)

返回或设置画笔颜色。

允许以下四种输入格式:

`pencolor()`

返回以颜色描述字符串或元组（见示例）表示的当前画笔颜色。 可用作其他 color/pencolor/fillcolor/bgcolor 调用的输入。

`pencolor(colorstring)`

设置画笔颜色为 _colorstring_ 指定的 Tk 颜色描述字符串，例如 `"red"`、`"yellow"` 或 `"#33cc8c"`。

`pencolor((r, g, b))`

设置画笔颜色为以 _r_, _g_, _b_ 元组表示的 RGB 颜色。_r_, _g_, _b_ 的取值范围应为 0..colormode，colormode 的值为 1.0 或 255 (参见 [`colormode()`](#turtle.colormode "turtle.colormode"))。

`pencolor(r, g, b)`

设置画笔颜色为以 _r_, _g_, _b_ 表示的 RGB 颜色。_r_, _g_, _b_ 的取值范围应为 0..colormode。

如果 turtleshape 为多边形，该多边形轮廓也以新设置的画笔颜色绘制。

\>>> colormode()
1.0
\>>> turtle.pencolor()
'red'
\>>> turtle.pencolor("brown")
\>>> turtle.pencolor()
'brown'
\>>> tup \= (0.2, 0.8, 0.55)
\>>> turtle.pencolor(tup)
\>>> turtle.pencolor()
(0.2, 0.8, 0.5490196078431373)
\>>> colormode(255)
\>>> turtle.pencolor()
(51.0, 204.0, 140.0)
\>>> turtle.pencolor('#32c18f')
\>>> turtle.pencolor()
(50.0, 193.0, 143.0)

turtle.fillcolor()[¶](#turtle.fillcolor "Link to this definition")

turtle.fillcolor(_color_, _/_)

turtle.fillcolor(_r_, _g_, _b_, _/_)

返回或设置填充颜色。

允许以下四种输入格式:

`fillcolor()`

返回以颜色描述字符串，也可能为元组格式（见示例）表示的当前填充颜色。 可用作其他 color/pencolor/fillcolor/bgcolor 调用的输入。

`fillcolor(colorstring)`

设置填充颜色为 _colorstring_ 指定的 Tk 颜色描述字符串，例如 `"red"`、`"yellow"` 或 `"#33cc8c"`。

`fillcolor((r, g, b))`

设置填充颜色为以 _r_, _g_, _b_ 元组表示的 RGB 颜色。_r_, _g_, _b_ 的取值范围应为 0..colormode，colormode 的值为 1.0 或 255 (参见 [`colormode()`](#turtle.colormode "turtle.colormode"))。

`fillcolor(r, g, b)`

设置填充颜色为 _r_, _g_, _b_ 表示的 RGB 颜色。_r_, _g_, _b_ 的取值范围应为 0..colormode。

如果 turtleshape 为多边形，该多边形内部也以新设置的填充颜色填充。

\>>> turtle.fillcolor("violet")
\>>> turtle.fillcolor()
'violet'
\>>> turtle.pencolor()
(50.0, 193.0, 143.0)
\>>> turtle.fillcolor((50, 193, 143))  \# 整数，而非浮点数
\>>> turtle.fillcolor()
(50.0, 193.0, 143.0)
\>>> turtle.fillcolor('#ffffff')
\>>> turtle.fillcolor()
(255.0, 255.0, 255.0)

turtle.color()[¶](#turtle.color "Link to this definition")

turtle.color(_color_, _/_)

turtle.color(_r_, _g_, _b_, _/_)

turtle.color(_pencolor_, _fillcolor_, _/_)

返回或设置画笔颜色和填充颜色。

允许多种输入格式。使用如下 0 至 3 个参数:

`color()`

返回以一对颜色描述字符串或元组表示的当前画笔颜色和填充颜色，两者可分别由 [`pencolor()`](#turtle.pencolor "turtle.pencolor") 和 [`fillcolor()`](#turtle.fillcolor "turtle.fillcolor") 返回。

`color(colorstring)`, `color((r,g,b))`, `color(r,g,b)`

输入格式与 [`pencolor()`](#turtle.pencolor "turtle.pencolor") 相同，同时设置填充颜色和画笔颜色为指定的值。

`color(colorstring1, colorstring2)`, `color((r1,g1,b1), (r2,g2,b2))`

相当于 `pencolor(colorstring1)` 加 `fillcolor(colorstring2)`，使用其他输入格式的方法也与之类似。

如果 turtleshape 为多边形，该多边形轮廓与填充也使用新设置的颜色。

\>>> turtle.color("red", "green")
\>>> turtle.color()
('red', 'green')
\>>> color("#285078", "#a0c8f0")
\>>> color()
((40.0, 80.0, 120.0), (160.0, 200.0, 240.0))

另参见: Screen 方法 [`colormode()`](#turtle.colormode "turtle.colormode")。

#### 填充[¶](#filling "Link to this heading")

turtle.filling()[¶](#turtle.filling "Link to this definition")

返回填充状态 (填充为 `True`，否则为 `False`)。

\>>> turtle.begin\_fill()
\>>> if turtle.filling():
...    turtle.pensize(5)
... else:
...    turtle.pensize(3)

turtle.fill()[¶](#turtle.fill "Link to this definition")

填充在 `with turtle.fill():` 块中绘制的形状。

\>>> turtle.color("black", "red")
\>>> with turtle.fill():
...     turtle.circle(80)

使用 `fill()` 相当于在填充块之前添加 [`begin_fill()`](#turtle.begin_fill "turtle.begin_fill")，在填充块之后添加 [`end_fill()`](#turtle.end_fill "turtle.end_fill"):

\>>> turtle.color("black", "red")
\>>> turtle.begin\_fill()
\>>> turtle.circle(80)
\>>> turtle.end\_fill()

Added in version 3.14.

turtle.begin\_fill()[¶](#turtle.begin_fill "Link to this definition")

在绘制要填充的形状之前调用。

turtle.end\_fill()[¶](#turtle.end_fill "Link to this definition")

填充上次调用 [`begin_fill()`](#turtle.begin_fill "turtle.begin_fill") 之后绘制的形状。

自相交多边形或多个形状间的重叠区域是否填充取决于操作系统的图形引擎、重叠的类型以及重叠的层数。 例如上面的 Turtle 多芒星可能会全部填充为黄色，也可能会有一些白色区域。

\>>> turtle.color("black", "red")
\>>> turtle.begin\_fill()
\>>> turtle.circle(80)
\>>> turtle.end\_fill()

#### 更多绘图控制[¶](#more-drawing-control "Link to this heading")

turtle.reset()[¶](#turtle.reset "Link to this definition")

从屏幕中删除海龟的绘图，海龟回到原点并设置所有变量为默认值。

\>>> turtle.goto(0,\-22)
\>>> turtle.left(100)
\>>> turtle.position()
(0.00,-22.00)
\>>> turtle.heading()
100.0
\>>> turtle.reset()
\>>> turtle.position()
(0.00,0.00)
\>>> turtle.heading()
0.0

turtle.clear()[¶](#turtle.clear "Link to this definition")

从屏幕中删除指定海龟的绘图。不移动海龟。海龟的状态和位置以及其他海龟的绘图不受影响。

turtle.write(_arg_, _move\=False_, _align\='left'_, _font\=('Arial', 8, 'normal')_)[¶](#turtle.write "Link to this definition")

参数:

-   **arg** -- 要书写到 TurtleScreen 的对象
    
-   **move** -- True/False
    
-   **align** -- 字符串 "left", "center" 或 "right"
    
-   **font** -- 一个三元组 (fontname, fontsize, fonttype)
    

基于 _align_ ("left", "center" 或 "right") 并使用给定的字体将文本 —— _arg_ 的字符串表示形式 —— 写到当前海龟位置。 如果 _move_ 为真值，画笔会移至文本的右下角。 默认情况下 _move_ 为 `False`。

\>>> turtle.write("Home = ", True, align\="center")
\>>> turtle.write((0,0), True)

### 海龟状态[¶](#turtle-state "Link to this heading")

#### 可见性[¶](#visibility "Link to this heading")

turtle.hideturtle()[¶](#turtle.hideturtle "Link to this definition")

turtle.ht()[¶](#turtle.ht "Link to this definition")

使海龟不可见。当你绘制复杂图形时这是个好主意，因为隐藏海龟可显著加快绘制速度。

\>>> turtle.hideturtle()

turtle.showturtle()[¶](#turtle.showturtle "Link to this definition")

turtle.st()[¶](#turtle.st "Link to this definition")

使海龟可见。

\>>> turtle.showturtle()

turtle.isvisible()[¶](#turtle.isvisible "Link to this definition")

如果海龟显示返回 `True`，如果海龟隐藏返回 `False`。

\>>> turtle.hideturtle()
\>>> turtle.isvisible()
False
\>>> turtle.showturtle()
\>>> turtle.isvisible()
True

#### 外观[¶](#appearance "Link to this heading")

turtle.shape(_name\=None_)[¶](#turtle.shape "Link to this definition")

参数:

**name** -- 一个有效的形状名字符串

设置海龟形状为 _name_ 指定的形状名，如未指定形状名则返回当前的形状名。_name_ 指定的形状名应存在于 TurtleScreen 的 shape 字典中。多边形的形状初始时有以下几种: "arrow", "turtle", "circle", "square", "triangle", "classic"。要了解如何处理形状请参看 Screen 方法 [`register_shape()`](#turtle.register_shape "turtle.register_shape")。

\>>> turtle.shape()
'classic'
\>>> turtle.shape("turtle")
\>>> turtle.shape()
'turtle'

turtle.resizemode(_rmode\=None_)[¶](#turtle.resizemode "Link to this definition")

参数:

**rmode** -- 字符串 "auto", "user", "noresize" 其中之一

设置大小调整模式为以下值之一: "auto", "user", "noresize"。如未指定 _rmode_ 则返回当前的大小调整模式。不同的大小调整模式的效果如下:

-   "auto": 根据画笔粗细值调整海龟的外观。
    
-   "user": 根据拉伸因子和轮廓宽度 (outline) 值调整海龟的外观，两者是由 [`shapesize()`](#turtle.shapesize "turtle.shapesize") 设置的。
    
-   "noresize": 不调整海龟的外观大小。
    

`resizemode("user")` 会由 [`shapesize()`](#turtle.shapesize "turtle.shapesize") 带参数使用时被调用。

\>>> turtle.resizemode()
'noresize'
\>>> turtle.resizemode("auto")
\>>> turtle.resizemode()
'auto'

turtle.shapesize(_stretch\_wid\=None_, _stretch\_len\=None_, _outline\=None_)[¶](#turtle.shapesize "Link to this definition")

turtle.turtlesize(_stretch\_wid\=None_, _stretch\_len\=None_, _outline\=None_)[¶](#turtle.turtlesize "Link to this definition")

参数:

-   **stretch\_wid** -- 正数值
    
-   **stretch\_len** -- 正数值
    
-   **outline** -- 正数值
    

返回或设置画笔的属性 x/y 拉伸因子和/或轮廓。 设置大小调整模式为 "user"。 当且仅当大小调整模式为 "user" 时，海龟会基于其拉伸因子调整外观: _stretch\_wid_ 为垂直于其朝向的宽度拉伸因子，_stretch\_len_ 为平行于其朝向的长度拉伸因子，_outline_ 决定形状轮廓线的宽度。

\>>> turtle.shapesize()
(1.0, 1.0, 1)
\>>> turtle.resizemode("user")
\>>> turtle.shapesize(5, 5, 12)
\>>> turtle.shapesize()
(5, 5, 12)
\>>> turtle.shapesize(outline\=8)
\>>> turtle.shapesize()
(5, 5, 8)

turtle.shearfactor(_shear\=None_)[¶](#turtle.shearfactor "Link to this definition")

参数:

**shear** -- 数值 (可选)

设置或返回当前的剪切因子。根据 shear 指定的剪切因子即剪切角度的切线来剪切海龟形状。_不_ 改变海龟的朝向 (移动方向)。如未指定 shear 参数: 返回当前的剪切因子即剪切角度的切线，与海龟朝向平行的线条将被剪切。

\>>> turtle.shape("circle")
\>>> turtle.shapesize(5,2)
\>>> turtle.shearfactor(0.5)
\>>> turtle.shearfactor()
0.5

turtle.tilt(_angle_)[¶](#turtle.tilt "Link to this definition")

参数:

**angle** -- 一个数值

海龟形状自其当前的倾角转动 _angle_ 指定的角度，但 _不_ 改变海龟的朝向 (移动方向)。

\>>> turtle.reset()
\>>> turtle.shape("circle")
\>>> turtle.shapesize(5,2)
\>>> turtle.tilt(30)
\>>> turtle.fd(50)
\>>> turtle.tilt(30)
\>>> turtle.fd(50)

turtle.tiltangle(_angle\=None_)[¶](#turtle.tiltangle "Link to this definition")

参数:

**angle** -- 一个数值 (可选)

设置或返回当前的倾角。如果指定 angle 则旋转海龟形状使其指向 angle 指定的方向，忽略其当前的倾角。_不_ 改变海龟的朝向 (移动方向)。如果未指定 angle: 返回当前的倾角，即海龟形状的方向和海龟朝向 (移动方向) 之间的夹角。

\>>> turtle.reset()
\>>> turtle.shape("circle")
\>>> turtle.shapesize(5,2)
\>>> turtle.tilt(45)
\>>> turtle.tiltangle()
45.0

turtle.shapetransform(_t11\=None_, _t12\=None_, _t21\=None_, _t22\=None_)[¶](#turtle.shapetransform "Link to this definition")

参数:

-   **t11** -- 一个数值 (可选)
    
-   **t12** -- 一个数值 (可选)
    
-   **t21** -- 一个数值 (可选)
    
-   **t12** -- 一个数值 (可选)
    

设置或返回海龟形状的当前变形矩阵。

如未指定任何矩阵元素，则返回以 4 元素元组表示的变形矩阵。 否则就根据设置指定元素的矩阵来改变海龟形状，矩阵第一排的值为 t11, t12 而第二排的值为 t21, t22。 行列式 t11 \* t22 - t12 \* t21 必须不为零，否则会引发错误。 根据指定矩阵修改拉伸因子 stretchfactor, 剪切因子 shearfactor 和倾角 tiltangle。

\>>> turtle \= Turtle()
\>>> turtle.shape("square")
\>>> turtle.shapesize(4,2)
\>>> turtle.shearfactor(\-0.5)
\>>> turtle.shapetransform()
(4.0, -1.0, -0.0, 2.0)

turtle.get\_shapepoly()[¶](#turtle.get_shapepoly "Link to this definition")

返回以坐标值对元组表示的当前形状多边形。这可以用于定义一个新形状或一个复合形状的多个组成部分。

\>>> turtle.shape("square")
\>>> turtle.shapetransform(4, \-1, 0, 2)
\>>> turtle.get\_shapepoly()
((50, -20), (30, 20), (-50, 20), (-30, -20))

### 使用事件[¶](#using-events "Link to this heading")

turtle.onclick(_fun_, _btn\=1_, _add\=None_)

参数:

-   **fun** -- 一个函数，调用时将传入两个参数表示在画布上点击的坐标。
    
-   **btn** -- 鼠标按钮编号，默认值为 1 (鼠标左键)
    
-   **add** -- `True` 或 `False` -- 如为 `True` 则将添加一个新绑定，否则将取代先前的绑定
    

将 _fun_ 指定的函数绑定到鼠标点击此海龟事件。如果 _fun_ 值为 `None`，则移除现有的绑定。以下为使用匿名海龟即过程式的示例:

\>>> def turn(x, y):
...     left(180)
...
\>>> onclick(turn)  \# 现在点击海龟将使其转向。
\>>> onclick(None)  \# 事件绑定将被移除

turtle.onrelease(_fun_, _btn\=1_, _add\=None_)[¶](#turtle.onrelease "Link to this definition")

参数:

-   **fun** -- 一个函数，调用时将传入两个参数表示在画布上点击的坐标。
    
-   **btn** -- 鼠标按钮编号，默认值为 1 (鼠标左键)
    
-   **add** -- `True` 或 `False` -- 如为 `True` 则将添加一个新绑定，否则将取代先前的绑定
    

将 _fun_ 指定的函数绑定到在此海龟上释放鼠标按键事件。如果 _fun_ 值为 `None`，则移除现有的绑定。

\>>> class MyTurtle(Turtle):
...     def glow(self,x,y):
...         self.fillcolor("red")
...     def unglow(self,x,y):
...         self.fillcolor("")
...
\>>> turtle \= MyTurtle()
\>>> turtle.onclick(turtle.glow)     \# 点击turtle会将填充颜色设置为红色。
\>>> turtle.onrelease(turtle.unglow) \# 释放会使它变得透明

turtle.ondrag(_fun_, _btn\=1_, _add\=None_)[¶](#turtle.ondrag "Link to this definition")

参数:

-   **fun** -- 一个函数，调用时将传入两个参数表示在画布上点击的坐标。
    
-   **btn** -- 鼠标按钮编号，默认值为 1 (鼠标左键)
    
-   **add** -- `True` 或 `False` -- 如为 `True` 则将添加一个新绑定，否则将取代先前的绑定
    

将 _fun_ 指定的函数绑定到在此海龟上移动鼠标事件。如果 _fun_ 值为 `None`，则移除现有的绑定。

注: 在海龟上移动鼠标事件之前应先发生在此海龟上点击鼠标事件。

\>>> turtle.ondrag(turtle.goto)

在此之后点击并拖动海龟可在屏幕上手绘线条 (如果画笔为落下)。

### 特殊海龟方法[¶](#special-turtle-methods "Link to this heading")

turtle.poly()[¶](#turtle.poly "Link to this definition")

记录在 `with turtle.poly():` 块中绘制的多边形的顶点。 第一个和最后一个顶点将被连接。

\>>> with turtle.poly():
...     turtle.forward(100)
...     turtle.right(60)
...     turtle.forward(100)

Added in version 3.14.

turtle.begin\_poly()[¶](#turtle.begin_poly "Link to this definition")

开始记录多边形的顶点。当前海龟位置为多边形的第一个顶点。

turtle.end\_poly()[¶](#turtle.end_poly "Link to this definition")

停止记录多边形的顶点。当前海龟位置为多边形的最后一个顶点。它将连线到第一个顶点。

turtle.get\_poly()[¶](#turtle.get_poly "Link to this definition")

返回最新记录的多边形。

\>>> turtle.home()
\>>> turtle.begin\_poly()
\>>> turtle.fd(100)
\>>> turtle.left(20)
\>>> turtle.fd(30)
\>>> turtle.left(60)
\>>> turtle.fd(50)
\>>> turtle.end\_poly()
\>>> p \= turtle.get\_poly()
\>>> register\_shape("myFavouriteShape", p)

turtle.clone()[¶](#turtle.clone "Link to this definition")

创建并返回海龟的克隆体，具有相同的位置、朝向和海龟属性。

\>>> mick \= Turtle()
\>>> joe \= mick.clone()

turtle.getturtle()[¶](#turtle.getturtle "Link to this definition")

turtle.getpen()[¶](#turtle.getpen "Link to this definition")

返回海龟对象自身。唯一合理的用法: 作为一个函数来返回 "匿名海龟":

\>>> pet \= getturtle()
\>>> pet.fd(50)
\>>> pet
<turtle.Turtle object at 0x...>

turtle.getscreen()[¶](#turtle.getscreen "Link to this definition")

返回作为海龟绘图场所的 [`TurtleScreen`](#turtle.TurtleScreen "turtle.TurtleScreen") 类对象。该对象将可调用 TurtleScreen 方法。

\>>> ts \= turtle.getscreen()
\>>> ts
<turtle.\_Screen object at 0x...>
\>>> ts.bgcolor("pink")

turtle.setundobuffer(_size_)[¶](#turtle.setundobuffer "Link to this definition")

参数:

**size** -- 一个整型数值或 `None`

设置或禁用撤销缓冲区。 如果 _size_ 为整数，则开辟一个给定大小的空撤销缓冲区。 _size_ 给出了可以通过 [`undo()`](#turtle.undo "turtle.undo") 方法/函数撤销海龟动作的最大次数。 如果 _size_ 为 `None`，则禁用撤销缓冲区。

\>>> turtle.setundobuffer(42)

turtle.undobufferentries()[¶](#turtle.undobufferentries "Link to this definition")

返回撤销缓冲区里的条目数。

\>>> while undobufferentries():
...     undo()

### 复合形状[¶](#compound-shapes "Link to this heading")

要使用由多个不同颜色多边形构成的复合海龟形状，你必须明确地使用辅助类 [`Shape`](#turtle.Shape "turtle.Shape")，具体步骤如下:

1.  创建一个空 Shape 对象，类型为 "compound"。
    
2.  可根据需要使用 [`addcomponent()`](#turtle.Shape.addcomponent "turtle.Shape.addcomponent") 方法向此对象添加多个组件。
    
    例如:
    
    \>>> s \= Shape("compound")
    \>>> poly1 \= ((0,0),(10,\-5),(0,10),(\-10,\-5))
    \>>> s.addcomponent(poly1, "red", "blue")
    \>>> poly2 \= ((0,0),(10,\-5),(\-10,\-5))
    \>>> s.addcomponent(poly2, "blue", "red")
    
3.  接下来将 Shape 对象添加到 Screen 对象的形状列表并使用它:
    
    \>>> register\_shape("myshape", s)
    \>>> shape("myshape")
    

备注

[`Shape`](#turtle.Shape "turtle.Shape") 类在 [`register_shape()`](#turtle.register_shape "turtle.register_shape") 方法的内部以多种方式使用。应用程序编写者 _只有_ 在使用上述的复合形状时才需要处理 Shape 类。

## TurtleScreen/Screen 方法及对应函数[¶](#methods-of-turtlescreen-screen-and-corresponding-functions "Link to this heading")

本节中的大部分示例都使用 TurtleScreen 类的一个实例，命名为 `screen`。

### 窗口控制[¶](#window-control "Link to this heading")

turtle.bgcolor()[¶](#turtle.bgcolor "Link to this definition")

turtle.bgcolor(_color_, _/_)

turtle.bgcolor(_r_, _g_, _b_, _/_)

返回或设置 TurtleScreen 的背景颜色。

允许以下四种输入格式:

`bgcolor()`

返回以颜色描述字符串或元组（见示例）表示的当前背景颜色。 可用作其他 color/pencolor/fillcolor/bgcolor 调用的输入。

`bgcolor(colorstring)`

设置背景颜色为 _colorstring_，使用 Tk 颜色描述字符串形式，如 `"red"`, `"yellow"` 或 `"#33cc8c"`。

`bgcolor((r, g, b))`

设置背景颜色为由 _r_, _g_ 和 _b_ 组成的元组表示的 RGB 颜色。 _r_, _g_ 和 _b_ 的取值范围应为 0..colormode，其中为 1.0 或 255 (参见 [`colormode()`](#turtle.colormode "turtle.colormode"))。

`bgcolor(r, g, b)`

设置背景颜色为由 _r_, _g_ 和 _b_ 表示的 RGB 颜色。 _r_, _g_ 和 _b_ 的取值范围应为 0..colormode。

\>>> screen.bgcolor("orange")
\>>> screen.bgcolor()
'orange'
\>>> screen.bgcolor("#800080")
\>>> screen.bgcolor()
(128.0, 0.0, 128.0)

turtle.bgpic(_picname\=None_)[¶](#turtle.bgpic "Link to this definition")

参数:

**picname** -- 字符串，图像文件的名称（PNG、 GIF、 PGM 和 PPM）或 `"nopic"` 或 `None`

设置背景图片或返回当前背景图片名称。如果 _picname_ 为一个文件名，则将相应图片设为背景。如果 _picname_ 为 `"nopic"`，则删除当前背景图片。如果 _picname_ 为 `None`，则返回当前背景图片文件名。:

\>>> screen.bgpic()
'nopic'
\>>> screen.bgpic("landscape.gif")
\>>> screen.bgpic()
"landscape.gif"

turtle.clear()

备注

此 TurtleScreen 方法作为全局函数时只有一个名字 `clearscreen`。全局函数 `clear` 所对应的是 Turtle 方法 `clear`。

turtle.clearscreen()[¶](#turtle.clearscreen "Link to this definition")

从中删除所有海龟的全部绘图。将已清空的 TurtleScreen 重置为初始状态: 白色背景，无背景图片，无事件绑定并启用追踪。

turtle.reset()

备注

此 TurtleScreen 方法作为全局函数时只有一个名字 `resetscreen`。全局函数 `reset` 所对应的是 Turtle 方法 `reset`。

turtle.resetscreen()[¶](#turtle.resetscreen "Link to this definition")

重置屏幕上的所有海龟为其初始状态。

turtle.screensize(_canvwidth\=None_, _canvheight\=None_, _bg\=None_)[¶](#turtle.screensize "Link to this definition")

参数:

-   **canvwidth** -- 正整型数，以像素表示画布的新宽度值
    
-   **canvheight** -- 正整型数，以像素表示画布的新高度值
    
-   **bg** -- 颜色字符串或颜色元组，新的背景颜色
    

如未指定任何参数，则返回当前的 (canvaswidth, canvasheight)。否则改变作为海龟绘图场所的画布大小。不改变绘图窗口。要观察画布的隐藏区域，可以使用滚动条。通过此方法可以令之前绘制于画布之外的图形变为可见。

\>>> screen.screensize()
(400, 300)
\>>> screen.screensize(2000,1500)
\>>> screen.screensize()
(2000, 1500)

也可以用来寻找意外逃走的海龟 ;-)

turtle.setworldcoordinates(_llx_, _lly_, _urx_, _ury_)[¶](#turtle.setworldcoordinates "Link to this definition")

参数:

-   **llx** -- 一个数值, 画布左下角的 x-坐标
    
-   **lly** -- 一个数值, 画布左下角的 y-坐标
    
-   **urx** -- 一个数值, 画布右上角的 x-坐标
    
-   **ury** -- 一个数值, 画布右上角的 y-坐标
    

设置用户自定义坐标系并在必要时切换模式为 "world"。这会执行一次 `screen.reset()`。如果 "world" 模式已激活，则所有图形将根据新的坐标系重绘。

**注意**: 在用户自定义坐标系中，角度可能显得扭曲。

\>>> screen.reset()
\>>> screen.setworldcoordinates(\-50,\-7.5,50,7.5)
\>>> for \_ in range(72):
...     left(10)
...
\>>> for \_ in range(8):
...     left(45); fd(2)   \# 一个正八边形

### 动画控制[¶](#animation-control "Link to this heading")

turtle.no\_animation()[¶](#turtle.no_animation "Link to this definition")

暂时禁用海龟动画。 在 `no_animation` 块内编写的代码将不会被动画化；一旦代码块退出，绘图就会出现。

\>>> with screen.no\_animation():
...     for dist in range(2, 400, 2):
...         fd(dist)
...         rt(90)

Added in version 3.14.

turtle.delay(_delay\=None_)[¶](#turtle.delay "Link to this definition")

参数:

**delay** -- 正整型数

设置或返回以毫秒数表示的延迟值 _delay_。(这约等于连续两次画布刷新的间隔时间。) 绘图延迟越长，动画速度越慢。

可选参数:

\>>> screen.delay()
10
\>>> screen.delay(5)
\>>> screen.delay()
5

turtle.tracer(_n\=None_, _delay\=None_)[¶](#turtle.tracer "Link to this definition")

参数:

-   **n** -- 非负整型数
    
-   **delay** -- 非负整型数
    

启用/禁用海龟动画并设置刷新图形的延迟时间。如果指定 _n_ 值，则只有每第 n 次屏幕刷新会实际执行。(可被用来加速复杂图形的绘制。) 如果调用时不带参数，则返回当前保存的 n 值。第二个参数设置延迟值 (参见 [`delay()`](#turtle.delay "turtle.delay"))。

\>>> screen.tracer(8, 25)
\>>> dist \= 2
\>>> for i in range(200):
...     fd(dist)
...     rt(90)
...     dist += 2

turtle.update()[¶](#turtle.update "Link to this definition")

执行一次 TurtleScreen 刷新。在禁用追踪时使用。

另参见 RawTurtle/Turtle 方法 [`speed()`](#turtle.speed "turtle.speed")。

### 使用屏幕事件[¶](#using-screen-events "Link to this heading")

turtle.listen(_xdummy\=None_, _ydummy\=None_)[¶](#turtle.listen "Link to this definition")

设置焦点到 TurtleScreen (以便接收按键事件)。使用两个 Dummy 参数以便能够传递 [`listen()`](#turtle.listen "turtle.listen") 给 onclick 方法。

turtle.onkey(_fun_, _key_)[¶](#turtle.onkey "Link to this definition")

turtle.onkeyrelease(_fun_, _key_)[¶](#turtle.onkeyrelease "Link to this definition")

参数:

-   **fun** -- 一个无参数的函数或 `None`
    
-   **key** -- 一个字符串: 键 (例如 "a") 或键标 (例如 "space")
    

绑定 _fun_ 指定的函数到按键释放事件。如果 _fun_ 值为 `None`，则移除事件绑定。注: 为了能够注册按键事件，TurtleScreen 必须得到焦点。(参见 [`listen()`](#turtle.listen "turtle.listen") 方法。)

\>>> def f():
...     fd(50)
...     lt(60)
...
\>>> screen.onkey(f, "Up")
\>>> screen.listen()

turtle.onkeypress(_fun_, _key\=None_)[¶](#turtle.onkeypress "Link to this definition")

参数:

-   **fun** -- 一个无参数的函数或 `None`
    
-   **key** -- 一个字符串: 键 (例如 "a") 或键标 (例如 "space")
    

绑定 _fun_ 指定的函数到指定键的按下事件。如未指定键则绑定到任意键的按下事件。注: 为了能够注册按键事件，必须得到焦点。(参见 [`listen()`](#turtle.listen "turtle.listen") 方法。)

\>>> def f():
...     fd(50)
...
\>>> screen.onkey(f, "Up")
\>>> screen.listen()

turtle.onclick(_fun_, _btn\=1_, _add\=None_)[¶](#turtle.onclick "Link to this definition")

turtle.onscreenclick(_fun_, _btn\=1_, _add\=None_)[¶](#turtle.onscreenclick "Link to this definition")

参数:

-   **fun** -- 一个函数，调用时将传入两个参数表示在画布上点击的坐标。
    
-   **btn** -- 鼠标按钮编号，默认值为 1 (鼠标左键)
    
-   **add** -- `True` 或 `False` -- 如为 `True` 则将添加一个新绑定，否则将取代先前的绑定
    

绑定 _fun_ 指定的函数到鼠标点击屏幕事件。如果 _fun_ 值为 `None`，则移除现有的绑定。

以下示例使用一个 TurtleScreen 实例 `screen` 和一个 Turtle 实例 `turtle`:

\>>> screen.onclick(turtle.goto) \# 后续对 TurtleScreen 的点击
\>>>                             \# 将使海龟移至被点击的位置。
\>>> screen.onclick(None)        \# 再次移除事件绑定

备注

此 TurtleScreen 方法作为全局函数时只有一个名字 `onscreenclick`。全局函数 `onclick` 所对应的是 Turtle 方法 `onclick`。

turtle.ontimer(_fun_, _t\=0_)[¶](#turtle.ontimer "Link to this definition")

参数:

-   **fun** -- 一个无参数的函数
    
-   **t** -- 一个数值 >= 0
    

安装一个计时器，在 _t_ 毫秒后调用 _fun_ 函数。

\>>> running \= True
\>>> def f():
...     if running:
...         fd(50)
...         lt(60)
...         screen.ontimer(f, 250)
\>>> f()   \### 让海龟随意前进
\>>> running \= False

turtle.mainloop()[¶](#turtle.mainloop "Link to this definition")

turtle.done()[¶](#turtle.done "Link to this definition")

开始事件循环 - 调用 Tkinter 的 mainloop 函数。必须作为一个海龟绘图程序的结束语句。如果一个脚本是在以 -n 模式 (无子进程) 启动的 IDLE 中运行时 _不可_ 使用 - 用于实现海龟绘图的交互功能。:

\>>> screen.mainloop()

### 输入方法[¶](#input-methods "Link to this heading")

turtle.textinput(_title_, _prompt_)[¶](#turtle.textinput "Link to this definition")

参数:

-   **title** -- string
    
-   **prompt** -- string
    

弹出一个对话框窗口用来输入一个字符串。形参 title 为对话框窗口的标题，prompt 为一条文本，通常用来提示要输入什么信息。返回输入的字符串。如果对话框被取消则返回 `None`。:

\>>> screen.textinput("NIM", "Name of first player:")

turtle.numinput(_title_, _prompt_, _default\=None_, _minval\=None_, _maxval\=None_)[¶](#turtle.numinput "Link to this definition")

参数:

-   **title** -- string
    
-   **prompt** -- string
    
-   **default** -- 数值 (可选)
    
-   **minval** -- 数值 (可选)
    
-   **maxval** -- 数值 (可选)
    

弹出一个用于输入数值的对话框窗口。 title 是对话框窗口的标题，prompt 是通常用来描述要输入的数字信息的文本。 default: 默认值, minval: 可输入的最小值, maxval: 可输入的最大值。 如果给出 minval .. maxval 则输入的数值必须在此范围以内。 如未给出，则将发出提示并且对话框保持打开以便修正。 返回输入的数值。 如果对话框被取消，则返回 `None`。

\>>> screen.numinput("Poker", "Your stakes:", 1000, minval\=10, maxval\=10000)

### 设置与特殊方法[¶](#settings-and-special-methods "Link to this heading")

turtle.mode(_mode\=None_)[¶](#turtle.mode "Link to this definition")

参数:

**mode** -- 字符串 "standard", "logo" 或 "world" 其中之一

设置海龟模式 ("standard", "logo" 或 "world") 并执行重置。如未指定模式则返回当前的模式。

"standard" 模式与旧的 `turtle` 兼容。 "logo" 模式与大部分 Logo 海龟绘图兼容。 "world" 模式使用用户自定义的“世界坐标系”。 **注意**: 在此模式下如果 `x/y` 单位比率不等于 1 则角度会显得扭曲。

| 
模式

 | 

初始海龟朝向

 | 

正数角度

 |
| --- | --- | --- |
| 

"standard"

 | 

朝右 (东)

 | 

逆时针

 |
| 

"logo"

 | 

朝上 (北)

 | 

顺时针

 |

\>>> mode("logo")   \# 将海龟重置为朝向北方
\>>> mode()
'logo'

turtle.colormode(_cmode\=None_)[¶](#turtle.colormode "Link to this definition")

参数:

**cmode** -- 数值 1.0 或 255 其中之一

返回 colormode 或将其设为 1.0 或 255。 后续表示三原色的 _r_, _g_, _b_ 值必须在 0..\*cmode\* 范围之内。

\>>> screen.colormode(1)
\>>> turtle.pencolor(240, 160, 80)
Traceback (most recent call last):
     ...
TurtleGraphicsError: bad color sequence: (240, 160, 80)
\>>> screen.colormode()
1.0
\>>> screen.colormode(255)
\>>> screen.colormode()
255
\>>> turtle.pencolor(240,160,80)

turtle.getcanvas()[¶](#turtle.getcanvas "Link to this definition")

返回此 TurtleScreen 的 Canvas 对象。供了解 Tkinter 的 Canvas 对象内部机理的人士使用。

\>>> cv \= screen.getcanvas()
\>>> cv
<turtle.ScrolledCanvas object ...>

turtle.getshapes()[¶](#turtle.getshapes "Link to this definition")

返回所有当前可用海龟形状的列表。

\>>> screen.getshapes()
\['arrow', 'blank', 'circle', ..., 'turtle'\]

turtle.register\_shape(_name_, _shape\=None_)[¶](#turtle.register_shape "Link to this definition")

turtle.addshape(_name_, _shape\=None_)[¶](#turtle.addshape "Link to this definition")

调用此函数有四种不同方式：

1.  _name_ 为一个图像文件（PNG、 GIF、 PGM和PPM）的文件名， _shape_ 为 `None`：安装相应的图像形状。:
    
    \>>> screen.register\_shape("turtle.gif")
    
    备注
    
    当海龟转向时图像形状 _不会_ 转动，因此无法显示海龟的朝向!
    
2.  _name_ 为任意字符串， _shape_ 为图像文件（PNG、 GIF、 PGM和PPM）的名称：安装相应的图像形状。:
    
    \>>> screen.register\_shape("turtle", "turtle.gif")
    
    备注
    
    当海龟转向时图像形状 _不会_ 转动，因此无法显示海龟的朝向!
    
3.  _name_ 为指定的字符串，_shape_ 为由坐标值对构成的元组: 安装相应的多边形形状。
    
    \>>> screen.register\_shape("triangle", ((5,\-3), (0,5), (\-5,\-3)))
    
4.  _name_ 为任意字符串而 _shape_ 为 (复合) [`Shape`](#turtle.Shape "turtle.Shape") 对象：安装相应的复合形状。
    

将一个海龟形状加入 TurtleScreen 的形状列表。只有这样注册过的形状才能通过执行 `shape(shapename)` 命令来使用。

在 3.14 版本发生变更: 增加了对PNG、PGM和PPM图像格式的支持。可以指定形状名称和图像文件名。

turtle.turtles()[¶](#turtle.turtles "Link to this definition")

返回屏幕上的海龟列表。

\>>> for turtle in screen.turtles():
...     turtle.color("red")

turtle.window\_height()[¶](#turtle.window_height "Link to this definition")

返回海龟窗口的高度。:

\>>> screen.window\_height()
480

turtle.window\_width()[¶](#turtle.window_width "Link to this definition")

返回海龟窗口的宽度。:

\>>> screen.window\_width()
640

### Screen 专有方法, 而非继承自 TurtleScreen[¶](#methods-specific-to-screen-not-inherited-from-turtlescreen "Link to this heading")

turtle.bye()[¶](#turtle.bye "Link to this definition")

关闭海龟绘图窗口。

turtle.exitonclick()[¶](#turtle.exitonclick "Link to this definition")

将 `bye()` 方法绑定到 Screen 上的鼠标点击事件。

如果配置字典中 "using\_IDLE" 的值为 `False` (默认值) 则同时进入主事件循环。注: 如果启动 IDLE 时使用了 `-n` 开关 (无子进程)，`turtle.cfg` 中此数值应设为 `True`。在此情况下 IDLE 本身的主事件循环同样会作用于客户脚本。

turtle.save(_filename_, _overwrite\=False_)[¶](#turtle.save "Link to this definition")

将当前海龟绘图（和海龟）另存为PostScript文件。

参数:

-   **filename** -- 保存PostScript文件的路径
    
-   **overwrite** -- 如果为 `False` 并且已经存在具有给定文件名的文件，则该函数将引发 `FileExistsError`。 如果为 `True`，文件将被覆盖。
    

\>>> screen.save("my\_drawing.ps")
\>>> screen.save("my\_drawing.ps", overwrite\=True)

Added in version 3.14.

turtle.setup(_width\=\_CFG\['width'\]_, _height\=\_CFG\['height'\]_, _startx\=\_CFG\['leftright'\]_, _starty\=\_CFG\['topbottom'\]_)[¶](#turtle.setup "Link to this definition")

设置主窗口的大小和位置。默认参数值保存在配置字典中，可通过 `turtle.cfg` 文件进行修改。

参数:

-   **width** -- 如为一个整型数值，表示大小为多少像素，如为一个浮点数值，则表示屏幕的占比；默认为屏幕的 50%
    
-   **height** -- 如为一个整型数值，表示高度为多少像素，如为一个浮点数值，则表示屏幕的占比；默认为屏幕的 75%
    
-   **startx** -- 如为正值，表示初始位置距离屏幕左边缘多少像素，负值表示距离右边缘，`None` 表示窗口水平居中
    
-   **starty** -- 如为正值，表示初始位置距离屏幕上边缘多少像素，负值表示距离下边缘，`None` 表示窗口垂直居中
    

\>>> screen.setup (width\=200, height\=200, startx\=0, starty\=0)
\>>>              \# 设置窗口为 200x200 像素，位于屏幕左上角
\>>> screen.setup(width\=.75, height\=0.5, startx\=None, starty\=None)
\>>>              \# 设置窗口宽度为屏幕的 75% 高度为屏幕的 50% 并居中

turtle.title(_titlestring_)[¶](#turtle.title "Link to this definition")

参数:

**titlestring** -- 一个字符串，显示为海龟绘图窗口的标题栏文本

设置海龟窗口标题为 _titlestring_ 指定的文本。

\>>> screen.title("Welcome to the turtle zoo!")

## 公共类[¶](#public-classes "Link to this heading")

_class_ turtle.RawTurtle(_canvas_)[¶](#turtle.RawTurtle "Link to this definition")

_class_ turtle.RawPen(_canvas_)[¶](#turtle.RawPen "Link to this definition")

参数:

**canvas** -- 一个 `tkinter.Canvas`, [`ScrolledCanvas`](#turtle.ScrolledCanvas "turtle.ScrolledCanvas") 或 [`TurtleScreen`](#turtle.TurtleScreen "turtle.TurtleScreen")

创建一个海龟。海龟对象具有 "Turtle/RawTurtle 方法" 一节所述的全部方法。

_class_ turtle.Turtle[¶](#turtle.Turtle "Link to this definition")

RawTurtle 的子类，具有相同的接口，但其绘图场所为默认的 [`Screen`](#turtle.Screen "turtle.Screen") 类对象，在首次使用时自动创建。

_class_ turtle.TurtleScreen(_cv_)[¶](#turtle.TurtleScreen "Link to this definition")

参数:

**cv** -- 一个 `tkinter.Canvas`

提供面向屏幕的方法如 [`bgcolor()`](#turtle.bgcolor "turtle.bgcolor") 等。 说明见上文。

_class_ turtle.Screen[¶](#turtle.Screen "Link to this definition")

TurtleScreen 的子类，[增加了四个方法](#screenspecific).

_class_ turtle.ScrolledCanvas(_master_)[¶](#turtle.ScrolledCanvas "Link to this definition")

参数:

**master** -- 可容纳 ScrolledCanvas 的 Tkinter 部件，即添加了滚动条的 Tkinter-canvas

由 Screen 类使用，使其能够自动提供一个 ScrolledCanvas 作为海龟的绘图场所。

_class_ turtle.Shape(_type\__, _data_)[¶](#turtle.Shape "Link to this definition")

参数:

**type\_** -- 字符串 "polygon", "image", "compound" 其中之一

实现形状的数据结构。`(type_, data)` 必须遵循以下定义:

| 
_type\__

 | 

_data_

 |
| --- | --- |
| 

"polygon"

 | 

一个多边形元组，即由坐标值对构成的元组

 |
| 

"image"

 | 

一个图片 (此形式仅限内部使用!)

 |
| 

"compound"

 | 

`None` (复合形状必须使用 [`addcomponent()`](#turtle.Shape.addcomponent "turtle.Shape.addcomponent") 方法来构建)

 |

addcomponent(_poly_, _fill_, _outline\=None_)[¶](#turtle.Shape.addcomponent "Link to this definition")

参数:

-   **poly** -- 一个多边形，即由数值对构成的元组
    
-   **fill** -- 一种颜色，将用来填充 _poly_ 指定的多边形
    
-   **outline** -- 一种颜色，用于多边形的轮廓 (如有指定)
    

示例:

\>>> poly \= ((0,0),(10,\-5),(0,10),(\-10,\-5))
\>>> s \= Shape("compound")
\>>> s.addcomponent(poly, "red", "blue")
\>>> \# ... 添加更多组件，然后使用 register\_shape()

参见 [复合形状](#compoundshapes)。

_class_ turtle.Vec2D(_x_, _y_)[¶](#turtle.Vec2D "Link to this definition")

一个二维矢量类，用来作为实现海龟绘图的辅助类。也可能在海龟绘图程序中使用。派生自元组，因此矢量也属于元组!

提供的运算 (_a_, _b_ 为矢量, _k_ 为数值):

-   `a + b` 矢量加法
    
-   `a - b` 矢量减法
    
-   `a * b` 内积
    
-   `k * a` 和 `a * k` 与标量相乘
    
-   `abs(a)` a 的绝对值
    
-   `a.rotate(angle)` 旋转
    

## 异常[¶](#exceptions "Link to this heading")

The `turtle` module defines the following exception:

_exception_ turtle.TurtleGraphicsError[¶](#turtle.TurtleGraphicsError "Link to this definition")

Raised for invalid arguments or operations. For example, a malformed color string:

\>>> turtle.color("blau")
Traceback (most recent call last):
    ...
turtle.TurtleGraphicsError: bad color string: blau

## 说明[¶](#explanation "Link to this heading")

海龟对象在屏幕对象上绘图，在 turtle 的面向对象接口中有许多关键的类可被用于创建它们并将它们相互关联。

[`Turtle`](#turtle.Turtle "turtle.Turtle") 实例将自动创建一个 [`Screen`](#turtle.Screen "turtle.Screen") 实例，如果它还未创建的话。

`Turtle` 是 [`RawTurtle`](#turtle.RawTurtle "turtle.RawTurtle") 的子类，它 _不会_ 自动创建绘图区域 —— 需要为其提供或创建一个 _canvas_。 _canvas_ 可以是一个 `tkinter.Canvas`, [`ScrolledCanvas`](#turtle.ScrolledCanvas "turtle.ScrolledCanvas") 或 [`TurtleScreen`](#turtle.TurtleScreen "turtle.TurtleScreen")。

[`TurtleScreen`](#turtle.TurtleScreen "turtle.TurtleScreen") 是基本的海龟绘图区域。 [`Screen`](#turtle.Screen "turtle.Screen") 是 `TurtleScreen` 的子类，并包括 [一些额外方法](#screenspecific) 用来管理其外观（包括大小和标题）及行为。 `TurtleScreen` 的构造器需要一个 `tkinter.Canvas` 或 [`ScrolledCanvas`](#turtle.ScrolledCanvas "turtle.ScrolledCanvas") 作为参数。

海龟绘图的函数式接口使用 `Turtle` 和 `TurtleScreen`/`Screen` 的各种方法。 在下层，每当从 `Screen` 方法派生的函数被调用时就会自动创建一个屏幕对象。 同样地，每当从 Turtle 方法派生的函数被调用时也都会自动创建一个 Turtle 对象。

要在一个屏幕中使用多个海龟，就必须使用面向对象的接口。

## 帮助与配置[¶](#help-and-configuration "Link to this heading")

### 如何使用帮助[¶](#how-to-use-help "Link to this heading")

Screen 和 Turtle 类的公用方法以文档字符串提供了详细的文档。因此可以利用 Python 帮助工具获取这些在线帮助信息:

-   当使用 IDLE 时，输入函数/方法调用将弹出工具提示显示其签名和文档字符串的头几行。
    
-   对方法或函数调用 [`help()`](https://docs.python.org/zh-cn/3/builtins/functions.html#help "help") 将显示其文档字符串:
    
    \>>> help(Screen.bgcolor)
    Help on method bgcolor in module turtle:
    
    bgcolor(self, \*args) unbound turtle.Screen method
        Set or return backgroundcolor of the TurtleScreen.
    
        Arguments (if given): a color string or three numbers
        in the range 0..colormode or a 3-tuple of such numbers.
    
        >>> screen.bgcolor("orange")
        >>> screen.bgcolor()
        "orange"
        >>> screen.bgcolor(0.5,0,0.5)
        >>> screen.bgcolor()
        "#800080"
    
    \>>> help(Turtle.penup)
    Help on method penup in module turtle:
    
    penup(self) unbound turtle.Turtle method
        Pull the pen up -- no drawing when moving.
    
        Aliases: penup | pu | up
    
        No argument
    
        >>> turtle.penup()
    
-   方法对应函数的文档字符串的形式会有一些修改:
    
    \>>> help(bgcolor)
    Help on function bgcolor in module turtle:
    
    bgcolor(\*args)
        Set or return backgroundcolor of the TurtleScreen.
    
        Arguments (if given): a color string or three numbers
        in the range 0..colormode or a 3-tuple of such numbers.
    
        Example::
    
          >>> bgcolor("orange")
          >>> bgcolor()
          "orange"
          >>> bgcolor(0.5,0,0.5)
          >>> bgcolor()
          "#800080"
    
    \>>> help(penup)
    Help on function penup in module turtle:
    
    penup()
        Pull the pen up -- no drawing when moving.
    
        Aliases: penup | pu | up
    
        No argument
    
        Example:
        >>> penup()
    

这些修改版文档字符串是在导入时与方法对应函数的定义一起自动生成的。

### 文档字符串翻译为不同的语言[¶](#translation-of-docstrings-into-different-languages "Link to this heading")

可使用工具创建一个字典，键为方法名，值为 Screen 和 Turtle 类公共方法的文档字符串。

turtle.write\_docstringdict(_filename\='turtle\_docstringdict'_)[¶](#turtle.write_docstringdict "Link to this definition")

参数:

**filename** -- 一个字符串，表示文件名

创建文档字符串字典并将其写入 filename 指定的 Python 脚本文件。此函数必须显式地调用 (海龟绘图类并不使用此函数)。文档字符串字典将被写入到 Python 脚本文件 `_filename_.py`。该文件可作为模板用来将文档字符串翻译为不同语言。

If you (or your students) want to use `turtle` with online help in your native language, you have to translate the docstrings and save the resulting file as e.g. `turtle_docstringdict_german.py`.

如果你在 `turtle.cfg` 文件中加入了相应的条目，此字典将在导入模块时被读取并替代原有的英文版文档字符串。

在撰写本文档时已经有了德语和意大利语版的文档字符串字典。(更多需求请联系 [glingl@aon.at](mailto:glingl%40aon.at))

### 如何配置 Screen 和 Turtle[¶](#how-to-configure-screen-and-turtles "Link to this heading")

内置的默认配置是模仿旧 turtle 模块的外观和行为，以便尽可能地与其保持兼容。

如果你想使用不同的配置，以便更好地反映此模块的特性或是更适合你的需求，例如在课堂中使用，你可以准备一个配置文件 `turtle.cfg`，该文件将在导入模块时被读取并根据其中的设定修改模块配置。

内置的配置对应了下面的 `turtle.cfg`:

width \= 0.5
height \= 0.75
leftright \= None
topbottom \= None
canvwidth \= 400
canvheight \= 300
mode \= standard
colormode \= 1.0
delay \= 10
undobuffersize \= 1000
shape \= classic
pencolor \= black
fillcolor \= black
resizemode \= noresize
visible \= True
language \= english
exampleturtle \= turtle
examplescreen \= screen
title \= Python Turtle Graphics
using\_IDLE \= False

选定条目的简短说明:

-   开头的四行对应了 [`Screen.setup`](#turtle.setup "turtle.setup") 方法的参数。
    
-   第 5 和第 6 行对应于 [`Screen.screensize`](#turtle.screensize "turtle.screensize") 方法的参数。
    
-   _shape_ 可以是任何内置形状，即: arrow, turtle 等。更多信息可用 `help(shape)` 查看。
    
-   如果你想使用无填充色（即让海龟变透明），则你必须写 `fillcolor = ""` (但在 cfg 文件中所有非空字符串都不可加引号)。
    
-   如果你想令海龟反映其状态，你必须使用 `resizemode = auto`。
    
-   If you set e.g. `language = italian` the docstringdict `turtle_docstringdict_italian.py` will be loaded at import time (if present on the import path, e.g. in the same directory as `turtle`).
    
-   _exampleturtle_ 和 _examplescreen_ 条目定义了相应对象在文档字符串中显示的名称。方法文档字符串转换为函数文档字符串时将从文档字符串中删去这些名称。
    
-   _using\_IDLE_: 如果你经常使用 IDLE 及其 `-n` 开关选项（"无子进程"）则将此项设为 `True`。 这将阻止 [`exitonclick()`](#turtle.exitonclick "turtle.exitonclick") 进入主事件循环。
    

There can be a `turtle.cfg` file in the directory where `turtle` is stored and an additional one in the current working directory. The latter will override the settings of the first one.

`Lib/turtledemo` 目录中也有一个 `turtle.cfg` 文件。你可以将其作为示例进行研究，并在运行演示时查看其作用效果 (但最好不要在演示查看器中运行)。

## `turtledemo` --- Demo scripts[¶](#module-turtledemo "Link to this heading")

The `turtledemo` package includes a set of demo scripts. These scripts can be run and viewed using the supplied demo viewer as follows:

python \-m turtledemo

此外，你也可以单独运行其中的演示脚本。例如，:

python \-m turtledemo.bytedesign

The `turtledemo` package directory contains:

-   一个演示查看器 `__main__.py`，可用来查看脚本的源码并即时运行。
    
-   Multiple scripts demonstrating different features of the `turtle` module. Examples can be accessed via the Examples menu. They can also be run standalone.
    
-   一个 `turtle.cfg` 文件，作为说明如何编写并使用模块配置文件的示例模板。
    

演示脚本清单如下:

| 
名称

 | 

描述

 | 

相关特性

 |
| --- | --- | --- |
| 

`bytedesign`

 | 

复杂的传统海龟绘图模式

 | 

[`tracer()`](#turtle.tracer "turtle.tracer"), [`delay()`](#turtle.delay "turtle.delay"), [`update()`](#turtle.update "turtle.update")

 |
| 

`chaos`

 | 

绘制 Verhulst 动态模型，演示通过计算机的运算可能会生成令人惊叹的结果

 | 

世界坐标系

 |
| 

`clock`

 | 

绘制模拟时钟显示本机的当前时间

 | 

海龟作为表针, [`ontimer()`](#turtle.ontimer "turtle.ontimer")

 |
| 

`colormixer`

 | 

试验 r, g, b 颜色模式

 | 

[`ondrag()`](#turtle.ondrag "turtle.ondrag") 当鼠标拖动

 |
| 

`forest`

 | 

绘制 3 棵广度优先树

 | 

随机化

 |
| 

`fractalcurves`

 | 

绘制 Hilbert & Koch 曲线

 | 

递归

 |
| 

`lindenmayer`

 | 

文化数学 (印度装饰艺术)

 | 

L-系统

 |
| 

`minimal_hanoi`

 | 

汉诺塔

 | 

矩形海龟作为汉诺盘 ([`shape()`](#turtle.shape "turtle.shape"), [`shapesize()`](#turtle.shapesize "turtle.shapesize"))

 |
| 

`nim`

 | 

玩经典的“尼姆”游戏，开始时有三堆小棒，与电脑对战。

 | 

海龟作为小棒，事件驱动 (鼠标, 键盘)

 |
| 

`paint`

 | 

超极简主义绘画程序

 | 

[`onclick()`](#turtle.onclick "turtle.onclick") 当鼠标点击

 |
| 

`peace`

 | 

初级技巧

 | 

海龟: 外观与动画

 |
| 

`penrose`

 | 

非周期性地使用风筝和飞镖形状铺满平面

 | 

[`stamp()`](#turtle.stamp "turtle.stamp") 印章

 |
| 

`planet_and_moon`

 | 

模拟引力系统

 | 

复合形状, [`Vec2D`](#turtle.Vec2D "turtle.Vec2D") 类

 |
| 

`rosette`

 | 

一个来自介绍海龟绘图的维基百科文章的图案

 | 

[`clone()`](#turtle.clone "turtle.clone"), [`undo()`](#turtle.undo "turtle.undo")

 |
| 

`round_dance`

 | 

两两相对并不断旋转舞蹈的海龟

 | 

复合形状, [`clone()`](#turtle.clone "turtle.clone") [`shapesize()`](#turtle.shapesize "turtle.shapesize"), [`tilt()`](#turtle.tilt "turtle.tilt"), [`get_shapepoly()`](#turtle.get_shapepoly "turtle.get_shapepoly"), [`update()`](#turtle.update "turtle.update")

 |
| 

`sorting_animate`

 | 

动态演示不同的排序方法

 | 

简单对齐, 随机化

 |
| 

`tree`

 | 

一棵 (图形化的) 广度优先树 (使用生成器)

 | 

[`clone()`](#turtle.clone "turtle.clone") 克隆

 |
| 

`two_canvases`

 | 

简单设计

 | 

两块画布上的海龟

 |
| 

`yinyang`

 | 

另一个初级示例

 | 

[`circle()`](#turtle.circle "turtle.circle") 画圆

 |

祝你玩得开心！
