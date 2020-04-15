import { gsap } from "gsap"

function pageTransition() {
  var tl = gsap.timeline();
  tl.set('.loading-screen', { transformOrigin: "bottom left"});
  tl.to('.loading-screen', { duration: .5, scaleY: 1});
  tl.to('.loading-screen', { duration: .5, scaleY: 0, skewX: 0, transformOrigin: "top left", ease: "power1.out", delay: 1 });
}

function contentAnimation() {

  var tl = gsap.timeline();
  tl.from('.is-animated', { duration: .5, translateY: 10, opacity: 0, stagger: 0.4 });
  tl.from('.main-navigation', { duration: .5, translateY: -10, opacity: 0});


  var headings = document.querySelectorAll('.green-heading-bg');
  headings.forEach((head, i) => {
    head.classList.add('show');
  });

}

export {pageTransition, contentAnimation}
