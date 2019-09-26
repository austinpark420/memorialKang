import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import 'css/common.scss';
import 'css/video.scss';

const Video = ({ videoData }) => {
  useEffect(() => {
    $('.tab').on('click', function() {
      $('.tab').removeClass('active');
      $(this).addClass('active');

      $('.video-list').removeClass('active-video');
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass('active-video');
    });
  });

  return (
    <div className='video-wrap'>
      <ul className='heading'>
        <li className='tab active' rel='documentary' tabIndex='0'>
          <h2>다큐멘터리</h2>
        </li>
        <li className='tab' rel='ceremony' tabIndex='1'>
          <h2>추모제 영상</h2>
        </li>
      </ul>
      <section>
        <ul className='video-list documentary active-video'>
          {videoData.map((video, index) => (
            <li key={index}>
              <p>{video.title}</p>
            </li>
          ))}
        </ul>
        <ul className='video-list ceremony'>
          {videoData.map(video => (
            <li>{video.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

let mapStateToProps = state => ({ videoData: state.App_reducer.videoData });

export default connect(mapStateToProps)(Video);
