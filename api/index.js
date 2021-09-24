const express = require('express')
const app = express()
const port = 4000

var cors = require('cors')
var bodyParser = require('body-parser')

const corsOpts = {
  origin: '*',

  /* methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ], */
};
app.use(cors(corsOpts));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

/* app.use(bodyParser({ extended: false })) */

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/* helpers */
const generateOTP = () => {
  var digits = "0123456789";
  var otpLength = 4;
  var otp = "";
  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);
    otp = otp + digits[index];
  }
  return otp;
};

app.post('/', jsonParser, async (req, res) => {
  console.log('POST /')
  console.dir(req.body)
  try{
    /* let phone = req.body.phone; */

    /* send OTP */
    /* let generateOTPVal = generateOTP()
    let apiEndpoint2FactorHost = '2factor.in'
    let apiEndpoint2FactorRequestURI = '/API/V1/[api_key]/SMS/+91[phone_no]/[custom_otp_val]'
    .replace("[api_key]", 'c7d53d63-c46a-11ea-9fa5-0200cd936042');
    //.replace("[phone_no]", phone)
    //.replace("[custom_otp_val]", generateOTPVal);
    console.log(
      "apiEndpoint2FactorRequestURI : " + apiEndpoint2FactorRequestURI
    );
    const data = JSON.stringify({
      From: 'ZARFAP',
      To: phone,
      TemplateName: 'ZARFAPP',
      VAR1: generateOTPVal
    })

    var options = {
      host: apiEndpoint2FactorHost,
      port: 443,
      path: apiEndpoint2FactorRequestURI,
      //method: "GET",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };
    try {
      await https
        .request(options, function (res) {
          console.log("STATUS: " + res.statusCode);
          console.log("HEADERS: " + JSON.stringify(res.headers));
          res.setEncoding("utf8");
          res.on("data", function (chunk) {
            console.log("BODY: " + chunk);
          });
        })
        .write(data)
        .end();
    } catch (err) {
      //res.status(400).json({ err });
      console.log(err);
    } */

    /* response */
    /* res.status(200).json({
      status: true,
      msg: "OTP has been successfully sent to your mobile no.",
    }); */

    res.writeHead(200, {'Content-Type': 'text/html'})
    res.end('thanks')
  } catch (err) {
    res.status(400).json({ status: false, msg: err });
  }
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});