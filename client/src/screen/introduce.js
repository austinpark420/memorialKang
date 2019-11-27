import React from 'react';
import styles from '../css/introduce.module.scss';

const Introduce = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <h2 className='blind'>추모제</h2>
        <div className={styles.coverImage}></div>
        <div className={styles.introduce}>
          <section>
            <h3>강경대 열사 추모제</h3>
            <span>
              '강경대 열사 추모사업회'에서는 매년 4월 강경대 열사 추모제를
              진행하고 있습니다. <br /> 공권력의 무자비한 폭력에 산화해간 열사를
              추모하고, 열사가 꿈꾸던 세상을 앞당기기 위해 살아가겠다고 결의하는
              추모제에는 열사의 유가족을 비롯하여, <br /> 명지대학교 재학생,
              동문, 각계각층의 단체와 선생님들이 함께 참여해주시고 있습니다.
              <br />
              당일 추모제 행사뿐 아니라 재학생들이 주축이 된
              열사정신계승단(열정단)을 통해, 강경대 열사와 열사정신을 학내외로
              알리는 활동을 함께 해나가고 있습니다. <br /> 추모제 이후에는
              열사의 묘역을 직접 찾아가 추도하는 묘역참배를 진행하고 있습니다.
              <br />
              이전까지는 광주 518묘역에서 행사를 진행하였으나, 2014년도 열사의
              묘역 이장 이후에는 이천의 민주화 기념공원에서 참배행사가 진행되고
              있습니다.
            </span>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Introduce;
