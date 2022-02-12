import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import twilioClient from '@/config/twilio';
import client from '@/libs/server/client';
import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/models/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : { email };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    const message = await twilioClient.messages.create({
      from: process.env.MY_PHONE,
      to: `+84${phone}`,
      body: `Your login token is ${payload}.`,
    });
    console.log(message);
  }
  return res.json({
    data: {},
    errCode: null,
    errDetail: null,
  });
}

export default withHandler("POST", handler);
