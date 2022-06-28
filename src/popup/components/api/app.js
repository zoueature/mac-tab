import http from './axios'

async function searchApp(keyword, categoryId, callback) {
    http.get('/app/search', {
        keyword: keyword,
        categoryId: categoryId,
    }, callback)
}

async function getAppCategory(callback) {
    http.get('/app/category', {}, callback)
}

export default {
    searchApp,
    getAppCategory,
}