import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"

const Login_Form = ({ handleLogin, loginEmail, setLoginEmail, loginPassword, setLoginPassword, handleForms }) => {

    const [showInvalidEmail, setShowInvalidEmail] = useState(false)
    const [showInvalidPassword, setShowInvalidPassword] = useState(false)
    const [togglePasswordIcon, setTogglePasswordIcon] = useState('open')
    const [passwordType, setPasswordType] = useState('password')

    function handleEmailValidation(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailRegex.test(value) ? setShowInvalidEmail(false) : setShowInvalidEmail(true)
        setLoginEmail(value)
    }

    function handlePasswordValidation(value) {
        setLoginPassword(value);

        const minLengthRegex = /.{8,}/;
        setShowInvalidPassword(!minLengthRegex.test(value))
    }

    function handleToggleIcon() {
        setPasswordType(passwordType === 'password' ? 'text' : 'password');
        setTogglePasswordIcon(passwordType === 'password' ? 'closed' : 'open');
    }

    function handleFormSubmit() {

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /.{8,}/;

        const validateEmail = !emailRegex.test(loginEmail);
        const validatePassword = !passwordRegex.test(loginPassword);

        if (validateEmail || validatePassword) {
            alert('Please fill out all fields correctly.')
            return
        }

        handleLogin()
    }

    return (
        <div className="form-countainer">
            <div className="form-wrapper">
                <form
                    className="auth-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleFormSubmit()
                    }}
                >
                    <h2 className="form-title">Login</h2>
                    <div className="form-input-wrapper">
                        <label htmlFor="login-email" className="form-input-label">Email:</label>
                        <input
                            id="login-email"
                            className="form-input"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => handleEmailValidation(e.target.value)}
                            autoComplete="off"
                            required
                            onFocus={(e) => handleEmailValidation(loginEmail)}
                            maxLength="200"
                        />
                        {showInvalidEmail &&
                            <span className="invalid-input">Please enter a valid email address.</span>
                        }
                    </div>
                    <div className="form-input-wrapper">
                        <label htmlFor="login-password" className="form-input-label">Password:</label>
                        <div className="password-input-wrapper">
                            <input
                                id="login-password"
                                className="form-input"
                                type={passwordType}
                                value={loginPassword}
                                onChange={(e) => handlePasswordValidation(e.target.value)}
                                autoComplete="off"
                                required
                                onFocus={(e) => handlePasswordValidation(loginPassword)}
                                maxLength="200"
                            />
                            {togglePasswordIcon === 'open' ?
                                <FontAwesomeIcon icon={faEye} className="eye-icon" onClick={(e) => handleToggleIcon()} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" onClick={(e) => handleToggleIcon()} />
                            }
                        </div>
                        {showInvalidPassword &&
                            <span className="invalid-input">Passwords must have at least 8 characters!</span>
                        }
                    </div>
                    <button type="submit" className="form-submit-button">Login</button>
                </form>
                <h3 className="sign-up-text">Don't have an account? Sign up <span onClick={() => handleForms('signup')}>here</span></h3>
            </div>
        </div>
    )
}

export default Login_Form;