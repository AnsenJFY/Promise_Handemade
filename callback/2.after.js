// 在loaddash 在多少次之后 执行某个方法
// 私有化 预制times变量

function after(times, cbk) {
  return function () {
    if (--times == 0) {
      cbk()
    }
  }
}

let newFn = after(2, function () {
  console.log('after~~~');
})

newFn();
newFn();