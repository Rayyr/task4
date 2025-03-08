function stars() {

    let count = document.querySelectorAll(".product-rating");

    for (i = 0; i < count.length; i++) {
        let num = Number(count[i].textContent);
        for (j = 0; j < num; j++) {
            let startToadd = `<i class="fa-regular fa-star"></i>`;
            count[i].innerHTML += startToadd;
        }
    }


};

 var itemsTotalNum=0;
async function getProduct(page) {
    let response;
    let limit=2;
     
    const skippedElements=(page-1)*limit ;
    /* the products will be shown are depends on the clicked category so the category will be variable 
       in the URL */
    try {
        const temp = new URLSearchParams(window.location.search);
        const catVar = temp.get('catValue');//to extract the catValue from URL
        response = await fetch(`https://fakestoreapi.com/products/category/${catVar}?limit=2&skip=${skippedElements}`, { method: "GET" });
        w = await fetch(`https://fakestoreapi.com/products/category/${catVar}`, { method: "GET" });

        const items=await w.json() ;
        itemsTotalNum=items.length;
        
    }
    catch (occured_error) {
        console.log("Sorry , Try Again Later :)");
        return;
    }
    
    return await response.json();
    //limit : 2items per page
    

}



async function displayProductsOfCategory(page=1) {

   
    const realData = await getProduct(page);
    let numOfPages=itemsTotalNum /2;
 
    if (realData == undefined) {
        console.log("No Products found :)");
        return;
    }

    try {
        document.querySelector(".navbar .container ").innerHTML = `<h1>${realData[0].category}</h1>`;

        const productWillBeAdded = realData.map(function (product) {

            let pro = `<div class="product">
        
        <div class="product-image"> 
        
        <img src="${product.image}" />
           <div class="overlay">
             <p class="overlay-text"> Click Me </p>  
            </div>
        </div>

        <div class="product-description">
        <p class="product-title">${product.title}</p>
        <p class="product-details">${product.description}</p>

        <div class="price">
        <p>${product.price} $</p>
        <p class="product-rating">${product.rating.rate} </p>
        <p>${product.rating.count}</p>
        </div>

        </div >

        </div>`;

            return pro;

        }).join('');


        //document here mean : the linked html file wih js file
        document.querySelector(".cont .container ").innerHTML = productWillBeAdded;
        document.querySelector(".loading").classList.add("no_display");

        stars();

        let butnsOfPages=document.querySelector(".pagination ul");
        butnsOfPages.innerHTML =`<li><button>&lt</button></li>`;
        for(let i=1;i<=numOfPages;i++){

            let btn=`<button>${i}</button>`;
            let litem=`<li>${btn}</li>`;
         
            butnsOfPages.innerHTML+=litem;
            
        }
        butnsOfPages.innerHTML+=`<li><button>&gt</button></li>`;

         
        let btns=document.querySelectorAll(".pagination ul button");
        for(let i=1;i<(btns.length-1);i++){
           
           btns[i].addEventListener("click",( )=>{
            btns[i].setAttribute("style", "background-color: red");
           displayProductsOfCategory(i);
          
           });
        }

        //current btn activation
        btns[page].setAttribute("style", "background-color: red");
        
    }
    catch (occured_error) {
        console.log("Sorry , Try Again Later :)");
        return;
    }


    let overlay_layers = document.querySelectorAll(".cont .container .product  .product-image .overlay");

    add_overlay_event_listener(overlay_layers);
}


function add_overlay_event_listener(overlay_layers) {


    let x, y, ww, hh;
    let gModal = document.querySelector(".modal");
    let imgFrame = document.querySelector(".modal .img");//white box
    let body = document.querySelector("body");
    let childs = imgFrame.children;//actually 2 children
    let rect;
    let scale = 1;
    

    for ( let i = 0; i < overlay_layers.length; i++) {


        overlay_layers[i].addEventListener("click", (e) => {

            gModal.classList.add("modalDisplay");
            body.classList.add("disableBodyScroll");
            let imgToDisplay = overlay_layers[i].previousElementSibling;//actual image 
            childs[0].setAttribute("src", imgToDisplay.getAttribute("src"));

            let subChilds = childs[1].children;//controlers +/-
            zooming(subChilds[0], subChilds[1], childs[0], scale);


            rect = imgFrame.getBoundingClientRect();
            x = rect.x;
            y = rect.y;
            ww = rect.width;
            hh = rect.height;

        

        });

    }

    document.addEventListener("mousemove", (e2) => {
        if (gModal.classList.contains("modalDisplay") == true) {

            let mx = e2.clientX;
            let my = e2.clientY;

            if (!((mx >= x && mx <= (x + ww)) && (my >= y && my <= (y + hh)))) {
                document.body.style.cursor = "pointer"
            }
            else
                document.body.style.cursor = "default";
        }
    });

    document.addEventListener("click", (e) => {


        if (e.target.className != "overlay") {

            let mx = e.clientX;
            let my = e.clientY;


            if (!((mx >= x && mx <= (x + ww)) && (my >= y && my <= (y + hh)))) {

                //out of white madal box range 
                body.classList.remove("disableBodyScroll");
                gModal.classList.remove("modalDisplay");



                scale = 1;
                childs[0].style.transform = `scale(${scale})`;



            }
        }

    });





}

function zooming(zoomIn, zoomOut, img, scale) {


    zoomIn.addEventListener("click", function zoomIn() {
        scale += 0.1;
        if (scale > 1.5) scale = 1;
        img.style.transform = `scale(${scale})`;
    });

    zoomOut.addEventListener("click", function zoomOut() {
        scale -= 0.1;
        if (scale < .5) scale = 1;
        img.style.transform = `scale(${scale})`;
    });
}

displayProductsOfCategory();
 