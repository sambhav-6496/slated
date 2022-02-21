const express = require('express')
const app = express()
const moment = require('moment')
const port = 3000

app.get('/', (req, res) => {
  res.end('Hello World!');
});

let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get('/getDates', (req, res) => {
    let datesOfWeek = []
    let date = new Date(req.query.date)
    let dayOfWeek = date.getDay();
    let day = date.getDate()
    let month = date.getMonth();
    let year = date.getFullYear()
    for(let i= dayOfWeek; i >= 0; i--){
       let getDate = checkBeforeDate(day,month,year,i)
       datesOfWeek.push(getDate)
    }
    for(let j= 1; j <= 6-dayOfWeek; j++){
      let getDate = checkAfterDate(day,month,year,j)
      datesOfWeek.push(getDate)
    }
    res.send(datesOfWeek).status(200)
  });

  function checkBeforeDate(day, month,year,i){
    let daysInPreviousMonth = new Date(year, month, 0).getDate()
    let dateToGet = day - i;
    let monthToGet = month
    let yearToGet = year
    if(dateToGet <= 0){
      dateToGet = daysInPreviousMonth + dateToGet
      if(monthToGet - 1 < 0){
        monthToGet = 11
        yearToGet = year - 1
      }else{
        monthToGet = monthToGet - 1
      }
    }
    return `${dateToGet} ${monthNames[monthToGet]} ${yearToGet}`
  }
  function checkAfterDate(day, month,year,i){
    let daysInCurrentMonth = new Date(year, month + 1, 0).getDate()
    let dateToGet = day + i;
    let monthToGet = month
    let yearToGet = year
    if(dateToGet > daysInCurrentMonth){
      dateToGet = dateToGet - daysInCurrentMonth
      if(monthToGet + 1 > 11){
        monthToGet = 0
        yearToGet = year + 1
      }else{
        monthToGet = monthToGet + 1
      }
    }
    return `${dateToGet} ${monthNames[monthToGet]} ${yearToGet}`
  }

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });