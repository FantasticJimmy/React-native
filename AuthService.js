var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
const authKey = 'auth';
const userKey = 'user';
class AuthService {
    getAuthInfo(cb){
        AsyncStorage.multiGet([authKey,userKey], (err,val)=>{
            // var newVal = new Object();
            // newVal[val[0][0]] = val[0][1];
            // newVal[val[1][0]] = val[1][1];
            if(err){
                return cb(err);
            }
            if(!val){
                return cb();
            }
            var zippedObj = _.fromPairs(val);
            if(!zippedObj[authKey]){
                return cb();
            }
            var authInfo = {
                header: {
                    Authorization: 'Basic '+zippedObj[authKey]
                },
                user: JSON.parse(zippedObj[userKey])
            }

            return cb(null,authInfo);
        });
    }

    login(creds,cb){
        var b = new buffer.Buffer(creds.username+':'+creds.password);

        var encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user',{
            headers: {
                'Authorization': 'Basic ' +encodedAuth
            }
        })
        .then((response)=>{
            if (response.status>=200 && response.status<=300){
                return response;
            }
            throw {
                badCredentials: response.status==401,
                iDontKnowBro: response.status !=401
            }
        })
        .then((response)=>{
            return response.json();
        })
        .then((results)=>{
            AsyncStorage.multiSet([
                [authKey,encodedAuth],
                [userKey,JSON.stringify(results)]
            ],(err)=>{
                if(err){
                    throw err
                }
                return cb({success: true});
            },(results)=>{

            })
        })
        .catch((err)=>{
            return cb(err)
        })
        
    }
}

module.exports= new AuthService();