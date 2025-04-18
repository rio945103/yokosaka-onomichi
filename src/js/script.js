window.addEventListener('load', () => {
  const swiper = new Swiper('#js-gallery-swiper', {
    slidesPerView: 'auto',
    loop: true,
    centeredSlides: false,
    slidesPerGroup: 1,
    pagination: {
      el: '#js-gallery-pagenation',
      clickable: true,
    },
    navigation: {
      nextEl: '.spots__button-next',
      prevEl: '.spots__button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        centeredSlides: false,
      }
    }
  });
});


const aboutSwiper = new Swiper('#js-about-swiper', {
  slidesPerView: 'auto', // スライド幅をCSSで制御
  loop: true,
  allowTouchMove: false, // ユーザー操作を無効化（必要に応じて）
  spaceBetween: 10, // 👈 これが「gap」

  breakpoints: {
    768: {
      centeredSlides: false, // ← PC時は false にして左寄せや通常表示に
      spaceBetween: 20,
    }
  },

  autoplay: {
    delay: 0, // ← 0にすると連続で滑る
    disableOnInteraction: false,
  },
  speed: 5000, // 全体スピード（ms） ※ここで流れの速さを調整
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
  e.preventDefault(); // ←これを追加！！！
  jQuery("#js-drawer-content").removeClass("is-checked");

  // ドロワー内リンクのスムーススクロールもここに書いてOK！
  const id = jQuery(this).attr("href");
  const target = jQuery(id);

  if (!target.length) return;

  const offset = 80;
  const position = target.offset().top - offset;

  jQuery("html, body").animate({ scrollTop: position }, 500, "swing");
});


jQuery(document).on("click", 'a[href^="#"]', function (e) {
  console.log("✅ クリックされました！");

  const id = jQuery(this).attr("href");
  console.log("📍 href値:", id);

  if (!id || id === "#" || id.startsWith("http")) return;

  e.preventDefault();

  const target = jQuery(id);
  console.log("🎯 target要素:", target);

  if (!target.length) {
    console.warn("🚨 ターゲットが見つかりません:", id);
    return;
  }

  const offset = 80;
  const position = Math.max(target.offset().top - offset, 0);
  console.log("➡️ スクロール位置:", position);

  jQuery("div.body").stop().animate({ scrollTop: position }, 500, "swing");
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
