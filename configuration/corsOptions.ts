import whitelist from './domainWhitelist';

// Allow CORS
export default {
    origin: function(origin, callback){
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};