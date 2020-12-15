import { isNatureNumber } from "../util/validation.js";
import { ELEMENT_INFO, ERROR_MESSAGE } from "../util/constants.js";

export default function SectionInput({ $target, stations, selectedLineName }) {
  this.$container = document.createElement("section");
  this.$container.className = "section-input";
  $target.append(this.$container);

  this.stations = stations;
  this.selectedLineName = selectedLineName;

  const { sectionStationSelector, sectionOrderInput, sectionAddButton } = ELEMENT_INFO;

  this.bindOnSubmit = () => {
    this.$container.addEventListener("click", (e) => {
      if (e.target.id === sectionAddButton.id) {
        const sectionOrder = document.querySelector(`#${sectionOrderInput.id}`).value - 0;
        const selectedStation = document.querySelector(`#${sectionStationSelector.id}`).value;

        if (this.isValideInput(sectionOrder, selectedStation)) {
          // TODO: 구간 추가하기
        }
      }
    });
  };

  this.isValideInput = (sectionOrder, selectedStation) => {
    return this.isNatureNumber(sectionOrder);
  };

  this.isNatureNumber = (sectionOrder) => {
    const result = isNatureNumber(sectionOrder);

    if (!result) {
      alert(ERROR_MESSAGE.notNatureNumberSectionOrder);
    }

    return result;
  };

  this.setState = (nextSelectedLineName) => {
    this.selectedLineName = nextSelectedLineName;

    this.render();
  };

  this.createSelectOptionHTMLString = () => {
    return this.stations.map((station) => `<option value="${station}">${station}</option>`).join("");
  };

  this.render = () => {
    this.$container.innerHTML =
      this.selectedLineName !== ""
        ? `
            <h2>${this.selectedLineName} 관리</h2>
            <form>
              <h3>구간 등록</h3>
              <select id="${sectionStationSelector.id}">${this.createSelectOptionHTMLString()}</select>
              <input id="${sectionOrderInput.id}" type="number" name="${sectionOrderInput.text}" placeholder="${
            sectionOrderInput.text
          }" />
              <button id="${sectionAddButton.id}" type="button">${sectionAddButton.text}</button>
            </form>
          `
        : "";
  };

  this.render();
  this.bindOnSubmit();
}
