import categoryArticleModel from '../models/articleCategory'
import BaseComponent from './baseComponent'


class ArticleCategoryComponent extends BaseComponent {
  constructor() {
    super()
  }
  /** 
   * add Category_article 
   * @param conditions 
   * @param callback 
   */
  addCategory_article(conditions, callback) {
    let options = {
        isNotOne: true
      }
      super.addData(categoryArticleModel, conditions, options, function (result) {
        callback(result);
      });
  }

  /** 
   * find Category_article 非Ref 
   * @param conditions 
   * @param callback 
   */
  findCategory_article (conditions, callback) {

    let options = {};
    super.findData(categoryArticleModel, conditions, {}, options, function (result) {
      callback(result);
    });

  }

  /** 
   * find Category_article 是Ref 
   * @param conditions 
   * @param path         需要被填充的字段 
   * @param callback 
   */
  findCategory_articleRef (conditions, path, callback) {
    let fields = {
      __v: 0
    };
    let options = {
      sort: {
        _id: 1
      }
    };
    super.findDataPopulation(categoryArticleModel, conditions, path, fields, {}, options, function (result) {
      callback(result);
    });
  }

  /** 
   * remove Category_article 
   * @param conditions 
   * @param callback 
   */
  removeCategory_article (conditions, callback) {
    super.removeData(categoryArticleModel, conditions, function (result) {
      callback(result);
    });
  }
}

export default ArticleCategoryComponent