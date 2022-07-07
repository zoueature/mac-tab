import http from './axios'

// getSearchSuggest 
// 获取
async function getSearchSuggest(keyword, callback) {
    let url = "https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd="
    let result = await http.http.get(url, {
        params: {
            prod: "pc",
            from: "pc",
            wd: keyword,
        }
    })
    let suggest = []
    if (result.status === 200) {
        if (result.data.g !== undefined) {
            result.data.g.forEach(v => {
                suggest.push(v.q)
            })
        }
    }
    callback(suggest)
}

export default {
    getSearchSuggest,
}