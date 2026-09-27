基线

广泛可用

自 2017年10月 起，此特性已在主流浏览器中得到支持，可在大多数设备和浏览器版本中正常使用。

-   [查看完整兼容性](#浏览器兼容性)
-   [了解更多](https://developer.mozilla.org/zh-CN/docs/Glossary/Baseline/Compatibility)

**`<time>`** [HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) 元素用来表示一个特定的时间段。该元素可包含 `datetime` 属性，用于将日期转换为机器可读格式，从而获得更好的搜索引擎结果或自定义功能（如提醒）。

它可以代表以下含义之一：

-   24 小时时钟上的时间。
-   [公历](https://zh.wikipedia.org/wiki/公历 "外部链接（在新标签页中打开）")中的精确日期（可选时间和时区信息）。
-   [有效时间长度](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string "外部链接（在新标签页中打开）")。

## [尝试一下](#尝试一下)

```
<p>
  The Cure will be celebrating their 40th anniversary on
  <time datetime="2018-07-07">July 7</time> in London's Hyde Park.
</p>

<p>
  The concert starts at <time datetime="20:00">20:00</time> and you'll be able
  to enjoy the band for at least <time datetime="PT2H30M">2h 30m</time>.
</p>
```

```
time {
  font-weight: bold;
}
```

## [属性](#属性)

与所有其他 HTML 元素类似，此元素支持[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Global_attributes)。

[`datetime`](#datetime)

该属性表示此元素的时间和/或日期，并且属性值必须符合下文所描述的格式。

## [使用说明](#使用说明)

该元素用于以机器可读格式显示日期和时间。例如，它可以帮助用户代理将事件添加到用户的日历中。

在使用公历之前的日期时不应使用该元素（因为这些日期的计算比较复杂）。

_日期时间值_（机器可读的日期时间值）是该元素的 `datetime` 属性的值，必须采用正确的格式（见下文）。如果元素没有 `datetime` 属性，**它就不能有任何元素后代**，_日期时间值_就是元素的子文本内容。

### [有效的日期时间值](#有效的日期时间值)

| 描述 | 微语法 | 示例 |
| --- | --- | --- |
| 有效月份字符串 | `_YYYY_-_MM_` | `2011-11`、`2013-05` |
| 有效日期字符串 | `_YYYY_-_MM_-_DD_` | `1887-12-01` |
| 有效的无年份日期字符串 | `_MM_-_DD_` | `11-12` |
| 有效时间字符串 | `_HH_:_MM_`  
`_HH_:_MM_:_SS_`  
`_HH_:_MM_:_SS_._mmm_` | `23:59`  
`12:15:47`  
`12:15:52.998` |
| 有效的本地日期和时间字符串 | `_YYYY_-_MM_-_DD__HH_:_MM_`  
`_YYYY_-_MM_-_DD_ _HH_:_MM_:_SS_`  
`_YYYY_-_MM_-_DD_ _HH_:_MM_:_SS_._mmm_`  
`_YYYY_-_MM_-_DD_T_HH_:_MM_`  
`_YYYY_-_MM_-_DD_T_HH_:_MM_:_SS_`  
`_YYYY_-_MM_-_DD_T_HH_:_MM_:_SS_._mmm_` | `2013-12-25 11:12`  
`1972-07-25 13:43:07`  
`1941-03-15 07:06:23.678`  
`2013-12-25T11:12`  
`1972-07-25T13:43:07`  
`1941-03-15T07:06:23.678` |
| 有效的时区偏差字符串 | `Z`  
`+_HHMM_`  
`+_HH_:_MM_`  
`-_HHMM_`  
`-_HH_:_MM_` | `Z`  
`+0200`  
`+04:30`  
`-0300`  
`-08:00` |
| 有效的全局日期和时间字符串 | 有效的本地日期和时间字符串后跟着有效的时区偏差字符串的任意组合 | `2013-12-25 11:12+0200`  
`1972-07-25 13:43:07+04:30`  
`1941-03-15 07:06:23.678Z`  
`2013-12-25T11:12-08:00` |
| 有效周字符串 | `_YYYY_-W_WW_` | `2013-W46` |
| 四个或更多 ACSII 数字 | `_YYYY_` | `2013`、`0001` |
| 有效的持续时间字符串 | `P_d_DT_h_H_m_M_s_S`  
`` P_d_DT_h_H_m_M_s_._X_S   `P_d_DT_h_H_m_M_s_._XX_S`   `P_d_DT_h_H_m_M_s_._XXX_S`   `PT_h_H_m_M_s_S`   `PT_h_H_m_M_s_._X_S`   `PT_h_H_m_M_s_._XX_S`   `PT_h_H_m_M_s_._XXX_S`   `_w_w _d_d _h_h _m_m _s_s` `` | `P12DT7H12M13S`  
`P12DT7H12M13.3S`  
`P12DT7H12M13.45S`  
`P12DT7H12M13.455S`  
`PT7H12M13S`  
`PT7H12M13.2S`  
`PT7H12M13.56S`  
`PT7H12M13.999S`  
`7d 5h 24m 13s` |

## [示例](#示例)

### [简单示例](#简单示例)

#### HTML

html

```
<p>演出于 <time datetime="2018-07-07T20:00:00">20:00</time> 开始。</p>
```

#### 结果

### [`datetime` 示例](#datetime_示例)

#### HTML

html

```
<p>演出于 <time datetime="2001-05-15T19:00">5 月 15 日</time>开始。</p>
```

#### 结果

## [技术概要](#技术概要)

<table><tbody><tr><th scope="row"><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories">内容分类</a></th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9">流式内容</a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>、可感知内容。</td></tr><tr><th scope="row">允许的内容</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>。</td></tr><tr><th scope="row">标签省略</th><td>不允许，开始标签和结束标签都不能省略。</td></tr><tr><th scope="row">允许的父元素</th><td>任何接受<a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9">短语内容</a>的元素。</td></tr><tr><th scope="row">隐含的 ARIA 角色</th><td><code><a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/structural_roles#structural_roles_with_html_equivalents">time</a></code></td></tr><tr><th scope="row">允许的 ARIA 角色</th><td>任何</td></tr><tr><th scope="row">DOM 接口</th><td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTimeElement"><code>HTMLTimeElement</code></a></td></tr></tbody></table>

## [规范](#规范)

| 规范 |
| --- |
| [HTML  
\# the-time-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) |

## [浏览器兼容性](#浏览器兼容性)

## [参见](#参见)

-   [`<data>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/data) 元素，可用于表示其他类型的值。

## 帮助改进 MDN

[了解如何参与贡献](https://developer.mozilla.org/zh-CN/docs/MDN/Community/Getting_started)

此页面最后更新于 2025年8月6日，由 [MDN 贡献者](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/time/contributors.txt)更新。
