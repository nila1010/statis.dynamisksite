const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => visProdukt(data));

function visProdukt(product) {
  console.log(product);
  document.querySelector("h1").textContent = product.productdisplayname;
  document.querySelector(".pris").textContent = product.price;
  document.querySelector(".produktsite img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  document.querySelector(".probeskrivelse p").innerHTML = product.description;
  document.querySelector(".info").innerHTML = product.materialcaredesc;
}
