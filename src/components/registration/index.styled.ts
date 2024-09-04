import styled from 'styled-components';
import Box from 'src/components/common/Box/Box';
import { pxToRem } from 'src/utils';

export const Wrapper = styled.div`
  min-height: 100%;
  padding: 2rem 10rem;
`;

export const Container = styled(Box)`
  border: solid 1px #e1e2ef;
  padding: ${pxToRem(20)};
`;

export const Title = styled.div`
  font-size: ${pxToRem(24)};
  font-family: 'Arial', sans-serif;
  font-weight: 700;
  text-align: center;
  color: #333;
`;

export const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  display: inline-block;
  background-color: ${({ variant }) => (variant === 'primary' ? '#373e97' : '#ff5722')};
  color: #fff;
  font-family: 'Arial', sans-serif;
  font-size: ${pxToRem(16)};
  font-weight: 700;
  text-transform: uppercase;
  padding: ${pxToRem(12)} ${pxToRem(24)};
  border: none;
`