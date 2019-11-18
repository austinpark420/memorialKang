import React from 'react';
import { connect } from 'react-redux';

import styles from '../css/alert.module.scss';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => <p className={styles.snackbar}>{alert.message}</p>);

let mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
