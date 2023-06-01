function renderListProduct() {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"))
    
    let result = "";
    for (let i = 0 ; i < listProducts.length ; i++){
        result += `
        <div class="renderProduct">
        <div class="item-img">
            <img src=".${listProducts[i].img}" alt="">
        </div>
        <div class="item-detail">
            <h5>${listProducts[i].name}</h5>
            <p>Price: ${listProducts[i].price}</p> <br>
            <p class="quantity-edit">
                <span onclick="increase(${i})" class="material-symbols-outlined">
                    add
                </span> 
                    ${listProducts[i].stock}
                <span onclick = "decrease(${i})" class="material-symbols-outlined">
                    remove
                </span>
            </p>
            <p><span class="material-symbols-outlined">
                    delete
                </span>
            </p>
        </div>
    </div>
        `
    }
    document.querySelector(".renderListProduct").innerHTML = result;
}
renderListProduct()

function increase(index) {
  
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    console.log(listProducts[index].stock);
    listProducts[index].stock += 1;
    localStorage.setItem("listProducts",JSON.stringify(listProducts));
    renderListProduct()
}

function decrease(index) {
    let listProducts = JSON.parse(localStorage.getItem("listProducts"));
    console.log(listProducts[index].stock);
    listProducts[index].stock -= 1;
    localStorage.setItem("listProducts",JSON.stringify(listProducts));
    renderListProduct()
}