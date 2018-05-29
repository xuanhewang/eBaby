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

const findArticleByName = async (ctx, next) => {
    let count = await article.article.count()
    let pageNum = parseInt(ctx.request.body.pageNum) - 1
    let pageSize = parseInt(ctx.request.body.pageSize)
    let username = ctx.request.headers.username
    let doc = await article.article.find({
        art_creator: username
    }).skip(pageNum * pageSize).limit(pageSize)
    ctx.body = {
        success: true,
        data: {
            count: count,
            data: doc
        }
    }
    ctx.body = {
        success: true,
        data: {
            data: doc
        }
    }
};

const addArticle = async (ctx, next) => {
    console.log(ctx.request.body.artInfo)
    let art_title = ctx.request.body.artInfo.articleTitle
    let art_des = ctx.request.body.artInfo.articleDes
    let art_content = ctx.request.body.artInfo.articleContent
    // let art_title_img = ctx.request.body.artTitle,
    let art_category = ctx.request.body.artInfo.articleTagSelected
    let art_creator = ctx.request.headers.username
    let user = new article.article({
        art_title: art_title,
        art_des: art_des,
        art_content: art_content,
        // art_title_img: art_title_img,
        art_creator: art_creator,
        art_category: art_category,
        // art_update_time: art_update_time,
    })
    try {
        user.save()
        ctx.status = 200
        ctx.body = {
            success: true,
            msg: '添加成功'
        }
    } catch (err) {
        console.log(err)
        ctx.status = 200
        ctx.body = {
            success: false,
            msg: '添加失败'
        }
    }
}

const updateArticle = async (ctx, next) => {
    let id = ctx.request.body.artInfo._id
    let art_title = ctx.request.body.artInfo.art_title || ''
    let art_des = ctx.request.body.artInfo.art_des || ''
    let art_content = ctx.request.body.artInfo.art_content || ''
    // let art_title_img = ctx.request.body.artTitle,
    let art_category = ctx.request.body.artInfo.art_category || ''
    let doc = await article.updateArticle(id, art_title, art_des, art_content, art_category)
    if (doc) {
        ctx.body = {
            success: true,
            message: "更新成功"
        }
    }
}

const delArticle = async (ctx, next) => {
    let id = ctx.request.body.id
    // console.log(id)
    ctx.status = 200
    ctx.body = {
        success: true,
        msg: '删除成功'
    }
    let doc = await article.delArticle(id)
    if (doc) {
        ctx.status = 200
        ctx.body = {
            success: true,
            msg: '删除成功'
        }
    } else {
        ctx.status = 201
        ctx.body = {
            success: false,
            msg: '删除失败'
        }
    }
}

const articleSpider = async (ctx, next) => {

    let pageNum = 1

    function spider(pageNum) {
        let baseUrl = 'http://www.youfumama.com'

        request(`${baseUrl}/tips/type/28/${pageNum}`, function (err, res, body) {
            if (err) {
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
    findArticleByName,
    addArticle,
    delArticle,
    updateArticle,
    articleSpider
}