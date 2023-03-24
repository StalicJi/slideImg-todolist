"use strict";
// --------多元件輪播start--------

const slides = document.querySelectorAll(".slide-group");

let counter = 0;

const slideImage = () => {
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
};

setInterval(() => {
  if (counter >= 2) counter = -1;
  counter++;
  // console.log(counter);
  slideImage();
}, 5000);

const btn_slide1 = () => {
  counter = 0;
  slideImage();
};
const btn_slide2 = () => {
  counter = 1;
  slideImage();
};
const btn_slide3 = () => {
  counter = 2;
  slideImage();
};
// --------多元件輪播end--------
