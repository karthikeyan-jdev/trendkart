import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/userApi";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
};
