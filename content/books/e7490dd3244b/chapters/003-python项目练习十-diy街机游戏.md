终于来到了最后一个项目，看看前面的那些练习，也算是熟悉了python的基本操作，也知道python能干哪些事情，最后一个项目相比于以前的稍微复杂些，但是任何一个程序只要他是可以正常执行的，花点时间总会搞明白的。

这个练习是一个小游戏程序，如果要是给它起个名字的话，应该叫：快躲，香蕉。主要的游戏内容就是，游戏开始会从屏幕上方不断随便的掉一些铁块，在屏幕下方有一个小香蕉是受你控制的，你需要不断的左右移动来躲避铁块。在你躲避完一定数量的铁块之后，就会进入下一关。下一关依然是让你躲铁块，不过铁块下降的速度就快了很多。在游戏中你可以按下任意键暂停，再次按则继续，按下ESC键退出。这就是全部的功能了，下面我们来看游戏的实现。

无论是在实现功能时还是在代码分析的时候，分类归纳总是一个好习惯，这里自然也不例外。

首先对所有代码分类， 1、整体上代码有一个配置模块，来对游戏的速度、屏幕的宽度、香蕉移动速度、字体大小、各个物体的图片等进行配置。 2、然后是有一个元素模块，即游戏中的两个元素落下来的铁块以及被砸的香蕉，其中还要包含他们具有的行为。 3、然后还有游戏中的各种状态模块，状态模块中的类继承关系稍微多一些，处于家谱最上方的就是state类，由它来衍生其他的所有状态，它的直接子类是Level和Pause，其中Pause有衍生出子类Info、levelCleared、GameOver、StartUp。 4、最后就是游戏的主模块，用来让其他模块协调工作的。

然后再来看一个整体图:

