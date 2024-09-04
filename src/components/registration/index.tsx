import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ErrorModal from 'src/components/common/ErrorModal/ErrorModal';
import FetchDataBanner from 'src/components/FetchDataBanner';
import { credentialTypeId, hostUrl, iotaConfigurationId, iotaQueryId } from 'src/utils/env_public';
import useIotaQuery from 'src/lib/hooks/useIotaQuery';
import IssuingModal from 'src/components/IssuingModal/IssuingModal';
import { membership, pxToRem } from 'src/utils';
import * as S from './index.styled';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  ThemeProvider,
  Alert,
  ListItem,
  ListItemText,
  Snackbar,
  createTheme,
  FormGroup,
  FormControlLabel,
  Checkbox,
  GlobalStyles
} from "@mui/material";
import LoadingModal from '../LoadingModal/LoadingModal';
import { SuntoryMembership, MemberInfo, Address, ClubMembership, issuanceResponse, credentialIssuanceOffer } from 'src/types/types';
import axios from 'axios';


const theme = createTheme({
  typography: {
    fontSize: 30,
    fontFamily: 'lato,sans-serif',
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: '#5bc2dc',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        backgroundImage: 'url(https://www.suntory.com/parts_2017/img/sp_img_products_liqueur.png)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      },
    }}
  />
);

