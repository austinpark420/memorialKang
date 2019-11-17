import React from 'react';
import styles from 'css/memorialHall.module.scss';

const memorialHall = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <h2 className='blind'>강경대 기념관</h2>
        <div className={styles.coverImage}></div>
        <h3>기념관 예약 현황</h3>
        <iframe
          title='memorialHallCalendar'
          src='https://calendar.google.com/calendar/b/1/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FSeoul&amp;src=bWVtb3JpYWxrYW5nOTFAZ21haWwuY29t&amp;src=ZW4uc291dGhfa29yZWEjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%2322AA99&amp;color=%231F753C&amp;showCalendars=0&amp;showPrint=0&amp;showTz=0&amp;showTabs=0&amp;showDate=1&amp;showNav=1&amp;showTitle=0&amp;hl=ko'
          frameBorder='0'
          scrolling='no'
        ></iframe>
        <button className={styles.memorialApplication}>
          <a
            href='https://docs.google.com/forms/d/e/1FAIpQLScToGgK5yVBIFJbWFYBkwlEoIN3KYmaI0v42ETWZRZq3XxUhg/viewform?usp=sf_link'
            target='_blank'
            rel='noopener noreferrer'
            children='기념관 대여 신청서'
          ></a>
        </button>
      </div>
    </div>
  );
};

export default memorialHall;
