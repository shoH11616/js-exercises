class InlineCircle extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    const circle = document.createElement("div");
    circle.style.width = "50px";
    circle.style.height = "50px";
    circle.style.borderRadius = "50%";
    circle.style.display = "inline-block";

    const borderColor = this.getAttribute("border-color") || "black";
    circle.style.border = `2px solid ${borderColor}`;

    shadow.appendChild(circle);
  }
}

customElements.define("inline-circle", InlineCircle);
