
function setLocal(key, value) {
    let val = {}
    val[key] = value
    chrome.storage.local.set(val, function() {})
}

function getLocal(key, callback) {
    chrome.storage.local.get(key, function (res) {
        let data = res[key]
        callback(data)
    })
}

function setSync(key, value) {
    let val = {}
    val[key] = value
    chrome.storage.sync.set(val, function() {})
}

function getSync(key, callback) {
    chrome.storage.sync.get(key, function (res) {
        let data = res[key]
        callback(data)
    })
}

export default {
    setLocal,
    getLocal,
    setSync,
    getSync,
}