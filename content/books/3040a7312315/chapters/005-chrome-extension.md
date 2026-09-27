## chrome.extension

## 目录

1.  [为content scripts提供支持](http://open.chrome.360.cn/extension_dev/%3C#content scripts>)
    
2.  [API 参考: chrome.extension](#apiReference)
    1.  [属性](#properties)
        1.  [lastError](#property-lastError)
        2.  [inIncognitoContext](#property-inIncognitoContext)
    2.  [方法](#global-methods)
        1.  [connect](#method-connect)
        2.  [getBackgroundPage](#method-getBackgroundPage)
        3.  [getURL](#method-getURL)
        4.  [getViews](#method-getViews)
        5.  [isAllowedFileSchemeAccess](#method-isAllowedFileSchemeAccess)
        6.  [isAllowedIncognitoAccess](#method-isAllowedIncognitoAccess)
        7.  [sendMessage](#method-sendMessage)
        8.  [setUpdateUrlData](#method-setUpdateUrlData)
    3.  [事件](#global-events)
        1.  [onConnect](#event-onConnect)
        2.  [onConnectExternal](#event-onConnectExternal)
        3.  [onMessage](#event-onMessage)
        4.  [onMessageExternal](#event-onMessageExternal)
    4.  [类型](#types)
        1.  [MessageSender](#type-MessageSender)
            
        2.  [Event](#type-Event)
            
        3.  [Port](#type-Port)
            

`chrome.extension` 可以被任意扩展页使用。它提供通信支持，包括扩展与content script之间、扩展与扩展之间，具体的细节见[Message Passing](https://open.chrome.360.cn/extension_dev/messaging.html)。

## 为content script提供支持

与其他的 chrome.\* APIs不同，`chrome.extension`的部分功能可以被content script使用：

[`sendMessage()`](#method-sendMessage) 和 [`onMessage`](#event-onMessage)

与扩展页面的简单通信方式

[`connect()`](#method-connect) 和 [`onConnect`](#event-onConnect)

与扩展页的高级通信方式

[`getURL()`](#method-getURL)

访问扩展资源，例如图片文件

具体细节参见[Content Scripts](https://open.chrome.360.cn/extension_dev/content_scripts.html)。

## API 参考： chrome.extension

### 属性

#### lastError

chrome.extension.lastError

lastError_

( optional object )

_

在异步扩展API的回调生命周期中，为之（回调）设置的出错详细信息。 如果没有出错，lastError为 undefined 。

message_

( string )

_

已发生错误的描述。

#### inIncognitoContext

chrome.extension.inIncognitoContext

inIncognitoContext_

( optional boolean )

_

在隐身标签中运行时，值为true。比如content script所注入的页面在隐身标签中，又比如，扩展的某个页面在隐身进程中渲染（这仅在manifest中设置incognito\_behavior为“split”时才可能会发生）。

### 方法

#### connect

Port

chrome.extension.connect(string extensionId, object connectInfo)

尝试连接到扩展内其他监听者（比如扩展的background page）。该方法主要由content scripts在连接到其扩展进程时使用。反之，在扩展进程中，可通过 [`chrome.tabs.connect()`](https://open.chrome.360.cn/extension_dev/tabs.html#method-connect)与嵌入在标签中的content script进行连接。

#### 参数

extensionId_

( optional string )

_

您想连接的扩展的扩展ID。若省略，默认为您自己的扩展。

connectInfo_

( optional object )

_

Undocumented.

name_

( optional string )

_

将被传递给监听onConnect事件的扩展进程。

#### Returns

#### getBackgroundPage

global

chrome.extension.getBackgroundPage()

返回扩展里当前运行的background页面的JavaScript “window”对象给。 若扩展无background页则返回null。

#### Returns

_

( global )

_

Undocumented.

#### getURL

string

chrome.extension.getURL(string path)

将扩展安装目录内的文件的相对路径转为FQDN URL。

#### 参数

path_

( string )

_

扩展安装目录内的资源文件的相对（此安装根目录的）路径。

#### 返回值

_

( string )

_

资源的FQDN URL。

#### getViews

array of global

chrome.extension.getViews(object fetchProperties)

以数组的形式返回当前扩展运行的所有页面的JavaScript “window”对象。

#### 参数

fetchProperties_

( optional object )

_

Undocumented.

type_

( optional enumerated string \["tab", "infobar", "notification", "popup"\] )

_

限定页面类型。若省略，返回所有类型的页面（包括background页和tabs）。 可以限定为： 'tab'， 'infobar'， 'notification'， 'popup'。

windowId_

( optional integer )

_

限制搜索的窗口ID。若省略，搜索所有窗口。

#### 返回值

_

( array of global )

_

（数组）

#### isAllowedFileSchemeAccess

chrome.extension.isAllowedFileSchemeAccess(function callback)

查询扩展是否可以访问 'file://'（该项由用户通过‘允许范围文件URL’复选框决定）。

#### 参数

callback_

( function )

_

Undocumented.

#### 回调

回调_参数_应如下例所示：

function(boolean isAllowedAccess) {...};

isAllowedAccess_

( boolean )

_

若扩展可以访问 'file://' 为true，否则为false。

此功能在版本**12.0.706.0**中才添加。如果您需要该函数， 设置manifest字段[minimum\_chrome\_version](https://open.chrome.360.cn/extension_dev/manifest.html#minimum_chrome_version)以确保扩展不会运行在此版本之前的浏览器上。

#### isAllowedIncognitoAccess

chrome.extension.isAllowedIncognitoAccess(function callback)

查询扩展是否在隐身（小号）模式下激活。（该项可以由用户通过“允许隐身”复选框决定）

#### 参数

callback_

( function )

_

Undocumented.

#### 回调

回调_参数_应如下例所示：

function(boolean isAllowedAccess) {...};

isAllowedAccess_

( boolean )

_

若扩展隐身模式下可用则为true，否则为false。

此功能在版本**12.0.706.0**中才添加。如果您需要该函数， 请设置manifest字段[minimum\_chrome\_version](https://open.chrome.360.cn/extension_dev/manifest.html#minimum_chrome_version)以确保扩展不会运行在此版本之前的浏览器上。

#### sendMessage

chrome.extension.sendMessage(string extensionId, any message, function responseCallback)

向扩展内的其它监听者发送一条消息。与chrome.extension.connect类似，但仅发送单条消息（响应回调函数可选）。 此消息发送后会触发扩展内每个页面的[chrome.extension.onMessage](#event-onMessage)事件。

#### 参数

extensionId_

( optional string )

_

您想发送消息的目标扩展的ID。若忽略，默认为本函数调用者所在的扩展。

message_

( any )

_

Undocumented.

responseCallback_

( optional function )

_

Undocumented.

#### 回调

_回调_参数应如下例所示：

function(any response) {...};

#### setUpdateUrlData

chrome.extension.setUpdateUrlData(string data)

设置扩展更新URL的ap CGI参数。 Chrome Extension Gallery上托管的扩展将会忽略该值。

#### 参数

data_

( string )

_

Undocumented.

### 事件

#### onConnect

chrome.extension.onConnect.addListener(function(Port port) {...});

接收到本扩展进程的页面或content script发来的连接时触发。

#### 监听方参数

port_

( [Port](#type-Port) )

_

Undocumented.

#### onConnectExternal

chrome.extension.onConnectExternal.addListener(function(Port port) {...});

接收到其它扩展发来的连接时触发。

#### Listener parameters

port_

( [Port](#type-Port) )

_

Undocumented.

#### onMessage

chrome.extension.onMessage.addListener(function(object details) {...});

接收到本扩展进程的页面或content script发送一条消息时触发。

#### Listener parameters

details_

( object )

_

Undocumented.

message_

( any )

_

收到的消息内容

sender_

( [MessageSender](#type-MessageSender) )

_

Undocumented.

sendResponse_

( function )

_

消息发送者提供的响应函数，如果需要响应此消息，则用响应内容（JSON格式）作为参数调用（最多只能调用一次）此函数。比如，同一页面内有多个`onMessage`监听者，那么只有一个监听者能发送响应--因为在事件监听函数返回后，该响应函数就失效（除非特意在事件监听函数中返回true以发送异步响应--Chrome这时会一直保持消息通道，直到`sendResponse`真正被执行）了。

#### Listener returns

_

( optional boolean )

_

如果您想在事件监听函数返回后再异步调用`sendResponse` ，返回true。

#### onMessageExternal

chrome.extension.onMessageExternal.addListener(function(object details) {...});

接收到其它扩展发送的一条消息时触发。

#### 监听参数

details_

( object )

_

Undocumented.

message_

( any )

_

收到的消息。

sender_

( [MessageSender](#type-MessageSender) )

_

Undocumented.

sendResponse_

( function )

_

消息发送者提供的响应函数，如果需要响应此消息，则用响应内容（JSON格式）作为参数调用（最多只能调用一次）此函数。比如，同一页面内有多个`onMessage`监听者，那么只有一个监听者能发送响应--因为在事件监听函数返回后，该响应函数就失效（除非特意在事件监听函数中返回true以发送异步响应--Chrome这时会一直保持消息通道，直到`sendResponse`真正被执行）了。

#### Listener returns

_

( optional boolean )

_

如果您想在事件监听函数返回后再异步调用`sendResponse` ，返回true。

### 类型

#### MessageSender

_

( object )

_

消息（或连接请求）发送时的上下文信息。

tab_

( optional [Tab](https://open.chrome.360.cn/extension_dev/tabs.html#type-Tab) )

_

该属性**仅**当消息连接是从标签或content script中发起时才有效。

id_

( string )

_

打开消息连接的扩展的ID。

#### 事件

_

( object )

_

事件对象，可以添加或删除监听者。

addListener_

( function )

_

Undocumented.

removeListener_

( function )

_

Undocumented.

hasListener_

( function )

_

Undocumented.

hasListeners_

( function )

_

Undocumented.

#### Port

_

( object )

_

端口对象，用于扩展的多个页面之间进行双向通信。

name_

( string )

_

Undocumented.

onDisconnect_

( [Event](#type-Event) )

_

Undocumented.

onMessage_

( [Event](#type-Event) )

_

Undocumented.

postMessage_

( function )

_

Undocumented.

sender_

( optional [MessageSender](#type-MessageSender) )

_

该属性**仅**在传递给onConnect/onConnectExternal监听者的端口对象中有效。
