document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOMContentLoaded: Swiper 初期化を試みます");

  // Swiper の要素があるか確認
  const swiperElement = document.querySelector(".spots__swiper");
  if (!swiperElement) {
    console.error("🚨 Swiper の要素が見つかりませんでした！");
    return; // 要素がない場合は処理を中断
  }

  console.log("✅ Swiper の要素を発見！初期化を実行");

  // Swiper の初期化
  const swiper = new Swiper(".spots__swiper", {
    slidesPerView: 1, // ✅ 1枚ずつ表示
    spaceBetween: 16, // ✅ スライド間の間隔
    loop: true, // ✅ 無限ループ
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  console.log("✅ Swiper 初期化成功！", swiper);
});



  // 既存の jQuery のコードも `DOMContentLoaded` 内で実行
  jQuery("#js-drawer-icon").on("click", function (e) {
    e.preventDefault();
    jQuery("#js-drawer-icon").toggleClass("is-checked");
    jQuery("#js-drawer-content").toggleClass("is-checked");
  });

  jQuery(".js-accordion").on("click", function (e) {
    e.preventDefault();

    const parent = jQuery(this).parent(); // ✅ アコーディオンの親要素
    const img = jQuery(this).find(".question__item-button img"); // ✅ 画像要素を取得

    if (parent.hasClass("is-open")) {
        parent.removeClass("is-open");
        jQuery(this).next().slideUp();
        img.attr("src", "./assets/img/q_button+.png"); // ✅ 閉じたとき `q_button+.png` に戻す
    } else {
        parent.addClass("is-open");
        jQuery(this).next().slideDown();
        img.attr("src", "./assets/img/q_button-.png"); // ✅ 開いたとき `q_button-.png` に変更
    }
});



  jQuery(".js-modal-open").on("click", function (e) {
    e.preventDefault();
    jQuery("#js-about-modal")[0].showModal();
  });

  jQuery(".js-modal-close").on("click", function (e) {
    e.preventDefault();
    jQuery("#js-about-modal")[0].close();
  });

  jQuery("#js-drawer-content a[href^='#']").on("click", function (e) {
    jQuery("#js-drawer-icon").removeClass("is-checked");
    jQuery("#js-drawer-content").removeClass("is-checked");
  });

  jQuery("a[href^='#']").on("click", function (e) {
    const speed = 300;
    const id = jQuery(this).attr("href");
    const target = jQuery("#" == id ? "html" : id);
    const position = jQuery(target).offset().top;
    jQuery("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing" //swing or linear
    );
  });

  jQuery(window).on("scroll", function () {
    if (100 < jQuery(window).scrollTop()) {
      jQuery("#js-pagetop").addClass("is-show");
    } else {
      jQuery("#js-pagetop").removeClass("is-show");
    }
  });

  const intersectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in-view");
      } else {
        // entry.target.classList.remove("is-in-view");
      }
    });
  });

  const inViewItems = document.querySelectorAll(".js-in-view");
  inViewItems.forEach(function (inViewItem) {
    intersectionObserver.observe(inViewItem);
  });
