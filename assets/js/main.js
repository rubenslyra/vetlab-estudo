/* ============================================================
   VET-Lab Docs — jQuery interactions
   Copy-to-clipboard, scrollspy sidebar, smooth nav
   ============================================================ */
(function () {
  "use strict";

  $(function () {

    /* ---------- 1. Botões de cópia de código ---------- */
    $(".copy-btn").on("click", function () {
      var $btn = $(this);
      var $pre = $btn.closest(".code-block").find("pre code");
      var text = $pre.text();

      // fallback para navegadores sem clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          markCopied($btn);
        }, function () {
          fallbackCopy(text, $btn);
        });
      } else {
        fallbackCopy(text, $btn);
      }
    });

    function fallbackCopy(text, $btn) {
      var $ta = $("<textarea>");
      $ta.val(text).css({ position: "fixed", opacity: 0, top: 0, left: 0 });
      $("body").append($ta);
      $ta[0].select();
      try { document.execCommand("copy"); markCopied($btn); } catch (e) {}
      $ta.remove();
    }

    function markCopied($btn) {
      var original = $btn.text();
      $btn.text("COPIADO ✓").addClass("copied");
      setTimeout(function () {
        $btn.text(original).removeClass("copied");
      }, 1800);
    }

    /* ---------- 2. Scrollspy para sidebar ativa ---------- */
    var $sections = $(".docs-content section[id]");
    var $navLinks = $(".docs-sidebar a[href^='#']");

    if ($sections.length && $navLinks.length) {
      $(window).on("scroll", function () {
        var scrollPos = $(window).scrollTop() + 120;
        var currentId = "";
        $sections.each(function () {
          var $s = $(this);
          if ($s.offset().top <= scrollPos) {
            currentId = $s.attr("id");
          }
        });
        if (currentId) {
          $navLinks.removeClass("active");
          $navLinks.filter('a[href="#' + currentId + '"]').addClass("active");
        }
      });
    }

    /* ---------- 3. Smooth scroll para âncoras ---------- */
    $('a[href^="#"]').not('[href="#"]').on("click", function (e) {
      var target = $(this).attr("href");
      var $target = $(target);
      if ($target.length) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: $target.offset().top - 80 }, 400);
      }
    });

    /* ---------- 4. Ano automático no footer ---------- */
    $(".year-now").text(new Date().getFullYear());

    /* ---------- 5. Highlight sutil no header ao rolar ---------- */
    var $nav = $(".navbar-vetlab");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 20) {
        $nav.css("box-shadow", "0 4px 20px rgba(0,0,0,0.4)");
      } else {
        $nav.css("box-shadow", "none");
      }
    });

  });
})();
