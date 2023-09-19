import { useState } from "react";
import { firebaseAuthModule } from "../../utils/firebaseUtils";
import * as firebaseAuth from 'firebase/auth'
import Login_Form from './forms/Login-Form.jsx'
import Sign_Up_form from './forms/Sign-Up-Form.jsx'
import Loading_animation from '../Root/Loading-Animation'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import axios from "axios";


const Auth = () => {

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signUpFirstName, setSignUpFirstName] = useState('')
  const [signUpLastName, setSignUpLastName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('')
  const [showForm, setShowForm] = useState('login')
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false)
  const navigate = useNavigate();
  const { enableObserver, disableObserver } = useAuth();

  async function handleLogin() {

    setShowLoadingAnimation(true)
    disableObserver()

    try {

      const userCredential = await firebaseAuth.signInWithEmailAndPassword(firebaseAuthModule, loginEmail, loginPassword)

      if (!userCredential.user.emailVerified) {
        const emailVerifiedError = new Error('Email must be verified')
        emailVerifiedError.code = 'login/email-not-verified'
        throw emailVerifiedError;
      }

      const authConfig = {
        headers: {
          "Authorization": `Bearer ${userCredential.user.accessToken}`
        }
      }

      const requestData = {
        'firebase_uid': userCredential.user.uid
      }

      const userInfo = await axios.post('https://rickandmortybackend-s7op.onrender.com/auth/info', requestData, authConfig)

      const user = {
        "email": userCredential.user.email,
        "first_name": userInfo.data.user.first_name,
        "last_name": userInfo.data.user.last_name,
        "firebase_uid": userCredential.user.uid,
        // "access_token": userCredential.user.accessToken,
        // "refresh_token": userCredential._tokenResponse.refreshToken
      };

      localStorage.setItem('user', JSON.stringify(user));

      navigate('/dashboard');
    }
    catch (error) {
      await firebaseAuth.signOut(firebaseAuthModule)
      if (error.code === 'auth/invalid-email') {
        alert('The email address is invalid, please enter a valid email');
      } else if (error.code === 'auth/user-disabled') {
        alert('This user is disabled, please contact the admin or log in with another user.');
      } else if (error.code === 'auth/user-not-found') {
        alert('There is no user attached to this email, please create an account or log in with another user');
      } else if (error.code === 'auth/wrong-password') {
        alert('Wrong password, please try again.');
      } else if (error.code === 'login/email-not-verified') {
        alert('You should verify your email before logging in!');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
    finally {
      setShowLoadingAnimation(false)
      enableObserver()
    }
  }

  async function handleSignUp() {

    setShowLoadingAnimation(true)
    disableObserver()

    try {

      const userCredential = await firebaseAuth.createUserWithEmailAndPassword(firebaseAuthModule, signUpEmail, signUpPassword)

      await firebaseAuth.signOut(firebaseAuthModule)

      const registerData = {
        'firebase_uid': userCredential.user.uid,
        'first_name': signUpFirstName,
        'last_name': signUpLastName,
        'email': signUpEmail
      }

      await axios.post('https://rickandmortybackend-s7op.onrender.com/auth/register', registerData)

      await firebaseAuth.updateProfile(userCredential.user, {
        "displayName": signUpFirstName.trim() + " " + signUpLastName.trim()
      })

      await firebaseAuth.sendEmailVerification(userCredential.user)

      alert('User successfully created, please verify your email before logging in')

      handleForms('login')
    }
    catch (error) {
      await firebaseAuth.signOut(firebaseAuthModule)
      if (error.code === 'auth/email-already-in-use') {
        alert('The email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Invalid email address.');
      } else if (error.code === 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
    }
    finally {
      setShowLoadingAnimation(false)
      enableObserver();
    }
  }

  function handleForms(target) {
    setLoginEmail('')
    setLoginPassword('')
    setSignUpFirstName('')
    setSignUpLastName('')
    setSignUpEmail('')
    setSignUpPassword('')
    setSignUpConfirmPassword('')
    setShowForm(target)
  }

  return (
    <>
      {showForm === 'login' ?
        <Login_Form
          handleLogin={handleLogin}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleForms={handleForms}
        />
        :
        <Sign_Up_form
          handleSignUp={handleSignUp}
          signUpFirstName={signUpFirstName}
          setSignUpFirstName={setSignUpFirstName}
          signUpLastName={signUpLastName}
          setSignUpLastName={setSignUpLastName}
          signUpEmail={signUpEmail}
          setSignUpEmail={setSignUpEmail}
          signUpPassword={signUpPassword}
          setSignUpPassword={setSignUpPassword}
          signUpConfirmPassword={signUpConfirmPassword}
          setSignUpConfirmPassword={setSignUpConfirmPassword}
          handleForms={handleForms}
        />
      }

      {showLoadingAnimation && (
        <Loading_animation />
      )}
    </>
  );
};

export default Auth;
