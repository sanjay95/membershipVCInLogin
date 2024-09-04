import React, { useState } from "react";
import { Button, Container, createTheme, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, ThemeProvider } from "@mui/material";
import FlightBookingForm from "../BookingForm/BookingForm";
import FlightDeals from "../BookingForm/deals";
import BenefitCard from "../BenefitCard/BenefitCard"
import { BenefitList, Benefits, Header } from "../BenefitCard/BenefitCard.styled";

interface Benefit {
  imageUrl: string | undefined;
  title: string;
  description: string;
}
const theme = createTheme({
  typography: {
    fontSize: 25,
  },
});
const LandingPage = () => {
  const benefits: Benefit[] = [
    { title: 'Earn Cashback', description: 'Get cashback on every booking.', imageUrl: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg' },
    { title: 'Exclusive Discounts', description: 'Enjoy exclusive discounts on hotels and flights.', imageUrl: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg' },
    { title: 'Network Partners Benefits', description: 'Feel valued at other stores @airports', imageUrl: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg' },
    { title: 'Free Room Upgrades', description: 'Subject to availability, enjoy complimentary room upgrades.', imageUrl: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg' },
    { title: 'Special Offers', description: 'Be the first to access exclusive deals and promotions.', imageUrl: 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg' },
  ];

  const [showForm, setShowForm] = useState(false)
  function handleclick(): void {
    setShowForm(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: '#bfddff', padding: '30px', color: 'white' }}>
        <Container >
          <FlightBookingForm />
        </Container>
      </div>
      <div style={{ padding: '20px', color: 'white' }}>
        <Paper elevation={1} sx={{ padding: 2, marginBottom: 2 }}>
          <Container sx={{ paddingTop: 5 }}>
            <FormControl component="fieldset">
              {/* <h2 className='text-lg font-bold mb-3'>Register for Membership Card:</h2> */}
              <Benefits>
                <h2>Benefits of our membership program</h2>
                <BenefitList>
                  {benefits.map((benefit,index) => (
                 
                      <BenefitCard key={index} title={benefit.title} description={benefit.description} imageUrl={benefit.imageUrl||""}>
                      </BenefitCard>
                    
                  ))}
                </BenefitList>
              </Benefits>
            </FormControl>
            <Container sx={{ display: "flex", paddingTop: 2, alignItems: "center", justifyContent: "center" }}>
              <Button variant="contained" style={{ marginRight: 2 }} onClick={() => { window.location.href = '/registration' }}>Register</Button>
            </Container>
          </Container>
        </Paper>
      </div>
    </ThemeProvider>
  );
};


export default LandingPage;
