import mysqlData from './dbconnection';

const sessionStoreOptions = {
    host: mysqlData.host,
    port: 3000,
    user: mysqlData.user,
    password: mysqlData.password,
    database: mysqlData.database,
    clearExpired: true,
    checkExpirationInterval: 900000
}

export default {
    key:'pleaseJohnPleaseComeHome',
    secret: 'theLetterThatJohnnyWalkerRead',
    // genid: function(){
    //     return uuid()
    // },
    resave: false,
    proxy: true,
    rolling: true,
    saveUninitialized: false,
    // store: sessionStore,
    cookie: {
        httpOnly: true,
        secure: false,
        // domain: whitelist,
        maxAge: 86400000
    }   
}