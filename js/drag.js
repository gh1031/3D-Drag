/**
 * @name drag
 * @desc make img dragable
 */

 $(function () {
  var imgL = $('.wrap img').size();
  var deg = 360 / imgL;
  $('.wrap img').each(function(i) {
    $(this).css({
      transform: 'rotateY(' + i * deg + 'deg), translateX(' + 100 + 'px)',
    })
  })
 })