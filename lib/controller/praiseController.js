import Praise from '../models/praise';
import Topic from '../models/topic';
import BaseComponent from '../prototype/baseComponent';

class PraiseController extends BaseComponent {
  constructor() {
    super();
  }
  // 新增点赞
  praiseAction = async ctx => {
    const { topicId, userName, type } = ctx.request.body;
    let praiseNum = await this.praiseCountAction({
      topicId: ctx.query.topicId
    });
    const conditions = {
      ...ctx.request.body
    };

    if (type === 'up') {
      delete conditions.type;
      const result = await this.addData({
        model: Praise,
        conditions: conditions,
        options: {
          uniqueness: true,
          errorMessage: '已经赞过了~亲'
        }
      });
      if (result.status === 200) {
        ctx.body = {
          status: 200,
          message: '点赞成功'
        };
      } else {
        ctx.body = result;
        return;
      }
      this.updateTopicPraiseNum({
        _id: topicId,
        num: (praiseNum += 1)
      });
    } else {
      const result = await this.removeData({
        model: Praise,
        key: 'userName',
        value: userName
      });
      if (result.status === 200) {
        ctx.body = {
          status: 200,
          message: '取消点赞成功'
        };
      } else {
        ctx.body = {
          status: 204,
          message: '还没点赞哦~'
        };
        return;
      }
      this.updateTopicPraiseNum({
        _id: topicId,
        num: (praiseNum -= 1)
      });
    }
  };
  praiseFindAction = async ctx => {
    const result = await this.praiseCountAction({
      topicId: ctx.query.topicId
    });
    ctx.body = {
      status: 200,
      data: result
    };
  };
  updateTopicPraiseNum = async ({ _id = '', num = 0 }) => {
    await this.updateData({
      model: Topic,
      conditions: {
        _id: _id
      },
      update: {
        $set: {
          praiseNum: num,
          updateTime: +new Date()
        }
      },
      options: { new: true }
    });
  };
  praiseCountAction = ({ topicId = '' }) => {
    return new Promise(async (resolve, reject) => {
      const result = await this.countData({
        model: Praise,
        conditions: {
          topicId: topicId
        }
      });
      resolve(result);
    });
  };
}

export default new PraiseController();
