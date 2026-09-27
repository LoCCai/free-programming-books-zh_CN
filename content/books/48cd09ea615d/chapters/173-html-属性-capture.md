有限可用

此特性不属于基线，因为它尚未在主流浏览器中得到支持。

Want more browser support for this feature? [Tell us why.](https://github.com/web-platform-dx/developer-signals/issues/27)

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`capture`** 属性可选地指定应捕获一个新文件，以及应使用哪个设备捕获 [`accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept) 属性所定义类型的新媒体。

可用值包括 `user` 和 `environment`，该属性支持 [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) 输入类型。

如果 [accept](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept) 属性指示输入应为图像或视频数据类型之一，则 `capture` 属性的值为一个字符串，用于指定使用哪个摄像头捕获图像或视频数据。

| 值 | 描述 |
| --- | --- |
| `user` | 应使用面向用户的摄像头和/或麦克风。 |
| `environment` | 应使用朝外的摄像头和/或麦克风。 |

**备注：**capture 以前是一个布尔属性，如果存在，则要求使用设备自身的媒体捕捉设备（如摄像头或麦克风），而不是要求输入文件。

## [尝试一下](#尝试一下)

```
<label for="selfie">Take a picture of your face:</label>

<input type="file" id="selfie" name="selfie" accept="image/*" capture="user" />

<label for="picture">Take a picture using back facing camera:</label>

<input
  type="file"
  id="picture"
  name="picture"
  accept="image/*"
  capture="environment" />
```

```
label {
  display: block;
  margin-top: 1rem;
}

input {
  margin-bottom: 1rem;
}
```

## [示例](#示例)

当设置为文件输入类型时，带有麦克风和摄像头的操作系统将显示一个用户界面，允许从现有文件中进行选择或创建新文件。

html

```
<p>
  <label for="soundFile">你的声音是什么样的：</label>
  <input type="file" id="soundFile" capture="user" accept="audio/*" />
</p>
<p>
  <label for="videoFile">上传一个视频：</label>
  <input type="file" id="videoFile" capture="environment" accept="video/*" />
</p>
<p>
  <label for="imageFile">上传一张自己的照片：</label>
  <input type="file" id="imageFile" capture="user" accept="image/*" />
</p>
```

请注意，这些功能在移动设备上更好用；如果你的设备是台式电脑，你可能会得到一个典型的文件选择器。

## [规范](#规范)

| 规范 |
| --- |
| [HTML Media Capture  
\# dfn-capture](https://w3c.github.io/html-media-capture/#dfn-capture) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [使用 web 应用程序的文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications)
-   [File API](https://developer.mozilla.org/zh-CN/docs/Web/API/File)
-   [`HTMLInputElement.files`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/capture/contributors.txt)更新。
