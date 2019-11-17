import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from 'css/alert.module.scss';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => <p className={styles.snackbar}>{alert.message}</p>);

// Alert.propTypes = {
//   alerts: PropTypes.func.isRequired
// };

let mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
