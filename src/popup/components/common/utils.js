import {ElNotification} from "element-plus"
import logo from './logo'


function notify(title, msg, duration = 2000) {
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