基线

广泛可用

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`accept`** 属性的值是一个以逗号分隔的列表，其中包含一个或多个文件类型/[唯一文件类型标识符](#唯一文件类型标识符)（描述了允许的文件类型）。

## [尝试一下](#尝试一下)

```
<label for="movie">Choose a movie to upload:</label>

<input type="file" id="movie" name="movie" accept="video/*" />

<label for="poster">Choose a poster:</label>

<input type="file" id="poster" name="poster" accept="image/png, image/jpeg" />
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

## [概述](#概述)

accept 是 [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file) [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 类型的属性。[`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form) 元素曾经支持这个属性，但已被移除，改用 [file](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file)。

由于一种给定的文件类型可以用多种方式标识，因此在需要特定类型的文件时，提供一套完整的类型说明是非常有用的，或者使用通配符来表示任何格式的类型也是可以接受的。

例如，有多种方法可以标识 Microsoft Word 文件，因此接受 Word 文件的网站可能会使用像这样的 `<input>`：

html

```
<input
  type="file"
  id="docpicker"
  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
```

而如果接受的是媒体文件，可能希望包含该媒体类型的任何格式：

html

```
<input type="file" id="soundFile" accept="audio/*" />
<input type="file" id="videoFile" accept="video/*" />
<input type="file" id="imageFile" accept="image/*" />
```

`accept` 属性并不验证所选文件的类型；它为浏览器提供提示，引导用户选择正确的文件类型。用户仍然有可能（在大多数情况下）在文件选择器中切换一个选项，从而覆盖此选项并选择任何他们想要的文件，然后选择不正确的文件类型。

因此，应确保服务器端验证预期要求。

## [示例](#示例)

当设置为文件输入类型时，打开的本地文件选择器只能选择正确文件类型的文件。大多数操作系统会淡化不符合标准的文件，使其无法选择。

html

```
<p>
  <label for="soundFile">选择一个音频文件：</label
  ><input type="file" id="soundFile" accept="audio/*" />
</p>
<p>
  <label for="videoFile">选择一个视频文件：</label
  ><input type="file" id="videoFile" accept="video/*" />
</p>
<p>
  <label for="imageFile">选择一些图像：</label
  ><input type="file" id="imageFile" accept="image/*" multiple />
</p>
```

请注意，最后一个示例允许你选择多个图像。参见 [`multiple`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#multiple) 属性以了解更多信息。

## [唯一文件类型标识符](#唯一文件类型标识符)

**唯一文件类型标识符**是一个字符串，用于描述用户可在 `file` 类型的 [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input) 元素中选择的文件类型。每个唯一文件类型指定符可以是以下形式之一：

-   一个以点号（“.”）字符开头的，大小写不敏感的文件扩展名。如：`.jpg`、`.pdf` 或 `.doc`。
-   一个有效的 MIME 类型字符串，不带扩展名。
-   字符串 `audio/*` 表示“任何音频文件”。
-   字符串 `video/*` 表示“任何视频文件”。
-   字符串 `image/*` 表示“任何图像文件”。

## [使用 file 输入](#使用_file_输入)

### [基本示例](#基本示例)

html

```
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="file">选择要上传的文件</label
    ><input type="file" id="file" name="file" multiple />
  </div>
  <div>
    <button>提交</button>
  </div>
</form>
```

```
div {
  margin-bottom: 10px;
}
```

这产生了如下输出：

**备注：**你也可以在 GitHub 上找到该示例——查看[源代码](https://github.com/mdn/learning-area/blob/main/html/forms/file-examples/simple-file.html "外部链接（在新标签页中打开）")，或尝试[在线运行它](https://mdn.github.io/learning-area/html/forms/file-examples/simple-file.html "外部链接（在新标签页中打开）")。

无论用户使用何种设备或操作系统，file 输入都会提供一个按钮，打开文件选择对话框，让用户选择文件。

如上所示，包含 [`multiple`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input#multiple) 属性可指定同时选择多个文件。用户可以根据平台允许的方法（如按下 Shift 或 Control，然后单击）从文件选择器中选择多个文件。如果你只想让用户从每个 `<input>` 中选择单个文件，请省略 `multiple` 属性。

### [限制所接受的文件类型](#限制所接受的文件类型)

通常情况下，你不希望用户选择任意的文件类型，而是希望他们选择特定类型的文件。例如，如果你的 file 输入让用户上传个人资料图片，你可能希望他们选择 web 兼容的图片格式，如 [JPEG](https://developer.mozilla.org/zh-CN/docs/Glossary/JPEG) 或 [PNG](https://developer.mozilla.org/zh-CN/docs/Glossary/PNG)。

可接受的文件类型可通过 [`accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input/file#accept) 属性指定，该属性使用逗号分隔的列表，列出允许的文件扩展名或 MIME 类型。举例如下：

-   `accept="image/png"` 或 `accept=".png"`——接受 PNG 文件。
-   `accept="image/png, image/jpeg"` 或 `accept=".png, .jpg, .jpeg"`——接受 PNG 或 JPEG 文件。
-   `accept="image/*"`——接收任何具有 `image/*` MIME 类型的文件。（很多移动端设备在使用此属性时也会让用户使用照相机拍照。）
-   `accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"`——接受任何看起来像 MS Word 文档的东西。

我们来看一个更加完整的例子：

html

```
<form method="post" enctype="multipart/form-data">
  <div>
    <label for="profile_pic">选择要上传的文件</label
    ><input
      type="file"
      id="profile_pic"
      name="profile_pic"
      accept=".jpg, .jpeg, .png" />
  </div>
  <div>
    <button>提交</button>
  </div>
</form>
```

```
div {
  margin-bottom: 10px;
}
```

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# attr-input-accept](https://html.spec.whatwg.org/multipage/input.html#attr-input-accept) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [在 web 应用中使用文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications)
-   [File API](https://developer.mozilla.org/zh-CN/docs/Web/API/File)

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept/contributors.txt)更新。
