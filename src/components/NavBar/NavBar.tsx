import { FC, useEffect, useState } from 'react'
import * as S from './NavBar.styled'
import Box from '../common/Box/Box'
import { signIn, signOut, useSession } from 'next-auth/react'
import { hostUrl } from 'src/utils/env_public';
import { CiSearch } from "react-icons/ci";



const NavBar: FC = () => {
  const [isSignInPage, setIsSignInPage] = useState(false)
  const [confirmLogOut, setConfirmLogOut] = useState(false)

  const { data: session } = useSession()
  const { email, image: profilePicture } = session?.user || {}

  useEffect(() => {
    if (window.location.href.includes('/sign-in')) {
      setIsSignInPage(true)
    } else {
      setIsSignInPage(false)
    }
  }, [])

  useEffect(() => {
    if (confirmLogOut) {
      const timeoutId = setTimeout(() => {
        setConfirmLogOut(false)
      }, 3000)

      return () => clearTimeout(timeoutId)
    }
  }, [confirmLogOut])


  const handleSignIn = async () => {
    localStorage.removeItem("consumerCurrentState");
    await signIn('Affinidi', { callbackUrl: hostUrl })
  }
  async function handleLogOut() {
    if (!confirmLogOut) {
      setConfirmLogOut(true)
      return
    }

    await signOut()
  }

  return (
    <S.Container
      justifyContent='space-between'
      alignItems='center'
      direction='row'
    >
      <div  style={{marginTop:'6rem', marginLeft:'20rem'}} onClick={() => window.location.href = '/'}>

        <img src='/images/suntory_logo.svg' alt="Suntory Logo" style={{ height: '5rem' }} />

      </div>

      <div style={{ display: 'block', unicodeBidi: 'isolate', textAlign: 'left', marginTop: '5rem' }}>

        {/* <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '50px' }}> */}
          {/* <ul style={{ fontSize: '12px', display: 'flex', listStyle: 'none' }}>
            <li>
              <S.Location>
                Japan
              </S.Location>
            </li>
            <li>
              <S.ContactUs onClick={() => window.location.href = '/contact-us'}>
                Contact Us
              </S.ContactUs>
            </li>
          </ul> */}

          <div style={{ display: 'block', unicodeBidi: 'isolate' }}>
            {/* <S.SearchIcon /> */}

        {/* </div> */}
          <div style={{display:'block', marginLeft:'50px'}}>
            <Box style={{ minWidth: 20 }} alignItems='end'>


              {!email && <Box
                justifyContent='end'
                alignItems='center'
                direction='row'
              >
                <S.Button variant='primary' onClick={() => { handleSignIn() }}>Log In</S.Button>
                <S.Button variant='primary' onClick={() => { handleSignIn() }}>Member Log In</S.Button>
              </Box>}

              {email && <S.Account onClick={handleLogOut} direction='row' alignItems='center' justifyContent='end' gap={16}>
                {!confirmLogOut && <S.Avatar>
                  <img src={profilePicture || "images/icon-person-filled.svg"} alt="user avatar"></img>
                </S.Avatar>}
                <S.Email>{confirmLogOut ? 'Log out' : (email || 'My Account')}</S.Email>
              </S.Account>}
            </Box>
          </div>
        </div>

        <div >
          <S.NavigationContainer
            justifyContent='space-between'
            alignItems='flex-end'
            direction='row'
          >
            <S.NavTabs onClick={() => window.location.href = '/about-us'}>About Us</S.NavTabs>
            <S.NavTabs onClick={() => window.location.href = '/business-brands'}>Our Business & Brands
              <S.DropdownMenu>
                <a href="/business-overview">Overview</a>
                <a href="/business-drinks">Drinks</a>
                <a href="/business-food">Food</a>
              </S.DropdownMenu>
            </S.NavTabs>
            <S.NavTabs onClick={() => window.location.href = '/quality-craftsmanship'}>Quality & Craftsmanship</S.NavTabs>
            <S.NavTabs onClick={() => window.location.href = '/sustainability'}>Sustainability</S.NavTabs>
            <S.NavTabs onClick={() => window.location.href = '/financial'}>Financial</S.NavTabs>
            <S.NavTabs onClick={() => window.location.href = '/careers'}>Careers</S.NavTabs>
            <S.NavTabs onClick={() => window.location.href = '/newsroom'}>Newsroom</S.NavTabs>
          </S.NavigationContainer>


        </div>


      </div>



    </S.Container>
  );
}

export default NavBar
