/* Login.js hoitaa käyttöliittymän kirjautumisen*/
import { useState } from 'react'
import userServices from '../services/users.js'
import styles from '../styles/Login.module.css'
/* login:in avulla voidaan kirjautua */
const Login = ({ login }) => {
    // Kirjautumislomakkeen tiedot
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // jos createNewAccountForm on true, näytetään käyttäjän luomislomakes
    const [createNewAccountForm, setCreateNewAccountForm] = useState(false)
    // Käyttäjän informoiminen
    const [notification, setNotification] = useState('')
    const [notificationStyle, setNotificationStyle] = useState('')
    const [inputStyle, setInputStyle] = useState(styles.input)

    // eri virheiden näyttämiseen
    const error = e => {
        setNotification(e)
        setNotificationStyle(styles.error)
        setInputStyle(styles.inputError)
        setTimeout(() => {
            setNotification('')
            setNotificationStyle('')
            setInputStyle(styles.input)
        }, 2000)
    }

    // käsitellään kirjaantumispyyntö
    const handleLogin = async event => {
        event.preventDefault()
        try {
            await login({
                username,
                password,
            })
        } catch (e) {
            error(e.response.data.error)
        }
    }

    // Näytetäänkö käyttäjän lisäämislomake (vai kirjaantumislomake)
    const handleShowCreateAccount = show => {
        setUsername('')
        setPassword('')
        setCreateNewAccountForm(show)
    }

    /* Luodaan käyttäjä (jos nimi ei ole käytössä). Nollataan lomake */
    const handleCreateAccount = async event => {
        event.preventDefault()
        if (password !== confirmPassword) {
            error('Please confirm password')
            return
        }
        try {
            await userServices.create({
                username: username,
                password: password,
            })
            setUsername('')
            setPassword('')
            setCreateNewAccountForm(false)
        } catch (e) {
            error(e.response.data.error)
        }
    }

    return (
        <div className={styles.login}>
            {createNewAccountForm ? (
                <h2>Create new account</h2>
            ) : (
                <h2>Login</h2>
            )}
            <form
                className={styles.form}
                onSubmit={() =>
                    createNewAccountForm
                        ? { handleCreateAccount }
                        : { handleLogin }
                }
            >
                <div>
                    <label htmlFor='username'></label>
                    <input
                        className={inputStyle}
                        id='username'
                        value={username}
                        placeholder='username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'></label>
                    <input
                        type='password'
                        className={inputStyle}
                        id='password'
                        placeholder='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                {createNewAccountForm ? (
                    <div>
                        <label htmlFor='confirmPassword'></label>
                        <input
                            type='password'
                            className={inputStyle}
                            id='confirmPassword'
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={({ target }) =>
                                setConfirmPassword(target.value)
                            }
                        />
                    </div>
                ) : null}
                <div className={styles.formButton}>
                    {createNewAccountForm ? (
                        <button onClick={handleCreateAccount}>create</button>
                    ) : (
                        <button onClick={handleLogin}>login</button>
                    )}
                </div>
            </form>
            <div className={notificationStyle}>{notification}</div>
            <div className={styles.cancelButton}>
                {createNewAccountForm ? (
                    <button onClick={() => handleShowCreateAccount(false)}>
                        cancel
                    </button>
                ) : (
                    <button onClick={() => handleShowCreateAccount(true)}>
                        create new account
                    </button>
                )}
            </div>
        </div>
    )
}

export default Login
