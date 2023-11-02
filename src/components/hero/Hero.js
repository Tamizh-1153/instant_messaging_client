import React from "react"
import "./hero.css"
import heroImg from "../../assets/Screenshot 2023-11-02 104226.png"
import { useAuth0 } from "@auth0/auth0-react"
import {motion} from 'framer-motion'


const Hero = () => {
  const { loginWithRedirect} = useAuth0()


  return (
    <div className="container hero_container">
      <div className="hero_left">
        <motion.h1
          initial={{ y: "4rem", opacity: "0.1" }}
          animate={{ y: '0rem', opacity: "1" }}
          transition={{
            duration: 2,
            type: "spring",
          }}
          className="hero_title"
        >
          Instant Messaging <br /> Website{" "}
        </motion.h1>
        <button
          
          onClick={() => loginWithRedirect()}
          className="hero_btn"
        >
          Get Started
        </button>
      </div>
      <div className="hero_right">
        <img src={heroImg} alt="" />
      </div>
    </div>
  )
}

export default Hero
