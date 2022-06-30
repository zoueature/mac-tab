function getTitleFromHTML(content) {
    let regex = /<title>(.*?)<\/title>/i
    let title = regex.exec(content)
    if (title.length === 2) {
        return title[1]
    }
    return ""
}

export default {
    getTitleFromHTML
}