document.addEventListener('DOMContentLoaded', function(){
  var menus  = document.querySelectorAll('.sub-menu-static-block');
  if (!menus.length) return;
  var desktopOffset = 245;
  var mobileOffset  = 210;
  var tracked = [];

  function resetTracked() {
    tracked = Array.from(menus).map(function(menu){
      var originalTop = menu.style.top;
      menu.style.top = '0px';
      var topDoc = menu.getBoundingClientRect().top + window.pageYOffset;
      menu.style.top = originalTop;
      return { menu: menu, initialOffset: topDoc };
    });
    syncAllMenus();
  }
  function syncAllMenus() {
    var scrolled = window.pageYOffset;
    var offsetCorrection = window.innerWidth < 992 ? mobileOffset : desktopOffset;
    tracked.forEach(function(item){
      var newTop = item.initialOffset - scrolled + offsetCorrection;
      item.menu.style.top = newTop + 'px';
    });
  }
  window.addEventListener('scroll', syncAllMenus, { passive: true });
  window.addEventListener('resize', syncAllMenus);
  document.querySelectorAll('.nav-menu-item-link').forEach(function(link){
    link.addEventListener('click', function(){
      setTimeout(resetTracked, 50);
    });
  });
  resetTracked();
});