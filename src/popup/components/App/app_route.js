import TodoApp from "@/popup/components/App/Todo/TodoApp";
import Wallpaper from "@/popup/components/App/Wallpaper/Wallpaper";
import Calculator from "@/popup/components/App/Calculator/Calculator";
import AppStore from "@/popup/components/App/AppStore/AppStore";
import Note from "@/popup/components/App/Note/Note";
import NewsDrawer from "@/popup/components/App/News/NewsDrawer";

const routes = [
    { name: 'todo', path: '/todo', components: {app: TodoApp}, },
    { name: 'wallpaper',path: '/wallpaper', components: {app: Wallpaper},},
    { name: 'calculator',path: '/calculator', components: {app: Calculator}, },
    { name: 'appstore',path: '/appstore', components: {app: AppStore}, },
    { name: 'note',path: '/note', components: {app: Note}, },
    { name: 'news', path: '/news', components: {drawer: NewsDrawer}, },
]

export default routes