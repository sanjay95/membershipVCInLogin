import styled from 'styled-components'
import { pxToRem } from 'src/utils'


export const MilestoneIndicatorContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'sans-serif';
  margin: ${pxToRem(20)} auto;
  max-width: ${pxToRem(600)};
  text-align: center;
`;

export const MilestoneWrapper = styled.div`
  margin-bottom: ${pxToRem(10)};
  display: flex;
  justify-content: space-between;
`;

// export const MilestoneName = styled.span`
//   font-size: ${pxToRem(16)};
//   color: #333;
//   width: auto;
// `;

export const ProgressBar = styled.div`
  position: relative;
  height: ${pxToRem(10)};
  background-color: #eee;
  border-radius: ${pxToRem(5)};
  overflow: hidden;
`;

export const ProgressLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  height: ${pxToRem(1)};
  width: 100%;
  background-color: #ccc;
`;

export const ProgressMark = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: ${pxToRem(2)};
  background-color: #333;
  transition: left 0.3s ease-in-out;
`;

export const ProgressFill = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: blue;
  transition: width 0.3s ease-in-out;
  width: ${(props) => props.percentage}%;
  border-radius: ${pxToRem(5)};
`;

export const SubTitle = styled.div`
  margin: ${pxToRem(32)} ${pxToRem(16)} ${pxToRem(24)} 0;;
  font-family: 'lato';
  font-size: ${pxToRem(20)};
  line-height: 1.5;
  color: #6a6a6a;
`
export const MilestoneName = styled.div<{ isCurrent: boolean; isNext: boolean }>`
    color: ${props => (props.isCurrent ? 'green' : props.isNext ? 'blue' : 'inherit')};
    font-weight: ${props => (props.isCurrent ? 'bold' : 'normal')};
    text-shadow: ${props =>
        props.isCurrent
            ? '0 0 5px rgba(0,255,0,0.7)' // Green glow for current milestone
            : props.isNext
            ? '0 0 5px rgba(0,0,255,0.7)' // Blue glow for next milestone
            : 'none'};
`;
export const ButtonContainer = styled.div`
        text-align: center;
        margin-top: ${pxToRem(20)}; /* Adjust margin as needed */
    `;