import {ElNotification} from "element-plus"
import logo from './Logo'


function notify(title, msg, duration = 2500) {
    ElNotification({
      title: title,
      message: msg,
      dangerouslyUseHTMLString: true,
      // position: 'top-left',
      duration: duration,
      icon: logo,
    })	
}




export default {
	notify,
}