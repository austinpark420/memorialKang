import React from 'react';
import styles from '../css/history.module.scss';

const History = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <h2 className='blind'>강경대 열사</h2>
        <div className={styles.coverImage}></div>
        <div className={styles.introduce}>
          <div className={styles.imageWraper}>
            <img src={require('../images/kang01.png')} alt='kang' />
          </div>
          <section>
            <h3>열사 소개</h3>
            <b>1972년 2월 4일</b>
            <span>
              서울 출생
              <br />
              강민조씨와 이덕순 여사 사이의 1남 1녀중 막내
            </span>
            <b>1990년 3월</b>
            <span>서울 휘문고등학교 졸업</span>
            <b>1991년 3월</b>
            <span>명지대학교 경제학과 입학 민중노래패 "땅의 사람들"가입</span>
            <b>1991년 3월 22일</b>
            <span>
              총학생회 진군식 시위 도중 학내 진입한
              <br />
              전투경찰의 직격 최루탄에 의해 안면 부상
            </span>
            <b>1991년 4월 26일</b>
            <span>
              학원자주화 완전 승리와 총학생회장 구출 투쟁 및
              <br />
              노태우 군사정권 타도 시위중 백골단의 쇠파이프 난타로 인해 심장막
              내출혈로
              <br />
              병원으로 옮기던 도중 사망 1991년 5월 14일 장례식이 경찰에 의해
              저지됨 1991년 5월 20일 광주 망월동
              <br />
              민주화 묘역에 안장 2014년 4월 26일 이천 민주공원으로 묘역 이장
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default History;
