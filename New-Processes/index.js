const psList = require('ps-list');
const diff = require('deep-diff').observableDiff;

module.exports = async (callback) => {
  let prevList = await psList(),
    pses;

  while (true) {
    pses = await psList();
    diff(prevList, pses, (item) =>
      item.path?.[item.path?.length - 1] === 'name' &&
      !(
        item.lhs?.includes('fastlist') ||
        item.lhs?.includes('taskkill') ||
        item.lhs?.includes('conhost')
      )
        ? callback(item.lhs, pses)
        : ''
    );
    prevList = pses;
  }
};