![](http://www.the5fire.com/wp-content/uploads/2012/02/Screenshot-at-2012-02-09-211954.png)

有了上面整体的认识，下面就要细揪一下了。我自己看代码的方法是这样的，首先整体分析，然后在从程序的入口点开始分析。我估计大多数人也是这么做的。

首先是squish.py文件中的game类：

.. code:: python

```
class Game:

    def __init__(self,*args):
        path = os.path.abspath(args[0])
        dir = os.path.split(path)[0]
        os.chdir(dir)
        self.state = None

        self.nextState = StartUp()

    def run(self):
        pygame.init()

        flag = 0

        if config.full_screen:
                flag = FULLSCREEN
        screen_size = config.screen_size
        screen = pygame.display.set_mode(screen_size,flag)

        pygame.display.set_caption('Fruit Self Defense')
        pygame.mouse.set_visible(False)

        while True:
            if self.state != self.nextState:
                self.state = self.nextState
                self.state.firstDisplay(screen)

            for event in pygame.event.get():
                self.state.handle(event)
            self.state.update(self)

            self.state.display(screen)

if __name__ == '__main__':
    game = Game(*sys.argv)
    game.run()
```

忽略掉init中的设置代码，在run中，该管理类首先调用pygame初始化并启动游戏界面，然后在一个while True的死循环中不断的进行状态判断，事件处理，然后根据事件更新当前状态，并且绘制界面。

让我们把焦点放在那个死循环中，因为他就是整个程序的流程所在。 其中状态和事件的关系就是,当发生某一事件之后，状态就会发生变化，比如点击事件、过关事件、死亡事件。这些事件的来源分别是：用户操作、系统判断、系统判断。要继续深入分析就需要再拿一部分代码出来。

依然是来自squish.py文件中剩余的所有代码：

.. code:: python

```
import os, sys, pygame
from pygame.locals import *
import objects, config

class State:
    def handle(self,event):
        if event.type == QUIT:
            sys.exit()
        if event.type == KEYDOWN and event.key == K_ESCAPE:
            sys.exit()

    def firstDisplay(self, screen):
        screen.fill(config.background_color)
        pygame.display.flip()

    def display(self, screen):
        pass

class Level(State):

    def __init__(self,number=1):
        self.number = number
        self.remaining = config.weights_per_level

        speed = config.drop_speed

        speed += (self.number - 1) * config.speed_increase

        self.weight = objects.Weight(speed)
        self.banana = objects.Banana()
        both = self.weight,self.banana
        self.sprites = pygame.sprite.RenderUpdates(both)

    def update(self, game):
        self.sprites.update()

        if self.banana.touches(self.weight):
            game.nextState = GameOver()

        elif self.weight.landed:
            self.weight.reset()
            self.remaining -= 1
            if self.remaining == 0:
                game.nextState = LevelCleared(self.number)

    def display(self, screen):
        screen.fill(config.background_color)
        updates = self.sprites.draw(screen)
        pygame.display.update(updates)

class Paused(State ):
    finished = 0
    image = None
    text = ''

    def handle(self, event):
        State.handle(self, event)
        if event.type in [MOUSEBUTTONDOWN,KEYDOWN]:
            self.finished = 1

    def update(self, game):
        if self.finished:
            game.nextState = self.nextState()

    def firstDisplay(self, screen):
        screen.fill(config.background_color)

        font = pygame.font.Font(None, config.font_size)
        lines = self.text.strip().splitlines()

        height = len(lines) * font.get_linesize()

        center,top = screen.get_rect().center
        top -= height // 2

        if self.image:
            image = pygame.image.load(self.image).convert()

            r = image.get_rect()
            top += r.height // 2

            r.midbottom = center, top -20

            screen.blit(image, r)

        antialias = 1
        black = 0,0,0


        for line in lines:
            text = font.render(line.strip(),antialias,black)
            r = text.get_rect()
            r.midtop = center,top
            screen.blit(text, r)
            top += font.get_linesize()

        pygame.display.flip()

class Info(Paused):

    nextState = Level
    text = '''
    In this game you are a banana,
    trying to survive a course in
    self-defense against fruit,where the 
    participants will 'defend' themselves
    against you with a 16 ton weight.'''

class StartUp(Paused):

    nextState = Info
    image = config.splash_image
    text = '''
    Welcome to Squish.
    the game of Fruit Self-Defense'''

class LevelCleared(Paused):

    def __init__(self, number):
            self.number = number
            self.text = '''Level %i cleared
            Click to start next level''' % self.number

    def nextState(self):
            return Level(self.number + 1)

class GameOver(Paused):
    nextState = Level
    text = '''
    Game Over
    Click to Restart, Esc to Quit'''
```

其中用户判断部分就是Paused类中的update方法和handle方法，而系统判断就是Level类中的update方法。还有一个要注意的地方就是Level类中update方法中的第一行代码：self.sprites.update()，这是让铁块不断下落的关键代码。用户判断部分的代码已经有了，下面需要贴上系统判断时用到的代码.

objects.py中的代码：

.. code:: python

```
import pygame,config,os
from random import randrange

class SquishSprite(pygame.sprite.Sprite):

    def __init__(self, image):
        pygame.sprite.Sprite.__init__(self)
        self.image = pygame.image.load(image).convert()
        self.rect = self.image.get_rect()
        screen = pygame.display.get_surface()
        shrink = -config.margin*2
        self.area = screen.get_rect().inflate(shrink,shrink)

class Weight(SquishSprite):

    def __init__(self, speed):
        SquishSprite.__init__(self,config.weight_image)
        self.speed = speed
        self.reset()

    def reset(self):
        x = randrange(self.area.left, self.area.right)
        self.rect.midbottom = x, 0

    def update(self):
        self.rect.top += self.speed
        self.landed = self.rect.top >= self.area.bottom

class Banana(SquishSprite):

    def __init__(self):
        SquishSprite.__init__(self, config.banana_image)
        self.rect.bottom = self.area.bottom

        self.pad_top = config.banana_pad_top
        self.pad_side = config.banana_pad_side

    def update(self):
        self.rect.centerx = pygame.mouse.get_pos()[0]
        self.rect = self.rect.clamp(self.area)

    def touches(self, other):
        bounds = self.rect.inflate(-self.pad_side,-self.pad_top)

        bounds.bottom = self.rect.bottom

        return bounds.colliderect(other.rect)
```

在类Banana和Weight中的update和touches方法，用于进行系统判断。

好了，到这主要的东西都分析完了，剩下的只需要稍看一下就能够懂得了。

最后还有一个配置模块的代码config.py：

.. code:: python

```
banana_image = 'banana.png'
weight_image = 'weight.png'
splash_image = 'weight.png'

screen_size = 800,600
background_color = 255,255,255
margin = 30
full_screen = 1
font_size = 48

drop_speed = 1
banana_speed = 10
speed_increase = 1
weights_per_level = 10
banana_pad_top = 40
banana_pad_side = 20
```

到此为止，《python基础教程》中的十个项目都已经分析了一遍，下一步要做的就是做几个实用软件出来，然后把python再好好深入研究下。

应晓勇要求，上几个运行图：

![](http://www.the5fire.com/wp-content/uploads/2012/02/Screenshot-at-2012-02-11-223321.png)

![](http://www.the5fire.com/wp-content/uploads/2012/02/Screenshot-at-2012-02-11-223330.png)

## 2017-05-15更新：

我录了一套Django开发的视频，有兴趣可以到公众号查看。
