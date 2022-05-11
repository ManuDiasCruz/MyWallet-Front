import {Link, useNavigate} from "react-router-dom"
import {useState, useContext} from "react"
import axios from "axios"

import styled from "styled-components"

import UserContext from "../../contexts/UserContext"

export default function MainPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user, setUser} = useContext(UserContext)

    const navigator = useNavigate()

    async function login(e){
        e.preventDefault()
        try {
            const res = await axios.post("http:localhost:5000/sign-in", {email, password})
            const {token, name} = res.data
            setUser({name, token})
            navigator("/home")
        } catch (error) {
            console.log("Error at login.", error)
        }
    }

    return( 
        <>
            <H1>My Wallet</H1>
            <Form>
                <input 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="E-mail"
                />
                <input 
                    type="passwrod" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Senha"
                />
                <button type="submit" onClick={login}>Entrar</button>
            </Form>
            <Link to="sign-up"><LinkStyle>Primeira vez? cadastre-se!</LinkStyle></Link>
        </>
    )
}

const H1 = styled.h1`
    font-family: "Saira Stencil One", cursive;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
    margin-bottom: 24px;
`;

const Form = styled.form`
    width: 100%;
	input {
		width: 100%;
		height: 58px;
		border-radius: 5px;
		margin-bottom: 13px;
		display: flex;
		align-items: center;
		padding-left: 15px;
		font-size: 20px;
		line-height: 23px;
		font-weight: 700;
    }
    button {
		width: 100%;
		height: 58px;
		border-radius: 5px;
		color: #fff;
		background: #a328d6;
		font-size: 20px;
		font-weight: 700;
		line-height: 23px;
	}
`;

const LinkStyle = styled.a`
    width: 191px;
    height: 18px;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;

    color: #FFFFFF;
`