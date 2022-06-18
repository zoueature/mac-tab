import {ElNotification} from "element-plus"


function notify(title, msg) {
    ElNotification({
      title: title,
      message: msg,
      position: 'top-left',
    })	
}




export default {
	notify,
}