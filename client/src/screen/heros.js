import React from 'react';
import styles from 'css/heros.module.scss';

const ElevenHero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <article className={styles.article}>
          <h2 className={styles.subtitle}>11인의 열사</h2>
          <p className={styles.subdescription}>
            1991년 4월 26일, 공권력의 과도한 진압으로 강경대 열사가 산화한 이후
            <br />
            수많은 시민들의 분노가 거리고 터져 나왔습니다.
            <br />
            시위의 규모는 전국적 투쟁으로 발전했으며
            <br />
            노태우 정권 출범이후 가장 큰 규모의 투쟁이 되었습니다.
            <br />
            우리는 이를 '91년 5월 투쟁'이라고 합니다.
            <br />
            그리고 폭압적인 노태우 정권에 맞선 91년 5월 투쟁 과정에서 산화하신
            <br />
            <b>열 한분의 열사</b>가 계십니다.
          </p>
        </article>
        <ul className={styles.group}>
          <li>
            <img src={require('images/heros/hero01.png')} alt='' />
            <section>
              <h3>김영균 (5월 2일)</h3>
              <b>1971년</b>
              <span>11월 4일 서울출생</span>
              <b>1987년</b>
              <span>서울 대원고등학교 입학</span>
              <b>1989년</b>
              <span>
                3월 안동대학교 민속학과 입학
                <br />
                민속학과 학생회 산하 '민속문확연구회'를 결성, 초대회장 역임
                <br />
                8월 조국통일범빈족대회 통일선봉대로 참가
                <br />
                여름농촌활동 참가, 우루과이라운드 반대 경북농민대회에서 마당극
                '새벽을 밟으며' 공연
              </span>
              <b>1991년</b>
              <span>
                4월 민속학과 부학생회장 <br />
                솔뫼 교지편집위원회 대외사업부장
                <br />
                5월 1일 '고 강경대열사 추모 및 공안통치 분쇄를 위한 범안대인
                경의대회' 동중 '공안통치 분쇄, 노태우 정권 타토'를 외치며 분신
                <br />
                5월 2일 오후 8시 13분 경북대 의대 부속병원 화상병동 301호에서
                운영 <br /> 안동대 교내에 가묘
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero02.png')} alt='' />
            <section>
              <h3>천세용 (5월 3일)</h3>
              <b>1971년</b>
              <span>5월 서울출생</span>
              <b>1990년</b>
              <span>
                서울 동북고 졸업 <br />
                경원대학교 전산과(2부) 입학 <br />
                3월 안동대학교 민속학과 입학
              </span>
              <b>1991년</b>
              <span>
                5월 3일 오후 3시경 '강경대 학우 폭력 살인자행한 노태우 정권
                타도를 위한 결의대회' 도중 분신 후 투신하여 운명
                <br />
                마석 모란공원 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero03.png')} alt='' />
            <section>
              <h3>박창수 (5월 6일)</h3>
              <b>1958년</b>
              <span> 7월 28일 부산 출생</span>
              <b>1979년</b>
              <span>2월 부산 기계공고 졸업 </span>
              <b>1981년</b>
              <span> 7월 대한조선공사(현 한진중공업) 배관공으로 입사</span>
              <b>1990년</b>
              <span>
                7월 한진중공업 노조위원장 당선, 부총연 부의장 1991년 2월 구속,
                서울구치소 수감
              </span>
              <b>1991년 </b>
              <span>
                5월 4일 의문의 상처를 입고 안양병원에 입원 <br />
                5월 6일 의문의 죽음을 당함 양산 솔밭산 공원묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero04.png')} alt='' />
            <section>
              <h3>김기설 (5월 8일)</h3>
              <b>1965년</b>
              <span>경기도 파주 출생</span>
              <b>1983년</b>
              <span>인천 수도전기통신고 중퇴</span>
              <b>1984년</b>
              <span>대입검정고시 합격 1988년 성남 민주화청년운동연합 가입</span>
              <b>1989년</b>
              <span>성남 노동자의 집에서 상담간사로 활동</span>
              <b>1991년</b>
              <span>
                전국민족민주운동연합 본부 사회부장으로 활동 <br />
                5월 8일 서강대 본관 옥상에서 "폭력살인 만행 노태우정권
                타도하자"고 외치며 분신한 후 투신하여 운명 <br />
                마석 모란공원 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero05.png')} alt='' />
            <section>
              <h3>윤용하 (5월 12일)</h3>
              <b>1969년 </b>
              <span>전남 승주 출생 </span>
              <b>1981년 </b>
              <span>순천 중앙초등학교 5년 중퇴 </span>
              <b>1983년</b>
              <span>노동일 시작</span>
              <b>1989년</b>
              <span>성남피혁 근무, 민주화운동 직장 청년연합 회원으로 활동</span>
              <b>1991년</b>
              <span>
                5월 10일 "노태우 정권 타도"를 외치며 전남대에서 분신 <br />
                5월 12일 운명 광주 망월동 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero06.png')} alt='' />
            <section>
              <h3>이정순 (5월 18일)</h3>
              <b>1952년</b>
              <span>3월 19일 전남 순천 출생</span>
              <b>1962년</b>
              <span>2월 순천 남국민학교 졸업</span>
              <b>1991년</b>
              <span>
                5월 18일 연세대 정문 앞 철교위에서 분신 후 투신하여 운명 광주
                망월동 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero07.png')} alt='' />
            <section>
              <h3>박승희 (5월 19일)</h3>
              <b>1971년</b>
              <span>4월 12일 전북 전주 출생 </span>
              <b>1990년</b>
              <span>
                2월 목포 정명여고 졸업 <br />
                3월 전남대학교 가정대학 식품영양학과 입학 <br />
                과대의원 활동, 교지 용봉 편집위원으로 활동
              </span>
              <b>1991년</b>
              <span>
                4월 29일 전남대에서 '고 강경대열사 추모 및 노태우정권 퇴진
                결의대회' 중 "노태우정권 타도하고 미국놈들 몰아내자! 2만학우
                단결하라!"를 외치며 분신 <br />
                5월 19일 21일간의 병상투쟁 후 운명 <br />
                광주 망월동 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero08.png')} alt='' />
            <section>
              <h3>김귀정 (5월 25일)</h3>
              <b>1966년</b>
              <span>서울 출생</span>
              <b>1985년</b>
              <span>
                한국외국어대학교 용인캠퍼스에 입학하였으나 집안 사정으로 중퇴
              </span>
              <b>1988년</b>
              <span>
                3월 성균관대학교 불어불문학과 입학, 심산연구회 가입활동
              </span>
              <b>1989년</b>
              <span>
                동아리연합회 총무부장 역임 <br />
                11월 동아리연합회 부회장 출마
              </span>
              <b>1991년</b>
              <span>
                5월 25일 '공안통치 민생파탄 노태우정권 퇴진을 위한 제3차
                범국민대회'에 참가하여 시위 도중 대한극장 부근에서 백골단의
                토끼몰이식 진압에 의해 운명 <br /> 마석 모란공원
                민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero09.png')} alt='' />
            <section>
              <h3>정상순 (5월 31일)</h3>
              <b>1966년</b>
              <span>11월 1일 전남 보성 출생</span>
              <b>1985년</b>
              <span>2월 보성고등학교 졸업</span>
              <b>1991년</b>
              <span>
                5월 22일 오후 7시 25분경 전남대 병원 영안실 위에서"노태우
                물러가라"며 분신 후 투신 <br /> 5월 29일 전남대 병원에서 운명
                <br /> 광주 망월동 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero10.png')} alt='' />
            <section>
              <h3>김철수 (6월 2일)</h3>
              <b>1973년</b>
              <span>3월 전남 보성군 봉산리 출생</span>
              <b>1989년</b>
              <span>
                3월 보성고 입학 풍물패 "솔개', 봉사동아리 "인터렉트" 활동
              </span>
              <b>1990년</b>
              <span>생활영어 최우수상 수상, 91년 3월 모의고사 문과 수석</span>
              <b>1991년</b>
              <span>
                5월 18일 보성고 운동장에서 "노태우정권 퇴진", "참교육 실현"을
                외치며 분신 <br /> 6월 2일 전남대 병원에서 운명 <br /> 광주
                망월동 민족민주열사묘역에 안장
              </span>
            </section>
          </li>
          <li>
            <img src={require('images/heros/hero11.png')} alt='' />
            <section>
              <h3>손석용 (8월 19일)</h3>
              <b>1970년</b>
              <span>경북 영덕에서 출생</span>
              <b>1989년</b>
              <span>
                대구 대륜고등학교 졸업 <br />
                대구대학교 사범대 특수교육과 입학
              </span>
              <b>1991년</b>
              <span>
                3월 28일 육군에 입대 8월 18일 밤 11시 40분경 대구대 대명동
                캠퍼스 야간강좌 옥상에서 분신 후 투신 <br /> 8월 19일 새벽 5시경
                대구 동산병원에서 운명
              </span>
            </section>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ElevenHero;
