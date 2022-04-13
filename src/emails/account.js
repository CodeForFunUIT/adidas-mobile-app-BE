import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

const sendMail = (email, id) =>{
  let mailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD
    }
  });
  
  let mailDetails = {
    from: process.env.EMAIL_NAME,
    to: email,
    subject: 'Welcom to adidas mobile app',
    text: 'Node.js testing mail for GeeksforGeeks',
    html: `Press <a href=http://localhost:3000/auth/verify/${id}> here </a> to verify your email. Thanks`
  };
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {

        console.log(err);
    } else {
        console.log('Email sent successfully');
    }
  });
}

export default sendMail;



// const sendGridAPIKey = "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"

// sgMail.setApiKey(sendGridAPIKey)
// const msg = {
//   to: 'adidasmobileappUIT@gmail.com', // Change to your recipient
//   from: 'nghiathdev@gmail.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   }) 