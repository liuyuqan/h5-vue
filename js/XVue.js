// todo 初始化 vue 和asioxs  返回 XVue对象  和$get $post 并且挂载到了vue上面
/*
liuyuquan 2020 0525
混入 需要时在写入 挂载全局
*/
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
    /*公用过滤函数*/
    filter: {
    }
}
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

// 這裡可以去掉
/*
document.write("<script src='/templates/driver_salary_online/js/request.js'></script>");
document.write("<script src='/templates/driver_salary_online/js/api.js'></script>");

*/


/*
/!* 混入 *!/
Vue.mixin(mixin_obj)
// obj.mixins =[ mixin_obj]
/!* 挂载 *!/
Vue.prototype.$get = $get
Vue.prototype.$post = $post
Vue.delimiters = ['${','}'];
*/

