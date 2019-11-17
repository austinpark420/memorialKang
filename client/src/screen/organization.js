import React, { useEffect } from 'react';
import styles from 'css/organization.module.scss';
import $ from 'jquery';

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
            <h2>2대 회장님</h2>
          </li>
          <li className={styles.tab} rel='first' tabIndex='1'>
            <h2>1대 회장님</h2>
          </li>
        </ul>
        <section>
          <ul className={`wordList second ${styles.activeWord}`}>
            <li>
              <strong>Overall Impression:</strong> An elegant, malty German
              amber lager with a clean, rich, toasty and bready malt flavor,
              restrained bitterness, and a dry finish that encourages another
              drink. The overall malt impression is soft, elegant, and complex,
              with a rich aftertaste that is never cloying or heavy.
            </li>
          </ul>
          <ul className={`wordList first`}>
            <li>
              <strong>
                "새내기 대학생, 경찰의 쇠파이프에 맞고 군화발에 밟혀 숨지다"
                남의 나라 이야기일까요? 소설 이야기일까요?
              </strong>
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
              부도덕합니다. <br /> 억압 앞에 굴복하지 않았던, 부정을 보고 눈감지
              않았던 강경대열사의 숨결을 이 곳에 간직합니다. <br /> 세상이
              어둡다고 느껴지는 날, 누구의 말이 옳은지 혼란스러운 날, 어디로
              가야할지 앞이 보이지 않는 날, 이곳으로 오십시오. <br />
              강경대열사가 남기고 간 새 날을 여는 불꽃 새 길을 여는 불꽃 한 송이
              받아 가십시오.
            </li>
          </ul>
        </section>
        <div className={styles.organizationMap}>조직도</div>
      </div>
    </div>
  );
};

export default Organization;
