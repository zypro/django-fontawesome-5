import Input from "./input";

class Container {
  constructor(container) {
    this.element = container;
    this.input = new Input(this);
    this.addEventListeners();
    this.setAdminOverflow();
  }

  // Events

  addEventListeners() {
    this.element.addEventListener("mousedown", event => {
      this.onMouseDown(this, event);
    });
    this.element.addEventListener("mouseup", event => {
      this.onMouseUp(this, event);
    });
  }

  onMouseDown(vm, event) {
    if (event.target !== vm.element) {
      vm.input.onMouseDown(event);
    }
  }

  onMouseUp(vm, event) {
    if (event.target !== vm.element) {
      vm.input.onMouseUp(event);
    }
  }

  // Getters & Setters

  get prefix() {
    if (this._prefix !== undefined) return this._prefix;
    const prefix = this.element.getAttribute("data-fontawesome-prefix");
    return (this._prefix = prefix);
  }

  // Methods

  setAdminOverflow() {
    const adminFormRow = this.element.closest(".form-row");
    if (adminFormRow) {
      adminFormRow.style.overflow = "visible";
    }
  }
}

const getContainers = isAdmin => {
  const _containers = [...document.getElementsByClassName("d-fa-select")];
  return _containers.map(container => {
    return new Container(container, isAdmin);
  });
};

export default getContainers;
