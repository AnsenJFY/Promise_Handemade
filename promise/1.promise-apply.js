// Promise 是一个类(解决异步问题)
// 自己实现Promise 流程
// new Promise 时，需要传递一个executer执行器(函数) 会立即被调用(同步代码)
// Promise 承诺 默认的状态pedding等待状态 reslove成功状态 reject失败状态
// 每一个Promise实例 都会有个实例方法then
// 我们可以从 等待态 转换成成功/失败 但是不能从失败/成功进行转化
let Promise = require('./2.Promise')
let p = new Promise(function(resolve,reject){
    console.log('start');
    resolve('情人节到了');
    resolve('情人节没到');
});

p.then(value=>{
    console.log('success',value)
},reason=>{
    console.log('error',reason)
})
console.log('end');