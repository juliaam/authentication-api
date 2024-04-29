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
                user: process.env.EMAIL,
                pass: process.env.PASS
            },
            tls: {
                ciphers:'SSLv3'
            }
        });

        await transporter.sendMail({
            from: 'projetocadastro@outlook.com',
            to: emailDestination,
            subject: subject,
            text: message,
        });
        console.log("email sent sucessfully");
    } catch (error) {
        console.log("email not sent");
        console.log(error);
    }

}
