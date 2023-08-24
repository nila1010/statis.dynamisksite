fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((res) => res.json())
  .then(visKategorier);

function visKategorier(kategorier) {
  kategorier.forEach(visKategori);
}

function visKategori(kat) {
  const template = document.querySelector("template").content;

  const copy = template.cloneNode(true);
  copy.querySelector("h3").textContent = kat.category;
  copy.querySelector("a").href = `produktoversigt.html?category=${kat.category}`;

  document.querySelector(".katoversigt").appendChild(copy);
}
