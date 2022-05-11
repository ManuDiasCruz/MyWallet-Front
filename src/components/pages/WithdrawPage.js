import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

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
        <div>
        <h1>Nova saída</h1>
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
        </div>
    )
}