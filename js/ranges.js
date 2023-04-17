const minGap = 0;

export const slideLeft = (slider1, slider2, display, track, max) => {
  if (parseInt(slider2.value) - parseInt(slider1.value) <= minGap) {
    slider1.value = parseInt(slider2.value) - minGap;
  }
  display.textContent = formatPrice(slider1.value);
  return fillColor(slider1, slider2, track, max);
};

export const slideRight = (slider1, slider2, display, track, max) => {
  if (parseInt(slider2.value) - parseInt(slider1.value) <= minGap) {
    slider2.value = parseInt(slider1.value) + minGap;
  }
  display.textContent = formatPrice(slider2.value);
  return fillColor(slider1, slider2, track, max);
};

const fillColor = (slider1, slider2, sliderTrack, max) => {
  const percent1 = (slider1.value / max) * 100;
  const percent2 = (slider2.value / max) * 100;
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
