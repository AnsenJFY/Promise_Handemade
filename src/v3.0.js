// v3.0 then方法实现链式调用

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

/**
 * 要通过then方法实现链式调用，
 * 那么也就是说then方法每次调用需要返回一个primise,
 * 同时在返回promise的构造体里面，增加错误处理部分
 */
myPromise.prototype.then = function(onFullfilled, onRejected){
    let self = this;
    let promise2;
    switch (self.status) {
        // 状态为pending时, 把所有回调方法添加到数组里
        case PENDING:
            promise2 = new myPromise((resolve, reject) => {
                self.onFullfilledArray.push(() => {
                    try {
                        let temple = onFullfilled(self.value)
                        resolve(temple)
                    } catch (error) {
                        reject(error) // error catch
                    }
                })
                self.onRejectedArray.push(() => {
                    try {
                        let temple = onRejected(self.reason)
                        reject(temple)
                    } catch (error) {
                        reject(error) // error catch
                    }
                })
                
            })
            break;
        case RESOLVED:
            promise2 = new myPromise((resolve,reject) => {
                try {
                    let temple = onFullfilled(self.value);
                    //将上次一then里面的方法传递进下一个Promise的状态
                    resolve(temple);
                } catch (error) {
                    reject(error); //error catch
                }
            })
            break;
        case REJECTED:
            promise2=new myPromise((resolve,reject) => {
                try{
                   let temple = onRejected(self.reason);
                   //将then里面的方法传递到下一个Promise的状态里
                   resolve(temple);   
                }catch(error){
                   reject(error); //error catch
                }
            })
            break;
        default:
            break;
    }
    return promise2; // 返回一个新的Promise对象
}

// v1 demo
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
p2.then(res => {
    console.log('v2.0 - p2>>>>>>', res)
}) 


var p3=new myPromise((resolve,reject) => {
    setTimeout(() => {
        resolve(1)
    },2000)
});
p3.then(res => {
    console.log('v3.0 - p3>>>>>>',res)
}).then(() => {
    console.log("链式调用1")
}).then(() => {
    console.log("链式调用2")
})
