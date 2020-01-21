const weights = {
  fab: "400",
  fas: "900",
  far: "400",
  fal: "300"
};

class Option {
  constructor(dropdown, option, index) {
    this.container = dropdown.container;
    const [stylePrefix, iconId] = option.value
      ? option.value.split(",")
      : ["", ""];
    this.stylePrefix = stylePrefix;
    this.iconId = iconId;
    this.label = option.text;
    this.weight = weights[this.stylePrefix];
    this.index = index;
  }

  newIcon() {
    const icon = document.createElement("i");
    icon.setAttribute(
      "class",
      `${this.stylePrefix} ${this.container.prefix}-${this.iconId} fa-fw`
    );
    icon.style.fontWeight = this.weight;
    return icon;
  }

  append(dropdown) {
    const newOption = document.createElement("a");
    // eslint-disable-next-line no-script-url
    newOption.setAttribute("href", "javascript:void(0)");
    newOption.setAttribute("data-index", this.index);
    if (this.iconId) {
      newOption.append(this.newIcon());
    }
    newOption.append(this.label);
    dropdown.append(newOption);
  }
}

export default Option;
