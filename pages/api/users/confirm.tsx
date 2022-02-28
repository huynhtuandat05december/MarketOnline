import { NextApiRequest, NextApiResponse } from "next";

import { ResponseType } from "@/models/auth";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import withHandler from "@/libs/server/withHandler";

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
  const { token } = req.body;
  const existsToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  });
  if (!existsToken) {
    return res.json({
      errCode: 1,
      errDetail: "Token is not exists",
      data: {},
    });
  }
  req.session.user = {
    id: existsToken?.userId,
  };
  await req.session.save();
  return res.json({
    errCode: null,
    errDetail: null,
    data: {},
  });
}

export default withApiSession(withHandler(["POST"], handler));
