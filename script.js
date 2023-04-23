const CLASS = "-active";
let flg = false;
let accordionFlg = false;

let hamburger = document.getElementById("js-hamburger");
let menu = document.querySelector(".js-nav-area");
let accordionTrigger = document.querySelectorAll(".js-sp-accordion-trigger");
let focusTrap = document.getElementById("js-focus-trap");

const backgroundFix = (bool) => {
  const scrollingElement = () => {
    // const browser = window.navigator.userAgent.toLowerCase();
    if ("scrollingElement" in document) {
      console.log(document.scrollingElement);
      return document.scrollingElement;
    }
    console.log(document.documentElement);
    return document.documentElement;
  };
  const scrollY = bool
    ? scrollingElement().scrollTop
    : parseInt(document.body.style.top || "0");
  const fixedStyles = {
    height: "100vh",
    position: "fixed",
    top: `${scrollY * -1}px`,
    left: "0",
    width: "100vw",
  };
  Object.keys(fixedStyles).forEach((key) => {
    document.body.style[key] = bool ? fixedStyles[key] : "";
  });
  if (!bool) {
    window.scrollTo(0, scrollY * -1);
  }
};

window.addEventListener("keydown", () => {
  if (event.key === "Escape") {
    hamburger.classList.remove(CLASS);
    menu.classList.remove(CLASS);
    hamburger.setAttribute("aria-expanded", "false");
    flg = false;
    accordionTrigger.forEach((item) => {
      if (accordionFlg) {
        item.classList.remove(CLASS);
        item.nextElementSibling.classList.toggle(CLASS);
        item.setAttribute("aria-expanded", "false");
        accordionFlg = false;
      }
    });
  }
});
hamburger.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle(CLASS);
  menu.classList.toggle(CLASS);
  if (flg) {
    backgroundFix(false);
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.focus();
    flg = false;
  } else {
    backgroundFix(true);
    hamburger.setAttribute("aria-expanded", "true");
    flg = true;
  }
});
accordionTrigger.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle(CLASS);
    e.currentTarget.nextElementSibling.classList.toggle(CLASS);
    if (accordionFlg) {
      e.currentTarget.setAttribute("aria-expanded", "false");
      accordionFlg = false;
    } else {
      e.currentTarget.setAttribute("aria-expanded", "true");
      accordionFlg = true;
    }
  });
});
focusTrap.addEventListener("focus", (e) => {
  hamburger.focus();
});
