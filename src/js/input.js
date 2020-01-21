import Dropdown from "./dropdown";

class Input {
  constructor(container) {
    this.container = container;
    this.setup();
  }

  setup() {
    this.element.value = this.text;
    this.element.setAttribute("data-last-selected", this.text);
    this.element.setAttribute("data-dirty", false);
    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener("click", () => this.onClick());
    this.element.addEventListener("keyup", event => this.onKeyUp(event));
    this.element.addEventListener("blur", event => this.onBlur(event));
  }

  onClick() {
    this.dropdown.generate();
  }

  onKeyUp(event) {
    if (event.key === "Escape") {
      this.element.blur();
    } else {
      this.dropdown.generate();
    }
  }

  onBlur() {
    this.dropdown.onBlur();
  }

  get element() {
    if (this._element !== undefined) return this._element;
    const element = this.container.element.querySelector(".d-fa-input");
    return (this._element = element);
  }

  get select() {
    return this.element.previousElementSibling;
  }

  get selectedIndex() {
    return this.select.selectedIndex;
  }

  get text() {
    return this.select.children[this.selectedIndex].text;
  }

  get dropdown() {
    if (this._dropdown !== undefined) return this._dropdown;
    return (this._dropdown = new Dropdown(this));
  }
}

export default Input;
