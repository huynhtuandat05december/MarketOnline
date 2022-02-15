import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import withHandler from '@/libs/server/withHandler';
import { ResponseType } from '@/models/auth';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  console.log(token);
  res.status(200).end();
}

export default withHandler("POST", handler);
