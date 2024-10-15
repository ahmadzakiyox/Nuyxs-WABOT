const fetch = require('node-fetch')

/**
 * Fetch base64 from url
 * @param {String} url
 */
 const fetchBase64 = (url, mimetype) => new Promise(async (resolve, reject) => {
    try {
        const res = await fetch(url)
        const _mimetype = mimetype || res.headers.get('content-type')
        res.buffer()
            .then((result_1) => resolve(`data:${_mimetype};base64,` + result_1.toString('base64')))
    } catch (err) {
        console.error(err)
        reject(err)
    }
})

/**
 * create custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
 const custom = async (imageUrl, top, bottom) => new Promise((resolve, reject) => {
    let topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s')
    let bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s')
    fetchBase64(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`)
    // https://api.memegen.link/images/custom/${encodeURIComponent(teks1)}/${encodeURIComponent(teks2)}.png?background=${fatGans}
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

module.exports = {custom}