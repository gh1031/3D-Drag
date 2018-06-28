/**
 * @name drag
 * @desc make img dragable
 */


$(function () {
  var imgL = $('.wrap img').length;
  var deg = 360 / imgL;
  var rotY = 0;
  var rotX = -18;
  var eventstart = 'mousedown';
  var eventmove = 'mousemove';
  var eventend = 'mouseup';
  var isMobile = false;
  var distX = distY = 0;
  var play = null;
  var text = {
    0: '羞哒哒的小仙女',
    1: '赛天仙的小仙女',
    2: '敲可爱的小仙女',
    3: '18岁的小仙女',
    4: '睡觉觉的小仙女',
    5: '有气质的小仙女',
    6: '委屈巴巴的小仙女',
    7: '萌哒哒的小仙女',
    8: '超短发的小仙女',
    9: '苗条的小仙女',
    10: '圆嘟嘟的小仙女',
    11: '诱人的小仙女',
  }
  $('.wrap img').each(function (index) {
    $(this).css({
      'transform': 'rotateY(' + index * deg + 'deg) translateZ(' + 350 + 'px)'
    }).attr('ondragstart', 'return false').on('click', function() {
      $('.mask').css('display', 'flex');
      $('.mask img').attr('src', './img/img'+index+'.JPG');
      $('.mask span').html(text[index + ''])
      $('.mask .big-img').on('click', function() {
        console.log($('.mask').css('display'));
        if ($('.mask').css('display') === 'flex') {
          $('.mask').css('display', 'none');
        }
        return;
      })
    })
  })
  // 处理移动端兼容
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Windows Phone)/i))) {
    eventstart = 'touchstart';
    eventmove = 'touchmove';
    eventend = 'touchend';
    isMobile = true;
  }
  // 拖拽事件
  $(document).on(eventstart, function (e) {
    clearInterval(play);
    // 处理移动端兼容
    var ev = isMobile ? e.originalEvent.touches[0] : e;
    var prevX = ev.clientX;
    var prevY = ev.clientY;
    $(this).on(eventmove, function (e) {
      // 处理移动端兼容
      var ev = isMobile ? e.originalEvent.touches[0] : e;
      // 获取每次移动时鼠标的x， y坐标
      var x = ev.clientX;
      var y = ev.clientY;
      // 获取与当前鼠标x，y轴与上次鼠标x，y轴之间的水平与垂直距离
      distX = x - prevX;
      distY = y - prevY;
      // 将两次鼠标之间的距离以0.1倍赋值给wrap盒子水平和垂直的角度
      rotY += distX * 0.2;
      rotX -= distY * 0.1;
      $('.wrap').css({
        transform: 'perspective(800px) translateX(-50%) translateY(-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
      })
      // 将当前的坐标付给上一个坐标
      prevX = ev.clientX;
      prevY = ev.clientY;
    })
  }).on(eventend, function () {
    $(this).off(eventmove);
    play = setInterval(function () {
      distX = distX * 0.95;
      distY = distY * 0.95;
      if (Math.abs(distX) <= 0.5 && Math.abs(distY) <= 0.5) {
        clearInterval( play );
      }
      console.log(distX, distY);
      rotY += distX * 0.2;
      rotX -= distY * 0.1;
      $('.wrap').css({
        transform: 'perspective(800px) translateX(-50%) translateY(-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
      })
    }, 30)
  })
})