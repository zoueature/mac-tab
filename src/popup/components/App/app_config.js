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
import SearchApp from "@/popup/components/App/Search/Search";

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
const Search = "searcher"


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
    },
    [Json]: {
        width: 80,
        height: 97,
    }
}

const routes = [
    // ----------- app -------------
    { name: Todo, path: '/todo', components: {app: TodoApp}, },
    { name: WallPaper,path: '/wallpaper', components: {app: Wallpaper},},
    { name: WallMarket, path: '/wallpaper-market', components: {app: WallpaperMarket},},
    { name: Calculator,path: '/calculator', components: {app: CalculatorApp}, },
    { name: Appstore,path: '/appstore', components: {app: AppStoreApp}, },
    { name: Note,path: '/note', components: {app: NoteApp}, },
    { name: Json, path: '/json', components: {app: JsonFormatter}, },
    { name: Translate, path: '/translate', components: {app: TranslateApp}, },
    { name: Video, path: '/video', components: {app: ShortVideo}, },
    { name: Weather, path: '/weather', components: {app: WeatherApp}, },
    { name: History, path: '/history', components: {app: HistoryApp}, },
    // { name: 'index', path: '/', components: {app: History}, },
    { name: Extension, path: '/extension', components: {app: ExtensionApp}, },
    { name: Search, path: '/search', components: {app: SearchApp}, },

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