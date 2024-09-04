import React from 'react';
import styled from 'styled-components';
import { pxToRem } from 'src/utils';
import * as S from './index.styled';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';

interface Milestone {
    [key: string]: number;
}

interface ModalProps {
    progress: number;
    milestones: Milestone;
    handleClaimButton:any;
}

const MilestoneIndicator: React.FC<ModalProps> = ({ progress, milestones,handleClaimButton }) => {
    const milestonesArr = Object.entries(milestones).sort((a, b) => a[1] - b[1]);

    const getMilestonePercentage = (milestoneValue: number) => {
        const totalMilestoneValue = Math.max(...milestonesArr.map(m => m[1]));
        return (milestoneValue / totalMilestoneValue) * 100;
    };

    const getProgressPercentage = () => {
        return Math.min(getMilestonePercentage(progress), 100);
    };

    // Find the current milestone and next milestone
    let currentMilestone = '';
    let nextMilestone = '';
    for (let i = 0; i < milestonesArr.length; i++) {
        const [milestoneName, milestoneValue] = milestonesArr[i];
        if (progress >= milestoneValue) {
            currentMilestone = milestoneName;
            if (i + 1 < milestonesArr.length) {
                nextMilestone = milestonesArr[i + 1][0];
            }
        }
    }

    const MilestoneName = styled.span<{ isCurrent: boolean; isNext: boolean }>`
        color: ${props => (props.isCurrent ? 'green' : props.isNext ? 'blue' : 'inherit')};
        font-weight: ${props => (props.isCurrent ? 'bold' : 'normal')};
    `;

    return (
        <>
            <S.SubTitle>
                {currentMilestone && nextMilestone ? (
                    <>
                        Thank you for your continued loyalty and patronage<MilestoneName isCurrent>{}</MilestoneName> {' '}
                        <MilestoneName isNext>{}</MilestoneName>
                    </>
                ) : (
                    'You are not eligible for any milestone yet.'
                )}
                <br />
                <br/>
            </S.SubTitle>
            <S.MilestoneIndicatorContainer>
                <S.MilestoneWrapper>
                    {milestonesArr.map(([milestoneName], index) => (
                        <S.MilestoneName
                            key={milestoneName}
                            isCurrent={milestoneName === currentMilestone}
                            isNext={milestoneName === nextMilestone}
                        >
                            {milestoneName}
                        </S.MilestoneName>
                    ))}
                </S.MilestoneWrapper>
                <S.ProgressBar>
                    <S.ProgressFill percentage={getProgressPercentage()} />
                    <S.ProgressLine />
                    <S.ProgressMark style={{ left: `${getProgressPercentage()}%` }} />
                </S.ProgressBar>
            </S.MilestoneIndicatorContainer>
            <S.ButtonContainer>
            <Stack direction="row" spacing={2}>
                <Button onClick={handleClaimButton} variant="contained" style={{marginLeft:"20rem"}}> Get {currentMilestone} </Button>
                <Button variant="outlined" style={{marginLeft:"5rem"}}> Wait for {nextMilestone} </Button>
                </Stack>
            </S.ButtonContainer>
        </>
    );
};

export default MilestoneIndicator;
