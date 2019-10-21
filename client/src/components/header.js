import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import { logout } from 'actions/auth';

import 'css/common.scss';
import 'css/header.scss';

const Header = ({ isAuthenticated, logout }) => {
  // header
  useEffect(() => {
    $(window).on('scroll', () => {
      if ($(window).scrollTop()) {
        $('.header-wrap').addClass('active');
      } else {
        $('.header-wrap').removeClass('active');
      }
    });
  });

  const handleClick = () => {
    logout();
  };

  return (
    <div className='header-wrap'>
      <div className='logo'>
        <Link to='/' children='추모사업회 로고'>
          <img src={require('images/fullLogo.png')} alt='' />
        </Link>
      </div>
      <nav className='nav'>
        <input type='checkbox' />
        <span></span>
        <span></span>
        <span></span>
        <ul className='menu'>
          <li className='menu-list'>
            <p className='sub-title'>강경대열사</p>
            <ul className='sub-menu'>
              <li>
                <Link to='/history' children='열사 연혁' />
              </li>
              <li>
                <Link to='/struggle' children='91년도 투쟁' />
              </li>
              <li>
                <Link to='/elevenHero' children='11인의 열사' />
              </li>
            </ul>
          </li>
          <li className='menu-list'>
            <p className='sub-title'>추모사업회</p>
            <ul className='sub-menu'>
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
                <Link to='/emergencyMeasure' children='동판사수 대책위원회' />
              </li>
              <li>강경대 기념관</li>
            </ul>
          </li>
          <li className='menu-list'>
            <p className='sub-title'>추모제</p>
            <ul className='sub-menu'>
              <li>
                <Link to='/introduce' children='추모제 소개' />
              </li>
              <li>
                <Link to='/memorialHistory' children='추모제 연혁' />
              </li>
            </ul>
          </li>
          <li className='menu-list'>
            <p className='sub-title'>자료 복원실</p>
            <ul className='sub-menu'>
              <li>
                <Link to='/images' children='사진자료' />
              </li>
              <li>
                <Link to='/videos' children='영상자료' />
              </li>
              <li>
                <Link to='/document' children='문서자료' />
              </li>
            </ul>
          </li>
          {isAuthenticated && (
            <li className='menu-list' onClick={handleClick}>
              <p className='sub-title'>Logout</p>
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

export default connect(
  mapStateToProps,
  { logout }
)(Header);
