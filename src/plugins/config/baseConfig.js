let config = {
    server: 'http://localhost:8001',
    currentUser: null
}

if (process.env.NODE_ENV === 'production') {
    config.server = 'http://192.168.7.76:8080'
}
export default config;