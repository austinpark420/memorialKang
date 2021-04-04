import React from "react";
import styles from "../css/history.module.scss";

const History = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <h2 className="blind">강경대 열사</h2>
        <div className={styles.coverImage}></div>
        <div className={styles.introduce}>
          <div className={styles.imageWraper}>
            <img src={require("../images/kang01.png")} alt="강경대열사" />
          </div>
          <section>
            <h3>열사 소개</h3>

            <b>1972년 2월 4일</b>

            <span>서울 출생</span>

            <b>1990년 2월</b>

            <span>서울 휘문고등학교 졸업</span>

            <b>1991년 3월</b>
            <span>
              명지대 경제학과에 입학 <br />
              경제학과 사회과학 ‘연구학회 새날을 여는길’ 입회 <br />
              민중노래패 ‘땅의 사람들’ 가입
            </span>

            <b>1991년 3월 22일</b>

            <span>
              총학생회 진군식 시위 도중 학내 진입한 전경의 직격 최루탄에 의해
              안면 부상
            </span>
            <b>1991년 4월 26일</b>
            <span>
              학원자주화 완전 승리와 총학생회장 구출 투쟁 중 백골단의 쇠파이프
              난타로 인해 병원으로 옮기는 도중 심장막 내출혈로 운명 <br />
              이후 노태우 군사정권 타도와 민자당 해체와 공안통치 종식을 염원하는
              국민항쟁으로 이어짐
            </span>

            <b>1991년 5월 14일</b>

            <span>장례식이 경찰에 의해 저지됨</span>

            <b>1991년 5월 20일</b>

            <span>
              우여곡절 끝에 장례를 치룬 후 광주 망월동 민족민주열사 묘역에 안장
            </span>

            <b>1995년 2월 24일</b>

            <span>명지대학교 명예졸업</span>

            <b>2007년 7월 5일</b>

            <span>민주화운동관련자 인정</span>

            <b>2014년 4월 26일</b>
            <span>이천 민주화운동기념공원으로 묘역 이전</span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default History;
