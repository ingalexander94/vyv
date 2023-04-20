const $d = document;

const amenities = $d.querySelectorAll(".list_checks input[type=checkbox]");

export const getAmenities = () => {
  const queryParams = Array.from(amenities).reduce(
    (acc, cur) =>
      (acc += `&${encodeURIComponent(normalizeText(cur.value))}=${
        cur.checked ? 1 : 0
      }`),
    ""
  );
  return queryParams;
};

export const resetAmenities = () => {
  const amenities = document.querySelectorAll(
    ".list_checks input[type=checkbox]:checked"
  );
  amenities.forEach((x) => {
    x.checked = false;
  });
};

const normalizeText = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
