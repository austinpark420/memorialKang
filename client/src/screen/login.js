import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/auth';

import { connect } from 'react-redux';
import 'css/common.scss';
import 'css/login.scss';

const Login = ({ login, auth: { isAuthenticated, errors } }) => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(formData);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/'></Redirect>;
  }

  return (
    <div className='login-wrap'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='name'>ID</label>
        <input id='name' name='name' type='text' onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
        />
        {errors && <span>{errors[0].message}</span>}
        <input type='submit' value='로그인' />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
