const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getForeCastForCoordinates = require('./utils/forecast')
const getCoordinatesForLocation = require('./utils/geocode')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Youp's index page",
        name: 'Youp Kuiper'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: 'Youp Kuiper'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is some helpful text",
        name: 'Youp Kuiper'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        res.send({err: 'Please provide a location'})
    }else{
        getCoordinatesForLocation(req.query.location, (err, response) => {
            if(err){
                res.send({err})
            }else{
                var locationInfo = {
                    longitude: response.features[0].center[1],
                    latitude: response.features[0].center[0],
                    location: response.features[0].place_name
                }
                getForeCastForCoordinates(locationInfo, (err, resp) => {
                    if(err){
                        res.send({err})
                    }else{
                        res.send(resp)
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help page not found',
        name: 'Youp Kuiper'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Youp Kuiper'
    })})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})