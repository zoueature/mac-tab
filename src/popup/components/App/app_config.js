import TodoApp from "@/popup/components/App/Todo/TodoApp";
import Wallpaper from "@/popup/components/App/Wallpaper/Wallpaper";
import CalculatorApp from "@/popup/components/App/Calculator/Calculator";
import AppStoreApp from "@/popup/components/App/AppStore/AppStore";
import NoteApp from "@/popup/components/App/Note/Note";
import NewsDrawer from "@/popup/components/App/News/NewsDrawer";
import JsonFormatter from "@/popup/components/App/JsonFormatter/JsonFormatter";
import TranslateApp from "@/popup/components/App/Translate/Translate";
import ShortVideo from "@/popup/components/App/ShortVideo/ShortVideo";
import Setting from "@/popup/components/App/Setting/Setting";
import WeatherApp from "@/popup/components/App/Weather/Weather";
import HistoryApp from "@/popup/components/App/History/History";
import WallpaperMarket from "@/popup/components/App/Wallpaper/WallpaperMarket";
import ExtensionApp from "@/popup/components/App/Extension/Extension";

const Todo = "todo"
const WallPaper = "wallpaper"
const WallMarket = "wallmarket"
const Calculator = "calculator"
const Appstore = "appstore"
const Note = "note"
const Json = "json"
const Translate = "translate"
const Video = "video"
const Weather = "weather"
const History = "history"
const Extension = "extension"


let appName = {
    todo: Todo,
    wallpaper: WallPaper,
    wallmarket: WallMarket,
    calculator: Calculator,
    appstore: Appstore,
    note: Note,
    json: Json,
    translate: Translate,
    video: Video,
    weather: Weather,
    history: History,
    extension: Extension,
}

let appSize = {
    [WallPaper]: {
        width: 40,
    }
}

const routes = [
    // ----------- app -------------
    { name: 'todo', path: '/todo', components: {app: TodoApp}, },
    { name: 'wallpaper',path: '/wallpaper', components: {app: Wallpaper},},
    { name: 'wallmarket', path: '/wallpaper-market', components: {app: WallpaperMarket},},
    { name: 'calculator',path: '/calculator', components: {app: CalculatorApp}, },
    { name: 'appstore',path: '/appstore', components: {app: AppStoreApp}, },
    { name: 'note',path: '/note', components: {app: NoteApp}, },
    { name: 'json', path: '/json', components: {app: JsonFormatter}, },
    { name: 'translate', path: '/translate', components: {app: TranslateApp}, },
    { name: 'video', path: '/video', components: {app: ShortVideo}, },
    { name: 'weather', path: '/weather', components: {app: WeatherApp}, },
    { name: 'history', path: '/history', components: {app: HistoryApp}, },
    { name: 'index', path: '/', components: {app: History}, },
    { name: 'extension', path: '/extension', components: {app: ExtensionApp}, },

    // ---------- drawer ------------
    { name: 'news', path: '/news', components: {drawer: NewsDrawer}, },
    { name: 'setting', path: '/setting', components: {drawer: Setting}, },
]


export default {
    appSize,
    appName,
    Todo,
    WallPaper,
    WallMarket,
    Calculator,
    Appstore,
    Note,
    Json,
    Translate,
    Video,
    Weather,
    History,
    Extension,
    routes,
}