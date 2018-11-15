let config = {
    server: 'http://localhost:8001',
    currentUser: null,
    wherePage: {
        isCheck:true,
        page: '',
        searchWhere: null
    },
    uploadimage: '.jpeg,.gif,.png,.bmp',
    uploadfile: '',
    uploadall:''
}

if (process.env.NODE_ENV === 'production') {
    config.server = 'http://192.168.7.76:8080'
}
export default config;