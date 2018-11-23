let config = {
    server: 'http://192.168.7.76:8001',
    currentUser: null,
    wherePage: {
        isCheck:true,
        page: '',
        searchWhere: null
    },
    uploadImage: '.jpeg,.gif,.png,.bmp',
    uploadFile: '',
    uploadAll:''
}

if (process.env.NODE_ENV === 'production') {
    config.server = 'http://192.168.7.76:8080'
}
export default config;