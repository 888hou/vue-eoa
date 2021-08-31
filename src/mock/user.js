import { user } from "../http/path";
import Mock from "mockjs";
import { getQueryVariable } from 'utils/url'
import { json2Obj } from 'utils/json'

const Random = Mock.Random;

// 用户登录
Mock.mock(RegExp(user.login + '.*'), 'post', options => {
  let body = json2Obj(options.body);
  if (body.captchaCode != '1234') {
    return {
      code: 400,
      message: '验证码错误',
      obj: null
    }
  } else if (body.password != '12345678') {
    return {
      code: 400,
      message: '用户名或密码错误',
      obj: null
    }
  } else {
    return {
      code: 200,
      message: '登录成功',
      obj: {
        tokenHead: 'Bearer',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ'
      }
    }
  }
})

// 用户登出
Mock.mock(RegExp(user.logout + '.*'), 'post', options => {
  return {
    code: 200,
    message: '登出成功',
    obj: null
  }
})

// 获取用户权限菜单
const menuList = [
  {
    id: '1',
    url: '/',
    path: '/home',
    src: 'views/',
    component: 'Home',
    name: '员工档案',
    iconCls: 'fa fa-user-o',
    keepAlive: null,
    requireAuth: true,
    parentId: null,
    enabled: true,
    readOnly: false,
    children: [
      {
        id: '1-1',
        url: '/',
        path: '/emp/basic',
        src: 'views/emp/',
        component: 'EmpBasic',
        name: '基本资料',
        iconCls: 'fa fa-address-book-o',
        keepAlive: null,
        requireAuth: true,
        parentId: '1',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '1-2',
        url: '/',
        path: '/emp/adv',
        src: 'views/emp/',
        component: 'EmpAdv',
        name: '高级资料',
        iconCls: 'fa fa-vcard-o',
        keepAlive: null,
        requireAuth: true,
        parentId: '1',
        enabled: true,
        readOnly: false,
        children: []
      }
    ]
  }, {
    id: '2',
    url: '/',
    path: '/home',
    src: 'views/',
    component: 'Home',
    name: '人事管理',
    iconCls: 'fa fa-file-o',
    keepAlive: null,
    requireAuth: true,
    parentId: null,
    enabled: true,
    readOnly: false,
    children: [
      {
        id: '2-1',
        url: '/',
        path: '/per/emp',
        src: 'views/per/',
        component: 'PerEmp',
        name: '员工资料',
        iconCls: 'fa fa-file-text-o',
        keepAlive: null,
        requireAuth: true,
        parentId: '2',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '2-2',
        url: '/',
        path: '/per/ec',
        src: 'views/per/',
        component: 'PerEc',
        name: '员工奖惩',
        iconCls: 'fa fa-thumbs-o-up',
        keepAlive: null,
        requireAuth: true,
        parentId: '2',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '2-3',
        url: '/',
        path: '/per/train',
        src: 'views/per/',
        component: 'PerTrain',
        name: '员工培训',
        iconCls: 'fa fa-mortar-board',
        keepAlive: null,
        requireAuth: true,
        parentId: '2',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '2-4',
        url: '/',
        path: '/per/salary',
        src: 'views/per/',
        component: 'PerSalary',
        name: '员工调薪',
        iconCls: 'fa fa-line-chart',
        keepAlive: null,
        requireAuth: true,
        parentId: '2',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '2-5',
        url: '/',
        path: '/per/mv',
        src: 'views/per/',
        component: 'PerMv',
        name: '员工调动',
        iconCls: 'fa fa-random',
        keepAlive: null,
        requireAuth: true,
        parentId: '2',
        enabled: true,
        readOnly: false,
        children: []
      },
    ]
  }, {
    id: '3',
    url: '/',
    path: '/home',
    src: 'views/',
    component: 'Home',
    name: '薪资管理',
    iconCls: 'fa fa-bank',
    keepAlive: null,
    requireAuth: true,
    parentId: null,
    enabled: true,
    readOnly: false,
    children: [
      {
        id: '3-1',
        url: '/',
        path: '/sal/sob',
        src: 'views/sal/',
        component: 'SalSob',
        name: '工资账套管理',
        iconCls: 'fa fa-credit-card',
        keepAlive: null,
        requireAuth: true,
        parentId: '3',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '3-2',
        url: '/',
        path: '/sal/sobcfg',
        src: 'views/sal/',
        component: 'SalSobCfg',
        name: '员工账套设置',
        iconCls: 'fa fa-money',
        keepAlive: null,
        requireAuth: true,
        parentId: '3',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '3-3',
        url: '/',
        path: '/sal/table',
        src: 'views/sal/',
        component: 'SalTable',
        name: '工资表管理',
        iconCls: 'fa fa-cube',
        keepAlive: null,
        requireAuth: true,
        parentId: '3',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '3-4',
        url: '/',
        path: '/sal/Month',
        src: 'views/sal/',
        component: 'SalMonth',
        name: '月末处理',
        iconCls: 'fa fa-moon-o',
        keepAlive: null,
        requireAuth: true,
        parentId: '3',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '3-5',
        url: '/',
        path: '/sal/search',
        src: 'views/sal/',
        component: 'SalSearch',
        name: '工资表查询',
        iconCls: 'fa fa-table',
        keepAlive: null,
        requireAuth: true,
        parentId: '3',
        enabled: true,
        readOnly: false,
        children: []
      }
    ]
  }, {
    id: '4',
    url: '/',
    path: '/home',
    src: 'views/',
    component: 'Home',
    name: '统计管理',
    iconCls: 'fa fa-bar-chart',
    keepAlive: null,
    requireAuth: true,
    parentId: null,
    enabled: true,
    readOnly: false,
    children: [
      {
        id: '4-1',
        url: '/',
        path: '/sta/all',
        src: 'views/sta/',
        component: 'StaAll',
        name: '综合信息统计',
        iconCls: 'fa fa-bars',
        keepAlive: null,
        requireAuth: true,
        parentId: '4',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '4-2',
        url: '/',
        path: '/sta/score',
        src: 'views/sta/',
        component: 'StaScore',
        name: '员工积分统计',
        iconCls: 'fa fa-diamond',
        keepAlive: null,
        requireAuth: true,
        parentId: '4',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '4-3',
        url: '/',
        path: '/sta/Pers',
        src: 'views/sta/',
        component: 'StaPers',
        name: '人事信息统计',
        iconCls: 'fa fa-info',
        keepAlive: null,
        requireAuth: true,
        parentId: '4',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '4-4',
        url: '/',
        path: '/sta/record',
        src: 'views/sta/',
        component: 'StaRecord',
        name: '人事记录统计',
        iconCls: 'fa fa-envelope-o',
        keepAlive: null,
        requireAuth: true,
        parentId: '4',
        enabled: true,
        readOnly: false,
        children: []
      }
    ]
  }, {
    id: '5',
    url: '/',
    path: '/home',
    src: 'views/',
    component: 'Home',
    name: '系统管理',
    iconCls: 'fa fa-cog',
    keepAlive: null,
    requireAuth: true,
    parentId: null,
    enabled: true,
    readOnly: false,
    children: [
      {
        id: '5-1',
        url: '/',
        path: '/sys/basic',
        src: 'views/sys/',
        component: 'SysBasic',
        name: '基础信息设置',
        iconCls: 'fa fa-desktop',
        keepAlive: null,
        requireAuth: true,
        parentId: '5',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '5-2',
        url: '/',
        path: '/sys/config',
        src: 'views/sys/',
        component: 'SysConfig',
        name: '系统设置',
        iconCls: 'fa fa-align-left',
        keepAlive: null,
        requireAuth: true,
        parentId: '5',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '5-3',
        url: '/',
        path: '/sys/log',
        src: 'views/sys/',
        component: 'SysLog',
        name: '操作日志管理',
        iconCls: 'fa fa-history',
        keepAlive: null,
        requireAuth: true,
        parentId: '5',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '5-4',
        url: '/',
        path: '/sys/admin',
        src: 'views/sys/',
        component: 'SysAdmin',
        name: '操作员管理',
        iconCls: 'fa fa-user-md',
        keepAlive: null,
        requireAuth: true,
        parentId: '5',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '5-5',
        url: '/',
        path: '/sys/data',
        src: 'views/sys/',
        component: 'SysData',
        name: '备份恢复数据库',
        iconCls: 'fa fa-database',
        keepAlive: null,
        requireAuth: true,
        parentId: '5',
        enabled: true,
        readOnly: false,
        children: []
      }, {
        id: '5-6',
        url: '/',
        path: '/sys/init',
        src: 'views/sys/',
        component: 'SysInit',
        name: '初始化数据库',
        iconCls: 'fa fa-user-circle-o',
        keepAlive: null,
        requireAuth: true,
        parentId: '5',
        enabled: true,
        readOnly: false,
        children: []
      },
    ]
  }
]

Mock.mock(RegExp(user.getUserMenus + '.*'), 'post', options => {
  return {
    code: 200,
    message: '',
    obj: {
      menuList: menuList
    }
  }
})

// 获取用户个人信息
Mock.mock(RegExp(user.getUserInfo + '.*'), 'post', options => {
  return {
    username: Random.word(8, 20),
    portrait: Random.image('48x48', '#eff0ef', 'PO')
  }
})



