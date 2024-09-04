// shared envs for frontend and backend

export const hostUrl = process.env.NEXT_PUBLIC_HOST!


if (!hostUrl)
  throw new Error('NEXT_PUBLIC_HOST environment variable is undefined, please follow instructions in README to setup the application')
export const vaultUrl = process.env.NEXT_PUBLIC_VAULT_URL!;
export const iotaConfigurationId = process.env.NEXT_PUBLIC_IOTA_CONFIGURATION_ID!;
export const iotaQueryId = process.env.NEXT_PUBLIC_IOTA_QUERY_ID_PROFILE!;
export const credentialTypeId=process.env.NEXT_PUBLIC_CREDENTIAL_TYPE_ID!;

// export const courseQueryId = process.env.NEXT_PUBLIC_IOTA_QUERY_ID_COURSE_CERTIFICATE!;  