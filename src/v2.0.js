// v2.0 基于观察模式实现

const PENDING = 'PENDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

function myPromise(constructor){
    let self = this;
    self.status = PENDING; //定义状态改变前的初始状态
    self.value = undefined; //定义状态为resolved的时候的状态
    self.reason = undefined; //定义状态为rejected的时候的状态
    // 用2个数组onFullfilledArray和onRejectedArray来保存异步的方法
    self.onFullfilledArray = []
    self.onRejectedArray = []
    function resolved(value){
        // 保证了状态的改变是不可逆的
        if(self.status === PENDING){
            self.value = value;
            self.status = RESOLVED;
            self.onFullfilledArray.forEach(f => {
                // 如果状态从pending变成resolved
                // 则遍历执行里面的异步方法
                f(self.value)
            })
        }
    }
    function rejected(reason){
        // 保证了状态的改变是不可逆的
        if(self.status === PENDING){
            self.reason = reason;
            self.status = REJECTED;
            self.onRejectedArray.forEach(f => {
                // 如果状态从pending变成rejected
                // 则遍历执行里面的异步方法
                f(self.reason)
            })
        }
    }
    // 捕获构造异常
    try {
        constructor(resolved, rejected)
    } catch (error) {
        rejected(error)
    }
}

myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    switch (self.status) {
        // 状态为pending时, 把所有回调方法添加到数组里
        case PENDING:
            self.onFullfilledArray.push(() => {
                onFullfilled(self.value)
            })
            self.onRejectedArray.push(() => {
                onRejected(self.reason)
            })
            break;
        case RESOLVED:
            onFullfilled(self.value)
            break;
        case REJECTED:
            onRejected(self.reason)
            break;
        default:
            break;
    }
}

var p1 = new myPromise((resolved, reject)=>{
    resolved(1)
})

p1.then(res=>{
    console.log('v1.0 - p1>>>>>>', res)
})

// 但是这里myPromise无法处理异步的resolve.比如：
var p2=new myPromise((resolve,reject) => {
    setTimeout(() => {
        resolve(1)
    },1000)
});

//无输出
p2.then(res => {
    console.log('v2.0 - p2>>>>>>', res)
}) 