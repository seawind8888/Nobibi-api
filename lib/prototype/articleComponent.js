import articleModel from '../models/article'
import BaseComponent from './baseComponent'

class ArticleComponent extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增文章
     * @returns {Function}
     */
    addArticle (conditions, options, callback) {
        super.addData(articleModel, conditions, options, function (result) {
            callback(result);
        });
    };
    /**
     * 查找文章
     * @param conditions
     * @param callback
     */
    findArticle (conditions, callback) {
        let options = {};
        if (conditions.pagenation) {
            options = {
                sort: { _id: -1 },
                limit: conditions.pagenation.pageSize,
                skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
            }
        }
        super.findData(articleModel, conditions, {}, options, function (result) {
            callback(result);
        });

    }

    /**
     * 删除文章
     * @param conditions
     * @param callback
     */
    removeArticle (conditions, callback) {
        super.removeData(articleModel, conditions, function (result) {
            callback(result);
        });
    }

    /**
     * 更新文章信息
     * @param conditions
     * @param update
     * @param options
     * @param callback
     */
    updateArticle (conditions, update, options, callback) {
        super.updateData(articleModel, conditions, update, options, function (result) {
            callback(result);
        });
    }

}

export default ArticleComponent