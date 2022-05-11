import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"
import axios from "axios"

import styled from "styled-components"

export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const navigator = useNavigate()

    async function register(e){
        e.preventDefault()
        try {
            console.log({name, email, password, repeatPassword})
            await axios.post("http://localhost:5000/sign-up", {name, email, password, repeatPassword})
            alert ("Register ok")
            navigator("/")
        } catch (error) {
            console.log("Error registering user.", error)
        }
    }

    return( 
        <Main>
            <H1>My Wallet</H1>
            <Form>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Nome"
                />
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
                <input 
                    type="password" 
                    value={repeatPassword} 
                    onChange={(e) => setRepeatPassword(e.target.value)} 
                    placeholder="Confirme a senha"
                />
                <button type="submit" onClick={register}>Cadastrar</button>
            </Form>
            <Link to="sign-in"><LinkStyle>Já tem uma conta? Entre agora!</LinkStyle></Link>
        </Main>
    )
}

const Main = styled.main`
    margin: 25px;
`

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