import styled from "styled-components";
import Box from "src/components/common/Box/Box";
import { pxToRem } from "src/utils";

export const Wrapper = styled.div`
  min-height: 100%;
  padding: 1rem ${pxToRem(80)};
`;

export const TileWrapper = styled(Box)`
  span {
    width: ${pxToRem(138)};
    margin-top: ${pxToRem(3)};
    border-top: 4px solid #ff5722;
  }
`;
export const TileContainer = styled(Box)``;

export const TileHeader = styled.div`
  font-family: "lato", "sans-serif";
  font-weight: 700;
  font-size: ${pxToRem(25)};
  margin-top: ${pxToRem(10)};
`;

export const Title = styled.div`
  font-weight: 700;
  margin-bottom: ${pxToRem(10)};
  i {
    color: #ff5722 
  }
`;

export const MovieContainer= styled.div`
 width: 100%;
    min-width: 100%;
    height: 760px!important;
    position: relative;
    overflow: hidden;
    background: #000 url(https://www.suntory.com/parts_2017/img/logo_suntory_white.png) no-repeat center 40%;
    background-size: 50% auto;
    `;

    export const ButtonContainer = styled.div`
  margin: 0 auto;
  padding: 30px 0 0;
  text-align: center;
  background: #fff;
`;

export const Button = styled.a`
  margin: 0 auto;
  display: inline-block;
  font-size: 24px;
  font-family: 'suntory syntax';
  font-weight: bold;
  border: 1px solid #5bc2dc;
  border-radius: 40px;
  padding: 18px 126px;
  color: #5bc2dc;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  background: transparent;

  &:hover {
    background: #5bc2dc;
    color: #fff;
  }
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 columns with equal width */
  gap: 20px; /* Space between grid items */
`;

export const Category = styled.div`
  text-align: center;
  padding: 20px;
`;

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export  const BizTitle = styled.h3`
  margin-bottom: 10px;
`;