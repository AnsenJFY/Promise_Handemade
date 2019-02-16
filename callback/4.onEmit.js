let fs = require('fs');
function Events(){
  this._arr = []
}
Events.prototype.on = function(fn){
  this._arr.push(fn)
}

Events.prototype.emit = function(res){
  this._arr.forEach(fn => {
    fn(res)
  });
}

let e = new Events();
let arr = [];
e.on(function(r){
  arr.push(r);
  if(arr.length ==2){
    console.log('读取完毕1',arr)
  }
})

fs.readFile('./demo.txt', 'utf8', function (err, data) {
  e.emit(data)
})
fs.readFile('./file.txt', 'utf8', function (err, data) {
  e.emit(data)
})

// 发布订阅模式

// 发布订阅的特点 两者没有关系
// 观察者模式特点 观察者 + 被观察者 两者有关系的 Vue双向绑定，watcher