javascript: (() => {
  let toc = document.querySelector("#TOC");
  if (!toc) {
    toc = document.createElement("div");
    toc.id = "TOC";
    document.body.prepend(toc);
  }

  let style = document.querySelector("#TOC-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "TOC-style";
    document.body.prepend(style);
  }
  style.textContent = `
  #TOC {
    border: solid black 1px;
    margin: 10px;
    padding: 10px;

    /* 追加 (右上に固定表示) */
    position: fixed;
    top: 20px;
    right: 20px;
    width: 250px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    overflow-y: auto;
    max-height: calc(100vh - 40px);
    z-index: 9999;
  }
  .TOCEntry { margin: 5px 0px; }
  .TOCEntry a { text-decoration: none; }
  .TOCLevel1 { font-weight: bold; }
  .TOCLevel2 { margin-left: .25in; }
  .TOCLevel3 { margin-left: .5in; }
  .TOCSectNum:after { content: ": "; }
      `;

  let headings = document.querySelectorAll("h2,h3,h4,h5,h6");
  let sectionNumbers = [0, 0, 0, 0, 0];
  for (let heading of headings) {
    if (heading.parentNode === toc) {
      continue;
    }
    let level = parseInt(heading.tagName.charAt(1)) - 1;
    sectionNumbers[level - 1]++;
    for (let i = level; i < sectionNumbers.length; i++) {
      sectionNumbers[i] = 0;
    }
    let sectionNumber = sectionNumbers.slice(0, level).join(".");
    let span = document.createElement("span");
    span.className = "TOCSectNum";
    span.textContent = sectionNumber;
    heading.prepend(span);

    let anchor = document.createElement("a");
    let fragmentName = `TOC${sectionNumber}`;
    anchor.name = fragmentName;
    heading.before(anchor);
    anchor.append(heading);

    let link = document.createElement("a");
    link.href = `#${fragmentName}`;
    link.innerHTML = heading.innerHTML;

    // リンクがクリックされたときのイベントリスナーを追加
    link.addEventListener("click", (e) => {
      // デフォルトのリンク動作を無効化
      e.preventDefault();
      // クリックされたリンクの名前属性に一致するターゲット要素を取得
      const target = document.querySelector(`a[name="${fragmentName}"]`);
      // ターゲット要素が存在しない場合は処理を終了
      if (!target) {
        return;
      }
      // ターゲット要素が存在する場合、スムーズにスクロールして表示
      target.scrollIntoView({ behavior: "smooth" });
    });

    let entry = document.createElement("div");
    entry.classList.add("TOCEntry", `TOCLevel${level}`);
    entry.append(link);
    toc.append(entry);
  }
})();
