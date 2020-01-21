import Option from "./option";

export const dropdowns = {};

class Dropdown {
  constructor(input) {
    this.input = input;
    this.container = input.container;
    this.select = input.element.previousElementSibling;
  }

  get dirty() {
    return this.input.element.getAttribute("data-dirty") === "true";
  }

  set dirty(boolean) {
    this.input.element.setAttribute("data-dirty", boolean);
  }

  get lastSelected() {
    return this.input.element.getAttribute("data-last-selected");
  }

  set lastSelected(value) {
    this.input.element.setAttribute("data-last-selected", value);
  }

  get selectedIndex() {
    return this.select.selectedIndex;
  }

  setSelected(event) {
    const index = event.target.getAttribute("data-index");
    this.select.children[this.selectedIndex].setAttribute("selected", false);
    this.select.children[index].setAttribute("selected", true);
    this.lastSelected = event.target.text;
    this.value = event.target.text;
    this.dirty = false;
  }

  get value() {
    return this.input.element.value;
  }

  set value(value) {
    this.input.element.value = value;
  }

  get options() {
    if (this._options !== undefined) return this._options;
    const selects = [
      ...this.container.element.getElementsByTagName("select")[0].children
    ];
    const options = selects.map(
      (option, index) => new Option(this, option, index)
    );
    return (this._options = options);
  }

  get filteredOptions() {
    if (this.value === this.lastSelected && !this.dirty) return this.options;

    if (this.value) {
      const words = this.value.toLowerCase().split(/[,]+/);
      return this.options.filter(option => {
        const match = words.filter(word => {
          return option.label.toLowerCase().indexOf(word) > -1;
        });
        return match.length === words.length;
      });
    }

    return this.options;
  }

  addOnClick() {
    this._element.addEventListener("click", event => this.onClick(event));
  }

  onClick(event) {
    this.setSelected(event);
    event.target.blur();
  }

  onBlur() {
    if (this.value !== this.lastSelected) {
      if (this.lastSelected) {
        // eslint-disable-next-line no-param-reassign
        this.value = this.lastSelected;
      }
    } else {
      this.dirty = false;
    }
  }

  generate() {
    const element = document.createElement("div");
    element.setAttribute("class", "d-fa-dropdown");
    this.filteredOptions.forEach(option => {
      option.append(element);
    });
    if (this._element) {
      this.container.element.removeChild(this._element);
      this.dirty = true;
    }
    this._element = this.container.element.appendChild(element);
    this.addOnClick();
  }
}

export default Dropdown;
