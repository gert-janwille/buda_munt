const mail = require(`../../lib/mail`);
const Joi = require(`joi`);

const base = `/api`;

module.exports = [
  {

    method: `POST`,
    path: `${base}/contact`,

    config: {

      validate: {

        options: {
          abortEarly: false
        },

        payload: {
          name: Joi.string().required(),
          firstName: Joi.string().required(),
          email: Joi.string().email().required(),
          question: Joi.string().required()
        }
      }

    },

    handler: (req, res) => {
      const {name, firstName, email, question} = req.payload;
      const data = {name, firstName, email, question};
       // Prepare data for email
      data.subject = `${firstName} ${name} has contacted you`;
      data.mailtype = `contact`;

      try {
        // Send email & remove mail types
        mail(data, `gertjanwille.w@gmail.com`);
        return res({status: `success`});
      } catch (e) {
        return res({status: `error: ${e}`});
      }

    }
  }

];
