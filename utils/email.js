const nodemailer = require('nodemailer');
const { catchAsync } = require('./catchAsync');
// Ny
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST_TEST,
    port: process.env.EMAIL_PORT_TEST,
    secure: false,
    logger: true,
    auth: { user: process.env.EMAIL_USERNAME_TEST, pass: process.env.EMAIL_PASSWORD_TEST },
  });
  // Define email options
  const mailOptions = {
    from: 'Airbean <airbean@joakimtrulsson.se>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // Send
  await transporter.sendMail(mailOptions);
};

// async function myCustomMethod(ctx) {
//   console.log('ctx', ctx);
//   let cmd = await ctx.sendCommand(
//     'AUTH PLAIN ' +
//       Buffer.from(
//         '\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
//         'utf-8'
//       ).toString('base64')
//   );

//   if (cmd.status < 200 || cmd.status >= 300) {
//     throw new Error('Failed to authenticate user: ' + cmd.text);
//   }
// }

// const sendEmailOne = async (options) => {
//   // Create a transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: true,
//     logger: true,
//     auth: {
//       type: 'custom',
//       method: 'plain', // forces Nodemailer to use your custom handler
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.PASSWORD,
//     },
//     customAuth: {
//       plain: myCustomMethod(auth),
//     },
//   });
//   // Define email options
//   const mailOption = {
//     from: 'Airbean <airbean@joakimtrulsson.se>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html:
//   };
//   // Send
//   await transporter.sendMail(mailOption);
// };

module.exports = sendEmail;
