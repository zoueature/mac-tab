import http from './axios'

async function getWWallpaperTag(callback) {
    http.get('/wallpaper/tag', {}, callback)
}

function getWallpaperByOriginCate(origin, cate, keyword, page, size, callback) {
    http.get("/wallpaper/type/" + origin, {
        keyword: keyword,
        cateId: cate,
        page:  page,
        size: size,
      }, callback)
}

export default {
    getWWallpaperTag,
    getWallpaperByOriginCate, 
}