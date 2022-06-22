import keys from "@/popup/store/keys";




/* eslint-disable */
export default {
    initApp(context) {
         chrome.storage.local.get(keys.userApp, function(result) {
            if (result !== null) {
                let userApps = result[keys.userApp]
                context.commit("initUserApps", userApps)
            }
        });
    },
    addAppToLocal(context, app) {
        context.commit("addAppToLocal", app)
    }
}