import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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

  $(`.${styles.subMenu} li`).on('click', () => {
    $('input[type=checkbox').prop('checked', false);
  });

  $(`.${styles.mobileHomeLink}`).on('click', () => {
    $('input[type=checkbox').prop('checked', false);
  });

  const handleClickLogout = () => {
    logout();
  };

  return (
    <div className={styles.wraper}>
      <div className={styles.logo}>
        <Link to='/' children='추모사업회 로고'>
          <img src={require('../images/logo.png')} alt='logo' />
        </Link>
      </div>
      <nav className={styles.nav}>
        <input type='checkbox' />
        <span></span>
        <span></span>
        <span></span>
        <ul className={styles.menu}>
          <li className={styles.menuList}>
            <p className={styles.mobileHomeLink}>
              <Link to='/'>메인</Link>
            </p>
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
                <Link to='/organization' children='조직도' />
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
            </ul>
          </li>
          <li className={styles.menuList}>
            <p className={styles.subTitle}>추모제</p>
            <ul className={styles.subMenu}>
              <li>
                <Link to='/introduce' children='추모제 소개' />
              </li>
              <li>
                <Link to='/memorialHistory' children='추모제 연혁' />
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
              <li>
                <Link to='/scholarships' children='장학생' />
              </li>
            </ul>
          </li>
          {isAuthenticated && (
            <li className={styles.menuList} onClick={handleClickLogout}>
              <p className={styles.subTitle}>Logout</p>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Header);
