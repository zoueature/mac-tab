import keys from "@/popup/store/keys";
import initApps from "@/popup/store/init/init_app";
import storage from "@/chrome/storage"

export default {
    initApp(context) {
        storage.getLocal(keys.userApp, function(result) {
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