import IndexPage from './index2';
import '../css/a.scss';
import '../css/b.scss';
import '../css/c.css';

const arr = ['1', '2', '3', '4', '5', '6'];
arr.forEach((item) => {
  // eslint-disable-next-line
  console.log(item);
});
const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('定时器执行了');
    resolve(123);
  }, 2000);
});
promise.then(() => {
  // eslint-disable-next-line
  console.log('pronise执行完成');
});

// eslint-disable-next-line
console.log(IndexPage());
// IndexPage();
