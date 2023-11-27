import nodemailer from 'nodemailer';

const config = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'contato@convenmais.com.br',
    pass: 'Convenmais3010',
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const transporter = nodemailer.createTransport(config);

export { transporter };
