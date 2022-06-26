import http from './axios'

async function getAnnouncement(callback) {
    http.get('/announcement', {}, callback)
}


export default {
    getAnnouncement,
}