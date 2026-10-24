// Golden Team template: mobile menu, light/dark toggle and the squad filter. No dependencies.
(function () {
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  if (menuToggle && menu) {
    var setOpen = function (open) {
      menuToggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
    };
    menuToggle.addEventListener('click', function () {
      setOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });
    // The links scroll to a section of the same page, so the menu closes once one is tapped.
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });
  }

  // The choice is stored in localStorage; the inline script in <head> applies it before the page paints.
  document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var dark = document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
      } catch (e) {
        // storage unavailable: the toggle still works for this visit
      }
    });
  });

  // Tab filters: a button with data-filter="value" inside [data-filter-group] shows the items of the
  // same group whose data-filter-item lists that value; "all" shows every item.
  document.querySelectorAll('[data-filter-group]').forEach(function (group) {
    var buttons = group.querySelectorAll('[data-filter]');
    var items = group.querySelectorAll('[data-filter-item]');
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var value = button.getAttribute('data-filter');
        buttons.forEach(function (b) {
          b.setAttribute('aria-pressed', String(b === button));
        });
        items.forEach(function (item) {
          item.hidden = value !== 'all' && item.getAttribute('data-filter-item').split(' ').indexOf(value) === -1;
        });
      });
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
