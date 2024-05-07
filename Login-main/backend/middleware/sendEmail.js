const nodemailer = require("nodemailer")

const sendEmail = async(option)=>{
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASSWORD,

        },

    })

    const mailOption = {
        from:process.env.SMPT_MAIL,
        to:option.email,
        subject:option.subject,
        text: option.message
    }  

    await transporter.sendMail(mailOption)
}


module.exports = sendEmail;   