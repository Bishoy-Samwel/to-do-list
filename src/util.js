const addElement = (list, elem) => {
  list.push(elem);
  return list;
};

const removeByAttr = (list, attr, val) => {
  list = list.filter((item) => item[attr] !== val);
  return list;
};

// exports.updateItemsIndex = (list, attr) => {
//   list.forEach((item) => {
//     item[attr] = list.indexOf(item);
//   });
//   return list;
// };

exports.addElement = addElement;
exports.removeByAttr = removeByAttr;