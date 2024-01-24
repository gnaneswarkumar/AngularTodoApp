
/**
 * Email
 * https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted
 */
const nodemailer = require('nodemailer');
const config = require('config');

const { mail_host,
    mail_port,
    mail_service,
    mail_auth_user, 
    mail_auth_user_pass,
    mail_sender_email,
    mail_to_email,
    mail_subject,
    mail_body } = config.get('mail');

var transporter = nodemailer.createTransport({
    host: mail_host,
    port: mail_port,
    secure: true,
    service: mail_service,
    auth: {
        user: mail_auth_user,   //put your mail here
        pass: mail_auth_user_pass //password here
    }
 });

 const mailOptions = { 
               from: mail_sender_email,       // sender address
               to: mail_to_email,          //reciever address
               subject: mail_subject,  
               html: mail_body
 };

 module.exports = {
    transporter,
    mailOptions
 }