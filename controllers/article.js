const article = require('../models/article')
const request = require('request')
const cheerio = require('cheerio')

const findAllArticle = async (ctx, next) => {
    let count = await article.article.count()
    let pageNum = parseInt(ctx.request.body.pageNum) - 1
    let pageSize = parseInt(ctx.request.body.pageSize)
    let artTitle = ctx.request.body.artTitle
    let artCategory = ctx.request.body.artCategory
    let allAdmin = await article.findAllArticle(pageNum, pageSize, artTitle, artCategory);
    ctx.body = {
        success: true,
        data: {
            count: count,
            data: allAdmin
        }
    }
};

const articleSpider = async (ctx, next) => {

    let pageNum = 1
    function spider (pageNum) {
        let baseUrl = 'http://www.youfumama.com'

        request(`${baseUrl}/tips/type/28/${pageNum}`, function (err, res, body) {
            if(err) {
                return false
            }

            console.log(`正在爬取${pageNum}页数据`);
            const $ = cheerio.load(body)
            let articleList = $('.article-list')
            articleList.each(function (i, e) {
                let art_content_href = `${baseUrl}${$(this).attr('href')}`
                let art_title = $(this).find('.article-title').text().trim()
                let art_des = $(this).find('.article-intro').text().trim()
                let art_title_img = $(this).find('img').attr('src')
                let art_content = ''
                let art_creator = $(this).find('.article-title').text().trim()
                let art_category = '辅食跟我学'
                let art_update_time = $(this).find('.article-title').text().trim()

                let user = new article.article({
                    art_title: art_title,
                    art_des: art_des,
                    art_title_img: art_title_img,
                    // art_creator: art_creator,
                    art_category: art_category,
                    // art_update_time: art_update_time,
                })
                console.log(art_content_href)
                request(art_content_href, function (err, res, body) {
                    const $ = cheerio.load(body)
                    art_content = $('.global-detail-content').html().trim()
                    user.art_content = art_content
                    user.save()
                })
            })
        })
        pageNum += 1
        setTimeout(function () {
            spider(pageNum)
        }, 1000)
    }
    spider(pageNum)
}

module.exports = {
    findAllArticle,
    articleSpider
}