import Mock from "mockjs";
import { jobLevel } from "../api/path";
import { getQueryVariable } from "../utils/url";

const Random = Mock.Random;

// 新增职称JobLevel
Mock.mock(RegExp(jobLevel.add + '.*'), 'post', options => {
  return {
    code: 200,
    message: "新增成功",
    obj: null
  }
})

// 删除职称JobLevel
Mock.mock(RegExp(jobLevel.del + '.*'), 'get', options => {
  return {
    code: 200,
    message: "删除成功",
    obj: null
  }
})

// 编辑Position职位
Mock.mock(RegExp(jobLevel.edit + '.*'), 'post', options => {
  return {
    code: 200,
    message: "编辑成功",
    obj: null
  }
})

Mock.mock(RegExp(jobLevel.page + '.*'), 'get', options => {
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i + 1,
      code: 'A6',
      name: Random.cword(10),
      enabled: Math.random() > 0.25,
      modifyBy: Random.last(),
      modifyDate: Random.datetime(),
      deletable: Math.random() > 0.25
    })
  }
  return {
    code: 200,
    message: '',
    obj: {
      count: 45,
      list
    }
  }
  return {

  }
})