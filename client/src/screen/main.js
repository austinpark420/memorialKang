import React from "react";
import { Slider } from "components";
import "css/common.scss";
import "css/main.scss";

const Main = () => {
  return (
    <div className="main-wrap">
      <Slider />
      <div className="main-article">
        <section>
          <h2>공지사항</h2>
          <p>공지사항 게시판</p>
        </section>
        <section>
          <h2>활동소개</h2>
          <p>활동소개 게시판</p>
        </section>
        <section>
          <h2>추모비</h2>
          <p>추모비 게시판</p>
        </section>
      </div>

      <div className="main-introduce">열사소개</div>
      <div className="main-meorial clearfix">
        <div className="main-meorial-business">추모사업회</div>
        <div className="main-meorial-event">추모제</div>
      </div>

      <div className="support-title">
        <h2>추모사업회 후원회가 되어 주세요</h2>
      </div>
      <form className="support-form" action="POST">
        <fieldset>
          <label htmlFor="name">이름</label>
          <input type="text" name="name" />
          <label htmlFor="email">이메일</label>
          <input type="text" name="email" />
          <button type="submit">제출</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Main;
