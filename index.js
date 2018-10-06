const express = require('express')
// var https = require('https')
const queryString = require('querystring')
var request = require('request')

const app = express()
const port = 8080


app.get('/', (req, res) => {
  var code = req.query.code;
  console.log(`Checking for code`);
  try {
    if (!code) throw 'Missing code';

    postCode(res, code);
  } catch(error) {
    res.send('Missing code')
  }
})

const postCode= (res, code) => {
  console.log(`Posting token: ${code}`)

  request.post({
    url:'https://connect.stripe.com/oauth/token',
    form: {
      grant_type: 'authorization_code',
      client_secret: 'sk_test_Pkoze7OoPNHcHaouk3ApIiG7',
      code: code
    }
  }, function(err, r, body) {
    var accessToken = JSON.parse(body).access_token

    res.send(`Your token: ${accessToken}`)
    console.log(body)
  })
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
