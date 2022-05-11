import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import styled from "styled-components"

import UserContext from "../../contexts/UserContext"

export default function WithdrawPage() {
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    
    const {user} = useContext(UserContext)

    const navigator = useNavigate()

    async function saveWithdraw(e) {
        e.preventDefault()
        
        try {
            await axios.post(
                "http://localhost:5000/transactions", 
                {
                    description, 
                    value: parseFloat(value),
                    type: "withdraw"
                }, { 
                    "Authorization": `Bearer ${user.token}`
                }
            )
            alert("Success at withdraw register.")
            navigator("/home")
        } catch (error) {
            console.log("An error occurred at withdraw register.", error)
        }
    }

    return (
        <Main>
        <Title>Nova saída</Title>
        <form>
            <input 
            type="number"
            placeholder="Valor"
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            />

            <input 
            type="text"
            placeholder="Descrição"
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" onClick={saveWithdraw}>Salvar entrada</button>
        </form>
        </Main>
    )
}

const Main = styled.div`
  width: 326px;
  margin: 25px;

  form{
    margin-top:25px;
  }

  input{
    width: 100%;
		height: 58px;
		border-radius: 5px;
		font-size: 20px;
		line-height: 23px;
		font-weight: 700;
		color: #000;
		padding: 18px 15px;
		margin-bottom: 13px;
  }

  button {
		width: 100%;
		height: 46px;
		background: #a328d6;
		border-radius: 5px;
		font-weight: 700;
		font-size: 20px;
		line-height: 23px;
		color: #FFFFFF;
  }
`

const Title = styled.h1`

  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;

  color: #FFFFFF;
`