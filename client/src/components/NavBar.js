import React, { useContext } from 'react'
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import record from '../assets/images/record.png'
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';



const NavBar = () => {
const {user, setUser} = useContext(UserContext)
  const { theme, setTheme } = useContext(ThemeContext)
  const history = useNavigate()

  return (

    <Navbar fixed='top' expand='lg' bg={theme.bg} variant={theme.txt}>
    
        <Navbar.Brand onClick={() => { history('/') }}>

          <div className="logo" style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} > <img className="logo-img" src={record}></img>Joe's Record Collection</div>

        </Navbar.Brand>
        <Navbar.Toggle>

        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" >
            <Nav.Link style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} onClick={() => { history('/') }} >Home</Nav.Link>
            <Nav.Link style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} onClick={() => { history('/about') }}>About</Nav.Link>
            {user ? <Nav.Link style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} onClick={() => { history('/login') }}>{user.user_name}</Nav.Link>:
              
              <Nav.Link style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} onClick={() => { history('/login') }}>Login</Nav.Link>
            
            }
            

          </Nav>

          <Button style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} className='darkmode' onClick={() => { setTheme({ bg: 'dark', txt: 'dark' }) }} > Dark Mode</Button><Button onClick={() => { setTheme({ bg: 'light', txt: 'light' }) }} style={theme.bg === 'dark' ? { color: "white" } : { color: 'black' }} className='lightmode'>Light Mode</Button>

        </Navbar.Collapse>
    
    </Navbar>




  )
}

export default NavBar