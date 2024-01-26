//@prepros-prepend scrollAnim.js

$(document).ready(function () {
  AOS.init({
    once: true // animate once
  });

  $(window).on("scroll", function () {
    AOS.init();
  });

  window.addEventListener('resize', () => {
    AOS.refresh();
  });


  // SLIDER
  // ------------------------
  var elms = document.getElementsByClassName('splide');
  var sliders = [];
  var sliderTab;

  for (var i = 0, len = elms.length; i < len; i++) {

    var options = {
      perPage: 1,
      arrows: true,
      pagination: false,
      gap: "0",
    };

    // Slider 1
    if (elms[i].classList.contains('slider-body1')) {
      options.perPage = 4;
      options.gap = "24px";
      // 解決拖曳時lightbox無法順利開啟的問題
      options.drag = false;
      options.breakpoints = {
        1420: {
          perPage: 3,
          // gap: "0",
        },
        1024: {
          perPage: 1,
          drag: true,

        },
      }
    }

    // Slider 2
    if (elms[i].classList.contains('slider-body2')) {

      options.perPage = 3;
      options.gap = "50px";
      options.breakpoints = {
        1420: {
          gap: "30px",
        },
        1024: {
          // width: "95%",
          perPage: 1,
          drag: true,
          gap: 0,
        },
      }
    }
    sliders[i] = new Splide(elms[i], options).mount();
  }



  // Resize
  function sliderResize() {
    for (var i = 0; i < sliders.length; i++) {
      sliders[i].emit('resize');
    }
  }

  // Navbar
  // ------------------------
  $(".nav__trigger").on("click", function () {
    var $nav = $(".nav");
    var $body = $("body");

    if (!$nav.hasClass("nav--active")) {
      $nav.addClass("nav--active");
      $body.addClass("scroll-fixed");
    } else {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");
    }

    $(".nav__link").on("click", function () {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");

    });

    $(".nav__overlay").on("click", function () {
      $nav.removeClass("nav--active");
      $body.removeClass("scroll-fixed");
    });

  });

  // Scroll 到區塊時 Navbar選單加上active
  // ------------------------
  $(window).on('scroll touchmove', function () {
    var scrollPos = $(this).scrollTop();
    var documentHeight = $(document).height();
    var windowHeight = $(this).height();
    var connectionHeight = $('#section-connection').height();

    $('section').each(function () {
      var sectionTop = $(this).offset().top - 100;
      var sectionBottom = sectionTop + $(this).height();
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        var sectionId = $(this).attr('id');
        $('.nav__link').removeClass('active');
        $('.nav__link[href="#' + sectionId + '"]').addClass('active');
      }
    });

    // Check if at the bottom of the page（解決section-connection高度不足問題）
    if (scrollPos + windowHeight + connectionHeight + (window.innerWidth <= 768 ? 300 : 0) >= documentHeight) {
      $('.nav__link').removeClass('active');
      $('.nav__link[href="#section-connection"]').addClass('active');
    }
  });
});



// 引入最新消息
// 使用 fetch 異步獲取 JSON 數據
let today = new Date();
let dateString = today.toISOString().substring(0, 10).replace(/-/g, '');
fetch('./source/json/news.json?v=' + dateString)
  .then(response => response.json())
  .then(newsData => {
    // 顯示最新五條
    newsData.slice(0, 5).forEach(item => {
      document.getElementById('news-container').innerHTML += `
            <div class="news-wrap">
                <div class="date">${item.date}</div>
                <div class="text">${item.text}</div>
            </div>
        `;
    });
  })
  .catch(error => console.error('Error fetching JSON:', error));

document.addEventListener("DOMContentLoaded", function () {
  let scripts = document.querySelectorAll('script.timestamp');

  scripts.forEach(function (script) {
    if (script.src) {
      script.src = script.src + "?v=" + dateString;
    }
  });
});


