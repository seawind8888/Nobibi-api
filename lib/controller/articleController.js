import ArticleComponent from '../prototype/ArticleComponent';
import ArticleCategoryController from './articleCategoryController'

class ArticleController extends ArticleComponent {
    constructor() {
        super()
    }
    /**
     * 新增文章
     * @returns {Function}
     */
    articleAddAction (req, res) {
        let article = {
            articleTitle: req.body.articleTitle,
            status: req.body.status,
            userCode: req.body.userCode,
            tags: req.body.tags,
            content: req.body.content,
            abstract: req.body.abstract,
            createTime: +new Date(),
            updateTime: +new Date()
        }
        let options = {
            // 以后可以限制文章发表标题或者其他的条件 防止重复
            params: {
                _id: '2',
            },
            errormessage: '文章已存在'
        }
        super.addArticle(article, options, function (result) {
            // 添加文章与分类 关联关系
            for (let i = 0; i < req.body.category.length; i++) {
                ArticleCategoryController.categoryArticleAddAction({
                    articleId: result.data._id,
                    categoryId: req.body.category[i]
                })
            }
            res.send(result);
        });
    }
    /**
     * 获取文章列表
     * @returns {Function}
     */
    async articleFindAction (req, res){
        let query = req.query;
        let conditions = {}
        conditions.params = {...query}
        if(query.createTime) {
            conditions.params.createTime = {
                "$gte": query.createTime[0],
                "$lt": query.createTime[1]
            }
        }
        if(query.page) {
            delete conditions.params.page
            conditions.pagenation = {
                pageNo: Number(query.page),
                pageSize: Number(query.pageSize) || 10,
            }
        }
        const result = await super.findArticle(conditions);
        let params = {}
        if (conditions.params && conditions.params._id) {
            params = {
                articleId: conditions.params._id
            }
        }
        // 查出文章的分类
        ArticleCategoryController.categoryArticleFindRefAction(params).then((resp) => {
            if(resp.data && !!resp.data.length) {
                for (let j = 0; j < result.data.list.length; j++) {
                    for (let i = 0; i < resp.data.length; i++) {
                        if (String(resp.data[i].articleId) == String(result.data.list[j]._id)) {
                            if (req.body.edit) {
                                result.data.list[j].category.push(resp.data[i].categoryId._id)
                            } else {
                                result.data.list[j].category.push(resp.data[i].categoryId.categoryName)
                            }
                        }
                    }
                }
            }
           
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
        // let conditions = {};
        // // 处理时间数组
        // if (req.body && req.body.params && req.body.params.createTime && req.body.params.createTime[0]) {
        //     let createTime = {
        //         "$gte": req.body.params.createTime[0],
        //         "$lt": req.body.params.createTime[1]
        //     }
        //     req.body.params.createTime = createTime
        // } else {
        //     delete (req.body.params.createTime)
        // }
        // // 赋值
        // conditions = req.body
        // super.findArticle(conditions, function (result) {
        //     let params = {}
        //     if (conditions.params && conditions.params._id) {
        //         params = {
        //             articleId: conditions.params._id
        //         }
        //     }
        //     // 查出文章的分类
        //     ArticleCategoryController.categoryArticleFindRefAction(params).then((resp) => {
        //         for (let j = 0; j < result.data.list.length; j++) {
        //             for (let i = 0; i < resp.values.length; i++) {
        //                 if (String(resp.values[i].articleId) == String(result.data.list[j]._id)) {
        //                     if (req.body.edit) {
        //                         result.data.list[j].category.push(resp.values[i].categoryId._id)
        //                     } else {
        //                         result.data.list[j].category.push(resp.values[i].categoryId.categoryName)
        //                     }
        //                 }
        //             }
        //         }
        //         res.send(result)
        //     }).catch((err) => {
        //         res.send(result)
        //         console.log(err)
        //     })
        // });
    }
    /**
     * 删除文章
     * @returns {Function}
     */
    articleRemoveAction  (req, res) {
        let conditions = req.body;
        super.removeArticle(conditions, function (result) {
            // 删除表关联
            ArticleCategoryController.categoryArticleRemoveAction({
                articleId: req.body._id
            }).then((resp) => {
                res.send(result)
            }).catch((err) => {
                console.log(err)
                res.send(result)
            })
        })
    }
    /**
     * 更新文章信息
     * @returns {Function}
     */
    articleUpdateAction (req, res) {
        let conditions = {
            userCode: req.body.userCode
        };
        let update = {
            $set: {
                articleTitle: req.body.articleTitle,
                status: req.body.status,
                userCode: req.body.userCode,
                tags: req.body.tags,
                content: req.body.content,
                abstract: req.body.abstract,
                updateTime: +new Date()
            }
        }
        var options = {}

        super.updateArticle(conditions, update, options, function (result) {
            // 删除表关联
            ArticleCategoryController.categoryArticleRemoveAction({
                articleId: req.body._id
            }).then((resp) => {
                for (let i = 0; i < req.body.category.length; i++) {
                    ArticleCategoryController.categoryArticleAddAction({
                        articleId: req.body._id,
                        categoryId: req.body.category[i]
                    })()
                }
            })
            res.send(result)
        });
    }

}

export default new ArticleController()