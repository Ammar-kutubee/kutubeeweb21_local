import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isMobile,isTablet } from 'react-device-detect'
import styles from '../styles/Home.module.css'


const Home = () => {

  const router = useRouter()
  useEffect(() => {
    if(isTablet) {
      router.push('/language')
    } if (!isMobile )  {
      router.push('/language')
    }
    
    return () => { 

    }
  }, [])
  return (

    <div>

    </div>

  )
}

Home.layout = "Out";

export default Home;
