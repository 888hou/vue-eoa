/**
 * 将Json字符串转换为对象
 * @param {*} jsonStr 要转换的Json字符串
 * @returns 对应的匿名对象
 */
export function json2Obj(jsonStr) {
  return eval('(' + jsonStr + ')');
}