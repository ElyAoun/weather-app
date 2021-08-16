const request = require('postman-request')

//IMPROVED CODE----------------------------------------
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&access_token=pk.eyJ1IjoiZTNvbiIsImEiOiJja3M2a2NxcHgyYmZ6MndwajlyMjBqNnFtIn0.FgzPgu6V_xvjULGT8GiEAw&limit=1'
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('unable to connect to API',undefined)
        }else if(body.features.length===0){
            callback('unable to find location',undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}



//OLD CODE --------------------------
// const geocode = (address, callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?types=address&access_token=pk.eyJ1IjoiZTNvbiIsImEiOiJja3M2a2NxcHgyYmZ6MndwajlyMjBqNnFtIn0.FgzPgu6V_xvjULGT8GiEAw&limit=1'
//     request({url:url, json:true}, (error,response) => {
//         if(error){
//             callback('unable to connect to API',undefined)
//         }else if(response.body.features.length===0){
//             callback('unable to find location',undefined)
//         }else{
//             callback(undefined, {
//                 latitude : response.body.features[0].center[0],
//                 longitude : response.body.features[0].center[1],
//                 location : response.body.features[0].place_name
//             })
//         }
//     })
// }

module.exports = geocode