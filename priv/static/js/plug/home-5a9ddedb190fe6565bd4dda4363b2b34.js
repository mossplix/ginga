$(function() {

  // Screenshot browser

  $('.screenshots').click(function(){
    gallery = $(this);
    lastChild = gallery.children("li:last-child");

    lastChild.remove();

    gallery.prepend( lastChild );

  });

  // Fade out screenshot as the page is scrolled

  // $(window).scroll(function(i){
  //   var scrollVar = $(window).scrollTop();
  //   $('#intro .screenshot').css({'opacity':( 450-scrollVar )/350});
  // })


  // Toggle tour screenshot slide in

  // $('.tour-item h2').waypoint(function() {
  //   $(this).parents(".tour-item").find('.screenshot').addClass('show');
  // },
  // {
  //   offset: 'bottom-in-view'
  // });

  // Update nav on scroll

  // $('section').waypoint(function() {
  //   renderNav(this.id);
  // });

  // Scroll to sections

  $(".pricing-link").click(function(e) {
    $('html, body').animate({
        scrollTop: $("#pricing").offset().top
    }, 700);

    e.preventDefault();
  });

  var titles = ["IOError", "URLError", "SuspiciousOperation", "HTTP Error 500: Server Error", "UnicodeDecodeError"];
  var messages =["File 'app/tasks/fetch_source.py', line 138, in fetch_url timeout=settings.APP_SOURCE_FETCH_TIMEOUT)", "File 'python2.7/urllib2.py', line 126, in urlopen return _opener.open(url, data, timeout)", "'ascii' codec can't decode byte 0xc3 in position 45: ordinal not in range(128)"];
  var entriesCount = 0;
  var $messages = $('.messages');

  function updateTerminal() {

      var randTitle = titles[Math.floor(Math.random() * titles.length)];
      var randMessage = messages[Math.floor(Math.random() * messages.length)];

      var timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

      var newString = '<div class="entry"><span class="timestamp">' + timestamp + '</span> <strong>' + randTitle + '</strong> ' + randMessage + '</div>';
      $messages.append(newString);
      if (++entriesCount > 20) {
        $messages.children().slice(0, 10).remove();
        entriesCount -= 10;
      }
  }

  window.setInterval(updateTerminal, 200);

});
