const path = require('path') //core node module we dont have to install it
const express = require('express') //npm module we have to install it
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const public_dir_path = path.join(__dirname,'../public') //path to public directory
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
//handlebars is a template engine used for dynamic pages: pass variables to the views and make reusable code
app.set('view engine','hbs') //handlebars template
app.set('views',viewsPath) //tell express where the views directory is. if the directory is in root and named 'views' then we won't have to point to it
hbs.registerPartials(partialsPath) //partials are parts of the webpage that need to be included in every webpage

//everything in the public directory can be displayed in the browser
app.use(express.static(public_dir_path)) //now if we type as url localhost/about.html it will display in the browser


//app.com
app.get('',(req, res)=>{
    res.render('index',{ //references index.hbs in the views directory
        title:'Weather App', //send information to the view (index.hbs)
        name:'Elie Aoun'
    })
})

//app.com/about
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Elie Aoun',
        image:'marshmello.png'
    })
})

//app.com/help
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        message:'This is a helpful text',
        name:'Elie Aoun'
    })
})


//app.com/weather
app.get('/weather',(req, res)=>{
    if(!req.query.address){ 
        return res.send({
            error:'An address must be provided'
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
    
        if(error){
          return res.send({
              error
          })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({
                error
            })
          }
          res.send({
              location,
              address:req.query.address,
              forecast: forecastData,
          })
        })
    })
})


//EXAMPLE
// app.get('/products',(req,res)=>{
//     if(!req.query.search){ //contains query strings present in the url
//         return res.send({
//             error:'You must provide a search term'
//         })
//     } 
    
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req, res)=>{ //pages not matched that start with /help
    res.render('pageNotFound',{
        title:'404',
        name:'Elie Aoun',
        errorMsg:'Help Article Not Found'
    })
})

//404 route: in case the page is not found
//this route must be at the end after defining all the routes
app.get('*',(req, res)=>{ //* : pages that are not matched
    res.render('pageNotFound',{
        title:'404',
        name:'Elie Aoun',
        errorMsg:'Page Not Found'
    })
})

//use it on time only
app.listen(3000, ()=>{ //very important to start the server and listen on a port
    console.log('Server is up on port 3000') 
}) 
