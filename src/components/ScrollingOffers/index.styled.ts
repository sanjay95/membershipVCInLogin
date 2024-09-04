import { styled, keyframes } from '@mui/system';

// export const scroll = keyframes`
//   from { transform: translateX(0); }
//   to { transform: translateX(-100%); } // Adjust distance for scrolling
// `;

export const Container = styled('div')({
  overflow: 'hidden', // Hide overflow for horizontal scrolling
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  padding: '16px 0', // Space above and below offers
  
});

export const OffersWrapper = styled('div')({
  display: 'flex',
  // animation: `${scroll} 30s linear infinite`,
  flex: 1, // Take up remaining space in container
});

export const Offer = styled('div')({
  marginRight: 16, // Space between offers
});