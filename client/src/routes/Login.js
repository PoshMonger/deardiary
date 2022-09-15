import React, { useState,useContext } from "react"
import { usersRequest } from '../api/EntryFinder'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../context/UserContext";


const Login = () => {
    const {theme} = useContext(ThemeContext);
    const {user,setUser} = useContext(UserContext);
    const registerInitial = { email: '', name: '', password: '', confirmPassword: '' };
    const loginIntial = { email: '', password: '' };
    const [loginCreds, setLoginCreds] = useState(loginIntial);
    const [registerCreds, setRegisterCreds] = useState(registerInitial);
    const [login, setLogin] = useState(true);
    const navigate = useNavigate();

    const switchMode = () => {

        if (login === true) {

            setLogin(false)
            setRegisterCreds(registerInitial)
        }
        else {

            setLogin(true)
            setLoginCreds(loginIntial)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (login == true) {
            try {
                const response = await usersRequest.post('/login', {

                    email: loginCreds.email,
                    password: loginCreds.password

                });
                console.dir(response);
                console.log(setUser);
                setUser(response.data.loggedInUser)
               

                var now = new Date();
                var time = now.getTime();
                var expireTime = time + 1000 * 3600;
                now.setTime(expireTime);
                document.cookie = `${response.data.tokens.accessToken};expires=` + now.toUTCString();
                

                console.log(document.cookie)
                navigate('/')

            } catch (response) {
                console.log(response)
                console.log(response.response.data)
                alert(response.response.data.error)

            }

        }
        if (login == false) {

            try {
                if (registerCreds.password == registerCreds.confirmPassword) {
                    const response = await usersRequest.post('/create', {

                        name: registerCreds.name,
                        email: registerCreds.email,
                        password: registerCreds.password



                    })


                    if (response.data.error) {
                        alert(response.data.error)
                        console.log(response.data.error)
                    }
                    else {
                        console.log(response)


                        alert(response.data.message)
                        navigate('/login')

                    }



                }
                else {

                    alert('Passwords do not match')
                }




            } catch (error) {
                console.log(error)


            }

        }




    }


    return (<div className={theme.bg ==='dark' ? 'bg-dark text-light login-container':'bg-light text-dark login-container'}>

        {
            //LOGIN if login is true (default)
            login ?
                                    
                <form className={theme.bg ==='dark' ? 'bg-dark text-light login-form':'bg-light text-dark login-form'}>
                            <h2>Login</h2>
                    <input name='email' placeholder='email' value={loginCreds.email} onChange={(e) => { setLoginCreds({ ...loginCreds, email: e.target.value }) }}></input>

                    <input name='password' placeholder='password' value={loginCreds.password} onChange={(e) => { setLoginCreds({ ...loginCreds, password: e.target.value }) }}></input>
                    <button className='bg-dark text-light'   onClick={handleSubmit}>Submit</button>

                </form>

                :
                // REGISTER if login is false 
                <form className={theme.bg ==='dark' ? 'bg-dark text-light register-form':'bg-light text-dark register-form'}>
                    <h2>Register</h2>
                    <input name='name' placeholder='name' value={registerCreds.name} onChange={(e) => { setRegisterCreds({ ...registerCreds, name: e.target.value }) }}></input>
                    <input name='email' placeholder='email' value={registerCreds.email} onChange={(e) => { setRegisterCreds({ ...registerCreds, email: e.target.value }) }}></input>

                    <input name='password' placeholder='password' value={registerCreds.password} onChange={(e) => { setRegisterCreds({ ...registerCreds, password: e.target.value }) }}></input>

                    <input name='confirmpassword' placeholder='confirm password' value={registerCreds.confirmPassword} onChange={(e) => { setRegisterCreds({ ...registerCreds, confirmPassword: e.target.value }) }}></input>

                    <button className='bg-dark text-light'   onClick={handleSubmit}>Submit</button>

                </form>
        }
        {/*Toggle Between Login and Register */}
        <button className='bg-dark text-light' onClick={switchMode}>{login ? `Don't have an Account? Create one now for free!` : `Already have an account? Click to visit login`}</button>

    </div>
    )
}

export default Login