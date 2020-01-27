const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()
const pathDirectory = path.join(__dirname,'../public')
const viewDirectory = path.join(__dirname,'../templates/views')
const partialsDirectory = path.join(__dirname,'../templates/partials')


hbs.registerPartials(partialsDirectory)

app.set('view engine', 'hbs')
app.set('views',viewDirectory)
app.use(express.static(pathDirectory))


app.get('/home',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        footerText: 'Fahama Khan'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'please provide url'
        })
    }else{

        geocode(req.query.address,(error,{latitude,longitude,placename})=>{
            if (error) {
                return res.send({error})
            }else
            
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error) {
                return res.send(error)
            }else
            res.send({
                PlaceName: req.query.address,
                ForeCast: forecastData
            })
        
        })
        })

    }
  

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Cant find article help' 
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'page not found'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on 3000')
})