import { createTransport } from 'nodemailer';
import config from '../../../envConfig.js';
import { welcomeTemplate } from './templates/welcomeTemplate.js';
import { passwordResetTemplate } from './templates/passwordResetTemplate.js';
import { inactiveTemplate } from './templates/inactiveTemplate.js';
import { productDeletedTemplate } from './templates/productDeletedTemplate.js';

const transporter = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.EMAIL_GMAIL,
        pass: config.PASSWORD_GMAIL
    }
});

/**
 * 
 * @param {*} user 
 * @param {*} service register | resetPass
 * @param {*} token 
 * @returns 
 */
export const sendEmail = async (user, product = null, service, token = null) => {
    try {
        const { first_name, email } = user;
        const { title } = product || {};
        let msg = "";

        service === 'register' 
        ? (msg = welcomeTemplate(first_name, email) )
        : service === 'resetPass' 
        ? (msg = passwordResetTemplate(first_name, token) )
        : service === 'lastConnection'
        ? (msg = inactiveTemplate(first_name) )
        : service === 'premium' 
        ? (msg = productDeletedTemplate(title) )
        : (msg = "");


        const gmailOptions = {
            from: config.EMAIL_USER,
            to: email,
            subject: service 
                ==='register'
                ? 'Welcome to the Marce Store!' 
                : service 
                ==='resetPass'
                ? 'Marce Store - Password Reset'
                : service 
                === 'lastConnection'
                ? 'Marce Store - Inactive Account'
                : service 
                ==='premiumProductDeleted'
                ? 'Marce Store - Product deleted' 
                : '',
            html: msg
        };

        const response = await transporter.sendMail(gmailOptions);
        console.log('Mail sent to: ' + email + ', Response: ', response);

        if(token) return token;
        console.log(' mail sent to ' + response)
    } catch (error) {
        throw new Error(error);
    }       
}
