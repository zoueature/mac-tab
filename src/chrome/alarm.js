
// startAlarmListener 开始监听定时任务回调
function startAlarmListener() {
    chrome.alarms.onAlarm.addListener(alarmInfo => {
        // name: "testAlarm"
        // periodInMinutes: 1
        // scheduledTime: 1657089739062.78
        let alarmName = alarmInfo.name
        let handler = alarmHandler[alarmName]
        if (handler != undefined) {
            handler(alarmInfo)
        }
    })
}

let alarmHandler = {}

// createAlarm 创建定时任务

// period参数
// delayInMinutes number optional， Length of time in minutes after which the onAlarm event should fire.
// periodInMinutes  number optional， If set, the onAlarm event should fire every periodInMinutes minutes after the initial event specified by when or delayInMinutes. If not set, the alarm will only fire once.
// when  number optional， Time at which the alarm should fire, in milliseconds past the epoch (e.g. Date.now() + n).
function createAlarm(name, period, callback) {
    chrome.alarms.create(name, period)
    alarmHandler[name] = callback
}

// clearAlarm 清除定时任务
function clearAlarm(name, callback) {
    chrome.alarms.clear(name, callback)
    delete alarmHandler[name]
}

export default {
    createAlarm,
    startAlarmListener,
    clearAlarm,
}