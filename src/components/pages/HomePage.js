import {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import styled from "styled-components"

import UserContext from "../../contexts/UserContext"
import Transaction from "../Transaction"

export default function HomePage(){
    const {user} = useContext(UserContext)
    const [transactions, setTransactions] = useState([])

    useEffect(()=>{
        console.log("The user is: ", user)
        async function getUser(){
            try{
                const res = await axios.get(
                    "http://localhost:5000/transactions", 
                    {
                      headers: {
                        "Authorization" : `Bearer ${user.token}`
                    }
                })
                console.log("HomePage: ", res)
                setTransactions(res.data)
            } catch (error) {
                console.log("Error getting user.", error)
            }
        }

        getUser()
    }, [])

    function listTransactions() {
        if(transactions.length > 0) {
          return transactions.map((transaction, index) => {
            const {description, value, type, date} = transaction
            return (
              <Transaction 
                key={index}
                description={description}
                value={value}
                type={type}
                date={date}
              />
            )
          })
        } else {
          return <p>Não há registros de entrada ou saída</p>
        }
      }
    
      function computeBalance() {
        if(transactions.length > 0) {
          return transactions.reduce((previous, current) => {
            if(current.type === "deposit") {
              return previous + current.value
            }
    
            return previous - current.value
          }, 0)
        } else {
          return 0
        }
      }

    return (
        <>
          <div>
            <h1>Olá, {user.name}</h1>
            (logout)
          </div>
          <div>
            <div>{listTransactions()}</div>
            <div>Saldo: {computeBalance()}</div>
          </div>
          <div>
            <Link to="/deposit"><button>Nova Entrada</button></Link>
            <Link to="/withdraw"><button>Nova Saída</button></Link>
          </div>
        </>
      )
}

