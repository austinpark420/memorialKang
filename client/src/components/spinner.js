import React, { Fragment } from 'react';
import spinner from '../images/spinner.gif';

export default () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        margin: 'auto',
        display: 'block',
        padding: '25vh 0'
      }}
      alt='Loading...'
    />
  </Fragment>
);
