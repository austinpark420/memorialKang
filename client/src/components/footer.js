import React from "react";
import styles from "../css/footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={require("../images/fullLogo.png")} alt="로고" />
        </div>
        <ul className={styles.memorialAddress}>
          <li>
            추모사업회: 서울특별시 서대문구 거북골로 34, 명지대학교 학생회관 5층
            2503호 / 전화 02-300-0906
          </li>
          <li>
            강경대 기념관: 서울특별시 종로구 율곡로20길 23-3, 91 충신회관 7층 /
            전화 02-745-9191
          </li>
          <li>이메일: 91chusa@gmail.com</li>
          <li>COPYRIGHT c MEMORIAL.OR.KR ALL RIGHTS RESERVED.</li>
          <li>
            Icons made by
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>
            from
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
