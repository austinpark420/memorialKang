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
            추모사업회: 서울 서대문구 거북골로 34 명지대학교 학생회관 5층 2503호
            추모사업회실
          </li>
          <li>
            기념관: 서울시 종로구 율곡로 20길 23-3 / 91. 충신회관. 7층 강경대
            기념관
          </li>
          <li>대표전화: 02 745 9191 / 02 300 9191</li>
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
