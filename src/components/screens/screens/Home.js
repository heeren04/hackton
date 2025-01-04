import React from 'react'
import Navbar from '../Navbar'
import Footer from './Footer'
import Carousal from '../Carousal'
import Chatbot from '../Chatbot'



export default function Home() {
  return (
    <>
    
    <div><Navbar /></div>
    <div><Carousal/></div>
    <div><Chatbot/></div>
    <div><Footer/></div>
    </>
  )
}
