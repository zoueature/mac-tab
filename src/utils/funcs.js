function getTitleFromHTML(content) {
    let regex = /<title>(.*?)<\/title>/i
    let title = regex.exec(content)
    console.log(title)
    if (title.length === 2) {
        return title[1]
    }
    return ""
}

export default {
    getTitleFromHTML
}