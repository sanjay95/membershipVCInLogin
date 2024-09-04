
import React from 'react';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import * as S from './index.styled';

interface Offer {
  text: string; // Text content of the offer
}
const theme = createTheme({
  typography: {
    fontSize: 25,
  },
});

const HorizontalOffers: React.FC<{ offers: Offer[] }> = ({ offers }) => {

  return (
    <ThemeProvider theme={theme}>
      <S.Container>
        <S.OffersWrapper>
          {offers.map((offer,index) => (
            <S.Offer key={index}>
              <Typography key={offer.text}  >
                {offer.text}
              </Typography>
            </S.Offer>
          ))}
          {/* Duplicate offers for continuous scrolling */}
          {offers.map((offer,index) => (
            <S.Offer key={index}>
              <Typography
                key={`duplicate-${offer.text}`}
              >
                {offer.text}
              </Typography>
            </S.Offer>
          ))}
        </S.OffersWrapper>
      </S.Container>
    </ThemeProvider>
  );
};

export default HorizontalOffers;
