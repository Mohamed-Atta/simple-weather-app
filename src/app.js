const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Atta'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You need to provide an address"
        })
    }
    else {
        const address = req.query.address
        geocode(address, (error, {lat, long, location}) => {
            if (error) {
                return res.send({
                    error: error
                })
            } 
        
            forecast(lat, long, location, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
        
                console.log('Location: ' + location)
                console.log('Temperature: ' + forecastData.temperature)

                res.send({
                    address: address,
                    location: location,
                    temperature: forecastData.temperature
                })
            })
        })
    }
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Atta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Atta'
    })
})

app.get('/help/*', (req, res) => {
    res.render('not-found', {
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('not-found', {
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up at port ' + port)
})