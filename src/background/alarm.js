import alarm from "@/chrome/alarm"

function startAlarm() {
    alarm.startAlarmListener()
    alarm.createAlarm("testAlarm", {periodInMinutes: 1}, alarmInfo => {
        console.log(alarmInfo)
    })
}

export default {
    startAlarm,
}