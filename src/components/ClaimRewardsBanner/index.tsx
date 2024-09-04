import { FC, useState } from 'react'
import Image from 'next/image'

import arrow from 'public/images/arrow.png'
import close from 'public/images/close.png'
import Box from '../common/Box/Box'

import * as S from './index.styled'

type Props = {
  title: string
  handleParticipate: any
  // isInitializing?: boolean
  // isExtensionInstalled?: boolean
};


const SuccessDataBanner: FC<Props> = ({ title,handleParticipate }) => {
  const [isClosed, setIsClosed] = useState(false)

  if (isClosed ) return null

  return (
    <S.BannerContainer>
      <S.Banner direction='row'>
        <S.CloseButton justifyContent='flex-end' onClick={() => setIsClosed(true)}>
          <Image src={close.src} alt='close' width={12} height={12} />
        </S.CloseButton>
        <Box
          direction='row'
          justifyContent='flex-start'
          flex={3}
          alignItems='center'
        >
          <S.BannerTitle>
            {title}
          </S.BannerTitle>
        </Box>
        <S.Participate
          onClick={handleParticipate}
          direction='row'
          justifyContent='flex-end'
          flex={1}
          alignItems='center'
        >
          {/* <S.BannerTitle>{isExtensionInstalled ? 'Share details' : 'INSTALL EXTENSION'}</S.BannerTitle> */}
          <S.BackButton>
            <Image src={arrow.src} alt='arrow' width={20} height={20} />
          </S.BackButton>
        </S.Participate>
      </S.Banner>
    </S.BannerContainer>
  );
};

export default SuccessDataBanner;
