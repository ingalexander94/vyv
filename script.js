import { getAmenities, resetAmenities } from "./js/amenities.js";
import {
  closeSelects,
  getFilters,
  resetFilters,
  initFilters,
} from "./js/filters.js";
import { getRanges, initRanges, resetRanges } from "./js/ranges.js";

const $d = document;
const buttonSearch = $d.getElementById("button-search");
const buttonClear = $d.getElementById("button-clear");

const search = () => {
  const paramsFilters = getFilters();
  const paramsRanges = getRanges();
  const paramsAmenities = getAmenities();
  let url = `http://quechimbita.com/vyv${paramsFilters}${paramsRanges}${paramsAmenities}`;
  console.log(url);
  url = new URL(url);
  let entries = url.searchParams.entries();
  entries = Object.fromEntries(entries);
  console.log(entries);
};

const clear = () => {
  resetFilters();
  resetRanges();
  resetAmenities();
};

window.onload = function () {
  initFilters();
  initRanges();
  closeSelects();
  buttonSearch.addEventListener("click", search);
  buttonClear.addEventListener("click", clear);
};
