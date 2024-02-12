const {normalizeURL} = require ('./crawl.js')
const {getURLsfromHTML} = require ('./crawl.js')
const {test, expect} =require('@jest/globals')


test('normalizeURL strip protocol',() =>{
    const input = 'https://Delta'
    const actual = normalizeURL(input)
    const expected = 'delta'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip protocol', () => {
    const input = 'https://delta/'
    const actual = normalizeURL(input)
    const expected = 'delta'
    expect(actual).toEqual(expected)
})

test('normalizeURL strp http ', ()=>{
    const input ='http://Delta'
    const actual = normalizeURL(input)
    const expected ='delta'
    expect(actual).toEqual(expected)
})

test('getURLsfromHTML relative',()=>{
    const inputHTMLBody= `
    <html>
        <body>
            <a href="/path"></a>
            delta.beta

        </body>
    </html>`
    const inputBaseURL= "https://delta.beta"
    const actual =  getURLsfromHTML(inputHTMLBody,inputBaseURL)
    const expected = ["https://delta.beta/path"]
    expect(actual).toEqual(expected)
})

