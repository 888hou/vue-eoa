import Mock from "mockjs";
import { position } from "../http/path";
import { getQueryVariable } from "../utils/url";

const Random = Mock.Random;

// 新增Position职位
Mock.mock(RegExp(position.add + '.*'), 'post', options => {
  return {
    code: 200,
    message: "新增成功",
    obj: null
  }
})

// 删除Position职位
Mock.mock(RegExp(position.del + '.*'), 'get', options => {
  return {
    code: 200,
    message: "删除成功",
    obj: null
  }
})

// 编辑Position职位
Mock.mock(RegExp(position.edit + '.*'), 'post', options => {
  return {
    code: 200,
    message: "编辑成功",
    obj: null
  }
})


// 分页获取职位position数据
Mock.mock(RegExp(position.page + '.*'), 'get', options => {
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push({
      id: i + 1,
      code: Random.word(6),
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
      count: 31,
      list
    }
  }
})
