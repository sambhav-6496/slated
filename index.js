const express = require('express')
const app = express()
const moment = require('moment')
const port = 3000

app.get('/', (req, res) => {
  res.end('Hello World!');
});
app.get('/getDates', (req, res) => {
    let datesOfWeek = []
    let date = new Date(req.query.date)
    let day = date.getDay();
    for(let i= day; i >= 0; i--){
        dateFrom = moment(date - i * 24 * 3600 * 1000).format('YYYY-MM-DD');
        datesOfWeek.push(dateFrom);
    }
    for(let j= 1; j <= 6-day; j++){
        dateFrom = moment(date).add(j,'days').format('YYYY-MM-DD')
        datesOfWeek.push(dateFrom);
    }
    res.send(datesOfWeek).status(200)
  });

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });