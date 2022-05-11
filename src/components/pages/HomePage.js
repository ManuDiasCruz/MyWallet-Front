import {useState, useContext, useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

import styled from "styled-components"

import UserContext from "../../contexts/UserContext"
import Transaction from "../Transaction"

import logout from "../../assets/icons/log-out-outline.svg"
import deposit from "../../assets/icons/add-circle-outline.svg"
import withdraw from "../../assets/icons/remove-circle-outline.svg"

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
          <Header>
            <Title>Olá, {user.name}</Title>
            <Img src={logout} alt="Logout logo"/>
          </Header>
          <TransactionsList>
            <Transactions>{listTransactions()}</Transactions>
            <Balance>
              <p>Balance: </p>
              <a value ={computeBalance()}>{computeBalance()}</a>
            </Balance>
          </TransactionsList>
          <Footer>
            <Link to="/deposit">
              <Operation>
                <Img src={deposit} alt="Deposit logo"/>
                <button>Nova Entrada</button>
              </Operation>
            </Link>
            <Link to="/withdraw">
              <Operation>
                <Img src={withdraw} alt="Withdraw logo"/>
                <button>Nova Saída</button>
              </Operation>
            </Link>
          </Footer>
        </>
      )
}

const Img = styled.img`
  width: 22px;
  height: 22px;
`

const Header = styled.div`
  width: 326px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px;
`

const Title = styled.h1`
  width: 141px;
  height: 31px;

  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;

  color: #000000;
`

const TransactionsList = styled.div`
  width: 326px;
  height: 446px;
  margin: 25px;

  background: #FFFFFF;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Transactions = styled.div`
  width: 300px;
  height: 46px;

  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #868686;
`

const Balance = styled.div`
  width: 180px;
  height: 46px;

  font-family: 'Raleway';
  font-style: normal;
  
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;

  p{
    font-weight: 700;
    color: #000000;
  }

  a{
    font-weight: 400;
    color: ${(props) => props.value>0 ? 'green' : 'red'}
  }
`

const Footer = styled.div`
  margin: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Operation = styled.div`
  width: 155px;
  height: 114px;
  padding: 10px;

  background: #A328D6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  button{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    background: #A328D6;
    margin-top: 50px;
  }
`
