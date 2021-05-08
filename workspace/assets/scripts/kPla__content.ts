import $ from 'jquery';
import * as Utils from './utils';
import * as i18n from './i18n';

class KPla {
  constructor() {
    // $('[data-eventchip]').click(function() {
    //   console.log($(this));
    // });
    setInterval(() => {
      const $e = $('[aria-label="Rooms and resources"] > li');
      const $mark = '<a class="kPla-mark">★</a>';
      if ($e.find('.kPla-mark').length === 0) {
        $e.prepend($mark);

        $('.kPla-mark').click(function() {
          $('body').append(`
            <div style="position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div style="text-align: center">
                <img src="https://dummyimage.com/100x100/000/fff">
                <h2>下弦の月</h2>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
              <img src="https://dummyimage.com/300x300/000/fff">
            </div>
          `);
        });
      }
    }, 3000);

    
    // $('html').on('DOMSubtreeModified propertychange', () => {
    //   console.log(`$('[aria-label="Rooms and resources"]`);
    //   console.log($('[aria-label="Rooms and resources"]'));
    //   const hoge = '★';
    //   $('[aria-label="Rooms and resources"] > li > a > div').append(hoge);
    // });
  }
}

new KPla();
