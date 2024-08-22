class InlineCircle extends HTMLElement {
  constructor() {
    super();
    // シャドウDOMを作成
    const shadow = this.attachShadow({ mode: "open" });

    // 円形のdiv要素を作成
    const circle = document.createElement("div");
    circle.style.width = "50px";
    circle.style.height = "50px";
    circle.style.borderRadius = "50%";
    circle.style.display = "inline-block";

    // 属性から枠線の色を取得し、デフォルトは黒
    const borderColor = this.getAttribute("border-color") || "black";
    circle.style.border = `2px solid ${borderColor}`;

    // シャドウDOMに円形要素を追加
    shadow.appendChild(circle);
  }
}

// カスタム要素を定義
customElements.define("inline-circle", InlineCircle);
