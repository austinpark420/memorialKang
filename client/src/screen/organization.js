import React, { useEffect } from 'react';
import 'css/common.scss';
import 'css/organization.scss';
import $ from 'jquery';

const Organization = () => {
  useEffect(() => {
    $('.tab').on('click', function() {
      $('.tab').removeClass('active');
      $(this).addClass('active');

      $('.word-list').removeClass('active-word');
      var activeTabList = $(this).attr('rel');
      $('.' + activeTabList).addClass('active-word');
    });
  });

  return (
    <div className='organization-wrap'>
      <ul className='heading'>
        <li className='tab active' rel='second' tabIndex='0'>
          <h2>2대 회장님</h2>
        </li>
        <li className='tab' rel='first' tabIndex='1'>
          <h2>1대 회장님</h2>
        </li>
      </ul>
      <section>
        <ul className='word-list second active-word'>
          <li>
            <strong>Overall Impression:</strong> An elegant, malty German amber
            lager with a clean, rich, toasty and bready malt flavor, restrained
            bitterness, and a dry finish that encourages another drink. The
            overall malt impression is soft, elegant, and complex, with a rich
            aftertaste that is never cloying or heavy.
          </li>
        </ul>
        <ul className='word-list first'>
          <li>
            <strong>History:</strong> As the name suggests, brewed as a stronger
            “March beer” in March and lagered in cold caves over the summer.
            Modern versions trace back to the lager developed by Spaten in 1841,
            contemporaneous to the development of Vienna lager. However, the
            Märzen name is much older than 1841; the early ones were dark brown,
            and in Austria the name implied a strength band (14 °P) rather than
            a style. The German amber lager version (in the Viennese style of
            the time) was first served at Oktoberfest in 1872, a tradition that
            lasted until 1990 when the golden Festbier was adopted as the
            standard festival beer.
          </li>
        </ul>
      </section>
      <div className='organization-map'>조직도</div>
    </div>
  );
};

export default Organization;
