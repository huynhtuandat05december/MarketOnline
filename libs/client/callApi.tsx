import { ResponseType } from "@/models/auth";
import axiosClient from "@/config/axios";

export default async function handleCallApi(
  url: string,
  method: "GET" | "POST" | "DELETE",
  body: any
): Promise<ResponseType> {
  try {
    const data = await axiosClient({
      url,
      method,
      data: body,
    });
    return data;
  } catch (error) {
    return {
      errCode: 1,
      errDetail: "system failed",
      data: null,
    };
  }
}
