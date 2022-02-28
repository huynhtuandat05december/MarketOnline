import { NextApiRequest, NextApiResponse } from "next";

import { ResponseType } from "@/models/auth";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id?: number;
    };
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    errCode: null,
    errDetail: null,
    data: profile,
  });
}

export default withApiSession(handler);
