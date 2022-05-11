import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
        font-family: 'Raleway', sans-serif;
        
    }
    button {
        cursor: pointer;
        background: #fff;
        border: none;
    }
    input{
        background: #fff;
        border: none;
    }
    a {
        text-decoration: none;
    }
    body {
        background: #8C11BE;
    }
    main{
        overflow: auto;
    }
    h1{
        cursor: default;
    }
    p{
        cursor: default;
    }
    `