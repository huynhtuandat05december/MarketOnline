import mail from '@sendgrid/mail';

mail.setApiKey(process.env.SENDGRID_KEY!);
export default mail;
