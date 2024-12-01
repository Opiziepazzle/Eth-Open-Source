<<<<<<< HEAD
import { Outlet, Route, Routes } from "react-router-dom"
import LandingPage from "../landingPage"
=======
import { Outlet } from "react-router-dom"
// import LandingPage from "../landingPage"
>>>>>>> origin/johnsdanlami
import Navigation from "@/components/Navbar"
import Footer from "@/components/Footer"

const MainApp = () => {
  return (
    <>
    <Navigation/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default MainApp