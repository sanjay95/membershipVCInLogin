import { useQuery } from "@tanstack/react-query";
import { ErrorResponse } from "src/types/types";
import { UserInfo } from "src/types/types";
import { hostUrl } from "src/lib/variables";


export const useFetchUserInfoQuery = async () => {
  try{
    const response =  await fetch(`${hostUrl}/api/auth/get-user-info`, {method: "GET"});
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Unable to get user info. Are you authenticated?");
    }
    return {data, error:null};

  }catch(error){
    return {data:null, error};
  }

};
