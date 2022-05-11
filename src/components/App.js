import { useState } from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import MainPage from "./pages/MainPage"
import RegisterPage from"./pages/RegisterPage"
import HomePage from "./pages/HomePage"
import DepositPage from "./pages/DepositPage"
import WithdrawPage from"./pages/WithdrawPage"

import UserContext from "./../contexts/UserContext"

import GlobalStyles from "../globalStyles"

export default function App(){
    const [user, setUser] = useState(null)
    return(
        <UserContext.Provider value={{user, setUser}}>
            <GlobalStyles/>     
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage />}></Route>
                        <Route path="/sign-up" element={<RegisterPage />}></Route>
                        <Route path="/home" element={<HomePage />}></Route>
                        <Route path="/deposit" element={<DepositPage />}></Route>
                        <Route path="/withdraw" element={<WithdrawPage />}></Route>
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    )
}