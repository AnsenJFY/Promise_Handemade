// 观察者 和 被观察者 
// 被观察者要放在观察者中 
// 观察者需要提供一个更新方法
// 当观察者数据发生变化时 
// 需要执行观察者的update方法

function Observer(){
    this.state = '不开心的';
    this.arr = []
}
Observer.prototype.attach = function(s){
    this.arr.push(s)
}
Observer.prototype.setState = function(newState){
    this.state = newState;
    this.arr.forEach(fn => {
        fn.update(this.state)
    });
}

function Subject(name,target){
    this.name = name;
    this.target = target;
}
Subject.prototype.update = function(newState){
    console.log(this.name + '监控到了' + newState +'变化')
}
let o = new Observer();
let s1 = new Subject('我',o);
let s2 = new Subject('小麦',o);
o.attach(s1);
o.attach(s2);
o.setState('兴奋');