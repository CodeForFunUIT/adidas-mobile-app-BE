import sgMail from '@sendgrid/mail'
const sendgridAPIKey = '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'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'test@example.com', // Change to your recipient
  from: 'test@example.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  }) 