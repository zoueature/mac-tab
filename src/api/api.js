/**
 * 简单封装的fetch包
 * 可用于background中发起http请求
 */
let baseURL = ""

function httpBuilQuery(params) {
    let str = []
    for (let key in params) {
        str.push(key + "=" + encodeURI(params[key]))
    }
    return str.join("&")
}

function get(url, params, callback) {
    request(url, {
        method: "GET",
        params: params,
    }).then(response => callback(response))
}

function post(url, params, callback) {
    request(url, {
        method: "POSt",
        params: params,
    }).then(response => callback(response))
}
 /* eslint-disable */
/**
 * 封装的fetch函数，传入url(必须)和一个参数对象(可选)，这是fetch的需求参数
 */
async function request(url, options = {}) {
  // 拼接完整的url
  url = baseURL + url;

  // Get的请求处理
  !options.method ? (options.method = "GET") : null;
  // 如果options中具有params参数，进行处理
  console.log(options)
  if (options.params !== undefined) {
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
      // 判断当前url中是否有问号，如果有，就用&，如果没有，就用问号，作为拼接参数的连接符
      const ask = url.includes("?") ? "&" : "?";
      // 如果请求时GET请求，把所有params参数添加到url中，通过qs库将对象拼接为xxx=xxx&yyy=yyy的格式
      url += `${ask}${httpBuilQuery(options.params)}`;
    }
    // params不是fetch中自带的有效参数，fetch不支持该参数，需要在发送请求前将其删除
    delete options.params;
  }

  /**
   * 合并配置项
   */
        // 允许跨域携带资源凭证
      //   - include：无论同源不同源都可以
      //   - same-origin：同源可以，默认值 √
      //   - omit：都拒绝
  options.credentials =  "same-origin"
  options.headers = {}
  // 最后添加携带的数据格式，这个根据需求填写
  options.headers.Accept = "application/json";

  /**
   * 添加token
   */
//   const token = localStorage.getItem("token");
//   token && (options.headers.Authorization = token);

  /**
   * POST请求的处理
   */
  if (/^(POST|PUT)$/i.test(options.method)) {
    // 读取传入的数据格式类型参数type，如果没有传入type，默认为urlencoded格式
    !options.type ? (options.type = "urlencoded") : null;
    if (options.type === "urlencoded") {
      // 处理数据体，使用qs进行格式化
      options.headers["Content-Type"] = "application/x-www-form-urlencoded";
      options.body = httpBuilQuery(options.body);
    }
    if (options.type === "json") {
      // json格式使用JSON库进行格式化
      options.headers["Content-Type"] === "application/json";
      options.body.JSON.stringify(options.body);
    }
  }

  /**
   * 全部配置好之后，最后使用fetch发起一个请求，它本身需要传入一个url和一个options
   */
   return fetch(url, options)
   .then(response => {
     // fetch与ajax(axios)不同，只要服务器有返回值，都是成功，没有返回值才算失败。
     // 所以要在这里进行处理所有返回的结果
     if (!/^(2|3)\d{2}$/.test(response.status)) {
       // 失败的状态，非2|3开头的状态，进行处理
       switch (response.status) {
         case 401:
           // 权限不够，一般是未登录
           // ...
           break;
         case 403:
           // 服务器已经接受，但是拒绝访问，通常是登录过期
           // ...
           break;
         case 404:
           // 找不到资源
           // ...
           break;
       }
     }

     // 处理之后，将response的所有数据转换成json，客户端就可以拿到以json格式响应的所有数据
     return response.json();
   })
   .catch(error => {
     // 服务器没有响应才会跳转到这里
     return Promise.reject(error);
   });
}


export default {
    request,
    get,
    post,
}