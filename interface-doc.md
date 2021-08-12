

# DB设计

**User（用户）**

| 字段        | 类型         | 备注 |
| ----------- | ------------ | ---- |
| UserId      | bigint       | PK   |
| Username    | varchar(30)  |      |
| Password    | varchar(500) |      |
| Name        | varchar(50)  |      |
| Email       | varchar(300) |      |
| PhoneNum    | varchar(13)  |      |
| Avatar      | text         |      |
| Birthday    | date         |      |
| Address     | varchar(500) |      |
| BeginDate   | date         |      |
| EndDate     | date         | Null |
| PromoteDate | date         |      |
| ModifyBy    | bigint       |      |
| ModifyDate  | datetime     |      |

**Role（角色）**

| 字段        | 类型         | 备注 |
| ----------- | ------------ | ---- |
| RoleId      | bigint       | PK   |
| Name        | varchar(300) |      |
| Description | text         |      |
| ModifyBy    | bigint       |      |
| ModifyDate  | datetime     |      |

**Menu（权限菜单）**

| 字段        | 类型         | 备注 |
| ----------- | ------------ | ---- |
| MenuId      | bigint       | PK   |
| Name        | varchar(300) |      |
| Url         | varchar(300) |      |
| Path        | varchar(300) |      |
| Src         | varchar(300) |      |
| Component   | varchar(300) |      |
| IconCls     | varchar(300) |      |
| KeepAlive   | tinyint      |      |
| RequireAuth | tinyint      |      |
| ParentId    | bigint       |      |
| Enabled     | tinyint      |      |
| ModifyBy    | bigint       |      |
| ModifyDate  | datetime     |      |

**链接表：**

*UserRole*

| 字段        | 类型     | 备注    |
| ----------- | -------- | ------- |
| UserId      | bigint   | PK---FK |
| RoleId      | bigint   | PK---FK |
| ApplyReason | text     |         |
| ModifyBy    | bigint   |         |
| ModifyDate  | datetime |         |

*RoleMenu*

| 字段       | 类型     | 备注    |
| ---------- | -------- | ------- |
| RoleId     | bigint   | PK---FK |
| MenuId     | bigint   | PK---FK |
| ReadOnly   | tinyint  |         |
| ModifyBy   | bigint   |         |
| ModifyDate | datetime |         |



# 1、通用

后端基本返回格式

```json
{
	"code":200,// 请求业务逻辑状态码 200-success 300-warning 400-error
  "message":"",// 返回的提示信息
  "obj":{}// 返回的数据
}
```



# 2、Captcha（验证码）

## 2.1、获取验证码图片

**作用**：获取登录验证码的base64格式数据

| api/captcha/getCaptchaBase64 | get  |
| ---------------------------- | ---- |

**params**

```js
{
  //第一次请求为空字符串，刷新验证码是附上之前验证码的guid，避免刷新到相同的验证码图片
  guid:"20d18aff-dd84-11eb-a4a3-f4b30115143a" 
}
```

**示例1**：成功数据

```json
{
  “code”:200,
  "message":"",
  "obj":{
    // 验证码的唯一主键，与用户输入的验证码一同传回后端校验
    "captchaGuid":"fb2d2029-dcd1-11eb-a4a3-f4b30115143a", 
    // 验证码图片的base64 微博找回密码功能
    "captchaSrc":"data:image/png;base64,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",
  }
}
```

**示例2**：失败数据

```json
{
  “code”:200,
  "message":"",
  "obj":{
    // 验证码的唯一主键，与用户输入的验证码一同传回后端校验
    "captchaSrc":"", 
    // 验证码图片的base64
    "captchaSrc":"",
  }
}
```

# 3、User（用户）

## 3.1、用户登录

**作用**：用户登录，校验成功后颁发jwt token

| api/user/login | post |
| -------------- | ---- |

**data**

```js
{
  username:'user0001',
  password:'user0001',
	captchaGuid:'fb2d2029-dcd1-11eb-a4a3-f4b30115143a',
  captcha:'4tgh'
}
```

**示例1**：登录成功

```json
{
  "code":200,
  "message":"登录成功",
  "obj":{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
    tokenHead:"Bearer"
  }
}
```

**示例2**：登录失败

```json
{
  "code":400,
  "message":"用户名或密码错误|验证码错误",
  "obj":null
}
```

## 3.2、获取用户菜单

**作用**：用户进入首页，根据用户权限获取用户菜单

| api/user/getUserMenus | post |
| --------------------- | ---- |

**header**

```json
{
	Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
}
```

**示例1**：成功

```json
{
  "code":200,
  "message":"",
  "obj":{
    "menuList":[
      {
        "id": "1",
        "url": "/",
        "path": "/home",
        "src": "views/",
        "component": "Home",
        "name": "员工档案",
        "iconCls": "fa fa-user-circle-o",
        "keepAlive": null,
        "requireAuth": true,
        "parentId": null,
        "enabled": true,
        "readOnly":false
        "children": []
    	}
    ]
  }
}
```

**示例2**：失败

```json
{
  "code":400,
  "message":"无法获取用户菜单列表",
  "obj":null
}
```

# 4、Position（职位）

## 4.1、分页获取Position数据

**作用：**职位管理页面分页获取数据

| api/position/page | get  |
| ----------------- | ---- |

**params**

```json
{
  // 当前页码
  pageIndex:1,
  // 每页显示多少条数据
  pageSize:20
}
```

**示例1**：成功

```json
{
	"code":200,
  "message":"",
  "obj":{
    count:31,
    list:[
      {
        "id":1,
        "code":"ITBE",
        "name":"后端软件工程师",
        "modifyBy":"user0001",
        "modifyDate":"2021-07-21 13:23:12",
        "deletable":true
      }
    ]
  }
}
```

**示例2**：失败

```json
{
	"code":400,
  "message":"数据获取失败",
  "obj":null
}
```

## 4.2、添加职位

**作用：**添加单笔Position信息

| api/position/add | post |
| ---------------- | ---- |

**data**

```json
{
  // 职位代码
  code:"ITBE",
  // 职位名称
  name:"后端软件工程师"
}
```

**示例1：**成功

```json
{
	"code":200,
  "message":"新增成功",
  "obj":null
}
```

**示例2：**失败

```json
{
	"code":400,
  "message":"新增失败",
  "obj":null
}
```

## 4.3、删除职位

**作用：**根据id删除职位

| api/position/del | get  |
| ---------------- | ---- |

**params：**多个id组成的字符串，以英文逗号（，）分隔

```json
	{
    id:"1,2,3,5"
  }
```

**示例1：**成功

```json
{
  "code":200,
  "message":"删除成功",
  "obj":null
}
```

**示例2：**失败

```json
{
  "code":400,
  "message":"存在关联数据，无法删除",
  "obj":null
}
```



# 
