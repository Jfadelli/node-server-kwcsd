process.env.NODE_ENV === "production" ? null : require('dotenv').config();
const cors = require('cors');

let express = require("express"),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;
var router = express.Router();
let app = express();

// app.use(express.static('src'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/', router)
app.use(cors())
router.use(function(req, res, next) {
    process.env.NODE_ENV === "production" ? res.header("Access-Control-Allow-Origin", "https://kwcsandiego.com") : res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from;
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.post('/send', function (req, res) {
    req.headers['']
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: process.env.KWCSD_ALERT_USER,
            pass: process.env.KWCSD_ALERT_PASS
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var agent = req.body.agent
    var message = req.body.message
    var intent = req.body.intent
    var timeframe = req.body.timeframe
    var content = `
    name: ${name}\n
    phone: ${phone}\n
    email: ${email}\n
    intent:${intent}\n
    timeline:${timeframe}\n
    message: ${message}
    `
    let mailOptions = {
        // should be replaced with real recipient's account
        to: agent,
        subject: 'New Message from KWCSanDiego.com contact form',
        text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: 'index.html' });
    res.end();
});

router.post('/newProperty', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: process.env.KWCSD_ALERT_USER,
            pass: process.env.KWCSD_ALERT_PASS
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });

    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var street_address = req.body.street_address
    var city = req.body.city
    var zip = req.body.zip
    var country = req.body.country
    var property_type = req.body.property_type
    var building_sf = req.body.building_sf
    var lot_size = req.body.lot_size
    var content = `
          name: ${name} \n
          phone: ${phone} \n
          email: ${email} \n
          street_address:${street_address} \n
          city:${city} \n
          zip: ${zip} \n
          country: ${country}\n
          property_type: ${property_type}\n
          building_sf: ${building_sf}\n
          lot_size: ${lot_size}\n
          `

    var mailOptions = {
        from: name,
        to: process.env.MARK_EMAIL,  // Change to email address that you want to receive messages to
        subject: 'New Property Evaluation Form Submitted',
        text: content
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: 'index.html' });

    res.end();
});

router.post('/send/jasonfadelli', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: process.env.KWCSD_ALERT_USER,
            pass: process.env.KWCSD_ALERT_PASS
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });

    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \nphone: ${phone} \nemail: ${email} \nmessage: ${message}`
    var mailOptions = {
        from: email,
        to: process.env.JASON_EMAIL,  // Change to email address that you want to receive messages on
        subject: 'New Message from jasonfadelli.com',
        text: content
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.writeHead(301, { Location: 'index.html' });
    res.end();
});

let server = app.listen(PORT, function () {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
