import TodoApp from "@/popup/components/App/Todo/TodoApp";
import Wallpaper from "@/popup/components/App/Wallpaper/Wallpaper";
import Calculator from "@/popup/components/App/Calculator/Calculator";
import AppStore from "@/popup/components/App/AppStore/AppStore";
import Note from "@/popup/components/App/Note/Note";

const routes = [
    { name: 'todo', path: '/todo', component: TodoApp, },
    { name: 'wallpaper',path: '/wallpaper', component: Wallpaper,},
    { name: 'calculator',path: '/calculator', component: Calculator, },
    { name: 'appstore',path: '/appstore', component: AppStore, },
    { name: 'note',path: '/note', component: Note, },
]

export default routes