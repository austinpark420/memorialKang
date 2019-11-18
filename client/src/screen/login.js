import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../actions/auth';

import styles from '../css/login.module.scss';

const Login = ({ login, auth: { isAuthenticated, errors }, setAlert }) => {
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
    <div className={styles.container}>
      <div className={styles.wraper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor='name'>ID</label>
          <input id='name' name='name' type='text' onChange={handleChange} />
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            name='password'
            type='password'
            onChange={handleChange}
          />
          <input type='submit' value='로그인' />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { login }
)(Login);
