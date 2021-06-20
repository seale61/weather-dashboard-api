const mysql  = require('mysql');
const util   = require('util'); 

const dbconn = mysqlConnect(mysql);
const query  = util.promisify(dbconn.query).bind(dbconn);


module.exports = {

    getDailyHistory: async function(data, res) {

        data = [data.start, data.end, data.station];

        let sql = `SELECT * 
                     FROM weather_history_daily 
                    WHERE SUBSTRING(date_time, 1, 10) >= ? 
                      AND SUBSTRING(date_time, 1, 10) <= ? 
                      AND station = ? 
                    ORDER BY date_time`;

        try {
            let results = await query(sql, data);
            res.json(results);
        } catch (error) {
            console.log(error);
        }
    },

    getHourlyHistory: async function(data, res) {
        data = [data.date, data.station];

        let sql = `SELECT * 
                     FROM weather_history_hourly 
                    WHERE SUBSTRING(date_time, 1, 10) = ? 
                      AND station = ? 
                    ORDER BY log_time`;
 
        try {
            let results = await query(sql, data);
            res.json(results);
        } catch (error) {
            console.log(error);
        }
    },

    getStations: async function(res) {

        let sql = 'SELECT DISTINCT station FROM weather_history_daily ORDER BY station';

        try {
            let results = await query(sql);
            res.json(results);
        } catch {
            console.log(error);
        }

    }




}


function mysqlConnect(mysql) {

    // Create connection
    const db = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DATABASE  
    });

    // Connect
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log(`MySql Connected ${process.env.DATABASE}`);
    });

    return db;
}