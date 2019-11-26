import React from 'react';
import stylse from '../css/footer.module.scss';

const Footer = () => {
  return (
    <div className={stylse.container}>
      <div className={stylse.wraper}>
        <div className={stylse.logo}>
          <img src={require('../images/fullLogo.png')} alt='로고' />
        </div>
        <ul className={stylse.memorialAddress}>
          <li>
            추모사업회: 서울 서대문구 거북골로 34 명지대학교 학생회관 5층 2503호
            추모사업회실
          </li>
          <li>기념관: 서울 종로구 종로 63길 18 강경대 열사 기념관</li>
          <li>대표젼화: 02-300-0906</li>
          <li>이메일: memorial91@naver.com</li>
          <li>COPYRIGHT c MEMORIAL.OR.KR ALL RIGHTS RESERVED.</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
