import { OpenMode, Session } from "@affinidi-tdk/iota-browser";
import { IotaCredentials } from "@affinidi-tdk/iota-core";
import { useEffect, useState } from "react";
import { IotaDataRequest, IotaRequestType } from "src/types/types";


async function getIotaCredentials(configurationId: string) {
  console.log('in getIotaCredentials for backend call', configurationId)
  const response = await fetch(
    "/api/iota/start?" +
    new URLSearchParams({
      iotaConfigurationId: configurationId,
    }),
    {
      method: "GET",
    }
  );
  return (await response.json()) as IotaCredentials;
}

export default function useIotaQuery({ configurationId, queryId, openMode = OpenMode.Popup }: IotaRequestType) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isRequestPrepared, setRequestPrepared] = useState(false);
  const [isWaitingForResponse, setWaitingForResponse] = useState(false);
  const [iotaSession, setIotaSession] = useState<Session>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [dataRequest, setDataRequest] = useState<IotaDataRequest>(); // Data requests and responses
  const [data, setData] = useState<any>();

  const createIotaSession = async () => {
    try {
      if (iotaSession) {
        console.log("Iota session already exists");
        return iotaSession;
      }
      console.log("======Iota Session Creating=========");
      const credentialResponse = await getIotaCredentials(configurationId);
      console.log("credentialResponse", credentialResponse);
      const session = new Session({ credentials: credentialResponse });
      await session.initialize();
      setIotaSession(session);
      setStatusMessage("Iota session created successfully")
      return session;
    } catch (error) {
      setIotaSession(undefined);
      console.error("Error initializing Iota Session:", error);
    }
  };

  const handleInitiate = async () => {
    try {
      setErrorMessage(undefined);
      setIsInitializing(true);
      setWaitingForResponse(true);
      setRequestPrepared(false);

      setStatusMessage("Creating Iota Session")
      const session = await createIotaSession();
      if (!session) {
        setErrorMessage("IotaSession not initialized")
        return;
      }

      setStatusMessage("Preparing Iota Session Request")
      const request = await session.prepareRequest({ queryId });
      console.log('session.prepareRequest', request);
      setDataRequest((prevRequests) => ({
        ...prevRequests,
        request,
      }));
      setRequestPrepared(true);
      setStatusMessage("Opening Vault in " + (openMode == OpenMode.Popup ? "Popup" : "NewTab"))

      request.openVault({ mode: openMode });

      setStatusMessage("Waiting for response from vault")
      const response = await request.getResponse();
      setStatusMessage("Got the response from vault")
      console.log('request.getResponse', response);
      if (!response) {
        setErrorMessage("IotaSession response error")
        return;
      }
      const allCrdentialSubjectArray = response.verifiablePresentation?.verifiableCredential?.map((vc) => vc.credentialSubject) || [];
      const allCredentailSubject = Object.assign({}, ...allCrdentialSubjectArray);

      setDataRequest((prevRequests) => ({
        ...prevRequests,
        response,
      }));
      setData(allCredentailSubject)

      setWaitingForResponse(false);
      setIsInitializing(false);
    } catch (error: any) {
      console.error("Error initializing Iota Session:", error);
      setErrorMessage("IotaSession response error: " + error.message)
      setStatusMessage("Iota Error")
    } finally {
      setIsInitializing(false);
      setWaitingForResponse(false);
      setRequestPrepared(false);
    }
  }

  useEffect(() => {
    console.log('configurationId', configurationId)
    console.log('queryId', queryId)
    if (!configurationId || !queryId) {
      setErrorMessage("ConfigurationID or queryID missing")
      return;
    }
    const process = async () => {

    }
    process();
  }, [configurationId, queryId]);

  return {
    isInitializing,
    statusMessage,
    handleInitiate,
    isRequestPrepared,
    isWaitingForResponse,
    errorMessage,
    dataRequest,
    data
  };
}
