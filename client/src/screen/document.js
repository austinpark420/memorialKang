import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

import $ from 'jquery';
import dateFormat from 'dateformat';

import { Post, NewPost } from '../components';
import { loadPosts } from '../actions/posts';
import styles from '../css/document.module.scss';

const Documentary = ({ match: { url }, posts, isAuthenticated, loadPosts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    loadPosts('documents');

    // Tab Toggle
    $(`.${styles.tab}`).on('click', function() {
      $(`.${styles.tab}`).removeClass(`${styles.active}`);
      $(this).addClass(`${styles.active}`);

      $('.documentList').removeClass(`${styles.activeDocument}`);
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass(`${styles.activeDocument}`);
    });
  }, [loadPosts]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = number => {
    setCurrentPage(number);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <div className={styles.coverImage}></div>

        <ul className={styles.heading}>
          <li
            className={`${styles.tab} ${styles.active}`}
            rel='literary'
            tabIndex='0'
          >
            <h2>장학생</h2>
          </li>
          <li className={styles.tab} rel='scholarship' tabIndex='1'>
            <h2>문학상</h2>
          </li>
        </ul>
        <section>
          <div className={`documentList literary ${styles.activeDocument}`}>
            <strong>
              "새내기 대학생, 경찰의 쇠파이프에 맞고 군화발에 밟혀 숨지다" 남의
              나라 이야기일까요? 소설 이야기일까요?
            </strong>
            남의 나라 이야기도, 소설에 나오는 이야기도 아닙니다. 우리나라에서
            실제로 일어났던 일입니다. <br />
            1991년 4월 26일에 말입니다. 도저히 상상할 수 없는 이 이야기가
            사실이라니 커다란 몽둥이로 머리를 맞은 듯 광하는 충격이 옵니다.
            <br /> 온 몸의 피가 거꾸로 솟는 이런 끔찍한 일이 또 다시 이땅에서
            일어날까요? "예, 다시 일어납니다. 정신차리지 않으면" "아니오, 다시는
            일어나지 않습니다. <br /> 정신을 차리고 있으면" 어두운 시대에 피우지
            못한 열아홉 청춘의 꽃으로 쓰러져 세상을 밝히는 불꽃으로 다시 피어난
            조국의 아들, 우리는 그를 강경대열사라고 부릅니다. <br /> 억압 앞에
            굴복하는 것은 억압 그 자체보다도 더 부도덕하며, 부정(不正)을 보고
            눈감는 것은 그 부정보다 더 부도덕합니다. <br /> 억압 앞에 굴복하지
            않았던, 부정을 보고 눈감지 않았던 강경대열사의 숨결을 이 곳에
            간직합니다. <br /> 세상이 어둡다고 느껴지는 날, 누구의 말이 옳은지
            혼란스러운 날, 어디로 가야할지 앞이 보이지 않는 날, 이곳으로
            오십시오. <br />
            강경대열사가 남기고 간 새 날을 여는 불꽃 새 길을 여는 불꽃 한 송이
            받아 가십시오.
          </div>
          <div className={`documentList scholarship ${styles.group}`}>
            <div className={styles.subtitle}>
              <span>번호</span>
              <span>분류</span>
              <span>제목</span>
              <span>글쓴이</span>
              <span>등록일</span>
            </div>
            <ul className={styles.postList}>
              {posts &&
                currentPosts.map((post, index) => (
                  <Link to={`${url}/${post._id}`}>
                    <li key={index}>
                      <div>
                        <span>{post.number}</span>
                        <span>{post.category}</span>
                        <span>{post.title}</span>
                        <span>{post.writer}</span>
                        <span>{dateFormat(post.date, 'yyyy-mm-dd')}</span>
                      </div>
                    </li>
                  </Link>
                ))}
            </ul>
            <ul className={styles.pagination}>
              {pageNumbers.map((number, index) =>
                currentPage === number ? (
                  <li
                    className={styles.active}
                    key={index}
                    onClick={() => handleClick(number)}
                  >
                    {number}
                  </li>
                ) : (
                  <li key={index} onClick={() => handleClick(number)}>
                    {number}
                  </li>
                )
              )}
            </ul>
            {isAuthenticated && (
              <button className={styles.newPost}>
                <Link to={`${url}/write`}>글쓰기</Link>
              </button>
            )}
            <Route path={`${url}/:id`} component={Post} />
            <Route path={`${url}/write`} component={NewPost} />
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  posts: state.posts.posts,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loadPosts }
)(Documentary);
