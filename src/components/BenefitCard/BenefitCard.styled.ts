import styled from 'styled-components'


export const BenefitCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 450px; /* Set desired card width */
  height: 350px; /* Set desired card height (optional) */

  img {
    width: 100%; /* Adjust image width as needed */
    height: auto; /* Maintain image aspect ratio */
    object-fit: cover; /* Crop image to fit container */
  }

  h3 {
    margin: 1rem 0;
    white-space: nowrap; /* Prevent wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Show ellipsis if needed */
    max-width: 120px; /* Adjust width as needed */
  }

  p {
    text-align: center;
    white-space: nowrap; /* Prevent wrapping */
    overflow: hidden; /* Hide overflow */
    text-overflow: ellipsis; /* Show ellipsis if needed */
    max-width: 150px; /* Adjust width as needed */
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  background-color: #f0f0f0;
`;

export const Benefits = styled.section`
  padding: 0rem;
`;

export const BenefitList = styled.ul`
padding-left:0px;
  display: flex; /* Change to flexbox */
  flex-wrap: wrap; /* Allow items to wrap onto multiple lines */
  justify-content: space-between; /* Distribute cards evenly */
  grid-gap: 1rem; /* Remove grid properties */
`;



export const CTA = styled.section`
  text-align: center;
  padding: 2rem;
`;
