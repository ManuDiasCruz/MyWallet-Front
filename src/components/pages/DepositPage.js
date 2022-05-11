import {useState, useContext} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import UserContext from "../../contexts/UserContext"

export default function DepositPage() {
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  
  const {user} = useContext(UserContext)

  const navigator = useNavigate()

  async function saveDeposit(e) {
        e.preventDefault()
                
        try {
            await axios.post(
                "http://localhost:5000/transactions", 
                {
                    description, 
                    value: parseFloat(value),
                    type: "deposit"
                }, 
                { 
                    "Authorization": `Bearer ${user.token}`
                }
            )
            console.log("Success at deposit register.")
            navigator("/home")
        } catch (error) {
            console.log("An error occurred at deposit register.", error)
        }
  }

  return (
    <div>
      <h1>Nova entrada</h1>
      <form>
        <input 
          type="number"
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          placeholder="Valor"
        />

        <input 
          type="text"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />

        <button type="submit" onClick={saveDeposit}>Salvar entrada</button>
      </form>
    </div>
  )
}