const nodemailer = require('nodemailer');

module.exports.transport = nodemailer.createTransport({
    service:'gmail',
     auth: {
                 user: "amruthjoshwa@gmail.com",
                 pass: "gkqxjqecduvjsdpz"
            }
        });
    var mailOptions = {
            from: "amruthjoshwa@gmail.com", 
            to:'rodriguesaj.ofc@gmail.com', 
            subject: "nodejs working ?", 
            text: "Hello world ?",  
        }
        
    
