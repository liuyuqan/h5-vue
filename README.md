<p align="center">
  <img width="320" src="http://bgk.nmm80.com/admin_xpx/images/login.png">
</p>

简体中文 | [English](./README.md) | 

## 简介 作者-刘玉全
[driver_salary_online](https://panjiachen.github.io/vue-element-admin) 是一个可前端可后台分离的demo，
它基于 [vue](https://cn.vuejs.org/) 和 [element-ui](https://element.eleme.cn/2.13/#/zh-CN)实现。
重新封装了利用vue混入（mixin）封装全局参数以及函数 [xVue](./js/XVue.js)，当前小胖熊后台vue+element-ui开发方式较多，但当前自带后台会有全局样式影响组件样式
所以重新封装header ，方便后台开发，也便于前端接收开发，前后台分离式开发

## 目录
driver_salary_online
- css
    - list.less    引入[less](http://lesscss.cn/)可动态控制样式（包含了一些基础样式）
- js 
    -   [api](./js/api.js) 封装接口 多种请求方式
    -   [request](./js/request.js) 重新封装axios （对于200、 500做特殊处理）引入Qs解决post请求传输数据问题
    -   [XVue](./js/XVue.js) 重新封装[vue](https://cn.vuejs.org/)
   
- [list](./list.html)  示例页面

- [header](./header.htm) 主要引入文件不可缺少  重新封装页面header便于前端直接开发，做到完全前后台分离开发
                        （引入js文件下所有js，css下所有less、css）

## 后台开发使用   
[php]    
    
        原先方式渲染页面
        $ur_here = '司机申诉审核详情';        
        $url = 'driver_salary_online/driver_appeal_exa_view.html';
        $smarty->assign('ur_here', $ur_here);
        
        
 [html]   
  
     引入新的header
      {include file="./header.htm"}
           <div id='app></div>
        <script>
          let opts = {
              el: '#app',
              data() {
                  return {},
                  watch:{},
                  created(){},
                  methods : {
                      test()
                      {
                          console.log(_that, '使用全局_that需要在created之后')
                      }
                  }
              }
          }
         const _that = new  XVue(opts) // 实例vue
        </script>
        
        
## 前端开发使用
[html]

    直接引入--需要注意路径
    <title>网站标题</title>
    <meta name="robots" content="noindex, nofollow">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <!-- 引入qs 序列化post参数-->
    <script src="https://cdn.bootcss.com/qs/6.7.0/qs.min.js"></script>
    <!-- 引入组件库 -->
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <link rel="stylesheet/less" type="text/css" href="./css/list.less" />
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.11.1/less.min.js" ></script><!-- 引入样式 -->
    <!-- 二次封装的vue 包含 $post请求和 $get请求 -->
    <script src="./js/XVue.js"></script>
    <script src="./js/request.js"></script>
    <script src="./js/api.js"></script>
    <style> 
        [v-cloak]{
            display: none;
        }
    </style>

[request详解]

    /* 封装axios */
    const url = document.location.toString().split('//');
    const host = url[0] + '//' + url[1].substr(0, url[1].indexOf('/'));
    const service = axios.create({
        baseURL: host, // 根据不同需求做出改动
        timeout: 10000 // 超时控制
    })
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    service.interceptors.request.use(
        config => {
            config.data  = config.data || {}
            // post setting
            if( config.method == 'post') {
                config.data = Qs.stringify(config.data) // post 特殊处理
            }
            return config
        },
        error => {
            console.log(error) // for debug
            return Promise.reject(error)
        }
    )
    // response interceptor
    service.interceptors.response.use(
        /**
         * Determine the request status by custom code
         * Here is just an example
         * You can also judge the status by HTTP Status Code
         */
        response => {
        
            const res = response.data
            // 判断相应参数 做不同操作
            if (res.code === 200 || res.code === '200' || res.code === 100) {
                if (res.message || res.msg) {
                    x_vue.$message({
                        message: res.message || res.msg,
                        type: 'success'
                    })
                }
            } else if(res.code == 500 ){
                x_vue.$message({
                    message: res.message || res.msg || '请求失败',
                    type: 'error'
                })
            } else  {
                x_vue.$message({
                    message: res.message || res.msg || '请求失败',
                    type: 'error'
                })
                return Promise.reject(new Error({message: res.message || 'Error', data:[]}))
            }
            return res
        },
        error => {
            console.log('err' + error) // for debug
            x_vue.$message({
                message: error.message,
                type: 'error'
            })
            return Promise.reject(error)
        }
    )
    
    /*通用 get 请求*/
    const $GET = (url, params) => {
        return service({
            method: 'get',
            url: url,
            params: params
        })
    }
    /*通用 post 请求*/
    const $POST = (url, data) => {
        return service({
            method: 'post',
            url: url,
            data: data
        })
    }

[XVue代码详解]
    
    // 全局混入对象
    const  mixin_obj = {
        data() {
            return {
                layout:  'total, sizes, prev, pager, next, jumper' ,
                pageSizes: [10, 20, 40, 50 ,100, 200],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                }
            }
        },
        created: function() {
        },
        /*公用函数*/
        methods : {
              // 获取连接参数 返回对象数组
             parseQuery(option){
                const res = {};
                const query = (location.href.split("?")[1] || "")
                    .trim()
                    .replace(/^(\?|#|&)/, "");
                if (!query) {
                    return res;
                }
                query.split("&").forEach(param => {
                    const parts = param.replace(/\+/g, " ").split("=");
                    const key = decodeURIComponent(parts.shift());
                    const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;
                    if (res[key] === undefined) {
                        res[key] = val;
                    } else if (Array.isArray(res[key])) {
                        res[key].push(val);
                    } else {
                        res[key] = [res[key], val];
                    }
                });
                return res;
            },
            //对象判断
            emptyObject(obj) {
                if(typeof obj == "undefined" || obj == null || obj == ""|| obj == {}){
                    return true;
                }else{
                    return false;
                }
            },
            //数组 和字符串判断 不包含 0的判断
            empty(data){
                return (data === "" || data === undefined || data === null ||data.length == 0 ) ? true : false;
            }
        },
        /*公用过滤函数 请参考vue文档*/
        filter: {  
        }
    }
    // 混入
    let  x_vue  = {}
    function  XVue(obj){
        // obj.mixins =[ mixin_obj]
        obj.mixins = [mixin_obj]
        Vue.config.debug = true;
        const vue = new Vue(obj);
        vue.delimiters = ['${','}'];
        x_vue  = vue
        return vue
    }


=======

简体中文 | [English](./README.md) | 

## 简介

[vue-element-admin](https://panjiachen.github.io/vue-element-admin) 是一个后台前端解决方案，它基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。相信不管你的需求是什么，本项目都能帮助到你。

- [在线预览](https://panjiachen.github.io/vue-element-admin)

- [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

- [Gitter 讨论组](https://gitter.im/vue-element-admin/discuss)

- [Donate](https://panjiachen.gitee.io/vue-element-admin-site/zh/donate)

- [Wiki](https://github.com/PanJiaChen/vue-element-admin/wiki)

- [Gitee](https://panjiachen.gitee.io/vue-element-admin/) 在线预览（国内用户可访问该地址）

- [国内访问文档](https://panjiachen.gitee.io/vue-element-admin-site/zh/) 文档（方便没翻墙的用户查看）

- 基础模板建议使用: [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
- 桌面端: [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)
- Typescript 版: [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template) (鸣谢: [@Armour](https://github.com/Armour))
- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

**`v4.1.0+`版本之后默认 master 分支将不支持国际化，有需要的请使用[i18n](https://github.com/PanJiaChen/vue-element-admin/tree/i18n)分支，它会和 master 保持同步更新**

**该项目不支持低版本浏览器(如 ie)，有需求请自行添加 polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**

**目前版本为 `v4.0+` 基于 `vue-cli` 进行构建，若发现问题，欢迎提[issue](https://github.com/PanJiaChen/vue-element-admin/issues/new)。若你想使用旧版本，可以切换分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-element-admin/tree/tag/3.11.0)，它不依赖 `vue-cli`**

群主 **[圈子](https://jianshiapp.com/circles/1209)** 群主会经常分享一些技术相关的东西，或者加入 [qq 群](https://github.com/PanJiaChen/vue-element-admin/issues/602) 或者关注 [微博](https://weibo.com/u/3423485724?is_all=1)

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)，所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。

同时配套了系列教程文章，如何从零构建后一个完整的后台项目，建议大家先看完这些文章再来实践本项目

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你用vue撸后台 系列五(v4.0新版本)](https://juejin.im/post/5c92ff94f265da6128275a85)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**

 <p align="center">
  <img width="900" src="https://wpimg.wallstcn.com/a5894c1b-f6af-456e-82df-1151da0839bf.png">
</p>

## Sponsors

Become a sponsor and get your logo on our README on GitHub with a link to your site. [[Become a sponsor]](https://www.patreon.com/panjiachen)

<a href="https://flatlogic.com/admin-dashboards?from=vue-element-admin"><img width="150px" src="https://wpimg.wallstcn.com/9c0b719b-5551-4c1e-b776-63994632d94a.png" /></a><p>Admin Dashboard Templates made with Vue, React and Angular.</p>

## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
```

## 开发

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

## Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/PanJiaChen/vue-element-admin/releases).

## Online Demo

[在线 Demo](https://panjiachen.github.io/vue-element-admin)

## Donate

如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 :tropical_drink:
![donate](https://panjiachen.github.io/donate/donation.png)

[更多捐赠方式](https://panjiachen.gitee.io/vue-element-admin-site/zh/donate)

[Paypal Me](https://www.paypal.me/panfree23)

[Buy me a coffee](https://www.buymeacoffee.com/Pan)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)

Copyright (c) 2017-present PanJiaChen
>>>>>>> b8340e7abbce4f7343779258776ab2a52cd07671
