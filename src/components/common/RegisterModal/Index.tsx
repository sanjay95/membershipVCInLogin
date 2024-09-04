import { FC, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";

import * as S from "./Index.styled";
import { useRouter } from "next/router";
import MilestoneIndicator from "src/components/MilestoneIndicator/Index"
import { Button } from "@mui/material";
import LoadingModal from 'src/components/LoadingModal/LoadingModal';
import axios from "axios";
import { hostUrl } from "src/utils/env_public";
import Registration from "src/pages/registration";

type ModalProps = {
  // error: string
  // errorDescription?: string
  closeCallback?: string
};
const milestones = {
  Silver: 50,
  Gold: 500,
  Platinum: 5000,
  Titanium: 10000,
};

const progress = 7000;

const RegisterModal: FC<ModalProps> = ({ closeCallback }) => {
  const { push } = useRouter();
  const [open, setOpen] = useState(true);
  const [claimInititated, setClaimIntiated] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [signedVC, setSignedVC] = useState()
  const unsignedVC=null;

  const IssueVC = async () => {
    const response = await axios.post(
      `${hostUrl}/api/vc/isue`,
      {
        method: 'POST', data: unsignedVC
      }
    )
    let dataResponse = response.data
    if (typeof (dataResponse) == 'string') {
      dataResponse = JSON.parse(dataResponse);
    }
    setSignedVC(dataResponse);
  }

  const handleClaimButton = () => {
    setClaimIntiated(true);
    // alert('claimed')
    setIsloading(true);
    IssueVC();
  }
  useEffect(() => {
    setIsloading(false);

  }, [signedVC]);


  async function onCloseModal() {
    setOpen(false);
    if (closeCallback)
      push(closeCallback);
  }

  return <Registration/>
};

export default RegisterModal;
