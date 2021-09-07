/* Login.js hoitaa käyttöliittymän kirjautumisen*/
import { useState } from 'react'
import userServices from '../services/users.js'
import styles from '../styles/Login.module.css'
/* login:in avulla voidaan kirjautua */
const Login = ({ login }) => {
    // Kirjautumislomakkeen tiedot
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    // jos createNewAccountForm on true, näytetään käyttäjän luomislomakes
    const [createNewAccountForm, setCreateNewAccountForm] = useState(false)
    // Käyttäjän informoiminen
    const [notification, setNotification] = useState('')
    const [notificationStyle, setNotificationStyle] = useState('')
    const [inputStyle, setInputStyle] = useState(styles.input)

    const errorStyle2 = {
        borderColor: '',
    }

    const handleLogin = async event => {
        event.preventDefault()
        try {
            await login({
                username,
                password,
            })
        } catch (e) {
            setNotification(e.response.data.error)
            setNotificationStyle(styles.error)
            setInputStyle(styles.inputError)
            setTimeout(() => {
                setNotification('')
                setNotificationStyle('')
                setInputStyle(styles.input)
            }, 2000)
        }
    }

    const handleShowCreateAccount = () => {
        setUsername('')
        setPassword('')
        setCreateNewAccountForm(true)
    }
    const handleCancel = () => {
        setUsername('')
        setPassword('')
        setCreateNewAccountForm(false)
    }

    /* Luodaan käyttäjä (jos nimi ei ole käytössä). Nollataan lomake */
    const handleCreateAccount = async event => {
        event.preventDefault()
        try {
            await userServices.create({
                username: username,
                password: password,
            })
            setUsername('')
            setPassword('')
            setCreateNewAccountForm(false)
        } catch (e) {
            setNotification(e.response.data.error)
            setNotificationStyle(styles.error)
            setInputStyle(styles.inputError)
            setTimeout(() => {
                setNotification('')
                setNotificationStyle('')
                setInputStyle(styles.input)
            }, 2000)
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
                    <label className={styles.label} htmlFor='username'></label>
                    <input
                        style={errorStyle2}
                        className={inputStyle}
                        id='username'
                        value={username}
                        placeholder='username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div className={styles.group}>
                    <label className={styles.label} htmlFor='password'></label>
                    <input
                        type='password'
                        className={inputStyle}
                        id='password'
                        placeholder='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
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
                    <button onClick={handleCancel}>cancel</button>
                ) : (
                    <button onClick={handleShowCreateAccount}>
                        create new account
                    </button>
                )}
            </div>
        </div>
    )
}

export default Login
