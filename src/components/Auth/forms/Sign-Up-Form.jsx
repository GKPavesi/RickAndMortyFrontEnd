import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"

const Sign_Up_form = ({ handleSignUp, signUpFirstName, setSignUpFirstName, signUpLastName, setSignUpLastName, signUpEmail, setSignUpEmail, signUpPassword, setSignUpPassword, signUpConfirmPassword, setSignUpConfirmPassword, handleForms }) => {

    const [showInvalidFirstName, setShowInvalidFirstName] = useState(false)
    const [showInvalidLastName, setShowInvalidLastName] = useState(false)
    const [showInvalidEmail, setShowInvalidEmail] = useState(false)
    const [showInvalidPassword, setShowInvalidPassword] = useState(false)
    const [showInvalidConfirmPassword, setShowInvalidConfirmPassword] = useState(false)
    const [passwordType, setPasswordType] = useState('password')
    const [confirmPasswordType, setConfirmPasswordType] = useState('password')
    const [togglePasswordIcon, setTogglePasswordIcon] = useState('open')
    const [toggleConfirmPasswordIcon, setToggleConfirmPasswordIcon] = useState('open')
    const [passwordValidations, setPasswordValidations] = useState({
        minLength: false,
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    });

    function handleNameValidation(value, caller) {
        const nameRegex = /^[a-zA-Z\s'-]+$/;
        if (caller === 'firstName') {
            (value.length < 3 || !nameRegex.test(value)) ? setShowInvalidFirstName(true) : setShowInvalidFirstName(false)
            setSignUpFirstName(value)
        } else {
            (value.length < 3 || !nameRegex.test(value)) ? setShowInvalidLastName(true) : setShowInvalidLastName(false)
            setSignUpLastName(value)
        }
    }

    function handleEmailValidation(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        emailRegex.test(value) ? setShowInvalidEmail(false) : setShowInvalidEmail(true)
        setSignUpEmail(value)
    }

    function handlePasswordValidation(value) {
        setSignUpPassword(value)
        const minLengthRegex = /.{8,}/;
        const lowerCaseRegex = /[a-z]/;
        const upperCaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

        setPasswordValidations({
            minLength: minLengthRegex.test(value),
            hasLowerCase: lowerCaseRegex.test(value),
            hasUpperCase: upperCaseRegex.test(value),
            hasNumber: numberRegex.test(value),
            hasSpecialChar: specialCharRegex.test(value),
        });

        handleConfirmPasswordValidation(value, 'password')
    }

    function handleConfirmPasswordValidation(value, caller) {
        if (caller === 'confirmPassword') {
            setSignUpConfirmPassword(value);
            ((value === signUpPassword) && (signUpPassword !== '')) ? setShowInvalidConfirmPassword(false) : setShowInvalidConfirmPassword(true);
        } else {
            value === signUpConfirmPassword ? setShowInvalidConfirmPassword(false) : setShowInvalidConfirmPassword(true);
        }

    }

    function handleShowPassword(caller) {
        if (caller === 'password') {
            setPasswordType(passwordType === 'password' ? 'text' : 'password');
            setTogglePasswordIcon(passwordType === 'password' ? 'closed' : 'open');
        } else {
            setConfirmPasswordType(confirmPasswordType === 'password' ? 'text' : 'password');
            setToggleConfirmPasswordIcon(confirmPasswordType === 'password' ? 'closed' : 'open');
        }
    }

    function handleFormSubmit() {

        const nameRegex = /^[a-zA-Z\s'-]+$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        const validateFirstName = (signUpFirstName.length < 3 || !nameRegex.test(signUpFirstName));
        const validateLastName = (signUpLastName.length < 3 || !nameRegex.test(signUpLastName));
        const validateEmail = !emailRegex.test(signUpEmail);
        const validatePassword = !passwordRegex.test(signUpPassword);
        const validateConfirmPassword = !(signUpPassword === signUpConfirmPassword);

        if (validateFirstName || validateLastName || validateEmail || validatePassword || validateConfirmPassword) {
            alert('Please fill out all fields correctly.')
            return
        }

        handleSignUp()
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
                    <h2 className="form-title">Sign Up</h2>
                    <div className="form-input-wrapper">
                        <label htmlFor="signup-first-name" className="form-input-label">First Name:</label>
                        <input
                            id="signup-first-name"
                            className="form-input"
                            type="text"
                            value={signUpFirstName}
                            onChange={(e) => handleNameValidation(e.target.value, 'firstName')}
                            autoComplete="off"
                            required
                            onFocus={(e) => handleNameValidation(signUpFirstName, 'firstName')}
                            maxLength="125"
                        />
                        {showInvalidFirstName &&
                            <span className="invalid-input">First Name must be at least 3 letters and should not contain special characters.</span>
                        }
                    </div>
                    <div className="form-input-wrapper">
                        <label htmlFor="signup-last-name" className="form-input-label">Last Name:</label>
                        <input
                            id="signup-last-name"
                            className="form-input"
                            type="text"
                            value={signUpLastName}
                            onChange={(e) => handleNameValidation(e.target.value, 'lastName')}
                            autoComplete="off"
                            required
                            onFocus={(e) => handleNameValidation(signUpLastName, 'lastName')}
                            maxLength="125"
                        />
                        {showInvalidLastName &&
                            <span className="invalid-input">Last Name must be at least 3 letters and should not contain special characters.</span>
                        }
                    </div>
                    <div className="form-input-wrapper">
                        <label htmlFor="signup-email" className="form-input-label">Email:</label>
                        <input
                            id="signup-email"
                            className="form-input"
                            type="email"
                            value={signUpEmail}
                            onChange={(e) => handleEmailValidation(e.target.value)}
                            autoComplete="off"
                            required
                            onFocus={(e) => handleEmailValidation(signUpEmail)}
                            maxLength="200"
                        />
                        {showInvalidEmail &&
                            <span className="invalid-input">Please enter a valid email address.</span>
                        }
                    </div>
                    <div className="form-input-wrapper">
                        <label htmlFor="signup-password" className="form-input-label">Password:</label>
                        <div className="password-input-wrapper">
                            <input
                                id="signup-password"
                                className="form-input"
                                type={passwordType}
                                value={signUpPassword}
                                onChange={(e) => handlePasswordValidation(e.target.value)}
                                autoComplete="off"
                                required
                                onFocus={(e) => setShowInvalidPassword(true)}
                                maxLength="200"
                            />
                            {togglePasswordIcon === 'open' ?
                                <FontAwesomeIcon icon={faEye} className="eye-icon" onClick={(e) => handleShowPassword('password')} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" onClick={(e) => handleShowPassword('password')} />
                            }
                        </div>
                        {showInvalidPassword &&
                            <>
                                <span className="invalid-input" style={{ color: passwordValidations.minLength ? '#00FF00' : '#e0e874' }}>Must have at least 8 characters.</span>
                                <span className="invalid-input" style={{ color: passwordValidations.hasLowerCase ? '#00FF00' : '#e0e874' }}>Must have at least one lowercase letter.</span>
                                <span className="invalid-input" style={{ color: passwordValidations.hasUpperCase ? '#00FF00' : '#e0e874' }}>Must have at least one uppercase letter.</span>
                                <span className="invalid-input" style={{ color: passwordValidations.hasNumber ? '#00FF00' : '#e0e874' }}>Must have at least one number.</span>
                                <span className="invalid-input" style={{ color: passwordValidations.hasSpecialChar ? '#00FF00' : '#e0e874' }}>Must have at least one special character.</span>
                            </>
                        }
                    </div>
                    <div className="form-input-wrapper">
                        <label htmlFor="signup-password-confirm" className="form-input-label">Confirm Password:</label>
                        <div className="password-input-wrapper">
                            <input
                                id="signup-password-confirm"
                                className="form-input"
                                type={confirmPasswordType}
                                value={signUpConfirmPassword}
                                onChange={(e) => handleConfirmPasswordValidation(e.target.value, 'confirmPassword')}
                                autoComplete="off"
                                required
                                onFocus={(e) => handleConfirmPasswordValidation(signUpConfirmPassword, 'confirmPassword')}
                                maxLength="200"
                            />
                            {toggleConfirmPasswordIcon === 'open' ?
                                <FontAwesomeIcon icon={faEye} className="eye-icon" onClick={(e) => handleShowPassword('confirmPassword')} />
                                :
                                <FontAwesomeIcon icon={faEyeSlash} className="eye-icon" onClick={(e) => handleShowPassword('confirmPassword')} />
                            }
                        </div>
                        {showInvalidConfirmPassword &&
                            <span className="invalid-input">Passwords must match!</span>
                        }
                    </div>
                    <button type="submit" className="form-submit-button">Sign Up</button>
                </form>
                <h3 className="sign-up-text">Already have an account? Login <span onClick={() => handleForms('login')}>here</span></h3>
            </div>
        </div>
    )
}

export default Sign_Up_form;