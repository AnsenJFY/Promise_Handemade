function Promise(executer){
    // 在Promise内部定一个状态 当前Promise的状态
    let self = this;
    self.status = 'pending'; //默认Promise的状态
    self.value = null;
    self.reason = null;

    function resolve(value){
        self.value = value;
        self.status = 'resolve'; // 成功态
    }
    function reject(reason){
        self.reason = reason;
        self.status = 'reject'; // 失败态
    }
    executer(resolve,reject); // 执行器立即被执行
}
Promise.prototype.then = function(onFulfilled,onRejected){
    let self = this;
    if(self.status == 'resolve'){
        onFulfilled(self.value)
    }
    if(self.status == 'reject'){
        onRejected(self.reason)
    }
}


module.exports = Promise;