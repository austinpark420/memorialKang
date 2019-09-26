import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import 'css/common.scss';
import 'css/image.scss';

const Image = ({ tileData }) => {
  useEffect(() => {
    $('.tab').on('click', function() {
      $('.tab').removeClass('active');
      $(this).addClass('active');

      $('.image-list').removeClass('active-image');
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass('active-image');
    });
  });

  return (
    <div className='image-wrap'>
      <ul className='heading'>
        <li className='tab active' rel='alive' tabIndex='0'>
          <h2>강경대 생전사진</h2>
        </li>
        <li className='tab' rel='moment' tabIndex='1'>
          <h2>91년도 당시사진</h2>
        </li>
        <li className='tab' rel='activity' tabIndex='2'>
          <h2>추모사업회 활동사진</h2>
        </li>
      </ul>
      <section>
        <ul className='image-list alive active-image'>
          {tileData.map((tile, index) => (
            <li key={index}>
              <img src={tile.img} alt='' />
              <p>{tile.title}</p>
              <p>{tile.author}</p>
            </li>
          ))}
        </ul>
        <ul className='image-list moment'>
          {tileData.map(tile => (
            <li>
              <img src={tile.img} alt='' />
              {tile.title}
            </li>
          ))}
        </ul>
        <ul className='image-list activity'>
          {tileData.map(tile => (
            <li>
              <img src={tile.img} alt='' />
              {tile.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

let mapStateToProps = state => ({ tileData: state.App_reducer.tileData });

export default connect(mapStateToProps)(Image);
