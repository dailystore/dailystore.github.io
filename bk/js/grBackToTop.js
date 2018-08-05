$(function () {
  var seBackToTop = '.page-top';//トップへ戻るボタンが入っている要素名
  var seFooter = 'footer';//フッターが入っている要素名

  var yTop = 0;	//トップの縦位置（ピクセル）
  var pxInBackToTop = 180 + yTop;	//どれくらい下へスクロールしたらトップへ戻るボタンを出すか（ピクセル）
  var msInBTTBtn = 600;	//トップへ戻るボタンが出てくるアニメーションの時間（ミリ秒）
  var msBTTScroll = 1000;	//トップへ戻るスクロールアニメーションの時間（ミリ秒）

  //トップへ戻るボタン
  var eBtt = $(seBackToTop);
  var seFoot = $(seFooter);
  var yDefBttBtn = parseInt(eBtt.css('bottom'));
  var hBttBtn = '-100px';
  eBtt.css('bottom', hBttBtn);

  var isInBttBtn = false;
  var isOverFooter = false;

  $(window).scroll(setBttPos).resize(setBttPos);

  function setBttPos() {
    var y = $(window).scrollTop();

    if (y > pxInBackToTop) {
      if (!isInBttBtn) {
        isInBttBtn = true;
        eBtt.stop().animate({bottom: yDefBttBtn + 'px'}, msInBTTBtn, 'easeOutBack');
      }
    } else {
      if (isInBttBtn) {
        isInBttBtn = false;
        eBtt.stop().animate({bottom: hBttBtn}, msInBTTBtn, 'easeInBack');
      }
    }

    //トップへ戻るボタンの位置をフッターの上で止める
    if (seFoot.length > 0) {
      var yf = seFoot.offset().top + yDefBttBtn - y - $(window).height();
      if (yf < 0) {
        isOverFooter = true;
        eBtt.stop().css('bottom', (yDefBttBtn - yf) + 'px');
      } else if (isOverFooter) {
        isOverFooter = false;
        eBtt.stop().css('bottom', yDefBttBtn + 'px');
      }
    }
  }

  //トップへ戻る
  eBtt.find('a').click(function () {
    $('html, body').stop().animate({scrollTop: yTop}, msBTTScroll, 'easeOutQuint');
    return false;
  });
});
