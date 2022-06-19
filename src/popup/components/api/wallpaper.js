import http from './axios'

async function getWWallpaperTag(callback) {
    http.get('/wallpaper/tag', {}, callback)
}

export default {
    getWWallpaperTag,
}