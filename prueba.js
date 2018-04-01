var url = require("url");
var url2 = "https://sos171805jpr-sos171805jpr.c9users.io/api/v1/best-stats?country=Spain&year=2016"
var q = url.parse(url2,true);
var query = q.query;
var year = query.year;
var anyo = parseInt(year,0);
var country = query.country;



console.log(anyo+", "+country);