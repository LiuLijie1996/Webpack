// import "@babel/polyfill";
import '../css/c.css';
import '../css/a.scss';
import '../css/b.scss';

let arr = ['1', '2', '3', '4', '5', '6'];

arr.forEach(item => {
  console.log(item);
})

let promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('定时器执行了');
  }, 2000)
});

promise.then(() => {
  console.log('pronise执行完成');
})