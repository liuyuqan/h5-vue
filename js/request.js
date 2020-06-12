
/* 封装axios */
const url = document.location.toString().split('//');
const host = url[0] + '//' + url[1].substr(0, url[1].indexOf('/'));
const service = axios.create({
    baseURL: host, // base url + request url
    timeout: 10000 // request timeout
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.interceptors.request.use(
    config => {
        config.data  = config.data || {}
        // post setting
        if( config.method == 'post') {
            config.data = Qs.stringify(config.data)
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
        // if the custom code is not 20000, it is judged as an error.
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

/*get 请求*/
const $GET = (url, params) => {
    return service({
        method: 'get',
        url: url,
        params: params
    })
}
/*post 请求*/
const $POST = (url, data) => {
    return service({
        method: 'post',
        url: url,
        data: data
    })
}
