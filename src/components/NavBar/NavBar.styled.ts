import styled from 'styled-components';
import { pxToRem } from 'src/utils';
import Box from '../common/Box/Box';

export const Container = styled(Box)`
  padding: ${pxToRem(20)} ${pxToRem(80)};
  height: ${pxToRem(100)};
  background-color: white;
  // border-bottom: 1px solid #E0E0E0; // Adds a bottom border for separation

  @media (min-width: 1024px) {
    padding: ${pxToRem(28)} ${pxToRem(80)};
  }
`;

export const NavigationContainer = styled(Box)`
  justify-content: center;  // Center the navigation items
  align-items: center;      // Vertically align the navigation items
  gap: ${pxToRem(10)};      // Add spacing between navigation items
`;

export const Title = styled.div`
  color: #10375c;
  font-size: ${pxToRem(24)};
  font-family: 'playfair-display', 'sans-serif';
  font-weight: 700;
  user-select: none;
  cursor: pointer;
`;

// export const NavTabs = styled.div`
//   color: #10375c;
//   font-family: 'lato', 'sans-serif';
//   font-weight: 700;
//   cursor: pointer;
//   font-size: 16px;
//   border-bottom: 2px solid transparent; // Add an underline effect
//   padding-bottom: 5px; 

//   &:hover {
//     border-bottom: 2px solid #10375c;  // Change color on hover
//   }
// `;
export const NavTabs = styled.div`
  position: relative;
  color: #10375c;
  margin-right: ${pxToRem(40)};
  font-family: 'lato', 'sans-serif';
  width: max-content;
  font-weight: 700;
  cursor: pointer;
  font-size: 16px;
  
  &:hover > div {
    display: block;
  }
`;

export const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  background: #fff;
  padding: 12px 24px;
  color: #ff5722;
  font-family: 'lato', 'sans-serif';
  cursor: pointer;
  border: 0px;

  button:nth-of-type(1) {
    margin-right: ${pxToRem(12)};
  }

  ${({ variant }) =>
    variant === 'primary'
      ? `
      background: #fff;
      color:#ff5722;
    `
      : `
      background: #ff5722;
      color: #fff;
    `}
`;

export const Account = styled(Box)`
  cursor: pointer;
`;

export const Avatar = styled.div`
  width: ${pxToRem(32)};
  height: ${pxToRem(32)};
  background-color: #10375c;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${pxToRem(16)};
  
  img {
    object-fit: cover;
    object-position: center center;
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

export const Email = styled.div`
  color: #10375c;
  font-size: ${pxToRem(16)};
  font-family: 'lato', 'sans-serif';
  font-weight: 700;
`;

export const Loading = styled.div`
  color: #10375c;
  font-size: ${pxToRem(16)};
  font-family: 'lato', 'sans-serif';
  font-weight: 700;
`;

export const Location = styled.div`
  display: inline-flex;
  align-items: center;
  color: #10375c;
  font-size: ${pxToRem(16)};
  font-family: 'lato', 'sans-serif';
  font-weight: 700;
  cursor: pointer;
  margin-right: ${pxToRem(24)};
`;

export const ContactUs = styled.div`
  display: inline-flex;
  align-items: center;
  color: #10375c;
  font-size: ${pxToRem(16)};
  font-family: 'lato', 'sans-serif';
  font-weight: 700;
  cursor: pointer;
  margin-right: ${pxToRem(24)};
`;

// export const SearchIcon = styled.div`
//   display: inline-flex;
//   align-items: center;
//   cursor: pointer;
//   margin-right: ${pxToRem(24)};

//   img {
//     height: ${pxToRem(24)};
//     width: ${pxToRem(24)};
//   }
// `;



export const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 150px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 1;
  
  a {
    color: #10375c;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  a:hover {
    background-color: #f1f1f1;
  }
`;
export const SearchIcon = styled.span`
	position: absolute;
	content: "";
	display: block;
	top: 20px;
	width: 16px;
	height: 16px;
	border-radius: 16px;
	border: 2px solid #000;
	z-index: 15;
  &::after {
    position: absolute;
	display: block;
	content: "";
	top: 40%;
	left: 60%;
	width: 6px;
	height: 2px;
	border-radius: 20px;
	background: #000;
	margin: 7px 0 0 3px;
	transform: rotate(45deg);
  }
  `;