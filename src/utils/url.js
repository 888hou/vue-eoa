
/**
 * 获取url请求的变量值
 * @param {*} url 请求url
 * @param {*} variable 参数名称
 * @returns 参数值
 */
export function getQueryVariable(url, variable) {
  let query = url.substr(url.indexOf('?') + 1)
  let vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}