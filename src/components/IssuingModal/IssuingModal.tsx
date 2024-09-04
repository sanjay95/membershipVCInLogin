import { FC, useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
import "react-responsive-modal/styles.css";
import { issuanceResponse } from "src/types/types";
import * as S from "./IssuingModal.styled";
import axios from "axios";
import { credentialTypeId, hostUrl, vaultUrl } from "src/utils/env_public";
import { membership } from "src/utils";
import QrCodeGenerator from "../common/QrCode/QrCodeGenerator";
import { Button, Collapse, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from "next/router";

type ModalProps = {
  title: string;
  message: string;
  issuanceResponse: issuanceResponse;
};

type credentialIssuanceOffer = {
  credentialOfferUri: string;
  issuanceId: string;
  expiresIn: number;
};

type credentialsProps = {
  email: string | null | undefined;
  holderDid: string | null | undefined;
};

const defaults: credentialsProps = {
  email: '',
  holderDid: '',
};

const silver = {
  tierLevel: 'Silver',
  frequentFlyerNumber: 'AITT6789JH',
  expiryDate: '2025-09-08',
  airline: 'Ascent Airline',
};

const platinum = {
  tierLevel: 'Platinum',
  frequentFlyerNumber: 'AITT6789JH',
  expiryDate: '2025-09-08',
  airline: 'Ascent Airline',
};

const IssuingModal: FC<ModalProps> = ({ title, message, issuanceResponse }) => {
  const { data: session } = useSession()
  const { userId, name, email } = session?.user || {}
  // const [issuanceResponse, setIssuanceResponse] = useState<credentialIssuanceOffer | null>(null);
  const [credinfo, setCredinfo] = useState<credentialsProps>({ ...defaults });
  const [showUrl, setShowUrl] = useState(false);
  const [open, setOpen] = useState(true);
  const [affinidiVaultUrl, setAffinidiVaultUrl] = useState('');
  const { push } = useRouter();
  const claimUrl = vaultUrl + issuanceResponse.credentialOfferUri;


  async function onCloseModal() {
    setOpen(false);
    push('/');
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
    console.log('issuanceResponse', issuanceResponse);
    setAffinidiVaultUrl(vaultUrl +issuanceResponse?.credentialOfferUri)
  }, [issuanceResponse]);

  return (
    <S.Modal open={open} onClose={onCloseModal} center>
      <S.ModalWrapper>
        {!issuanceResponse ? (
          <>
            <S.Title>{title}...</S.Title>
            <S.SubTitle>{message}</S.SubTitle>
          </>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p>
                 You have been offered Following membership
                </p>
              </div>
              <div style={{ flex: 1 }}>
                <QrCodeGenerator url={issuanceResponse?.credentialOfferUri || ''} />
              </div>
            </div>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <IconButton onClick={() => setShowUrl(!showUrl)} aria-expanded={showUrl}>
                <ExpandMoreIcon />
              </IconButton>
              <Collapse in={showUrl}>
                <p>{claimUrl}</p>
              </Collapse>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button
                variant="contained"
                onClick={() => window.open(affinidiVaultUrl, '_blank')}
                style={{ marginRight: '10px' }}
              >
                Save to Vault
              </Button>
              <Button variant="contained" onClick={() => window.location.href = '/'}>Book Holiday</Button>
            </div>
          </div>
        )}
      </S.ModalWrapper>
    </S.Modal>
  );
};

export default IssuingModal;
