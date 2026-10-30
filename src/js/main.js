// Golden Team template: mobile menu, light/dark toggle, the squad filter and the blur-in reveal. No dependencies.
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

  // Blur-in reveal (styles at the end of css/input.css). Plain-text headings with data-split get one
  // span per word, children of data-reveal-group get a stagger index, and each data-reveal="scroll"
  // element is marked data-shown once it scrolls into view.
  document.querySelectorAll('[data-split]').forEach(function (heading) {
    var words = heading.textContent.trim().split(/\s+/);
    heading.textContent = '';
    words.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'reveal-word';
      span.style.setProperty('--w', i);
      span.textContent = word;
      heading.appendChild(span);
      if (i < words.length - 1) heading.appendChild(document.createTextNode(' '));
    });
    heading.setAttribute('data-split-ready', '');
  });

  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    var size = parseInt(group.getAttribute('data-reveal-group'), 10) || group.children.length;
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--reveal-i', i % size);
    });
  });

  if (document.documentElement.getAttribute('data-reveal') === 'armed') {
    window.clubRevealStarted = true;
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute('data-shown', '');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -5% 0px' }
    );
    document.querySelectorAll('[data-reveal="scroll"]').forEach(function (el) {
      observer.observe(el);
    });
  }
})();
