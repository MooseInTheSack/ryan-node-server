const express = require('express')
const app = express()
const port = 3000
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sendEmailToRyansGmail = async (emailRecipients, emailSubject, emailText) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_PASSWORD,
        }
      })
      
      const mailOptions = {
        from: 'noreply@ryankirkpatrick.me',
        to: emailRecipients,
        subject: emailSubject,
        text: emailText
      };
      
      try {
        return await transporter.sendMail(mailOptions)
      } catch(err) {
        return err
      }
}

app.post('/email', async (req, res) => {
  const emailRecipients = 'rfkirkpatrick@gmail.com, tkirkpatrick@smu.edu'
  const emailSubject = req.body.subject
  const emailText = req.body.text
  const emailResponse = await sendEmailToRyansGmail(emailRecipients, emailSubject, emailText)
  console.log('emailResponse: ', emailResponse)
  const finalResponse = emailResponse instanceof Error ? { status: 400, message: 'Email could not be sent'} : { status: 200, message: 'OK'}
  res.json(finalResponse)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))