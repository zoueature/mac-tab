//https://top.baidu.com/board?tab=realtime

// const axios = require('axios')
//
//  function getBaiduHot() {
//    axios.get("https://top.baidu.com/board?tab=realtime").then(result => {
//         if (result.status === 200) {
//             let rexp = /<\!\-\-s\-data:(.*)?\-\->/
//             let content = rexp.exec(result.data)
//             let data = JSON.parse(content[1])
//         }
//     })
// }
//
// getBaiduHot()