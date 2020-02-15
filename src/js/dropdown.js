import Option from "./option";

export const dropdowns = {};

class Dropdown {
  constructor(input) {
    this.input = input;
    this.container = input.container;
  }

  // Events

  onBlur() {
    if (this.input.lastSelected) {
      // eslint-disable-next-line no-param-reassign
      this.value = this.input.lastSelected;
    }
    this.input.dirty = false;
  }

  onMouseDown(event) {
    event.preventDefault();
  }

  onMouseUp(event) {
    const option = this.getOption(this.input.selected);
    option.onMouseUp(event);
    this.value = event.target.text;
    this.input.dirty = false;
  }

  // Getters & Setters

  get filteredOptions() {
    if (this.value === this.input.lastSelected && !this.input.dirty)
      return this.options;

    if (this.value) {
      const words = this.value.toLowerCase().split(/\s+/);
      return this.options.filter(option => {
        const match = words.filter(word => {
          return option.label.toLowerCase().indexOf(word) > -1;
        });
        return match.length === words.length;
      });
    }

    return this.options;
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

  get value() {
    return this.input.element.value;
  }

  set value(value) {
    this.input.element.value = value;
  }

  // Methods

  getOption(option) {
    const stylePrefix = Option.getStylePrefix(option);
    const iconId = Option.getIconId(option);
    return this.options.find(_option => {
      return _option.stylePrefix === stylePrefix && _option.iconId === iconId;
    });
  }

  generate() {
    const element = document.createElement("div");
    element.setAttribute("class", "d-fa-dropdown");
    this.filteredOptions.forEach(option => {
      option.append(element);
    });
    if (this.element) {
      this.container.element.removeChild(this.element);
    }
    this.element = this.container.element.appendChild(element);
    this.input.dirty = true;
  }
}

export default Dropdown;
