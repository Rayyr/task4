
let starts=function addStarts(){
       
    let count=document.querySelectorAll(".product-rating");
   
     console.log(count);

    for(i=0;i<count.length;i++){
        let num=Number(count[i].textContent);
        for(j=0;j<num;j++){
         let startToadd=`<i class="fa-regular fa-star"></i>`;
        count[i].innerHTML+=startToadd;
        }
    }
   

};



async function getProduct() {

    /* the products will be shown are depends on the clicked category so the category will be variable 
       in the URL */
    const temp = new URLSearchParams(window.location.search);
    const catVar = temp.get('catValue');//to extract the catValue from URL
    const response = await fetch(`https://fakestoreapi.com/products/category/${catVar}`, { method: "GET" });
    const realData = await response.json();

    return realData;

}

async function displayProductsOfCategory() {

    const realData = await getProduct();
    document.querySelector(".navbar .container ").innerHTML = `<h1>${realData[0].category}</h1>`;

    const productWillBeAdded = realData.map(function (product) {

        let pro = `<div class="product">
        
        <div class="product-image">
        <img src="${product.image}" />
        </div>

        <div class="product-description">
     
        <p class="product-title">${product.title}</p>
        <p class="product-details">${product.description}</p>
        <p>${product.price} $</p>
        <p class="product-rating">${product.rating.rate}</p>
      
        <p>${product.rating.count}</p>
        </div >

        </div>`;

        return pro;

    }).join('');

   
    //document here mean : the linked html file wih js file
    document.querySelector(".cont .container ").innerHTML = productWillBeAdded;


}


displayProductsOfCategory();
starts();
 