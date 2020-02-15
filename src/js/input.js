import Dropdown from "./dropdown";

class Input {
  constructor(container) {
    this.container = container;
    this.element.value = this.text;
    this.element.setAttribute("data-last-selected", this.text);
    this.addEventListeners();
  }

  // Events

  addEventListeners() {
    this.element.addEventListener("focus", event => this.onFocus(event));
    this.element.addEventListener("keyup", event => this.onKeyUp(event));
    this.element.addEventListener("blur", event => this.onBlur(event));
    this.element.addEventListener("input", event => this.onInput(event));
  }

  onBlur() {
    this.dropdown.onBlur();
  }

  onInput() {
    this.dropdown.generate();
  }

  onFocus() {
    const length = this.element.value.length;
    if (length !== 0) {
      this.element.setSelectionRange(0, length);
    }
    this.dropdown.generate();
  }

  onKeyUp(event) {
    if (event.key === "Escape") {
      this.element.blur();
    }
  }

  onMouseDown(event) {
    if (event.target !== this.element) {
      this.dropdown.onMouseDown(event);
    }
  }

  onMouseUp(event) {
    if (event.target !== this.element) {
      this.selected = event.target.getAttribute("data-index");
      this.lastSelected = event.target.text;
      this.dropdown.onMouseUp(event);
    }
  }

  // Getters & Setters

  get dirty() {
    return this.element.getAttribute("data-dirty") === "true";
    }

  set dirty(boolean) {
    this.element.setAttribute("data-dirty", boolean);
  }

  get dropdown() {
    if (this._dropdown !== undefined) return this._dropdown;
    return (this._dropdown = new Dropdown(this));
  }

  get element() {
    if (this._element !== undefined) return this._element;
    const element = this.container.element.querySelector(".d-fa-input");
    return (this._element = element);
  }

  get lastSelected() {
    return this.element.getAttribute("data-last-selected");
  }

  set lastSelected(value) {
    this.element.setAttribute("data-last-selected", value);
  }

  get select() {
    if (this._select !== undefined) return this._select;
    return (this._select = this.container.element.querySelector("select"));
  }

  get selected() {
    return this.select.children[this.select.selectedIndex];
  }

  set selected(index) {
    this.select.selectedIndex = index;
  }

  get selectedOption() {
    return this.dropdown.getOption(this.selected);
  }

  get text() {
    return this.selected.text;
  }
}

export default Input;
