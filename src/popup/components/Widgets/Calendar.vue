<template>
    <div class="calendar-widget">
        <div class="shower month-shower">
            {{month}}月
        </div>
        <div class="shower date-shower">
            {{date}}
        </div>
    </div>
</template>

<script>

import dateFormat from "dateformat";

export default {
    name: "CalendarWidget",
    created() {
        setInterval(() => {
            this.refreshTime()
        }, 100)
    },
    methods: {
        refreshTime() {
            let now = new Date()
            this.date = dateFormat(now, 'd')
            this.month = dateFormat(now, 'm')
        }
    },
    data() {
        return {
            date: '',
            month: '',
        }
    }
}
</script>

<style scoped>
.calendar-widget {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.month-shower {
    width: 100%;
    height: 30%;
    background-color: #EF5350;
    font-size: 1.2vw;
    color: #eee;
    font-weight: bolder;
}
.shower {
    display: flex;
    justify-content: center;
    align-items: center;
}
.date-shower {
    width: 100%;
    height: 70%;
    font-size: 4vw;
}
</style>