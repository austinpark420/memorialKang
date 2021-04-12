import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import dateFormat from "dateformat";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { loadNotices, loadEmergencies } from "../actions/mainPosts";
import styles from "../css/main.module.scss";

const MainSlider = () => {
  const [settings] = useState({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  return (
    <div className={styles.slider}>
      <Slider {...settings}>
        <img src={require("../images/main01.jpg")} alt="main" />
      </Slider>
    </div>
  );
};

const Main = ({
  mainPosts: { notices, emergencies },
  loadNotices,
  loadEmergencies,
}) => {
  useEffect(() => {
    loadNotices();
  }, [loadNotices]);
  useEffect(() => {
    loadEmergencies();
  }, [loadEmergencies]);

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <MainSlider />
        <div className={styles.articleGroup}>
          <section>
            <h2>공지사항</h2>
            <Link to="/notices" children="더 보기" />
            <ul>
              {notices &&
                notices.map((notice) => (
                  <Link to={`notices/${notice._id}`}>
                    <li key={notice._id}>
                      <span>{notice.title}</span>
                      <span>{dateFormat(notice.date, "yyyy-mm-dd")}</span>
                    </li>
                  </Link>
                ))}
            </ul>
          </section>
          <section>
            <h2>동판사수 대책위원회</h2>
            <Link to="/emergencies" children="더 보기" />
            <ul>
              {emergencies &&
                emergencies.map((emergency) => (
                  <Link to={`emergencies/${emergency._id}`}>
                    <li key={emergency._id}>
                      <span>{emergency.title}</span>
                      <span>{dateFormat(emergency.date, "yyyy-mm-dd")}</span>
                    </li>
                  </Link>
                ))}
            </ul>
          </section>
        </div>

        <div className={styles.introduceWraper}>
          <div className={styles.introduce}>
            <p>
              1991년 4월 26일, <br /> 열사는 학원자주화와 군사정권 타도를 외치다
              백골단(사복체포조)이 휘두른 쇠파이프에 운명했습니다. <br />
              독재정권에 분노한 민중들은 폭력살인 규탄 및 책임자 처벌, 백골단
              해체, 노태우 군사독재 정권 타도를 외치며 <br /> '5월 투쟁'을
              전개했습니다. <br /> 그 과정에서 고등학생부터 노동자에 이르기까지
              11인의 열사가 산화하셨습니다. <br /> 강경대 열사가 염원하던 자주,
              민주, 통일의 세상을 이루기 위해 <br /> 우리는 강경대 열사의 정신을
              계승해 나가야 합니다.
            </p>
            <Link to="/history">자세히 보기</Link>
          </div>
        </div>
        <p className={styles.resolution}>
          모든 열사들의 외침이 헛되지 않도록 해야 합니다.
        </p>
        <div className={styles.meorial}>
          <div className={styles.organization}>
            <img
              src={require("../images/whiteMemorial.png")}
              alt="추모사업회 아이콘"
            />
            <p>추모사업회</p>
            <span>
              열사가 만들어가고자 했던, 자주,민주,통일 세상을 만들어가기 위한
              투쟁의 현장에 '강경대 열사 추모사업회'의 깃발을 들고 참여하고
              있습니다. 정치,사회,노동 등 다양한 사회 이 문제에 대한 실천과
              6.15, 5.18, 노동절 등 시기별로 진행되는 커다란 투쟁의 현장에
              추모사업회의 이름으로 함께 참여하고 있습니다.
            </span>
          </div>
          <div className={styles.introduce}>
            <img
              src={require("../images/blackMemorial.png")}
              alt="추모제 관련 아이콘"
            />
            <p>추모제</p>
            <span>
              '강경대 열사 추모사업회'에서는 매년 4월 강경대 열사 추모제를
              진행하고 있습니다. 공권력의 무자비한 폭력에 산화해간 열사를
              추모하고, 열사가 꿈꾸던 세상을 앞당기기 위해 살아가겠다고 결의하는
              추모제에는 열사의 유가족을 비롯하여, 명지대학교 재학생, 동문,
              각계각층의 단체와 선생님들이 함께 참여해주시고 있습니다.
            </span>
          </div>
        </div>

        <div className={styles.supportGroup}>
          <h2>추모사업회 회원이 되어 주세요</h2>
          <img src={require("../images/support.png")} alt="후원회 아이콘" />
          <button className={styles.memorialApplication}>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd4pGaslQL7KMlscX0ZKEHAZ7Fms16httf6urjuYJ6Lw5XZsw/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              children="회원가입서 작성하기"
            ></a>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  mainPosts: state.mainPosts,
});

Main.propTypes = {
  mainPosts: PropTypes.object.isRequired,
  loadEmergencies: PropTypes.func.isRequired,
  loadNotices: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { loadNotices, loadEmergencies })(Main);
