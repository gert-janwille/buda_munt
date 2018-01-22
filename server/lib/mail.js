const fs = require(`fs`);
const path = require(`path`);
const nodemailer = require(`nodemailer`);
const Handlebars = require(`handlebars`);
const getFullDate = require(`./getFullDate`);

const {EMAILUSER: user, EMAILPASS: pass} = process.env;

module.exports = (data, to) => {

  const orderDate = getFullDate();

  const transporter = nodemailer.createTransport({
    host: `smtp-auth.mailprotect.be`,
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass
    }
  });

  const source = fs.readFileSync(path.join(__dirname, `templates/${data.mailtype}.hbs`), `utf8`);
  const template = Handlebars.compile(source);

  const mailOptions = {
    from: `"Cherry Stickers 🍒" <no-reply@cherrystickers.be>`,
    to: to,
    subject: data.subject,
    html: template({data, orderDate})
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log(error);
    console.log(`Message %s sent: %s`, info.messageId, info.response);
  });
};
