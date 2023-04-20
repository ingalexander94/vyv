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

const minGap = 0;

export const initRanges = () => {
  slideArea1();
  slideArea2();
  slidePrice1();
  slidePrice2();
  sliderOne.addEventListener("input", slideArea1);
  sliderTwo.addEventListener("input", slideArea2);
  sliderThree.addEventListener("input", slidePrice1);
  sliderFour.addEventListener("input", slidePrice2);
};

export const getRanges = () => {
  const paramsRanges = `minArea=${sliderOne.value}&maxArea=${sliderTwo.value}&minPrecio=${sliderThree.value}&maxPrecio=${sliderFour.value}`;
  return paramsRanges;
};

export const resetRanges = () => {
  sliderOne.value = sliderOne.min;
  sliderTwo.value = sliderTwo.max;
  sliderThree.value = sliderThree.min;
  sliderFour.value = sliderFour.max;
  displayValOne.textContent = formatPrice(sliderOne.value);
  displayValTwo.textContent = formatPrice(sliderTwo.value);
  displayValThree.textContent = formatPrice(sliderThree.value);
  displayValFour.textContent = formatPrice(sliderFour.value);
  fillColor(sliderOne, sliderTwo, sliderTrackOne);
  fillColor(sliderThree, sliderFour, sliderTrackTwo);
};

const slideArea1 = () => {
  slideLeft(sliderOne, sliderTwo, displayValOne, sliderTrackOne);
};

const slideArea2 = () => {
  slideRight(sliderOne, sliderTwo, displayValTwo, sliderTrackOne);
};

const slidePrice1 = () => {
  slideLeft(sliderThree, sliderFour, displayValThree, sliderTrackTwo);
};

const slidePrice2 = () => {
  slideRight(sliderThree, sliderFour, displayValFour, sliderTrackTwo);
};

const slideLeft = (slider1, slider2, display, track) => {
  if (parseInt(slider2.value) - parseInt(slider1.value) <= minGap) {
    slider1.value = parseInt(slider2.value) - minGap;
  }
  display.textContent = formatPrice(slider1.value);
  return fillColor(slider1, slider2, track);
};

const slideRight = (slider1, slider2, display, track) => {
  if (parseInt(slider2.value) - parseInt(slider1.value) <= minGap) {
    slider2.value = parseInt(slider1.value) + minGap;
  }
  display.textContent = formatPrice(slider2.value);
  return fillColor(slider1, slider2, track);
};

const fillColor = (slider1, slider2, sliderTrack) => {
  const percent1 =
    ((slider1.value - slider1.min) / (slider1.max - slider1.min)) * 100;
  const percent2 =
    ((slider2.value - slider2.min) / (slider2.max - slider2.min)) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #E37200 ${percent1}% , #E37200 ${percent2}%, #dadae5 ${percent2}%)`;
  return {
    min: slider1.value,
    max: slider2.value,
  };
};

const formatPrice = (price) => {
  const currency = Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumSignificantDigits: 3,
  });

  return currency.format(price);
};
