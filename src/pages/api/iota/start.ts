import { IotaCredentials, Iota } from "@affinidi-tdk/iota-core";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getAffinidiAuthProvider } from "src/lib/client/affinidi-auth-provider";
import { ResponseError } from "src/types/types";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IotaCredentials | ResponseError>,
) {
  try {
    // const session = await getServerSession(req, res, authOptions);
    // if (!session) {
    //   res.status(401).json({ message: "You must be logged in." });
    //   return;
    // }
    const { iotaConfigurationId } = req.query;
    const authProvider = getAffinidiAuthProvider();
    const iotaToken = authProvider.createIotaToken(
      iotaConfigurationId as string,
      'did:key:zQ3shZ5XvgFEiuLeBofUKk3QzHpEMpcfHYnPKVyDSdkKrkwqX'
      // session.user?.userId as string,
    );
    console.log('iotaToken', iotaToken);
    const iotaCredentials = await Iota.limitedTokenToIotaCredentials(
      iotaToken.iotaJwt,
    );

    res.status(200).json(iotaCredentials);
  } catch (error: any) {
    res.status(500).json({ message: "Unable to get Iota credentials" });
    console.log(error);
  }
}
