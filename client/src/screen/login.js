import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/auth';

import { connect } from 'react-redux';
import 'css/common.scss';

const Login = ({ login, isAuthenticated }) => {
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

  const handleSubmit = e => {
    e.preventDefault();
    login(formData);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/'></Redirect>;
  }

  return (
    <div>
      <h1>로그인</h1>
      <h1>테스트</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>ID</label>
        <input id='name' name='name' type='text' onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={handleChange}
        />
        <input type='submit' />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
