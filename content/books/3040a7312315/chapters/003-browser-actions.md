用 browser actions 可以在chrome主工具条的地址栏右侧增加一个图标。作为这个图标的延展，一个browser action图标还可以有[](https://open.chrome.360.cn/extension_dev/browserAction.html#tooltip)[tooltip](https://open.chrome.360.cn/extension_dev/browserAction.html#tooltip)、[badge](https://open.chrome.360.cn/extension_dev/browserAction.html#badge)和[popup](https://open.chrome.360.cn/extension_dev/browserAction.html#popups)。

如下图, 地址栏右侧的彩色正方形是一个browser action的图标， 图标下面的是popup。

![](https://w.qhimg.com/images/v2/chrome/img/open/images/browser-action.png)

如果你想创建一个不总是可见的图标, 可以使用[page action](https://open.chrome.360.cn/extension_dev/pageAction.html)来代替browser action.

**注意:**Packaged apps 不能使用browser actions.

## Manifest

在[extension manifest](https://open.chrome.360.cn/extension_dev/manifest.html)中用下面的方式注册你的browser action:

{
  "name": "My extension",
  ...
  **"browser\_action": {
    "default\_icon": "images/icon19.png", _// optional_ 
    "default\_title": "Google Mail",      _// optional; shown in tooltip_ 
    "default\_popup": "popup.html"        _// optional_ 
  }**,
  ...
}

## UI的组成部分

一个 browser action 可以拥有一个[图标](https://open.chrome.360.cn/extension_dev/browserAction.html#icon)，一个[tooltip](https://open.chrome.360.cn/extension_dev/browserAction.html#tooltip)，一个[badge](https://open.chrome.360.cn/extension_dev/browserAction.html#badge)和一个[popup](https://open.chrome.360.cn/extension_dev/browserAction.html#popups)。

### 图标

Browser action 图标推荐使用宽高都为19像素，更大的图标会被缩小。

你可以用两种方式来设置图标: 使用一个静态图片或者使用HTML5[canvas element](http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html)。 使用静态图片适用于简单的应用程序，你也可以创建诸如平滑的动画之类更丰富的动态UI(如canvas element)。

静态图片可以是任意WebKit支持的格式，包括 BMP，GIF，ICO，JPEG或 PNG。

修改**browser\_action**的[manifest](https://open.chrome.360.cn/extension_dev/browserAction.html#manifest)中 **default\_icon**字段，或者调用[setIcon()](https://open.chrome.360.cn/extension_dev/browserAction.html#method-setIcon)方法。

### ToolTip

修改**browser\_action**的[manifest](https://open.chrome.360.cn/extension_dev/browserAction.html#manifest)中**default\_title**字段[](https://open.chrome.360.cn/extension_dev/browserAction.html#manifest)，或者调用[setTitle()](https://open.chrome.360.cn/extension_dev/browserAction.html#method-setTitle)方法。你可以为**default\_title**字段指定本地化的字符串；点击[Internationalization](https://open.chrome.360.cn/extension_dev/i18n.html)查看详情。

### Badge

Browser actions可以选择性的显示一个_badge_— 在图标上显示一些文本。Badges 可以很简单的为browser action更新一些小的扩展状态提示信息。

因为badge空间有限，所以只支持4个以下的字符。

设置badge文字和颜色可以分别使用[setBadgeText()](https://open.chrome.360.cn/extension_dev/browserAction.html#method-setBadgeText)and[setBadgeBackgroundColor()](https://open.chrome.360.cn/extension_dev/browserAction.html#method-setBadgeBackgroundColor)。

如果browser action拥有一个popup，popup 会在用户点击图标后出现。popup 可以包含任意你想要的HTML内容，并且会自适应大小。

在你的browser action中添加一个popup，创建弹出的内容的HTML文件。 修改**browser\_action**的[manifest](https://open.chrome.360.cn/extension_dev/browserAction.html#manifest)中**default\_popup**字段来指定HTML文件， 或者调用[setPopup()](https://open.chrome.360.cn/extension_dev/browserAction.html#method-setPopup)方法。

## Tips

为了获得最佳的显示效果, 请遵循以下原则：

-   **确认** Browser actions 只使用在大多数网站都有功能需求的场景下。
-   **确认** Browser actions 没有使用在少数网页才有功能的场景， 此场景请使用[page actions](https://open.chrome.360.cn/extension_dev/pageAction.html)。
-   **确认**你的图标尺寸尽量占满19x19的像素空间。 Browser action 的图标应该看起来比page action的图标更大更重。
-   **不要**尝试模仿Google Chrome的扳手图标，在不同的themes下它们的表现可能出现问题,，并且扩展应该醒目些。
-   **尽量**使用alpha通道并且柔滑你的图标边缘，因为很多用户使用themes，你的图标应该在在各种背景下都表现不错。
-   **不要**不停的闪动你的图标，这很惹人反感。

## 范例

你可以在 [examples/api/browserAction](http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/browserAction/)目录找到简单的browser actions范例，更多的范例和帮助文档可以参考[Samples](https://open.chrome.360.cn/extension_dev/samples.html)。

## API reference: chrome.browserAction

### Methods

#### setBadgeBackgroundColor

chrome.browserAction.setBadgeBackgroundColor(object details)

设置badge的背景颜色。

#### Parameters

details_

( object )

_

Undocumented.

color_

( array of integer )

_

范围为\[0,255\]整数构成的结构，用来描述badge的RGBA颜色。例如：不透明的红色是\[255, 0, 0, 255\]。

tabId_

( optional integer )

_

可选参数，将设置限制在被选中的标签，当标签关闭时重置。

#### setBadgeText

chrome.browserAction.setBadgeText(object details)

设置browser action的badge文字，badge 显示在图标上面。

#### Parameters

details_

( object )

_

Undocumented.

text_

( string )

_

任意长度的字符串，但只有前4个字符会被显示出来。

tabId_

( optional integer )

_

可选参数，将设置限制在被选中的标签，当标签关闭时重置。

#### setIcon

chrome.browserAction.setIcon(object details)

设置browser action的图标。图标可以是一个图片的路径或者是从一个canvas元素提取的像素信息.。无论是**图标路径**还是canvas的 **imageData**，这个属性必须被指定。

#### Parameters

details_

( object )

_

Undocumented.

imageData_

( optional ImageData )

_

图片的像素信息。必须是一个ImageData 对象(例如：一个canvas元素)。

path_

( optional string )

_

图片在扩展中的的相对路径。

tabId_

( optional integer )

_

可选参数，将设置限制在被选中的标签，当标签关闭时重置。

#### setPopup

chrome.browserAction.setPopup(object details)

设置一个点击browser actions时显示在popup中的HTML。

#### Parameters

details_

( object )

_

Undocumented.

tabId_

( optional integer )

_

可选参数，将设置限制在被选中的标签，当标签关闭时重置。

popup_

( string )

_

popup中显示的html文件。如果设置为空字符('')，将不显示popup。

这个功能已经在**chromium 5.0.316.0版本**添加。如果你需要这个功能，可以通过manifest的[minimum\_chrome\_version](https://open.chrome.360.cn/extension_dev/manifest.html#minimum_chrome_version)键值来确认你的扩展不会运行在早期的浏览器版本。

#### setTitle

chrome.browserAction.setTitle(object details)

设置browser action的标题，这个将显示在tooltip中。

#### Parameters

details_

( object )

_

Undocumented.

title_

( string )

_

鼠标移动到browser action上时显示的文字。

tabId_

( optional integer )

_

可选参数，将设置限制在被选中的标签，当标签关闭时重置。

### Events

#### onClicked

chrome.browserAction.onClicked.addListener(function(Tab tab) {...});

当browser action 图标被点击的时候触发，当browser action是一个popup的时候，这个事件将不会被触发。

#### Parameters

tab_

( [Tab](https://open.chrome.360.cn/extension_dev/tabs.html#type-Tab) )

_

Undocumented.
