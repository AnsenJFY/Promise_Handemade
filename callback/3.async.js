// 接口并发

// 树组件 先获取文件夹信息 -> 文件列表接口 -> 获取要渲染的数据

// fs模块 node的一个核心模块 在nodeAPI中，所有回调函数的第一个参数都是err 
// code runner 默认会以根文件夹为基准

let fs = require('fs');

// let arr = [];  // 
// function out(data) {
//   arr.push(data);
//   if (arr.length === 2) {
//     console.log(arr)
//   }
// }

function after(times,fn){
  let arr =[]
  return function(data){ // 每次调用out函数 会触发此函数
    arr.push(data);
    if(--times==0){  // 当目标到达后 调用Callback
      fn(arr)
    }
  }
};

let out = after(2,function(data){
  console.log(data)
});

fs.readFile('./demo.txt', 'utf8', function (err, data) {
  out(data)
});
fs.readFile('./file.txt', 'utf8', function (err, data) {
  out(data)
});

// 发布订阅 Promise Redux EventBus 观察者模式
// 发布 && 订阅