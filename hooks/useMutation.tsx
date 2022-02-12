import { ResponseType } from '@/models/auth';
import axiosClient from '@/services/axios';

export default async function useMutation(
  url: string,
  method: "GET" | "POST" | "DELETE",
  body: any
): Promise<ResponseType> {
  try {
    const res = await axiosClient({
      url,
      method,
      data: body,
    });
    return {
      data: res,
      errDetail: null,
      errCode: null,
    };
  } catch (error) {
    return {
      errCode: 1,
      errDetail: "system failed",
      data: null,
    };
  }
}
