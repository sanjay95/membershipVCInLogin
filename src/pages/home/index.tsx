import { FC, useEffect, useState } from 'react'

import * as S from './index.styled'
import { useSession } from 'next-auth/react'
import LandingPage from 'src/components/LandingPage/LandingPage'
import HorizontalOffers from 'src/components/ScrollingOffers'
import NavBar from 'src/components/NavBar/NavBar'

const Home: FC = () => {
  const { data: session } = useSession()
  const { userId, name } = session?.user || {}
  const categories = [
      {
        title: 'Beverage & Food',
        images: ['https://www.suntory.com/parts_2017/img/img_business01.png'],
      },
      {
        title: 'Spirits',
        images: ['https://www.suntory.com/parts_2017/img/img_business02.png'],
      },
      {
        title: 'Beer',
        images: ['https://www.suntory.com/parts_2017/img/img_business03.png'],
      },
      {
        title: 'Wine',
        images: ['https://www.suntory.com/parts_2017/img/img_business04.png'],
      },
      {
        title: 'Health & Wellness',
        images: ['https://www.suntory.com/parts_2017/img/img_business06.png'],
      },
      {
        title: 'Other Services',
        images: ['https://www.suntory.com/parts_2017/img/img_business07.png'],
      },
    ];

  const images = [
      // 'https://www.suntory.com/parts_2017/img/logo_suntory_white.png',
      '/images/image.png',
      'https://www.suntory.com/parts_2017/img/sp_img_products_food.png',
      'https://www.suntory.com/parts_2017/img/sp_img_products_liqueur.png',
      // 'https://www.suntory.com/parts_2017/img/sp_main_visual_03.jpg',
      // 'https://www.suntory.com/parts_2017/img/sp_main_visual_04.jpg',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);


    return (
      <><NavBar />

        {/* <S.MovieContainer></S.MovieContainer> */}
        <div className="slideshow" style={{ height: '760px', overflow: 'hidden', paddingTop: '1rem' }}>
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        {/* <div>
        <img src="https://www.suntory.com/parts_2017/img/sp_wave.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div> */}
        <div style={{
          transform: 'translate(-50%, -50%)', textAlign: 'center', position: 'absolute', top: '90%',
          left: '50%', fontWeight: 'bold', fontSize: '25px', width: '100%'
        }}>
          <p>Suntory Group is a global leader in consumer packaged goods, producing and distributing a uniquely diverse portfolio of beverages, </p>
          <p> premium spirits, beer and wine, and wellness products throughout the world.</p>
        </div>
        <S.ButtonContainer>
          <S.Button href="#">About Us</S.Button>
          <div style={{ paddingTop:'10rem',paddingBottom:'5rem',alignItems:'center'}}> <span style={{ fontWeight:'bolder', fontSize:'40px'}}>OUR BUSINESS</span> </div>
        </S.ButtonContainer>
        
        <S.Container>
          {categories.map((category) => (
            <S.Category key={category.title}>
              <S.BizTitle>{category.title}</S.BizTitle>
              {category.images.map((image) => (
                <S.Image src={image} alt={category.title} key={image} />
              ))}
            </S.Category>
          ))}
        </S.Container>

        <S.ButtonContainer>
          <S.Button href="registration">Join Us</S.Button>
        </S.ButtonContainer>

      </>
    )
  }

  export default Home

