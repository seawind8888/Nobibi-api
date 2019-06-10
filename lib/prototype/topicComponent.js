import topicModel from '../models/topic'
import BaseComponent from './baseComponent'

class TopicComponent extends BaseComponent {
    constructor() {
        super()
    }
    /**
     * 新增文章
     * @returns {Function}
     */
    addTopic (conditions, options, callback) {
        super.addData(topicModel, conditions, options, function (result) {
            callback(result);
        });
    };
    /**
     * 查找文章
     * @param conditions
     * @param callback
     */
    findTopic (conditions) {
        return new Promise((resolve, reject) => {
            try {
                let options = {}
                if (conditions.pagenation) {
                    options = {
                        sort: { _id: -1 },
                        limit: conditions.pagenation.pageSize,
                        skip: (conditions.pagenation.pageNo - 1) * conditions.pagenation.pageSize
                    }
                }
                super.findData(topicModel, conditions, {}, options, function (result) {
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
           
        })

    }

    /**
     * 删除文章
     * @param conditions
     * @param callback
     */
    async removeTopic (conditions, callback) {
        const result = await super.removeData(topicModel, conditions)
        callback(result);
    }

    /**
     * 更新文章信息
     * @param conditions
     * @param update
     * @param options
     * @param callback
     */
    updateTopic (conditions, update, options, callback) {
        super.updateData(topicModel, conditions, update, options, function (result) {
            callback(result);
        });
    }

}

export default TopicComponent