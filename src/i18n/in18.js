import zh_CN from './language/zh_CN'
import en from './language/en'
import {reactive} from 'vue'

export function registerI18n(language, languageConfig) {
    i18n.i18n[language] = languageConfig
}

const i18n = {
    i18n:  {
        zh_CN: zh_CN,
        en: en,
    },
    current: reactive({'language': 'zh_CN'}),
    install(Vue) {
        Vue.config.globalProperties.$i18n = (key) => {
            let languageMap = this.i18n[this.current.language] || {}
            let word = languageMap[key] || ""
            return word
        }
        Vue.config.globalProperties.$switchLanguage = (language) => {
            this.current.language = language
            console.log(this.current)
        }
        Vue.config.globalProperties.$supportLanguage = () => {
            let languages = []
            for (let key in this.i18n) {
                languages.push(key)
            }
            return languages
        }
    }
}

export default i18n