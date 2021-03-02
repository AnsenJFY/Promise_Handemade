## Promise/A+规范
> Promise/A+规范扩展了早期的Promise/A proposal提案

### 术语
 * "promise"是一个对象或者函数，该对象或者函数有一个then方法
 * "thenable"是一个对象或者函数，用来定义then方法
 * "value"是promise状态成功时的值
 * "reason"是promise状态失败时的值

### 要求
* 一个promise必须有3个状态，`pending`，`fulfilled(resolved)`，`rejected`，当处于pending状态的时候，可以转移到fulfilled(resolved)或者rejected状态。当处于fulfilled(resolved)状态或者rejected状态的时候，就不可变。

* 一个promise必须有一个then方法，then方法接受两个参数：promise.then(`onFulfilled`,`onRejected`)其中`onFulfilled`方法表示状态从pending——>fulfilled(resolved)时所执行的方法，而`onRejected`表示状态从pending——>rejected所执行的方法。

* 为了实现链式调用，`then`方法必须返回一个`promise`;
