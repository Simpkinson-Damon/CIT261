var bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var path = require('path');
var url = require('url');

var app = express();

var port = (process.env.PORT || 5000);

app.use(express.static(__dirname + 'public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');


var postageContents = fs.readFileSync('./public/firstClassMail.json');
var postage = JSON.parse(postageContents);


app.get('/', function(req, res){
  res.render('index.ejs', {
    postage: postage
  });
});

app.get('/mail', function(req, res){
  handlePostage(req, res);
})

function handlePostage(req, res) {
  var requestURL = url.parse(req.url, true);
  var mailType = requestURL.query.mailType;
  var mailWeight = requestURL.query.mailWeight;
  displayPostage(res, mailType, mailWeight);
}

function displayPostage(res, mailType, mailWeight) {
  var cost = "not valid";
  postage.forEach(function(mail){
    if(mail.type == mailType && mail.weight == mailWeight) {
      cost = mail.cost;
    }
  })
  var params = { "type": mailType, "weight": mailWeight, "cost": cost};
  res.render('result', params);
};

app.listen(port, function(){
  console.log('Running on port', port);
});
