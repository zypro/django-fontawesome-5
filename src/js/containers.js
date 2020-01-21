import Input from "./input";

class Container {
  constructor(container) {
    this.element = container;
    this.setAdminOverflow();
    this.input = new Input(this);
  }

  setAdminOverflow() {
    const adminFormRow = this.element.closest(".form-row");
    if (adminFormRow) {
      adminFormRow.style.overflow = "visible";
    }
  }

  get prefix() {
    if (this._prefix !== undefined) return this._prefix;
    const prefix = this.element.getAttribute("data-fontawesome-prefix");
    return (this._prefix = prefix);
  }
}

const getContainers = isAdmin => {
  const _containers = [...document.getElementsByClassName("d-fa-select")];
  return _containers.map(container => {
    return new Container(container, isAdmin);
  });
};

export default getContainers;
