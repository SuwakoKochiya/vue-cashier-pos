import axios from 'axios';


function checkStatus(res) {
  return res.status === 200;
}

function parseJSON(res) {
  return res.json();
}



/**
 * axios统一请求
 * @param {String} url 
 */
export default function fetch(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        return checkStatus(res)
          ? res.data
          : new Error(res.statusText);
      })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}