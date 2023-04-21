const $d = document;

const inputRanges = $d.querySelectorAll("div.slide-ranges > div.wrapper");

const minGap = 0;

export const initRanges = () => {
  inputRanges.forEach((range) => {
    const [values, container] = range.children;
    const [displayValOne, , displayValTwo] = values.children;
    const [sliderTrack, sliderOne, sliderTwo] = container.children;
    slideLeft(sliderOne, sliderTwo, displayValOne, sliderTrack);
    slideRight(sliderOne, sliderTwo, displayValTwo, sliderTrack);
    sliderOne.addEventListener("input", () =>
      slideLeft(sliderOne, sliderTwo, displayValOne, sliderTrack)
    );
    sliderTwo.addEventListener("input", () =>
      slideRight(sliderOne, sliderTwo, displayValTwo, sliderTrack)
    );
  });
};

export const resetRanges = () => {
  inputRanges.forEach((range) => {
    const [values, container] = range.children;
    const [displayValOne, , displayValTwo] = values.children;
    const [sliderTrack, sliderOne, sliderTwo] = container.children;
    sliderOne.value = sliderOne.min;
    sliderTwo.value = sliderTwo.max;
    displayValOne.textContent = formatPrice(sliderOne.value);
    displayValTwo.textContent = formatPrice(sliderTwo.value);
    fillColor(sliderOne, sliderTwo, sliderTrack);
  });
};

export const getRanges = () => {
  let paramsRanges = "";
  inputRanges.forEach((range) => {
    const [, container] = range.children;
    const [, sliderOne, sliderTwo] = container.children;
    const name = capitalize(sliderOne.name);
    paramsRanges += `min${name}=${sliderOne.value}&max${name}=${sliderTwo.value}&`;
  });
  return paramsRanges.slice(0, -1);
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

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
