// 1. nav 要素内のリンク (`<a>`)
let navLinks = document.querySelectorAll("nav a");
console.log(navLinks);

// 2. 商品リスト (.product-list) 内の最初の商品 (.product-item)
let firstProduct = document.querySelector(
  ".product-list .product-item:first-child"
);
console.log(firstProduct);

// 3. カートアイコンの画像 (`<img>`)
let cartIcon = document.querySelector(".cart img");
console.log(cartIcon);

// 4. 商品リスト (.product-list) 内の価格 (.price) を表示する要素
let productPrices = document.querySelectorAll(".product-list .price");
console.log(productPrices);

// 5. 商品リスト (.product-list) 内の全ての商品 (.product-item) の画像 (`<img>`)
let productImages = document.querySelectorAll(
  ".product-list .product-item img"
);
console.log(productImages);

// 6. 検索バー (.search-bar) 内の検索ボタン (`<button>`)
let searchButton = document.querySelector(".search-bar button");
console.log(searchButton);

// 7. フッター (footer) 内のパラグラフ (`<p>`) 要素
let footerParagraph = document.querySelector("footer p");
console.log(footerParagraph);

// 8. 商品リスト (.product-list) 内の偶数番目の商品 (.product-item)
let evenProducts = document.querySelectorAll(
  ".product-list .product-item:nth-child(even)"
);
console.log(evenProducts);

// 9. ヘッダー (header) 内のアカウントリンク (.account) の画像 (`<img>`)
let accountLinkImage = document.querySelector("header .account img");
console.log(accountLinkImage);

// 10. ナビゲーションリンクのうち、"会社情報" のリンク
let aboutLink = document.querySelector('nav a[href="#about"]');
console.log(aboutLink);
