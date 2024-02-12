const {JSDOM} = require('jsdom')



async function crawlPage(currentURL){
    console.log(`actively crawling:${currentURL}`)

    const resp = await fetch(currentURL)

    console.log(resp.text())
    if(resp.status>399){
        console.log(`error in fetch with status code: ${resp.status})`)
        return
    }
    const contentType = resp.headers.get("content-type")
    if(contentType !== "text/html"){
        console.log(`non html response, content type: ${contentType}, on page ${currentURL}`)
       return 
    }

    console.log(await resp.text())

}




function getURLsfromHTML(inputHTMLBody, baseURL){
   const urls = []
   const dom = new JSDOM(inputHTMLBody)
   const linkElements = dom.window.document.querySelectorAll('a')
   for (const linkElement of linkElements){
    if(linkElement.href.slice(0,1) === '/'){
        
        try {
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href)
        }
        catch(err)
        {
            console.log($`err.message`)

        }
    } else{
        try{
            const urlObj = new URL(linkElement.href)
            urls.push(urlObj.href)
        }
        catch(err)
        {console.log(err.message)}
    }

        }

         
return urls
   }




                



function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if(hostPath.length >0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)

    }
    return hostPath
}
module.exports = {
    normalizeURL,
    getURLsfromHTML,
    crawlPage
}