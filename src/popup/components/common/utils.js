import {ElNotification} from "element-plus"


function notify(title, msg, duration = 2000) {
    ElNotification({
      title: title,
      message: msg,
      dangerouslyUseHTMLString: true,
      position: 'top-left',
      duration: duration
    })	
}




export default {
	notify,
}