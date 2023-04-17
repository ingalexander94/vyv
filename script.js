import { slideLeft, slideRight } from "./js/ranges.js";

const $d = document;

const sliderOne = $d.getElementById("slider-1");
const sliderTwo = $d.getElementById("slider-2");
const sliderThree = $d.getElementById("slider-3");
const sliderFour = $d.getElementById("slider-4");
const displayValOne = $d.getElementById("range1");
const displayValTwo = $d.getElementById("range2");
const displayValThree = $d.getElementById("range3");
const displayValFour = $d.getElementById("range4");
const sliderTrackOne = $d.querySelector(".slider-track-1");
const sliderTrackTwo = $d.querySelector(".slider-track-2");
const buttonSearch = $d.getElementById("button-search");
const buttonClear = $d.getElementById("button-clear");
const sliderMaxValueOne = sliderOne.max;
const sliderMaxValueTwo = sliderTwo.max;

const slideArea1 = () => {
  slideLeft(
    sliderOne,
    sliderTwo,
    displayValOne,
    sliderTrackOne,
    sliderMaxValueOne
  );
};

const slideArea2 = () => {
  slideRight(
    sliderOne,
    sliderTwo,
    displayValTwo,
    sliderTrackOne,
    sliderMaxValueOne
  );
};

const slidePrice1 = () => {
  slideLeft(
    sliderThree,
    sliderFour,
    displayValThree,
    sliderTrackTwo,
    sliderMaxValueTwo
  );
};

const slidePrice2 = () => {
  slideRight(
    sliderThree,
    sliderFour,
    displayValFour,
    sliderTrackTwo,
    sliderMaxValueTwo
  );
};

const getData = () => {
  let filters = `minArea=${sliderOne.value}?maxArea=${sliderTwo.value}?minPrice=${sliderThree.value}?maxPrice=${sliderFour.value}`;

  const amenities = document.querySelectorAll(
    ".list_checks input[type=checkbox]"
  );

  filters = Array.from(amenities).reduce(
    (acc, cur) =>
      (acc += `?${encodeURIComponent(cur.value)}=${cur.checked ? 1 : 0}`),
    filters
  );
  console.log(filters);
};

const clearData = () => {
  const amenities = document.querySelectorAll(
    ".list_checks input[type=checkbox]:checked"
  );
  amenities.forEach((x) => {
    x.checked = false;
  });
};

window.onload = function () {
  slideArea1();
  slideArea2();
  slidePrice1();
  slidePrice2();

  sliderOne.addEventListener("input", slideArea1);
  sliderTwo.addEventListener("input", slideArea2);
  sliderThree.addEventListener("input", slidePrice1);
  sliderFour.addEventListener("input", slidePrice2);
  buttonSearch.addEventListener("click", getData);
  buttonClear.addEventListener("click", clearData);
};
