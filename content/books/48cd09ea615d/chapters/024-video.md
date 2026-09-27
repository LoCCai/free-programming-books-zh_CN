## [尝试一下](#尝试一下)

```
<video controls width="250">
  <source src="https://developer.mozilla.org/shared-assets/videos/flower.webm" type="video/webm" />

  <source src="https://developer.mozilla.org/shared-assets/videos/flower.mp4" type="video/mp4" />

  Download the
  <a href="/shared-assets/videos/flower.webm">WEBM</a>
  or
  <a href="/shared-assets/videos/flower.mp4">MP4</a>
  video.
</video>
```

上面的例子展示了 `<video>` 元素的简单用法。和 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/img) 元素的使用类似，在 `src` 属性里加入一个我们需要展示的视频地址，同时也可以用其他属性来指定视频的宽度和高度、是否自动或者循环播放、是否展示浏览器默认的视频控件等。

在不支持 video 元素的浏览器中，`<video></video>` 标签中间的内容会显示，作为降级处理。

## [属性](#属性)

类似于所有其他 HTML 元素，此元素也支持[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`autoplay`](#autoplay)

一个布尔属性；声明该属性后，视频会尽快自动开始播放，不会停下来等待数据全部加载完成。

**备注：**自动播放音频（或有声视频）可能会破坏用户体验，所以应该尽可能避免。如果你一定要提供自动播放功能，你应该加入开关（让用户主动打开自动播放）。然而，如果需要创建一些媒体元素，其播放源由用户在稍后设置，自动播放就会很有用。想了解如何正确使用自动播放，可参见我们的[自动播放指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Autoplay)。

无法使用 `autoplay="false"` 来关闭视频的自动播放功能；只要 `<video>` 标签中有这个属性，视频就会自动播放。要移除自动播放，需要完全删除该属性。

在某些浏览器（例如 Chrome 70.0）中，如果没有设置 `muted` 属性，autoplay 将不会生效。

[`controls`](#controls)

如果存在该属性，浏览器会在视频底部提供一个控制面板，允许用户控制视频的播放，包括音量、拖动进度、暂停或恢复播放。

[`controlslist`](#controlslist)

当浏览器显示视频底部的播放控制面板（例如，指定了 `controls` 属性）时，[`controlslist`](https://wicg.github.io/controls-list/explainer.html "外部链接（在新标签页中打开）") 属性会帮助浏览器选择在控制面板上显示哪些 `video` 元素控件。

允许的值有 `nodownload`、`nofullscreen` 和 `noremoteplayback`。

如果要禁用画中画模式（和控件），请使用 [`disablepictureinpicture`](#disablepictureinpicture) 属性。

[`crossorigin`](#crossorigin)

该[枚举](https://developer.mozilla.org/zh-CN/docs/Glossary/Enumerated)属性指明是否使用 CORS 来获取相关视频。[允许 CORS 的资源](https://developer.mozilla.org/zh-CN/docs/Web/HTML/How_to/CORS_enabled_image)可在 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas) 元素中被重用，而不会被_污染_。允许的值如下：

-   `anonymous`
    
    -   : 在发送跨源请求时不携带凭据（credential）信息。也就是说，浏览器在发送 `Origin:` HTTP 标头时将不会携带 cookie、X.509 证书，也不会执行任何 HTTP 基本身份验证。如果服务器没有给予源站点信任（也就是说没有设置 `Access-Control-Allow-Origin:` HTTP 标头），资源会被_污染_，并且它的使用会受到限制。
-   `use-credentials`
    
    -   : 在发送跨源请求时携带凭据信息。也就是说，浏览器在发送 `Origin:` HTTP 标头时将会携带 cookie、证书，或执行 HTTP 基本身份验证。如果服务器没有给予源站点信任（通过设置 `Access-Control-Allow-Credentials:` HTTP 标头），图像会被_污染_，并且它的使用会受到限制。
    
    不加这个属性时，获取资源不会使用 CORS 请求（即不会发送 `Origin:` HTTP 请求标头），保证其在 [`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/canvas) 元素中使用时不会被污染。如果指定无效值，会被当作指定了枚举关键字 `anonymous` 一样使用。查看 [CORS 设置属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/crossorigin)获取更多信息。
    

[`disablepictureinpicture`](#disablepictureinpicture)

防止浏览器显示画中画上下文菜单或在某些情况下自动请求画中画模式。

[`disableremoteplayback`](#disableremoteplayback)

一个布尔属性，用于在使用有线（HDMI、DVI 等）和无线技术（Miracast、Chromecast、DLNA、AirPlay 等）连接设备时，禁用远程播放功能。

在 Safari 中，你可以使用 [`x-webkit-airplay="deny"`](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/AirPlayGuide/OptingInorOutofAirPlay/OptingInorOutofAirPlay.html "外部链接（在新标签页中打开）") 作为兜底方案。

[`height`](#height)

视频显示区域的高度，单位是 [CSS 像素](https://drafts.csswg.org/css-values/#px "外部链接（在新标签页中打开）")（仅限绝对值；[不支持百分比](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes "外部链接（在新标签页中打开）")）。

[`loop`](#loop)

一个布尔属性；指定后会在视频播放结束的时候，自动返回视频开始的地方，继续播放。

[`muted`](#muted)

一个布尔属性，指明在视频中音频的默认设置。设置后，音频会初始化为静音。默认值是 false, 意味着视频播放的时候音频也会播放。

[`playsinline`](#playsinline)

一个布尔属性，指明视频将内嵌（inline）播放，即在元素的播放区域内。请注意，没有此属性并不意味着视频始终是全屏播放的。

[`poster`](#poster)

海报帧图片 URL，用于在视频处于下载中的状态时显示。如果未指定该属性，则在视频第一帧可用之前不会显示任何内容，然后将视频的第一帧会作为海报（poster）帧来显示。

[`preload`](#preload)

该枚举属性旨在提示浏览器，作者认为在播放视频之前，加载哪些内容会达到最佳的用户体验。可能是下列值之一：

-   `none`: 表示不应该预加载视频。
-   `metadata`: 表示仅预先获取视频的元数据（例如长度）。
-   `auto`: 表示可以下载整个视频文件，即使用户不希望使用它。
-   _空字符串_: 与 `auto` 值一致。

每个浏览器的默认值都不相同，即使规范建议设置为 `metadata`。

**备注：**

-   `autoplay` 属性的优先级比 `preload` 高。如果指定了 `autoplay` 属性，浏览器显然需要开始下载视频以便回放。
-   规范中没有强制浏览器去遵循该属性的值，这仅仅只是个提示。

[`src`](#src)

要嵌到页面的视频的 URL。可选；你也可以使用 video 块内的 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素来指定需要嵌到页面的视频。

[`width`](#width)

视频显示区域的宽度，单位是 [CSS 像素](https://drafts.csswg.org/css-values/#px "外部链接（在新标签页中打开）")（仅限绝对值；[不支持百分比](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes "外部链接（在新标签页中打开）")）。

## [事件](#事件)

| 事件名称 | 触发时机 |
| --- | --- |
| [`audioprocess`](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode/audioprocess_event "audioprocess") | [`ScriptProcessorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode) 的输入缓冲区已准备好进行处理。 |
| [`canplay`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canplay_event "canplay") | 浏览器可以播放媒体，但估计尚未缓冲足够的数据，无法流畅播放至视频结束，期间可能出现停顿以便缓冲更多内容。 |
| [`canplaythrough`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/canplaythrough_event "canplaythrough") | 浏览器估计它可以不间断地播放到媒体末尾，无需暂停以进行内容缓冲。 |
| [`complete`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext/complete_event "complete") | 已终止 [`OfflineAudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext) 的渲染。 |
| [`durationchange`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/durationchange_event "durationchange") | `duration` 属性已更新。 |
| [`emptied`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event "emptied") | 媒体内容已清空；例如，如果媒体已加载（或部分加载）完成，并调用 [`load()`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/load) 方法重新加载。 |
| [`ended`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/ended_event "ended") | 视频停止播放，因为媒体已经到达结束点。 |
| [`error`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/error_event "error") | 获取媒体数据时出现错误，或者资源的格式不受支持。 |
| [`loadeddata`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/loadeddata_event "loadeddata") | 媒体的首帧已加载完成。 |
| [`loadedmetadata`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/loadedmetadata_event "loadedmetadata") | 元数据已加载完毕。 |
| [`loadstart`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/loadstart_event "loadstart") | 浏览器开始加载资源时触发。 |
| [`pause`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/pause_event "pause") | 播放已暂停。 |
| [`play`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/play_event "play") | 播放已开始。 |
| [`playing`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/playing_event "playing ") | 已经在暂停或因数据不足而延迟后准备好进行播放。 |
| [`progress`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/progress_event "progress") | 在浏览器加载资源期间周期性触发。 |
| [`ratechange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event "ratechange") | 播放速率发生变化。 |
| [`seeked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event "seeked") | _拖动进度_（seek）操作完成。 |
| [`seeking`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event "seeking") | _拖动进度_操作开始。 |
| [`stalled`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event "stalled") | 用户代理尝试获取媒体数据，但意外地无法获取数据。 |
| [`suspend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event "suspend") | 媒体数据加载已暂停。 |
| [`timeupdate`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event "timeupdate") | 由 `currentTime` 属性指示的播放时间已更新。 |
| [`volumechange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event "volumechange") | 音量发生变化。 |
| [`waiting`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event "waiting") | 由于暂时缺少数据而停止播放。 |

## [使用说明](#使用说明)

浏览器并不全都支持相同的视频格式；你可以在嵌套的 [`<source>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source) 元素中提供多个媒体源，浏览器会使用它能识别的第一个源。

html

```
<video controls>
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/myVideo.mp4" type="video/mp4" />
  <source src="https://developer.mozilla.org/zh-CN/docs/Web/myVideo.webm" type="video/webm" />
  <p>
    你的浏览器不支持 HTML5 视频。这里有一个<a
      href="myVideo.mp4"
      download="myVideo.mp4"
      >视频</a
    >链接。
  </p>
</video>
```

我们提供了一份关于[媒体文件类型指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats)和[视频支持的编解码器指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Video_codecs)。此外，还有一份[可与之配合使用的音频编解码器](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs)指南。

其他的使用说明：

-   如果你不指定 `controls` 属性，视频将不会包含浏览器的默认控件；你可以使用 JavaScript 和 [`HTMLMediaElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) API 来创建你自己的控件。详细信息请参阅[创建跨浏览器视频播放器](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/cross_browser_video_player)。
-   为了实现对视频（和音频）内容的精确控制，`HTMLMediaElement` 会触发多种不同的[事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model/Events#media)，除了提供可控性之外，这些事件还允许你监控媒体的下载进度和播放进度，以及播放状态和位置。
-   你可以使用 [`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 属性调整视频在元素框内的位置，和使用 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-fit) 属性控制视频如何调整大小以适应框架。
-   如果想在视频里展示字幕或者标题，你可以在 [`<track>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/track) 元素和 [WebVTT](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API) 格式的基础上使用 JavaScript 来实现。详细信息请参阅[向 HTML 视频中添加字幕](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)。
-   你可以使用 `<video>` 元素播放音频文件。如果你需要结合 [WebVTT](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API) 字幕进行音频播放，这会非常有用，因为 [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio) 元素不支持使用 WebVTT 提供字幕。
-   要在支持该元素的浏览器上测试回退内容，你可以将 `<video>` 替换为不存在的元素，如 `<notavideo>`。

关于使用 HTML `<video>` 元素的综合信息资源，请参考[视频和音频内容](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio)初学者教程。

### [使用 CSS 设置样式](#使用_css_设置样式)

`<video>` 元素是一个替换元素——其 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/display) 值默认为 `inline`，但在视口中的默认宽度和高度由所嵌入的视频定义。

对 `<video>` 元素进行样式化并无特殊考虑；一种常见策略是为其 `display` 值赋为 `block`，以方便定位、调整大小等操作，然后根据需要提供样式和布局信息。[视频播放器样式基础](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Audio_and_video_delivery/Video_player_styling_basics)提供了一些有用的样式化技巧。

### [检测轨道添加和移除](#检测轨道添加和移除)

你可以使用 [`addtrack`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList/addtrack_event "addtrack") 和 [`removetrack`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList/removetrack_event "removetrack") 事件检测何时向 `<video>` 元素添加或移除轨道。但是，这些事件不会直接发送到 `<video>` 元素本身。相反，它们会发送到 `<video>` 元素的 [`HTMLMediaElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement) 内对应于向该元素添加的轨道类型的轨道列表对象：

[`HTMLMediaElement.audioTracks`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/audioTracks)

包含媒体元素所有音频轨道的 [`AudioTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList)。你可以在该对象上添加 `addtrack` 事件监听，以便在向元素添加新音频轨道时收到通知。

[`HTMLMediaElement.videoTracks`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/videoTracks)

向 [`VideoTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList) 对象添加一个 `addtrack` 监听器，以便在向元素添加视频轨道时收到通知。

[`HTMLMediaElement.textTracks`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/textTracks)

向 [`TextTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrackList) 添加一个 `addtrack` 事件监听器，以便在向元素添加新的文本轨道时收到通知。

例如，要检测何时向 `<video>` 元素添加或移除音频轨道，你可以使用如下代码：

js

```
const elem = document.querySelector("video");

elem.audioTracks.onaddtrack = (event) => {
  trackEditor.addTrack(event.track);
};

elem.audioTracks.onremovetrack = (event) => {
  trackEditor.removeTrack(event.track);
};
```

这段代码监听元素添加和移除音频轨道的情况，并调用轨道编辑器上的一个假设函数，以将轨道注册到编辑器可用轨道列表中或从列表中移除。

你也可以使用 [`addEventListener()`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener "addEventListener()") 来监听 [`addtrack`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList/addtrack_event "addtrack") 和 [`removetrack`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList/removetrack_event "removetrack") 事件。

## [视频服务器支持](#视频服务器支持)

如果视频的 MIME 类型设置不正确，视频可能不会显示，或者显示包含一个 X 的灰色盒子（如果启用了 JavaScript 的话）。

如果你提供的视频格式为 Ogg Theora 并在 Apache Web 服务器上，你可以通过“/etc/apache”中的“mime.types”文件，或者通过在 `httpd.conf` 中的 `"AddType"` 的配置指令，把视频文件的扩展名（最常见的是“.ogm”、“.ogv”或“.ogg”）添加到 MIME 类型“video/ogg”，来解决这个问题。

AddType video/ogg .ogm
AddType video/ogg .ogv
AddType video/ogg .ogg

如果你在 Apache Web 服务器上提供格式为 WebM 的视频，你可以通过“/etc/apache”中的“mime.types”文件，或者通过在 `httpd.conf` 中的 `AddType` 配置指令，把视频文件的扩展名（最常见的是“.webm”）添加到 MIME 类型“video/webm”，来解决这个问题。

AddType video/webm .webm

你的 Web 主机可能会提供一个简单的接口来修改 MIME 类型配置，直到服务器全面升级。

## [示例](#示例)

### [单个 source](#单个_source)

这个示例在激活时播放视频，并为用户提供浏览器默认的视频控制以管理播放。

#### HTML

html

```
<!-- 简单视频示例 -->
<!-- “大雄兔”由 Blender 基金会以 CC 3.0 许可。由 archive.org 托管。 -->
<!-- 海报来自 peach.blender.org -->
<video
  controls
  src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
  width="620">
  抱歉，你的浏览器不支持嵌入式视频，不过不用担心，你可以<a
    href="https://archive.org/details/BigBuckBunny_124"
    >下载</a
  >并用你最喜欢的视频播放器观看！
</video>
```

#### 结果

在视频开始播放之前，`poster` 属性提供的图像将代替显示。如果浏览器不支持视频播放，则会显示回退文本。

### [多个 source](#多个_source)

此示例在上一个示例的基础上提供了三种不同的媒体源，从而使视频在任何浏览器支持的视频编解码器环境下都能观看。

#### HTML

html

```
<!-- 使用多个 sources 作为视频标签的回退 -->
<!-- “大象之梦”由 Orange Open Movie Project 制作，采用 CC-3.0 许可，由 archive.org 托管-->
<!-- 海报来自维基百科 -->
<video
  width="620"
  controls
  poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg">
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
    type="video/ogg" />
  <source
    src="https://archive.org/download/ElephantsDream/ed_hd.avi"
    type="video/avi" />
  <source
    src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    type="video/mp4" />

  抱歉，你的浏览器不支持嵌入式视频，不过不用担心，你可以<a
    href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
    download="ed_1024_512kb.mp4">
    下载 MP4
  </a>
  并用你最喜欢的视频播放器观看！
</video>
```

#### 结果

首先尝试 [Ogg](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers#ogg)。如果无法播放，则尝试 AVI。最后尝试 [MP4](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers#mpeg-4_mp4)。如果浏览器不支持视频元素，则会显示回退消息，但如果所有源都失败则不会显示。

某些媒体文件类型允许你使用 [`codecs`](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/codecs_parameter) 参数作为文件类型字符串的一部分来提供更具体的信息。一个相对简单的例子是 `video/webm; codecs="vp8, vorbis"`，表示该文件是一个使用 [VP8](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Video_codecs#vp8) 视频和 [Vorbis](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs#vorbis) 音频的 [WebM](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers#webm) 视频。

## [无障碍考虑](#无障碍考虑)

视频应提供能准确描述其内容的字幕和脚本（请参阅[向 HTML 视频中添加字幕](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video)，了解如何实现这些功能的更多信息）。字幕可以让听力受损的人在播放视频时理解视频的音频内容，而文字稿可以让需要更多时间的人以舒适的速度和形式查看音频内容。

值得注意的是，虽然可以为纯音频媒体添加字幕，但只有在 [`<video>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video) 元素中播放音频时才能这样做，因为该元素的视频区域是用来显示字幕的。这是一种特殊情况，在视频元素中播放音频非常有用。

如果使用自动字幕服务，则必须对生成的内容进行审查，以确保其准确呈现源视频。

除口头对话外，字幕和脚本还应确定传达重要信息的音乐和音效。这包括情感和语气：

14
00:03:14 --> 00:03:18
\[戏剧性摇滚音乐\]

15
00:03:19 --> 00:03:21
\[耳语\] 远处是什么东西？

16
00:03:22 --> 00:03:24
这是... 这是一个...

16 00:03:25 --> 00:03:32
\[砰砰巨响\]
\[碗碟碰撞声\]

字幕不应遮挡视频的主要主体。可以使用[设置 `align` VTT 字幕块](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API#cue_%E8%AE%BE%E7%BD%AE)对其进行定位。

-   [Web 视频文本轨格式（WebVTT）](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API)
-   [WebAIM：字幕、脚本和音频描述](https://webaim.org/techniques/captions/ "外部链接（在新标签页中打开）")
-   [MDN 理解 WCAG，指南 1.2 说明](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable#guideline_1.2_%E2%80%94_providing_text_alternatives_for_time-based_media)
-   [了解成功标准 1.2.1 | W3C 对 WCAG 2.0 的理解](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-av-only-alt.html "外部链接（在新标签页中打开）")
-   [了解成功标准 1.2.2 | W3C 对 WCAG 2.0 的理解](https://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html "外部链接（在新标签页中打开）")

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、短语内容、嵌入内容。如果它有 <a href="#controls"><code>controls</code></a> 属性：交互内容和可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td><p>如果元素拥有 <a href="#src"><code>src</code></a> 属性：允许的内容为 0 个或更多 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/track"><code>&lt;track&gt;</code></a> 元素，跟随着不包含 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio"><code>&lt;audio&gt;</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video" aria-current="page"><code>&lt;video&gt;</code></a> 媒体元素的透明内容。</p><p>否则：允许的内容为 0 个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/source"><code>&lt;source&gt;</code></a> 元素，跟随着 0 个或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/track"><code>&lt;track&gt;</code></a> 元素，跟随着不包含 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio"><code>&lt;audio&gt;</code></a> 或 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video" aria-current="page"><code>&lt;video&gt;</code></a> 媒体元素的透明内容。</p></td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受嵌入内容的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><a href="https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role" target="_blank" title="外部链接（在新标签页中打开）">没有对应的角色</a></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/application_role"><code>application</code></a></td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLVideoElement"><code>HTMLVideoElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-video-element](https://html.spec.whatwg.org/multipage/media.html#the-video-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [Web 媒体类型和格式指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats)
    
    -   [媒体容器格式（文件类型）](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers)
    -   [web 视频编码指南](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Video_codecs)
    -   [web 音频编码指南](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Audio_codecs)
-   在框架内定位和调整图片大小：[`object-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-position) 和 [`object-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Properties/object-fit)
    
-   [`<audio>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio)
-   [使用 HTML 音频和视频](https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio)
    
-   [使用 canvas 处理视频](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Manipulating_video_using_canvas)
    
-   [Ogg 格式媒体文件的服务器配置](https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Configuring_servers_for_Ogg_media)
    

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video/contributors.txt)更新。
