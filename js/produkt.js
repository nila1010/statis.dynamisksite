fetch("https://kea-alt-del.dk/t7/api/products/1163")
  .then((response) => response.json())
  .then((data) => visProdukt(data));

function visProdukt(product) {
  console.log(product);
  document.querySelector("h1").textContent = product.productdisplayname;
  document.querySelector(".pris").textContent = product.price;
  document.querySelector(".produktsite img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
}

/*
{
  "id": 1163,
  "gender": "Men",
  "category": "Apparel",
  "subcategory": "Topwear",
  "articletype": "Tshirts",
  "season": "Summer",
  "productionyear": 2011,
  "usagetype": "Sports",
  "productdisplayname": "Sahara Team India Fanwear Round Neck Jersey",
  "price": 895,
  "discount": null,
  "brandname": "Nike",
  "soldout": 0
}
*/
