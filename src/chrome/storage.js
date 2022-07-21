
function setLocal(key, value) {
    let val = {}
    val[key] = value
    if  (typeof chrome === undefined) {
        localStorage.setItem(key, JSON.stringify(val))
        return
    }
    chrome.storage.local.set(val, function() {})
}

function getLocal(key, callback) {
    if  (typeof chrome === undefined) {
        let data = localStorage.getItem(key)
        if (data != "") {
            data = JSON.parse(data)
        }
        callback(data)
    }
    chrome.storage.local.get(key, function (res) {
        let data = res[key]
        callback(data)
    })
}

function setSync(key, value) {
    if  (typeof chrome === undefined) {
        return
    }
    let val = {}
    val[key] = value
    chrome.storage.sync.set(val, function() {})
}

function getSync(key, callback) {
    if  (typeof chrome === undefined) {
        return
    }
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