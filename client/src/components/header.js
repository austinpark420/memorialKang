import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import $ from 'jquery';

import { logout } from '../actions/auth';

import '../css/common.scss';
import styles from '../css/header.module.scss';

const Header = ({ isAuthenticated, logout }) => {
  useEffect(() => {
    $(window).on('scroll', () => {
      if ($(window).scrollTop()) {
        $(`.${styles.wraper}`).addClass(`${styles.active}`);
      } else {
        $(`.${styles.wraper}`).removeClass(`${styles.active}`);
      }
    });
  });

  $(`.${styles.subMenu}`)
    .children()
    .on('click', () => {
      $(`.${styles.mobileHamburger}`).prop('checked', false);
    });

  $(`.${styles.mobileHomeLink}`).on('click', () => {
    $(`.${styles.mobileHamburger}`).prop('checked', false);
  });

  const handleClickLogout = () => {
    logout();
  };

  return (
    <div className={styles.wraper}>
      <div className={styles.logo}>
        <Link to='/' children='추모사업회 로고'>
          <img src={require('../images/headerLogo.png')} alt='로고' />
        </Link>
      </div>
      <nav className={styles.nav}>
        <input type='checkbox' className={styles.mobileHamburger} />
        <span></span>
        <span></span>
        <span></span>
        <ul className={styles.menu}>
          <li className={styles.menuList}>
            <p className={styles.subTitle}>
              <a href='https://docs.google.com/forms/d/e/1FAIpQLSd4pGaslQL7KMlscX0ZKEHAZ7Fms16httf6urjuYJ6Lw5XZsw/viewform'>
                회원 신청하기
              </a>
            </p>
          </li>
          <li className={styles.menuList}>
            <p className={styles.subTitle}>강경대열사</p>
            <ul className={styles.subMenu}>
              <li>
                <Link to='/history' children='열사 연혁' />
              </li>
              <li>
                <Link to='/struggle' children='91년도 투쟁' />
              </li>
              <li>
                <Link to='/heros' children='11인의 열사' />
              </li>
            </ul>
          </li>
          <li className={styles.menuList}>
            <p className={styles.subTitle}>추모사업회</p>
            <ul className={styles.subMenu}>
              <li>
                <Link to='/parents' children='유가족인사말' />
              </li>
              <li>
                <Link to='/organization' children='회장 인사말' />
              </li>
              <li>
                <Link to='/notices' children='공지사항' />
              </li>
              <li>
                <Link to='/emergencies' children='동판사수 대책위원회' />
              </li>
              <li>
                <Link to='/memorialHall' children='강경대 기념관' />
              </li>
              <li>
                <Link to='/scholarships' children='강경대 장학생' />
              </li>
            </ul>
          </li>
          <li className={styles.menuList}>
            <p className={styles.subTitle}>추모제</p>
            <ul className={styles.subMenu}>
              <li>
                <Link to='/introduce' children='추모제 소개' />
              </li>
              <li>
                <Link to='/memorialHistories' children='추모제 연혁' />
              </li>
            </ul>
          </li>
          <li className={styles.menuList}>
            <p className={styles.subTitle}>자료 복원실</p>
            <ul className={styles.subMenu}>
              <li>
                <Link to='/images' children='사진자료' />
              </li>
              <li>
                <Link to='/videos' children='영상자료' />
              </li>
              <li>
                <Link to='/awards' children='문학상' />
              </li>
            </ul>
          </li>
          {isAuthenticated && (
            <li className={styles.menuList} onClick={handleClickLogout}>
              <p className={styles.subTitle}>Logout</p>
            </li>
          )}
        </ul>
        <Link to='/'>
          <img
            className={styles.mobileLogo}
            src={require('../images/headerLogo.png')}
            alt='로고'
          />
        </Link>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout })(Header);
