const urlParams = new URLSearchParams(window.location.search);
const kat = urlParams.get("category");
const brandname = urlParams.get("brandname");

if (kat && brandname) {
  fetch(`https://kea-alt-del.dk/t7/api/products?category=${kat}&brandname=${brandname}`)
    .then((res) => res.json())
    .then((data) => showProducts(data));
} else if (kat) {
  fetch("https://kea-alt-del.dk/t7/api/products?category=" + kat)
    .then((res) => res.json())
    .then((data) => showProducts(data));
} else {
  /*  "https://kea-alt-del.dk/t7/api/products?category=" + kat} */
  fetch("https://kea-alt-del.dk/t7/api/products")
    .then((res) => res.json())
    .then((data) => showProducts(data));
}

function showProducts(products) {
  products.forEach((product) => showProduct(product));
}

function showProduct(product) {
  const template = document.querySelector(".tempprodukt").content;

  const copy = template.cloneNode(true);

  document.querySelector("h1").textContent = product.category;
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".brand").textContent = product.brandname;
  copy.querySelector(".sub").textContent = product.subcategory;
  copy.querySelector(".pris").textContent = product.price;
  copy.querySelector(".rabat").textContent = product.discount;
  copy.querySelector(".imgstr").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  let rabat = (product.price *= product.discount) / 100;
  if (product.soldout && product.discount > 0) {
    copy.querySelector(".sparpris").textContent = rabat;
    copy.querySelector(".test").classList.add("begge");
  } else if (product.soldout) {
    copy.querySelector(".test").classList.add("soldout");
  } else if (product.discount > 0) {
    copy.querySelector(".sparpris").textContent = rabat;
    copy.querySelector(".test").classList.add("sale");
  }
  if (product.discount == null) {
    copy.querySelector(".fjernrabat").style.display = "none";
    copy.querySelector(".spar").style.display = "none";
  }
  copy.querySelector(".semere").setAttribute("href", `produkt.html?id=${product.id}`);

  document.querySelector(".produktoversigt").appendChild(copy);
}

fetch("https://kea-alt-del.dk/t7/api/brands")
  .then((res) => res.json())
  .then(showBrands);

function showBrands(brands) {
  brands.forEach(showBrand);
}

const allowedBrands = ["Nike", "Puma", "ADIDAS"];
function showBrand(brand) {
  if (allowedBrands.includes(brand.brandname)) {
    const tempbrand = document.querySelector(".tempbrand").content;
    const brandname = tempbrand.cloneNode(true);
    brandname.querySelector("a").textContent = brand.brandname;
    brandname.querySelector("a").href = `produktoversigt.html?category=${kat}&brandname=${brand.brandname}`;

    document.querySelector(".sortbrands").appendChild(brandname);
  }
}
