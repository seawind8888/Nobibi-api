
import ArticleCategoryComponent from '../prototype/articleCategoryComponent'

class ArticleCategoryController extends ArticleCategoryComponent {
  constructor() {
    super()
  }
  /**  
   * add category_article  
   * @returns {Function}  
   */
  categoryArticleAddAction(category_article) {
    //中间表将增加category与article关联  
    super.addCategory_article(category_article, function (result) {
      // res.json(result);
    });
  }
  /**  
   * 关联查找  
   * category_article find Ref  
   * @returns {Function}  
   */
  categoryArticleFindRefAction(conditions) {
    return new Promise((resolve, reject) => {
      //用空格隔开要被填充的字段  
      let path = "categoryId"
      super.findCategory_articleRef(conditions, path, function (result) {
        resolve(result)
      });
    })
  }

  categoryArticleUpdateAction(conditions, update, options) {
    return new Promise((resolve, reject) => {
      //用空格隔开要被填充的字段  
      // var conditions = {};//{_id:xxx};
      // var update = {};//{$set : {_id:xxx}};
      // var options = {};//{upsert:false}
      super.updateCategory_article(conditions, update, options, function (result) {
        resolve(result)
      });
    })
  }
  categoryArticleRemoveAction(conditions) {
    return new Promise((resolve, reject) => {
      super.removeCategory_article(conditions, function (result) {
        resolve(result)
      });
    })
  }
}

export default new ArticleCategoryController()