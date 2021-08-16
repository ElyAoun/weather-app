// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=07e787d1e37711e2888590da4f465310&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'&units=f'
    request({url:url, json:true}, (error,{body}) =>{
        if(error){
            callback('unable to connect to API',undefined)
        }else if(body.error){
           callback('unable to find location',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+ ". The current temperature is: "+body.current.temperature+ " degrees\nIt feel like: "+body.current.feelslike+" degrees.")
        }
    })
}


// const forecast = (latitude, longitude, callback) =>{
//     const url = 'http://api.weatherstack.com/current?access_key=07e787d1e37711e2888590da4f465310&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'&units=f'
//     request({url:url, json:true}, (error,response) =>{
//         if(error){
//             callback('unable to connect to API',undefined)
//         }else if(response.body.error){
//            callback('unable to find location',undefined)
//         }else{
//             callback(undefined,response.body.current.weather_descriptions[0]+ ". The current temperature is: "+response.body.current.temperature+ " degrees\nIt feel like: "+response.body.current.feelslike+" degrees.")
//         }
//     })
// }

module.exports = forecast