import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

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
    // await twilioClient.messages.create({
    //   from: process.env.MY_PHONE,
    //   to: `+84${phone}`,
    //   body: `Your login token is ${payload}.`,
    // });
  } else if (email) {
    // await mail.send({
    //   from: "carrotmarket512@gmail.com",
    //   to: email,
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
  }
  return res.json({
    data: {},
    errCode: null,
    errDetail: null,
  });
}

export default withHandler("POST", handler);
