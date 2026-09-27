**源代码：** [Lib/colorsys.py](https://github.com/python/cpython/tree/3.14/Lib/colorsys.py)

* * *

`colorsys` 模块定义了计算机显示器所用的 RGB (Red Green Blue) 色彩空间与三种其他色彩坐标系统 YIQ, HLS (Hue Lightness Saturation) 和 HSV (Hue Saturation Value) 表示的颜色值之间的双向转换。 所有这些色彩空间的坐标都使用浮点数值来表示。 在 YIQ 空间中，Y 坐标取值为 0 和 1 之间，而 I 和 Q 坐标均可以为正数或负数。 在所有其他空间中，坐标取值均为 0 和 1 之间。

`colorsys` 模块定义了下列函数：

colorsys.rgb\_to\_yiq(_r_, _g_, _b_)[¶](#colorsys.rgb_to_yiq "Link to this definition")

把颜色从 RGB 坐标转为 YIQ 坐标。

colorsys.yiq\_to\_rgb(_y_, _i_, _q_)[¶](#colorsys.yiq_to_rgb "Link to this definition")

把颜色从 YIQ 坐标转为 RGB 坐标。

colorsys.rgb\_to\_hls(_r_, _g_, _b_)[¶](#colorsys.rgb_to_hls "Link to this definition")

把颜色从 RGB 坐标转为 HLS 坐标。

colorsys.hls\_to\_rgb(_h_, _l_, _s_)[¶](#colorsys.hls_to_rgb "Link to this definition")

把颜色从 HLS 坐标转为 RGB 坐标。

colorsys.rgb\_to\_hsv(_r_, _g_, _b_)[¶](#colorsys.rgb_to_hsv "Link to this definition")

把颜色从 RGB 坐标转为 HSV 坐标。

colorsys.hsv\_to\_rgb(_h_, _s_, _v_)[¶](#colorsys.hsv_to_rgb "Link to this definition")

把颜色从 HSV 坐标转为 RGB 坐标。

示例:

\>>> import colorsys
\>>> colorsys.rgb\_to\_hsv(0.2, 0.4, 0.4)
(0.5, 0.5, 0.4)
\>>> colorsys.hsv\_to\_rgb(0.5, 0.5, 0.4)
(0.2, 0.4, 0.4)
