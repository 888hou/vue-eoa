import { isObject, isNull } from "./type-check"

/**
 * 映射拷贝对象
 * 便利obj的属性，未其赋值为copyObj同名属性的值
 * @param {*} obj 
 * @param {*} copyObj 
 */
export function mapCopy(obj, copyObj) {
  for (let key in obj) {
    if (isObject(obj[key]) && !isNull(obj[key])) {
      mapCopy(obj[key], copyObj[key]);
    } else {
      obj[key] = copyObj[key];
    }
  }
}