import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

export async function sendEmail(emailDestination, subject, message) {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", 
            secureConnection: false, 
            port: 587, 
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASS
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: process.env.MAIL,
            to: emailDestination,
            subject: subject,
            text: message,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        throw new Error('Não foi possível enviar esse email');
    }

}
