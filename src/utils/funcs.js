function getTitleFromHTML(content) {
    let regex = /<title>(.*?)<\/title>/i
    let iconRegex = /<link.*rel[\s]*=[\s]*"icon".*href[\s]*=[\s]*"(.*?)".*?>/i
    let title = regex.exec(content)
    let icon = iconRegex.exec(content)
    let result = {}
    if (title.length === 2) {
        result.title = title[1]
    }
    if (icon.length === 2) {
        result.icon = icon[1]
    }
    console.log(icon) 
    if (result.icon.substring(0,2) === "//") {
        result.icon = "http" + result.icon
    }
    return result
}

export default {
    getTitleFromHTML
}