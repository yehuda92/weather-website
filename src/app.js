const path = require('path')
const express = require('express')
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname +'/../templates/views')
const partialsPath = path.join(__dirname +'/../templates/partials')

// Setup handlbars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


// Setup static directory to serve
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address) {
        return res.send({
            Error: 'You must give location'
        })
    }
   
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
          
            res.send({
                forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        msg: 'Error articale not found!'
    })
})

app.get('/*', (req, res) => {
    res.render('error', {
        msg: 'Error 404 Page not find!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})