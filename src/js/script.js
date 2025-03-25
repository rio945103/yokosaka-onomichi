const swiper = new Swiper("#js-gallery-swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 16,
  loop: true,
  pagination: {
    el: "#js-gallery-pagenation",
    clickable: true,
  },
  navigation: {
    nextEl: ".spots__button-next",
    prevEl: ".spots__button-prev",
  },
  breakpoints: {
    // PC（768px以上）
    768: {
      slidesPerView: 3,
      loopedSlides: 3,
    },
    // SP（767px以下）
    0: {
      slidesPerView: 1,
      loopedSlides: 1,
    },
  },
});






// 既存の jQuery のコードも `DOMContentLoaded` 内で実行
jQuery("#js-drawer-icon").on("click", function (e) {
  e.preventDefault();
  jQuery("#js-drawer-icon").toggleClass("is-checked");
  jQuery("#js-drawer-content").toggleClass("is-checked");
});

jQuery(document).ready(function () {
  // ✅ 最初の .is-open の .question__item-a を表示
  jQuery(".question__item.is-open .question__item-a").css("display", "flex");

  jQuery(".js-accordion").on("click", function (e) {
      e.preventDefault();

      const parent = jQuery(this).parent(); // ✅ アコーディオンの親要素
      const answer = jQuery(this).next(".question__item-a"); // ✅ アコーディオンの答え部分
      const img = jQuery(this).find(".question__item-button img"); // ✅ 画像ボタン

      if (parent.hasClass("is-open")) {
          parent.removeClass("is-open");
          answer.slideUp(300, function () {
              jQuery(this).removeClass("is-open"); // ✅ クラスを削除
          });
          img.attr("src", "./assets/img/q_button+.png"); // ✅ 閉じたときの画像
      } else {
          parent.addClass("is-open");
          answer.addClass("is-open").hide().slideDown(300); // ✅ `is-open` を追加して `display: flex;` を適用
          img.attr("src", "./assets/img/q_button-.png"); // ✅ 開いたときの画像
      }
  });
});





jQuery(".js-modal-open").on("click", function (e) {
  e.preventDefault();
  
  // クリックされたボタンの `data-target` の値を取得
  let targetModal = jQuery(this).data("target");

  // 取得した `id` を持つモーダルを開く
  jQuery(`#${targetModal}`)[0].showModal();
});

jQuery(".js-modal-close").on("click", function (e) {
  e.preventDefault();

  // 閉じるボタンが含まれる `dialog` を取得して閉じる
  jQuery(this).closest("dialog")[0].close();
});


jQuery("#js-drawer-content a[href^='#']").on("click", function (e) {
  jQuery("#js-drawer-content").removeClass("is-checked");
});

jQuery('a[href^="#"]').on("click", function (e) {
  e.preventDefault();

  const speed = 500;
  const id = jQuery(this).attr("href");
  const target = jQuery(id === "#" ? "html" : id);

  console.log("スクロール先:", id); // ← これを追加して動作チェック
  console.log("スクロール位置:", target.offset().top);

  if (!target.length) {
    console.warn("🚨 スクロール先のターゲットが見つかりません:", id);
    return;
  }

  const offset = 80; // 固定ヘッダーの高さ調整
  const position = target.offset().top - offset;

  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing"
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
