import axios from 'axios'
import app from '@/main'
import basics from "@/config/basics";

var api
var loading
var msg = '请求错误'
if (process.env.NODE_ENV === 'production') {
    api = axios.create({
        baseURL: basics.server,
        withCredentials: true
    })
} else {
    api = axios.create({
        baseURL: basics.server,
        withCredentials: true
    })
}
api.interceptors.request.use(function (config) {
    loading = app.$loading({
        lock: true,
        text: '加载中....',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0)'
    })
    return config;
}, function (error) {
    return Promise.reject(error);
});
api.interceptors.response.use(function (res) {
    loading.close();
    if (res.status === 200) {
        if (res.data.c === 0) {
            return res.data;
        } else {
            msg = res.data.m;
            this.$message.error(msg);
        }
    }
    else {
        switch (res.status) {
            case 404: msg = '请求方法错误'; break;
            default: msg = '请求失败'; break;
        }
        this.$message.error(msg)
    }
}, function (error) {
    loading.close();
    switch (error.message) {
        case 'Network Error': msg = '网络错误'; break;
    }
    app.$message.error(msg);
});

export default api