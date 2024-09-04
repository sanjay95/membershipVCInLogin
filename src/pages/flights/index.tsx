import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import * as S from './index.styled'
import {
  Box,
  Container,
  Typography,
  Grid,
  ThemeProvider,
  createTheme,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper
} from "@mui/material";

import FlightLandTwoToneIcon from '@mui/icons-material/FlightLandTwoTone';
import FlightTakeoffTwoToneIcon from '@mui/icons-material/FlightTakeoffTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import CardGiftcardTwoToneIcon from '@mui/icons-material/CardGiftcardTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';

//Import custom hooks

import ClaimModal from 'src/components/common/ClaimModel/Index';
import ClaimRewardsBanner from 'src/components/ClaimRewardsBanner';
import { hostUrl } from 'src/utils/env_public';
import React from 'react';
import axios from 'axios';
import IssuingModal from 'src/components/IssuingModal/IssuingModal';
import { membership } from 'src/utils';

const theme = createTheme({
  typography: {
    fontSize: 28,
  },
});

const Flights: FC = () => {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [flights, setFlights] = useState<any>([]);
  const [claiming, setClaiming] = useState(false);
  const [claimInititated, setClaimInititated] = useState(false);



  const handleClaim = () => {
    setClaiming(true);
  }
  const handleClaimInitiate = () => {
    setClaimInititated(true);
    setClaiming(false);
  }

  useEffect(() => {

    const searchFlights = async () => {
      const response = await axios.get(
        `${hostUrl}/api/flights/search`,
        {
          method: 'GET'
        }
      )
      let dataResponse = response.data
      if (typeof (dataResponse) == 'string') {
        dataResponse = JSON.parse(dataResponse);
      }

      setFlights(dataResponse);
    }

    searchFlights();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* //Display Error if any or loading modal popup */}
      {/* {error && <ErrorModal error={error} errorDescription={errorDescription} closeCallback="/flights" />}
      {isLoading && <LoadingModal title="Verifying" message="Please wait for a few seconds until we process your request." />} */}
      {claiming && <ClaimModal closeCallback='/flights' handleClaimInitiate={handleClaimInitiate} />}
      {claimInititated && <IssuingModal title="Upgrading" message="Please wait for a few seconds until we register your details" issuanceType={membership.Platinum} />}

      <S.Wrapper>
        <Container>
          <Box sx={{ mt: 1 }}>
            <Typography variant="h4" align="center">
              Your booked flights with us
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {flights && <>
                <ClaimRewardsBanner
                  title="Congratulations! You're eligible for the Platinum membership. Upgrade it online quickly and easily."
                  handleParticipate={handleClaim}
                />
              </>}
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><FlightTakeoffTwoToneIcon /> From</TableCell>
                  <TableCell><FlightLandTwoToneIcon /> To</TableCell>
                  <TableCell><CalendarMonthTwoToneIcon /> Departure Time</TableCell>
                  <TableCell><PaymentTwoToneIcon /> Fare</TableCell>
                  <TableCell><CardGiftcardTwoToneIcon /> Miles Earned</TableCell>
                  <TableCell><LoyaltyTwoToneIcon /> Claimable</TableCell> {/* Corrected spelling */}
                </TableRow>
              </TableHead>
              <TableBody>
                {flights.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="left">{row.from}</TableCell>
                    <TableCell align="left">{row.to}</TableCell>
                    <TableCell align="left">{row.departureDateTime}</TableCell>
                    <TableCell align="left">$ {row.fare}</TableCell>
                    <TableCell align="left">{row.miles}</TableCell>
                    <TableCell align="left">{row.claimable}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Container>
      </S.Wrapper>
    </ThemeProvider>
  )
}

export default Flights
