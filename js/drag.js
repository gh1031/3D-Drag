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
  var xl, yl, play = null;
 
  $('.wrap img').each(function (i) {
    $(this).css({
      'transform': 'rotateY(' + i * deg + 'deg) translateZ(' + 400 + 'px)'
    }).attr('ondragstart', 'return false');
    // 拖动事件
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|MQQBrowser|JUC|Windows Phone)/i))) {
      eventstart = 'touchstart';
      eventmove = 'touchmove';
      eventend = 'touchend';
      isMobile = true;
    }
    $(document).on(eventstart, function (e) {
      // 处理移动端兼容
      e = isMobile ? e.originalEvent.touches[0] : e;
      var prevx = e.clientX;
      var prevY = e.clientY;
      $(this).on(eventmove, function (e) {
        // 处理移动端兼容
        e = isMobile ? e.originalEvent.touches[0] : e;
        // 获取每次移动时鼠标的x， y坐标
        let x = e.clientX;
        let y = e.clientY;
        // 获取与当前鼠标x，y轴与上次鼠标x，y轴之间的水平与垂直距离
        xl = x - prevx;
        yl = y - prevY;
        // 将两次鼠标之间的距离以0.1倍赋值给wrap盒子水平和垂直的角度
        rotY += xl * 0.1;
        rotX -= yl * 0.1;
        console.log(rotX)
        $('.wrap').css({
          transform: 'perspective(800px) translateX(-50%) translateY(-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
        })
        // 将当前的坐标付给上一个坐标
        prevx = e.clientX;
        prevY = e.clientY;
      })
    }).on(eventend, function () {
      $(this).off('mousemove');
        var play = setInterval(function() {
          xl = xl * 0.95;
          yl = yl * 0.95;
          if (Math.abs(xl) < 0.5 && Math.abs(yl) < 0.5) {
            clearInterval(play);
          }
          rotY += xl * 0.1;
          rotX -= yl * 0.1;
          $('.wrap').css({
            transform: 'perspective(800px) translateX(-50%) translateY(-50%) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
          })
      }, 200)
    })
  })
})