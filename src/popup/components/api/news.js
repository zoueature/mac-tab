import http from './axios'

async function getNews(type, callback) {
    http.get('/news/' + type, {}, callback)
}

export default {
    getNews,
}