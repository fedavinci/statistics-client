# 问卷低代码搭建平台

## 项目描述
该项目是一个调查问卷的搭建平台，具备问卷创建、保存、发布、答卷、统计的完整业务闭环

## 核心技术
React18、ahooks、Redux Toolkit、ReactRouter、AntDesign、TypeScript、Next.js、ReactDnD

## 仓库地址
https://github.com/fedavinci/statistics-client（B端）
https://github.com/fedavinci/statistics-ssr（C端）
https://github.com/fedavinci/statistics-mock（服务端Mock）
https://github.com/fedavinci/statistics-cli（AIGC脚手架）

## 页面路由

- [x] 首页：/
- [x] 登录：/login
- [x] 注册：/register
- [x] 问卷管理：/manage
  - [x] 我的问卷：/manage/list
  - [x] 星标问卷：/manage/star
  - [x] 回收站：/manage/trash
- [x] 问卷详情：/question
  - [x] 编辑问卷：/question/edit/:id
  - [x] 问卷统计：/question/stat/:id
- [x] 404：/404

## 界面的模块
- 顶部栏
- 左侧 - 组件库
- 左侧 - 图层
- 中间 - 画布
- 右侧 - 属性
- 右侧 - 页面设置

## 功能列表

### 顶部栏
- 返回
- 显示标题，修改标题
- 工具栏
    - 删除
    - 隐藏
    - 锁定
    - 复制，粘贴
    - 上移，下移
    - 撤销，重做
- 保存，自动保存，ctrl + s 快捷键
- 发布

### 左侧 组件库
- 显示组件列表
- 点击添加组件到画布

### 左侧 图层
- 显示图层列表
- 拖拽排序
- 单击，选中
- 双击，修改标题
- 隐藏
- 锁定

### 中间 画布
- 展示组件列表
- Y 滚动条
- 拖拽排序
- 单击，选中
- 快捷键
    - delete backspace
    - up
    - down
    - ctrl + c , v
    - ctrl + z , ctrl + shift + z
    - ctrl + s ，保存

### 右侧 属性
- 修改属性

### 右侧 页面设置
- 标题，描述
- tab 自动切换

## API设计

- 用户
  - [x] 查询用户信息 GET /api/user/info
  - [x] 注册 POST /api/user/register
  - [x] 登录 POST /api/user/login
- 问卷
  - [x] 创建问卷 POST /api/question
  - [x] 查询单个问卷信息 GET /api/question/:id
  - [x] 查询问卷列表 POST /api/question
  - [x] 更新问卷信息 PATCH /api/question/:id
  - [x] 批量彻底删除问卷 DELETE /api/question
  - [x] 复制问卷 POST /api/question/duplicate/:id
