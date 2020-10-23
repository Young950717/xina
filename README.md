# Sina
仿造新浪微博的功能 用koa写的小项目

技术栈：koa2 + mysql + redis

本地要先安装mysql，安装后cd到本目录，运行node src/db/sync.js 同步数据库

启动redis 运行 redis-server

下载依赖 npm install

运行项目 npm run dev
检测eslint npm run lint
修复eslint npm run fix
单元测试 npm run test

## ** 功能列表**

### 1.用户管理（登录注册）

#### 1.1 页面：模板与路由

#### 1.2 数据建模

#### 1.3 开发注册功能

#### 1.4 开发登录功能

#### 1.5 抽离loginCheck中间件

#### 1.6 单元测试

### 2.用户设置（修改基本信息，修改密码）

### 3.创建微博

### 4.个人主页，显示个人微博列表和个人信息

### 5.广场页（缓存）

### 6.关注和取消关注

### 7.首页

### 8.@和回复

### 9.@提到我的
