fetch("https://kea-alt-del.dk/t7/api/products?limit=50")
  .then((res) => res.json())
  .then((data) => showProducts(data));

function showProducts(products) {
  products.forEach((product) => showProduct(product));
}

function showProduct(product) {
  const template = document.querySelector("template").content;

  const copy = template.cloneNode(true);

  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(".brand").textContent = product.brandname;
  copy.querySelector(".sub").textContent = product.subcategory;
  copy.querySelector(".pris").textContent = product.price;
  copy.querySelector(".rabat").textContent = product.discount;
  copy.querySelector(".imgstr").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  if (product.soldout && product.discount > 0) {
    copy.querySelector(".test").classList.add("begge");
  } else if (product.soldout) {
    copy.querySelector(".test").classList.add("soldout");
  } else if (product.discount > 0) {
    copy.querySelector(".test").classList.add("sale");
  }

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
