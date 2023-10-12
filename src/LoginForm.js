import Title from './Title'

import './LoginForm.css'
import { useEffect, useState } from 'react'

const LoginForm = ({handleInputChange, handleSingIn, handleRegister, email, password, registerEmail, registerPassword, secondRegisterPassword, titleContent, errorMessage}) => {

    const [registerForm, showRegisterForm] = useState(false)
    const {errorMessageLogin, errorMessageRegister} = errorMessage

    useEffect(()=> {
        document.querySelectorAll('.singin-form').forEach(item => {
            if(registerForm) item.classList.add('goToRegister')
            else item.classList.remove('goToRegister')
        })
    },[registerForm])

    return(
        <section className='loginform'>
            <Title content={titleContent.content} spancontent={titleContent.spancontent}/>
            <section className='forms-container'>
                <form className='singin-form' onSubmit={handleSingIn}>
                    <input 
                        name='email' 
                        type='text' 
                        placeholder='Adres email' 
                        value={email} 
                        onChange={handleInputChange}
                    />
                    <input 
                        name='password' 
                        type='password' 
                        placeholder='Hasło' 
                        value={password} 
                        onChange={handleInputChange}
                    />
                    <input value='zaloguj się' className={errorMessageLogin ? 'margintop-login' : null} type='submit'/>
                    {errorMessageLogin? <p className='errorMessage'>{errorMessageLogin}</p> : null}
                    <p onClick={()=> showRegisterForm(!registerForm)}>Nie masz konta?</p>
                </form>
                <form className='singin-form' onSubmit={handleRegister}>
                    <p onClick={()=> showRegisterForm(!registerForm)}>Wróć do logowania</p>
                    <input 
                        name='registerEmail' 
                        type='text' 
                        placeholder='Adres email' 
                        value={registerEmail} 
                        onChange={handleInputChange}
                    />
                    <input 
                        name='registerPassword' 
                        type='password' 
                        placeholder='Hasło' 
                        value={registerPassword} 
                        onChange={handleInputChange}
                    />
                    <input 
                        name='secondRegisterPassword' 
                        type='password' 
                        placeholder='Powtórz hasło' 
                        value={secondRegisterPassword} 
                        onChange={handleInputChange}
                    />
                    <input value='zarejestruj się' className={errorMessageRegister ? 'margintop-register' : null} type='submit'/>
                    {errorMessageRegister? <p className='errorMessageRegister'>{errorMessageRegister}</p> : null}
                </form>
            </section>
        </section>   
    )
}

export default LoginForm