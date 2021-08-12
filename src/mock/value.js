import Mock from "mockjs";
import { value } from "../api/path";
import { getQueryVariable } from "../utils/url";

const Random = Mock.Random;

// 获取职称下拉框数据源
Mock.mock(RegExp(value.listJobLevelCode + '.*'), 'get', options => {
  return {
    code: 200,
    message: "",
    obj: {
      jobLevelCodes: ['A4', 'A5', 'A6', 'A7', 'S1', 'S2', 'S3', 'P1', 'P2', 'P3']
    }
  }
})