import twilio from 'twilio';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
export default twilioClient;
