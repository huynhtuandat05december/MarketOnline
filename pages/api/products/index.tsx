import { NextApiRequest, NextApiResponse } from "next";

import { ResponseType } from "@/models/auth";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";
import withHandler from "@/libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  if (req.method === "GET") {
    const products = await client.product.findMany({});
    res.json({
      errCode: null,
      errDetail: null,
      data: products,
    });
  }
  if (req.method === "POST") {
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      errCode: null,
      errDetail: null,
      data: product,
    });
  }
}

export default withApiSession(withHandler(["POST", "GET"], handler));
