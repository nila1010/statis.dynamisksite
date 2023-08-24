const urlParams = new URLSearchParams(window.location.search);
const kat = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + kat)
  .then((res) => res.json())
  .then((data) => showProducts(data));

function showProducts(products) {
  products.forEach((product) => showProduct(product));
}

function showProduct(product) {
  const template = document.querySelector("template").content;

  const copy = template.cloneNode(true);

  document.querySelector("h1").textContent = product.category;
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".brand").textContent = product.brandname;
  copy.querySelector(".sub").textContent = product.subcategory;
  copy.querySelector(".pris").textContent = product.price;
  copy.querySelector(".rabat").textContent = product.discount;
  copy.querySelector(".imgstr").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  if (product.soldout && product.discount > 0) {
    let rabat = (product.price -= product.discount);
    copy.querySelector(".sparpris").textContent = rabat;
    copy.querySelector(".test").classList.add("begge");
  } else if (product.soldout) {
    copy.querySelector(".test").classList.add("soldout");
  } else if (product.discount > 0) {
    let rabat = (product.price -= product.discount);
    copy.querySelector(".sparpris").textContent = rabat;
    copy.querySelector(".test").classList.add("sale");
  }

  if (product.discount == null) {
    copy.querySelector(".fjernrabat").style.display = "none";
    copy.querySelector(".spar").style.display = "none";
  }
  copy.querySelector(".semere").setAttribute("href", `produkt.html?id=${product.id}`);

  document.querySelector("section").appendChild(copy);
}

/*
{
  "id": 1528,
  "gender": "Men",
  "category": "Apparel",
  "subcategory": "Topwear",
  "articletype": "Jackets",
  "season": "Fall",
  "productionyear": 2010,
  "usagetype": "Sports",
  "productdisplayname": "Black Fleece Jacket",
  "price": 3999,
  "discount": 49,
  "brandname": "Puma",
  "soldout": 0
}
*/
