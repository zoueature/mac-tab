import keys from "@/popup/store/keys";




/* eslint-disable */
export default {
    initApp(context) {
         chrome.storage.local.get(keys.userApp, function(result) {
            if (result !== null) {
                let userApps = result["user_installed_apps"]
                console.log(userApps)
                context.commit("initUserApps", userApps)
            }
        });
    }
}