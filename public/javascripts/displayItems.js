window.addEventListener("load", async () => {
  try {
    let { data } = await axios.get("http://localhost:3000/api/products/1/50");
    // console.log(data);
    let htmlStr = "";
    for (let item of data) {
      htmlStr += `
        <div class="col">
          <div class="card">
            <img src="http://localhost:3000/uploads/${item.img}" class="card-img-top" alt="${item.name}" />
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <h4 class="card-title">${item.price}</h4>
              <p class="card-text">
                ${item.description}
              </p>
            </div>
          </div>
        </div>
        `;
    }
    document.getElementById("productsDiv").innerHTML = htmlStr;
  } catch (err) {
    console.log("err", err);
  }
});
