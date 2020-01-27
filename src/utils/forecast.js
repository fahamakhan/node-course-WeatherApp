const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/748bd9fa96e4a9f71656be820af695fa/37.8267,-122.4233'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to Internet',undefined)
        }else if (body.error){
            callback('Unable to find Location',undefined)
        }else{
            callback(undefined,`The Temperature is ${body.currently.temperature}`)
        }
    })
}

module.exports = forecast