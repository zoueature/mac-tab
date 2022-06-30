import http from './axios'

async function searchApp(keyword, categoryId, page, size, callback) {
    http.get('/app/search', {
        keyword: keyword,
        categoryId: categoryId,
        page: page, 
        size: size,
    }, callback)
}

async function getAppCategory(callback) {
    http.get('/app/category', {}, callback)
}

export default {
    searchApp,
    getAppCategory,
}