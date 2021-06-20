module.exports = (route) => {

    const weather = require('./weather-history.js');


    route.get('/api', (req, res) => {
        res.send("You have reached the api root. It's a dark and lonely place.");
    });
    
    route.get('/api/get-daily/:start/:end/:station', (req, res) => {

        let data = {
            start:   req.params.start,
            end:     req.params.end,
            station: req.params.station,
        };

        weather.getDailyHistory(data, res);

    });

    route.get('/api/get-hourly/:date/:station', (req, res) => {

        let data = {
            date:   req.params.date,
            station: req.params.station,
        };

        weather.getHourlyHistory(data, res);

    });

    route.get('/api/get-stations', (req, res) => {
        weather.getStations(res);
    });
}