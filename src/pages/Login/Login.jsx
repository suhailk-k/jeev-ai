import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
//   console.log(isSignUp, fullName, email, password);
  const navigate = useNavigate();

  useEffect(() => {
    setMessage();
  }, [isSignUp]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log('jjjjj');
    setMessage();
    if (!email || email.length == 0 || email.trim().length == 0) {
      setMessage('Email must not be empty');
      return;
    }
    if (!password || password.length === 0 || password.trim().length === 0) {
      return setMessage('Password must not be empty');
    }
    const users = localStorage.getItem('users')
      ? JSON.parse(localStorage.getItem('users'))
      : [];
    if (isSignUp) {
      //   console.log('sdnsjdnjsndjsn');

      if (users.filter((user) => user.email === email).length > 0) {
        setMessage('email already exist please login');
        return;
      }
      localStorage.setItem(
        'users',
        JSON.stringify([...users, { password, email, fullName }])
      );
      setIsSignUp(false);
    } else {
      const user = users.filter((item) => item.email === email);
      if (user.length == 0) {
        setMessage('email does not exist');
        return;
      }
    //   console.log(user[0], password);
      if (user[0].password !== password) {
        setMessage('password does not match');
        return;
      }

      navigate('/home');
    }
  };

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };
  return (
    <section className='auth-section'>
      <div className='auth-container'>
        <div style={{ color: 'red' }}>{message}</div>
        <form onSubmit={handleSubmit}>
          {isSignUp ? (
            <label htmlFor='email'>
              <h4>Full Name</h4>
              <input
                type='text'
                name='name'
                id='name'
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
            </label>
          ) : (
            ''
          )}
          <label htmlFor='email'>
            <h4>Email</h4>
            <input
              type='email'
              name='name'
              id='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor='password'>
            <h4>Password</h4>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type='submit' className='auth-btn'>
            {isSignUp ? 'SignUp' : 'Login'}
          </button>
        </form>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
        <button
          type='button'
          className='handle-switch-btn'
          onClick={handleSwitch}
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    </section>
  );
};

export default Login;
