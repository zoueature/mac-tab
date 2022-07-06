import keys from "@/popup/store/keys";
import initApps from "@/popup/store/init/init_app";

export default {
    initApp(context) {
         chrome.storage.local.get(keys.userApp, function(result) {
            if (result != null && result[keys.userApp] != null) {
                let userApps = result[keys.userApp]
                context.commit("initUserApps", userApps)
            } else {
                context.commit("initUserApps", [initApps])
            }
        });
    },
    addAppToLocal(context, app) {
        context.commit("addAppToLocal", app)
    }
}