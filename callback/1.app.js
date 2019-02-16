Function.prototype.before = function(cbk){
    let that = this;
    return function(){
        cbk();
        that.apply(that,arguments)
    }
}

function fn(value){
    console.log('我在吃',value)
};

let newFn = fn.before(function(){
    console.log('先喝水')
});

newFn('米饭')