import nodemailer from 'nodemailer';

const config = {
  host: 'smtppro.zoho.com',
  port: 587,
  auth: {
    user: 'contato@chekker.com.br',
    pass: 'Meucanal1@',
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(config);

export { transporter };
