const scroll = new LocomotiveScroll({
  el: document.querySelector("#container"),
  smooth: true,
});

function gsapAnim() {
  gsap.from("#nav", {
    y: 10,
    opacity: 0,
    duration: 1,
  });
  var tl = gsap.timeline();
  tl.from("#heading h1", {
    y: 100,
    duration: 1,
    opacity: 0,
    stagger: 0.2,
  })
    .from("#heading h5", {
      y: -30,
      opacity: 0,
    })
    .from("#sideheading h5", {
      y: -20,
      opacity: 0,
      stagger: 0.2,
    })
    .from("#headfooter", {
      y: -30,
      opacity: 0,
    });
}
function circleMouseFollower() {
  window.addEventListener("mousemove", function (event) {
    const circle = document.querySelector("#minicircle");

    if (event.clientY > 10 && event.clientY < 630) {
      circle.style.opacity = 1;
      circle.style.transform = `translate(
            ${event.clientX}px,
            ${event.clientY}px
          )`;
    } else {
      circle.style.opacity = 0;
    }
  });
}
function imageMover() {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var timeOut;
    const img = elem.querySelector("img");
    elem.addEventListener("mousemove", function (event) {
      clearTimeout(hideTimeout);
      img.style.display = "block";
      const imgOffsetX = event.clientX - elem.getBoundingClientRect().left;
      const imgOffsetY = event.clientY - elem.getBoundingClientRect().top;
      img.style.transform = `translate(${imgOffsetX}px, ${imgOffsetY}px)`;
    });

    elem.addEventListener("mouseleave", function () {
      hideTimeout = setTimeout(function () {
        img.style.display = "none";
      }, 200); // Adjust the delay as needed
    });
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  const img = elem.querySelector("img");
  var xPrev = 0;
  var xDiff = 0;

  elem.addEventListener("mouseenter", function () {
    gsap.to(img, {
      opacity: 1,
      ease: "power3.out",
    });
  });

  elem.addEventListener("mouseleave", function (event) {
    const toElement = event.relatedTarget || event.toElement;
    if (!elem.contains(toElement)) {
      gsap.to(img, {
        opacity: 0,
      });
    }
  });

  elem.addEventListener("mousemove", function (event) {
    xCoordinate = event.clientX - elem.getBoundingClientRect().left;
    xDiff = xCoordinate - xPrev;
    xPrev = xCoordinate;
    var rotate = gsap.utils.clamp(-20, 20, xDiff);

    gsap.to(img, {
      ease: "power3.out",
      top: event.clientY - elem.getBoundingClientRect().top,
      left: xCoordinate,
      rotate: rotate,
    });
  });
});

gsapAnim();
circleMouseFollower();
