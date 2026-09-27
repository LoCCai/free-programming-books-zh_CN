[JavaScript 对象表示法 (JSON)](https://link.w3cschool.cn/?target=http%3A%2F%2Fwww.json.org%2F)是轻量级的数据交换格式。下面的例子展示了 `ArrayTest` 中的测试所生成的 JSON 讯息：

```
{"event":"suiteStart","suite":"ArrayTest","tests":2}
{"event":"test","suite":"ArrayTest",
 "test":"testNewArrayIsEmpty(ArrayTest)","status":"pass",
 "time":0.000460147858,"trace":[],"message":""}
{"event":"test","suite":"ArrayTest",
 "test":"testArrayContainsAnElement(ArrayTest)","status":"pass",
 "time":0.000422954559,"trace":[],"message":""}
```

以下 JSON 讯息是由名为 `FailureErrorTest` 的测试用例类中的两个测试 `testFailure` 和 `testError` 所生成的，展示了失败和错误是如何表示的：

```
{"event":"suiteStart","suite":"FailureErrorTest","tests":2}
{"event":"test","suite":"FailureErrorTest",
 "test":"testFailure(FailureErrorTest)","status":"fail",
 "time":0.0082459449768066,"trace":[],
 "message":"Failed asserting that <integer:2> is equal to <integer:1>."}
{"event":"test","suite":"FailureErrorTest",
 "test":"testError(FailureErrorTest)","status":"error",
 "time":0.0083680152893066,"trace":[],"message":""}
```
