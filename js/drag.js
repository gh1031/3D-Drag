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
    0: Math.random().toString(2),
    1: Math.random().toString(2),
    2: Math.random().toString(2),
    3: Math.random().toString(2),
    4: Math.random().toString(2),
  }

  /**
   * @description 设置所有图片向Z轴移动350px
   */
  $('.wrap img').each(function (index) {
    $(this).css({
      'transform': 'rotateY(' + index * deg + 'deg) translateZ(' + 350 + 'px)'
    }).attr('ondragstart', 'return false').on('click', function () {
      // 显示模态框
      $('.mask').css('display', 'flex');
      $('.mask img').attr('src', './img/img' + index + '.JPG');

      /**
       * @description 点击按钮切换图片
       */
      function switchPic(direction) {
        if (direction === 'prev') {
          index++;
          if (index >= imgL - 1) index = 0;
        } else {
          index--;
          if (index < 0) index = imgL - 1;
        }
        $('.mask img').attr('src', './img/img' + index + '.JPG');
      }
      $('.mask .prev').on('click', function () {
        switchPic('prev');
      })
      $('.mask .next').on('click', function () {
        switchPic('next');
      })

      $('.mask span').html(text[index + ''])

      // 隐藏模态框
      $('.mask .big-img').on('click', function () {
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

  /**
   * @description 拖拽动作
   */
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
        transform: 'perspective(1000px) translateX(-50%) translateY(-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
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
        clearInterval(play);
      }
      rotY += distX * 0.2;
      rotX -= distY * 0.1;
      $('.wrap').css({
        transform: 'perspective(1000px) translateX(-50%) translateY(-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
      })
    }, 30)
  })

  /**
   * @description 控制音乐播放与暂停
   */
  var audio = document.querySelector('audio')

  function playAudio() {
    audio.play()
  }

  function pauseAudio() {
    audio.pause()
  }
  playAudio()
  $('#pause').on('click', function (e) {
    e.stopPropagation();
    pauseAudio()
  })
  $('#play').on('click', function (e) {
    e.stopPropagation()
    playAudio();
  })

})