import React, { useEffect } from 'react';
import $ from 'jquery';
import styles from '../css/organization.module.scss';

const Organization = () => {
  useEffect(() => {
    $(`.${styles.tab}`).on('click', function() {
      $(`.${styles.tab}`).removeClass(`${styles.active}`);
      $(this).addClass(`${styles.active}`);

      $('.wordList').removeClass(`${styles.activeWord}`);
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass(`${styles.activeWord}`);
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <div className={styles.coverImage}></div>

        <ul className={styles.heading}>
          <li
            className={`${styles.tab} ${styles.active}`}
            rel='second'
            tabIndex='0'
          >
            <h2>2대 회장</h2>
          </li>
          <li className={styles.tab} rel='first' tabIndex='1'>
            <h2>1대 회장</h2>
          </li>
        </ul>
        <section>
          <ul className={`wordList second ${styles.activeWord}`}>
            <li>
              <h3>
                이승무 회장( 명지대학교 행정학과 78학번 )
                <span>2018.12.18 ~ 현재</span>
              </h3>
              <img
                src={require('../images/secondRepresentation.png')}
                alt='firstRepresentation'
              />
              <strong>30주기를 준비 합시다.</strong> <br />
              강경대열사의 정신을 계승하고 발전시켜 온 재학생, 선후배 동문
              여러분, 그리고 추모사업회 사업에 깊은 애정으로 함께 해 오신 모든
              분들게 감사의 인사를 먼저 드립니다. <br /> 1991년 명지대는 커다란
              아픔이자 충격이었습니다. 꽃다운 젊음의 시작인 1학년 대학생
              강경대가 폭력정권과 경찰에 의해 무참하게 무너져 내렸습니다.
              4월26은 절대로 있어서는 안 되는 일이 일어났습니다. 강경대 열사
              죽음은, 분신의 항거가 잇달아 일어나는 5월이 되었습니다. 5월 열사의
              정국이 되었습니다. 1991년은 분노와 폭정의 해 였습니다.
              <br /> 2020년 명지대는 ‘인문캠퍼스 교육복합시설 신축공사’를
              진행하고 있습니다. 공사로 인해 열사가 산화하신 장소가 도로로
              확장되어 추모동판은 학생회관 앞으로 이전하기로 했습니다. 연이어
              산화 하신 곳에 표지와 인도에 표지석 설치를 해야 합니다.
              <br /> 또한 열사의 거리 명명도 진행되어야 합니다. 지금까지
              지켜왔던 추모동판과 산화하신 장소가 온전히 보존될 수 있도록 동문과
              재학생 그리고 강경대 열사를 기억하고 계신 분들의 적극적인 관심과
              참여가 요구되고 있습니다. 시간과 노력이 힘차게 모아져야만 이 일을
              성사 시킬 수 있습니다.
              <br />
              한반도를 둘러싼 정치 정세가 긴장의 연속으로 이어지고 있습니다.
              미국의 국익에 자유롭지 못한 정권은 남북의 평화와 통일에 제대로 된
              답을 하지 못하고 있습니다. 신자유주의에 확대되어 가는 양극화와
              재벌들에게 발목이 잡혀 후퇴된 노동 현실을 외면하고 있습니다.
              굴욕을 강요하는 동맹과 양극화를 넘어서는 자주와 평등의 세상을
              만들어 가야할 과제가 우리에게 있습니다. <br />
              계속해서 강경대 열사는 우리 가슴 속에 살아 있어야 합니다. 1991년
              수 없이 불렀던 ‘투쟁의 한길로’의 노래가 우리의 가슴속에 살아 있어
              세상을 바꾸는 대열에 함께 하도록 합시다.
            </li>
          </ul>
          <ul className={`wordList first`}>
            <li>
              <h3>김승기 회장( 명지대학교 경영학과 74학번 )</h3>
              <img
                src={require('../images/firstRepresentation.png')}
                alt='firstRepresentation'
              />
              <strong>
                "새내기 대학생, 경찰의 쇠파이프에 맞고 군화발에 밟혀 숨지다"
                남의 나라 이야기일까요? 소설 이야기일까요?
              </strong>
              <br />
              남의 나라 이야기도, 소설에 나오는 이야기도 아닙니다. 우리나라에서
              실제로 일어났던 일입니다. <br />
              1991년 4월 26일에 말입니다. 도저히 상상할 수 없는 이 이야기가
              사실이라니 커다란 몽둥이로 머리를 맞은 듯 광하는 충격이 옵니다.
              <br /> 온 몸의 피가 거꾸로 솟는 이런 끔찍한 일이 또 다시 이땅에서
              일어날까요? "예, 다시 일어납니다. 정신차리지 않으면" "아니오,
              다시는 일어나지 않습니다. <br /> 정신을 차리고 있으면" 어두운
              시대에 피우지 못한 열아홉 청춘의 꽃으로 쓰러져 세상을 밝히는
              불꽃으로 다시 피어난 조국의 아들, 우리는 그를 강경대열사라고
              부릅니다. <br /> 억압 앞에 굴복하는 것은 억압 그 자체보다도 더
              부도덕하며, 부정(不正)을 보고 눈감는 것은 그 부정보다 더
              부도덕합니다. 억압 앞에 굴복하지 않았던, 부정을 보고 눈감지 않았던
              강경대열사의 숨결을 이 곳에 간직합니다. <br /> 세상이 어둡다고
              느껴지는 날, 누구의 말이 옳은지 혼란스러운 날, 어디로 가야할지
              앞이 보이지 않는 날, 이곳으로 오십시오. 강경대열사가 남기고 간 새
              날을 여는 불꽃 새 길을 여는 불꽃 한 송이 받아 가십시오.
            </li>
          </ul>
        </section>
        <div className={styles.organizationMap}>
          <h2>추모사업회 조직도</h2>
          <img src={require('../images/organization.png')} alt='organization' />
        </div>
      </div>
    </div>
  );
};

export default Organization;
