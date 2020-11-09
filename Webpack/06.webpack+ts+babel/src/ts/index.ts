import "../css/index.scss";

let promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve(123)
  }, 2000);
});

promise.then(res => {
  console.log(res);
})