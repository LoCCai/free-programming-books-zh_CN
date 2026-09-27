基线

广泛可用

\*

自 2015年7月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

\* 此特性的某些部分的支持程度可能有所不同。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

\*\*HTML 元素 `<optgroup>` \*\*为[`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 元素中的选项创建分组。

## [尝试一下](#尝试一下)

```
<label for="dino-select">Choose a dinosaur:</label>
<select id="dino-select">
  <optgroup label="Theropods">
    <option>Tyrannosaurus</option>
    <option>Velociraptor</option>
    <option>Deinonychus</option>
  </optgroup>
  <optgroup label="Sauropods">
    <option>Diplodocus</option>
    <option>Saltasaurus</option>
    <option>Apatosaurus</option>
  </optgroup>
</select>
```

```
label {
  display: block;
  margin-bottom: 10px;
}
```

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td>无</td></tr><tr><th scope="row">允许的内容</th><td>0 或多个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option"><code>&lt;option&gt;</code></a> 元素</td></tr><tr><th scope="row">标签省略</th><td>开始标签是必须的。当该元素后面也跟着一个 &lt;optgroup&gt; 元素，或该元素的父元素没有其他内容时，结束标签可省略。</td></tr><tr><th scope="row">允许的父元素</th><td>一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select"><code>&lt;select&gt;</code></a> 元素。</td></tr><tr><th scope="row">Implicit ARIA role</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/Reference/Roles/group_role"><code>group</code></a></td></tr><tr><th scope="row">Permitted ARIA roles</th><td>No <code>role</code> permitted</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLOptGroupElement"><code>HTMLOptGroupElement</code></a></td></tr></tbody></table>

**备注：**Optgroup elements may not be nested.

## [属性](#属性)

这个元素包含 [global attributes](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`disabled`](#disabled)

如果设置了这个布尔值，则不能选择这个选项组中的任何选项。通常浏览器会置灰这样的控件，它不接受任何浏览器事件，如鼠标点击或者焦点相关的事件。

[`label`](#label)

选项组的名字，浏览器用以在用户界面中标记选项。使用这个元素时必须加上这个属性。

## [示例](#示例)

html

```
<select>
  <optgroup label="Group 1">
    <option>Option 1.1</option>
  </optgroup>
  <optgroup label="Group 2">
    <option>Option 2.1</option>
    <option>Option 2.2</option>
  </optgroup>
  <optgroup label="Group 3" disabled>
    <option>Option 3.1</option>
    <option>Option 3.2</option>
    <option>Option 3.3</option>
  </optgroup>
</select>
```

### [结果](#结果)

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-optgroup-element](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   其他表单相关的元素：[`<form>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/form), [`<legend>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/legend), [`<label>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/label), [`<button>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/button), [`<select>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select), [`<datalist>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/datalist), [`<option>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/option), [`<fieldset>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/fieldset), [`<textarea>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea), [`<input>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input), [`<output>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/output), [`<progress>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/progress) 和 [`<meter>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/meter)。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2026年4月29日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/optgroup/contributors.txt)更新。
