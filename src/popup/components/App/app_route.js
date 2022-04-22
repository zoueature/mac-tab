import TodoApp from "@/popup/components/App/Todo/TodoApp";
import Wallpaper from "@/popup/components/App/Wallpaper/Wallpaper";
import Calculator from "@/popup/components/App/Calculator/Calculator";
import AppStore from "@/popup/components/App/AppStore/AppStore";
import Note from "@/popup/components/App/Note/Note";
import NewsDrawer from "@/popup/components/App/News/NewsDrawer";
import JsonFormatter from "@/popup/components/App/JsonFormatter/JsonFormatter";
import Translate from "@/popup/components/App/Translate/Translate";
import ShortVideo from "@/popup/components/App/ShortVideo/ShortVideo";
import Setting from "@/popup/components/App/Setting/Setting";
import Weather from "@/popup/components/App/Weather/Weather";
import History from "@/popup/components/App/History/History";

const routes = [
    // ----------- app -------------
    { name: 'todo', path: '/todo', components: {app: TodoApp}, },
    { name: 'wallpaper',path: '/wallpaper', components: {app: Wallpaper},},
    { name: 'calculator',path: '/calculator', components: {app: Calculator}, },
    { name: 'appstore',path: '/appstore', components: {app: AppStore}, },
    { name: 'note',path: '/note', components: {app: Note}, },
    { name: 'json', path: '/json', components: {app: JsonFormatter}, },
    { name: 'translate', path: '/translate', components: {app: Translate}, },
    { name: 'video', path: '/video', components: {app: ShortVideo}, },
    { name: 'weather', path: '/weather', components: {app: Weather}, },
    { name: 'history', path: '/history', components: {app: History}, },

    // ---------- drawer ------------
    { name: 'news', path: '/news', components: {drawer: NewsDrawer}, },
    { name: 'setting', path: '/setting', components: {drawer: Setting}, },
]

export default routes