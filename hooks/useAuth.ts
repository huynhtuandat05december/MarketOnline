import { PublicConfiguration } from "swr/dist/types";
import useSWR from "swr";

export function useAuth(options?: Partial<PublicConfiguration>) {
  const { data, error, mutate } = useSWR("users/me", {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options,
  });

  const firstLoading = data === undefined && error === undefined;
  return { profile: data?.data, error, mutate, firstLoading };
}
