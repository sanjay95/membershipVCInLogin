import { useFetchUserInfoQuery } from "src/lib/hooks/use-fetch-user-info-query";

export const useAuthentication = async () => {
  const { data, error } = await useFetchUserInfoQuery();

  if(error){
    return {
      isLoading: false,
      isAuthenticated: false,
      userId: null,
      user: null,
    };
  }

  return {
    isLoading: false,
    isAuthenticated: true,
    userId: data?.userId,
    user: data?.user,
  };
}
