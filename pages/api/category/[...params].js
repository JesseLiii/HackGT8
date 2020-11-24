import { getCategoriesByParentId, getCategoryById, getCatelogItemsByMerchandiseCategoryId } from '../../../lib/category';
import _ from 'lodash';

export default async function handler(req, res) {
  let categoryItems = await getCatelogItemsByMerchandiseCategoryId(req.query.params[0], req.query.params[1]);
  let category = await getCategoryById(req.query.params[0]);
  let childrenCategories = await getCategoriesByParentId(req.query.params[0]);
  if (categoryItems.data && categoryItems.data.pageContent.length == 0 && childrenCategories.data.pageContent.length > 0) {
    let childCategoryItems = [];
    const promises = childrenCategories.data.pageContent.map(async category => {
      let childCategoryItem = await getCatelogItemsByMerchandiseCategoryId(category.nodeCode, req.query.params[1]);
      if (childCategoryItem.data) {
        childCategoryItems = childCategoryItems.concat(childCategoryItem.data.pageContent);
      }
    })
    await Promise.all(promises);
    categoryItems = childCategoryItems;
  } else {
    categoryItems = categoryItems.data.pageContent;
  }
  var sortByItemCode = function (obj) {
    return obj.item.itemId.itemCode;
  }
  categoryItems = _.sortBy(categoryItems, sortByItemCode);
  res.json({ category, childrenCategories, categoryItems });
}