/* eslint-disable */
import api from './api'
import extension from "@/chrome/extension"
import fetch from '@/api/api'

const msgHandler = {
    getHistory: api.getHistory,
    getExtension: api.getExtension,
    enableExtension: (sendResponse, params) => {
        api.setExtensionEnableStatus(sendResponse, params.id, true)
    },
    disableExtension: (sendResponse, params) => {
        api.setExtensionEnableStatus(sendResponse, params.id, false)
    },
    getSelfExtension: (sendResponse, params) => {
        extension.getSelf(sendResponse)
    },
    fetchGET: (sendResponse, params) => {
        fetch.get(params.url, params.params, sendResponse)
    }

}

function startListenMsg() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        let handler = msgHandler[request.do]
        if (handler != undefined) {
            handler(sendResponse, request.param)
        }
        return true
    })
}

export default {
    startListenMsg,
}