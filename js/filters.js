const $d = document;

const selects = $d.querySelectorAll(".modal-filters > div div ul");
let active = null;

export const selectOption = () => {
  selects.forEach((ul, index) => {
    ul.addEventListener("click", ({ target }) => {
      if (target.tagName === "LI") {
        const { textContent } = target;
        let label = ul.previousElementSibling;
        Array.from(ul.children).forEach((li) => (li.className = ""));
        switch (index) {
          case 3:
            const room = pluralize(textContent, "habitación", "habitaciones");
            if (label.textContent === room) {
              label.innerHTML = "";
            } else {
              label.innerHTML = room;
              target.classList.add("active");
            }
            break;
          case 4:
            const bathroom = pluralize(textContent, "baño", "baños");
            if (label.textContent === bathroom) {
              label.innerHTML = "";
            } else {
              label.innerHTML = bathroom;
              target.classList.add("active");
            }
            break;
          case 5:
            const stratum = `Estrato ${textContent}`;
            if (label.textContent === stratum) {
              label.innerHTML = "";
            } else {
              label.innerHTML = stratum;
              target.classList.add("active");
            }
            break;
          default:
            label.innerHTML = textContent;
        }

        const checkbox = label.previousElementSibling;
        checkbox.checked = false;
      }
    });
  });
};

export const resetOptions = () => {
  selects.forEach((ul) => {
    let label = ul.previousElementSibling;
    label.innerHTML = "";
    const checkbox = label.previousElementSibling;
    checkbox.checked = false;
    Array.from(ul.children).forEach((li) => (li.className = ""));
  });
};

export const getFilters = () => {
  let queryParams = "?";
  selects.forEach((ul, index) => {
    let label = ul.previousElementSibling;
    let value = label.textContent;
    if (index < 3) {
      value = label.textContent;
    } else if (index > 2 && index < selects.length - 1) {
      value = label.textContent.charAt(0);
    } else {
      value = label.textContent.slice(-1);
    }
    queryParams += `${label.htmlFor}=${encodeURIComponent(value)}&`;
  });
  return queryParams;
};

export const closeSelects = () => {
  const inputs = $d.querySelectorAll(
    ".modal-filters > div div input[type=checkbox]"
  );
  inputs.forEach((input, index) => {
    input.addEventListener("click", () => {
      if (active !== null && active !== index) {
        inputs[active].checked = false;
      }
      active = index;
    });
  });
};

const pluralize = (count, singular, plural) => {
  const pluralRules = new Intl.PluralRules("es-ES");
  const numbering = pluralRules.select(parseInt(count));
  return `${count} ${numbering === "one" ? singular : plural}`;
};