const Registration: FC = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [startIssuance, setStartIssuance] = useState(false);
  const [issuanceResponse, setIssuanceResponse] = useState<issuanceResponse | null>(null);

  //create state with defaults
  const [suntoryMembershipInfo, setSuntoryMembershipInfo] = useState<SuntoryMembership>({ ...defaults });

  //Prefill available data from session, if user is logged-in
  const { data: session } = useSession();
  const [credinfo, setCredinfo] = useState<credentialsProps>({ ...userdefaults });

  //use hooks for Initiating request for User Profile VC
  const { isInitializing, statusMessage, handleInitiate, isRequestPrepared, isWaitingForResponse, errorMessage, dataRequest, data } = useIotaQuery({ configurationId: iotaConfigurationId, queryId: iotaQueryId });

  const generateSimpleStringWithFixedText = (fixedText: string) => {
    const randomString = Math.random().toString(36).substring(2, 8); // Generates a random alphanumeric string
    return `${fixedText}-${randomString}`;
  };
  useEffect(() => {
    if (data) {
      console.log('data', data);
      //set state from profile VC
      setSuntoryMembershipInfo(state => ({
        ...state,
        memberId: generateSimpleStringWithFixedText('SNT-SG'),
        memberSince: new Date().toLocaleDateString(),
        memberInfo: {
          ...state.memberInfo,
          name: `${data.givenName || ''} ${data.familyName || ''}`.trim(),
          email: data.email,
          dateOfBirth: data.birthdate,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          address: {
            ...state.memberInfo.address,
            streetAddress: data.formatted,
            city: data.locality,
            state: '',
            postCode: data.postalCode,
            country: data.country,
          },
        }
      }));
      setOpen(true);
      push('/registration');
    }
  }, [data]);

  function handleRegister(): void {
    console.log('suntoryMembershipInfo', suntoryMembershipInfo);
    setStartIssuance(true);
    console.log('startIssuance', startIssuance);
  }



  useEffect(() => {
    if (!session || !session.user) return;
    setCredinfo((state) => ({
      ...state,
      email: session.user?.email,
      name: session.user?.name,
      holderDid: session.user?.userId,
    }));
  }, [session]);



  useEffect(() => {
    // if (!credinfo.holderDid) {
    //   console.error("No holderDid found");
    //   return;
    // }

    if (startIssuance) {
      const apiData = suntoryMembershipInfo;

      console.log('apiData', apiData);

      const finalCredData = {
        credentialTypeId: credentialTypeId,
        holderDid: credinfo.holderDid || 'did:key:zQ3shZ5XvgFEiuLeBofUKk3QzHpEMpcfHYnPKVyDSdkKrkwqX',
        credentialData: { ...apiData }
      }
      const startIssue = async () => {
        try {
          const response = await axios<issuanceResponse>(`${hostUrl}/api/credentials/issuance-start`, {
            method: 'POST',
            data: finalCredData,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          let dataResponse = response.data;

          if (typeof dataResponse === 'string') {
            dataResponse = JSON.parse(dataResponse);
          }

          if (dataResponse.credentialOfferUri) {
            setIssuanceResponse(dataResponse);
          }

          console.log('issuanceResponse', dataResponse);
        } catch (error) {
          console.error('Error issuing credential', error);
        }
      };

      startIssue();
    }
  }, [startIssuance]);

  return (

    <ThemeProvider theme={theme}>
      {globalStyles}
      {isInitializing && <LoadingModal title='Please wait' message={`While we fetch your profile data from Affinidi vault`} />}
      {errorMessage && <ErrorModal error={errorMessage} errorDescription={errorMessage} closeCallback="/registration" />}
      {issuanceResponse && <IssuingModal title="Registering" message="Please wait for a few seconds until we register your details" issuanceResponse={issuanceResponse} />}
      <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={() => setOpen(false)} message="Hooray, we have got user profile from your Vault" />
      <S.Wrapper>
        <Container maxWidth="md">
          <Box sx={{ mt: 1, width: '100%' }}>
            <Typography variant="h4" align="center">
              One Membership : Many Possibilities
            </Typography>
          </Box>
          <Card variant="outlined" sx={{ mt: 2, width: '102%' }}>
            <CardContent>
              <Box component="form">
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FetchDataBanner
                      title="Simplify filling out forms with your Affindi Vault credentials"
                      handleParticipate={handleInitiate}
                      isInitializing={isInitializing}
                    />
                  </Grid>
                </Grid>
                <Card variant="outlined" sx={{ mt: 1 }}>
                  <CardContent>

                    <Typography variant="body1" gutterBottom>
                      Choose your membership.
                    </Typography>

                    <Box display="flex" flexDirection="row" gap={2}>
                      {/* <Typography variant="body2" gutterBottom> */}
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={suntoryMembershipInfo.suntoryPremiumClub.member}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, suntoryPremiumClub: { ...p.suntoryPremiumClub, member: !p.suntoryPremiumClub.member } }))}
                              name="suntoryPremiumClub"
                            />
                          }
                          label="Suntory Premium Club"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={suntoryMembershipInfo.suntoryClub.member}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, suntoryClub: { ...p.suntoryClub, member: !p.suntoryClub.member } }))}
                              name="suntoryClub"
                            />
                          }
                          label="Suntory Club"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={suntoryMembershipInfo.membersClub.member}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, membersClub: { ...p.membersClub, member: !p.membersClub.member } }))}
                              name="membersClub"
                            />
                          }
                          label="Members Club"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={suntoryMembershipInfo.suntoryOnlineShop.member}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, suntoryOnlineShop: { ...p.suntoryOnlineShop, member: !p.suntoryOnlineShop.member } }))}
                              name="suntoryOnlineShop"
                            />
                          }
                          label="Suntory Online Shop"
                        />
                      </FormGroup>
                      {/* </Typography> */}
                    </Box>


                  </CardContent>
                </Card>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ paddingTop: 1 }}>
                      Personal Information
                    </Typography>
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, email: e.target.value } }))} />
                    <TextField label="Phone Number" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.phoneNumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, phoneNumber: e.target.value } }))} />
                    <TextField label="Date of Birth" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.dateOfBirth} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, dateOfBirth: e.target.value } }))} />
                    <TextField label="Gender" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.gender} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, gender: e.target.value } }))} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ paddingTop: 1 }}>
                      Address Information
                    </Typography>
                    <TextField label="Address" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.address.streetAddress} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, address: { ...p.memberInfo.address, streetAddress: e.target.value } } }))} />
                    <TextField label="Post Code" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.address.postCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, address: { ...p.memberInfo.address, postCode: e.target.value } } }))} />
                    <TextField label="City" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.address.city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, address: { ...p.memberInfo.address, city: e.target.value } } }))} />
                    <TextField label="Country" variant="outlined" fullWidth margin="normal" value={suntoryMembershipInfo.memberInfo.address.country} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSuntoryMembershipInfo(p => ({ ...p, memberInfo: { ...p.memberInfo, address: { ...p.memberInfo.address, country: e.target.value } } }))} />
                  </Grid>
                </Grid>

                <Grid container justifyContent="center">
                  <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2, width: 'fit-content' }}>
                    Register
                  </Button>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </S.Wrapper>
    </ThemeProvider>
  );
};

export default Registration;

type RegistrationProps = {
  passtype: string;
  passAmount: string;
  email: string | null | undefined;
  name: string | null | undefined;
  phoneNumber?: string;
  dob?: string;
  gender?: string;
  address?: string;
  postcode?: string;
  city?: string;
  country?: string;
};

const defaults: SuntoryMembership = {
  memberId: '',
  memberSince: '',
  expiry: 'No',
  memberInfo: {
    name: '',
    dateOfBirth: '',
    phoneNumber: '',
    gender: '',
    email: '',
    address: {
      streetAddress: '',
      city: '',
      state: '',
      postCode: '',
      country: ''
    },
    preferredCommunicationChannel: 'Email',
    languagePreference: 'English',
    marritalStatus: 'married',
    occupation: 'Flying High'
  },
  suntoryPremiumClub: {
    member: false,
    tier: 'Default'
  },
  suntoryClub: {
    member: false,
    tier: 'Default'
  },
  membersClub: {
    member: false,
    tier: 'Default'
  },
  suntoryOnlineShop: {
    member: false,
    tier: 'Default'
  }
};

type credentialsProps = {
  email: string | null | undefined;
  holderDid: string | null | undefined;
};

const userdefaults: credentialsProps = {
  email: '',
  holderDid: '',
};