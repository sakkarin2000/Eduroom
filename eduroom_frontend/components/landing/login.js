import React, { Fragment, useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import style from '../../styles/landing/login';
import Image from 'next/image';
import UserContext from '../../contexts/user/userContext';
const Content = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const userContext = useContext(UserContext);
  const { loginUser } = userContext;
  const handleEmail = (e) => {
    if (e.target.value.length === 0) setEmailError('Email is required');
    else setEmailError('');
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    if (e.target.value.length === 0) setPasswordError('Password is required');
    else setPasswordError('');
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    const body = { email, password };
    loginUser(body);
  };
  const googleLogin = async () => {
    window.location.pathname = '/api/auth/google';
  };

  return (
    <Fragment>
      <div className="login">
        <div className="login-content">
          <div className="login-header">
            WELCOME BACK <br />
          </div>
          <div className="login-description">
            new here?
            <Link href="/register">
              <span className="register-link">create an account</span>
            </Link>
          </div>
          <div className="login-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <label>
                <input
                  className="login-textfield"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => handleEmail(e)}
                />
                <div className="error">{emailError}</div>
              </label>
              <label>
                <input
                  className="login-textfield"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => handlePassword(e)}
                />
                <div className="error">{passwordError}</div>
              </label>

              <button className="login-button" onClick={handleLogin}>
                <span className="login-button-text">Log In</span>
              </button>
              <div className="or-text">
                <div className="striaght-line"></div>
                <span className="or-text-text">or</span>
                <div className="striaght-line"></div>
              </div>
              <button className="login-google-button" onClick={googleLogin}>
                <div className="login-google-button-text">
                  <img
                    src="/images/google-logo.png"
                    alt="google-icon"
                    className="google-logo"
                  />
                  <span>Sign In With Google</span>
                </div>
              </button>
            </form>
          </div>
        </div>
        <Image
          className="login-page-img"
          alt="login-page-img"
          src="/images/login-img.svg"
          width="544"
          height="450"
        />
      </div>
      <style jsx>{style}</style>
    </Fragment>
  );
};
export default Content;
