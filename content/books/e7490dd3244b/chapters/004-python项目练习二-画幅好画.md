这是《python基础教程》中的第二个项目，关于python操作PDF

涉及到的知识点:

-   1、urllib的使用
-   2、reportlab库的使用

这个例子着实很简单，不过我发现在python里面可以直接在数组，里面写for循环，真是越用越方便。

下面是代码：

```
from urllib import urlopen
from reportlab.graphics.shapes import *
from reportlab.graphics.charts.lineplots import LinePlot
from reportlab.graphics.charts.textlabels import Label
from reportlab.graphics import renderPDF

URL = 'http://www.swpc.noaa.gov/ftpdir/weekly/Predict.txt'
COMMENT_CHARS = '#:'

drawing = Drawing(400, 200)
data = []
for line in urlopen(URL).readlines():
        if not line.isspace() and not line[0] in COMMENT_CHARS:
                data.append([float(n) for n in line.split()])

pred = [row[2] for row in data]
high = [row[3] for row in data]
low = [row[4] for row in data]
times = [row[0] + row[1]/12.0 for row in data]
lp = LinePlot()
lp.x = 50
lp.y = 50
lp.height = 125
lp.width = 300
lp.data = [zip(times, pred),zip(times,high),zip(times, low)]
lp.lines[0].strokeColor = colors.blue
lp.lines[1].strokeColor = colors.red
lp.lines[2].strokeColor = colors.green

drawing.add(lp)
drawing.add(String(250,150, 'Sunspots',fontSize=14,fillColor=colors.red))

renderPDF.drawToFile(drawing, 'report3.pdf','Sunspots')
```

2017-05-15更新:

我录了一套Django开发的视频教程，有兴趣可以到我的公众号查看。
