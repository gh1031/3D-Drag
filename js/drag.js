/**
 * @name drag
 * @desc make img dragable
 */

 $(function () {
  var imgL = $('.wrap img').length;
  var deg = 360 / imgL;
  var rotY = 0;
  var rotX = -10;
  $('html').attr('onselectstart', 'return false')
  $('.wrap img').each(function(i) {
    $(this).css({
      'transform': 'rotateY(' + i * deg + 'deg) translateZ(' + 350 +'px)'
    }).attr('ondragstart', 'return false');
    // 拖动事件
    $(document).mousedown(function(e) {
      console.log('down')
      var prevx = e.clientX;
      var prevY = e.clientY;
      $(this).on('mousemove', function(e) {
        // $(document.body).append(`
        //   <div style="width:10px; height:10px; background:#f00; position:absolute; left:${e.clientX}px;top: ${e.clientY}px">
        //   </div>
        // `)
        let x = e.clientX;
        let y = e.clientY;
        let xl = x - prevx;
        let yl = y - prevY;
        rotY += xl * 0.1;
        rotX -= yl * 0.1;
        $('.wrap').css({
          transform: 'perspective(800px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg)'
        })
        xl = e.clientX;
        yl = e.clientY;
      })
    }).mouseup(function() {
      console.log('up')
      $(this).off('mousemove')
    })

  })
 })