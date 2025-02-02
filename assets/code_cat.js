showCategory();

async function getCategory() {

    const response = await fetch("https://fakestoreapi.com/products/categories", { method: "get" });

    return await response.json();

}

async function showCategory() {

    const realData = await getCategory();

    //as same as using the loop since there are no details found for each category 
    //each passed parameter to the function is about element of the array realData
    const categoriesWillBeAdded = realData.map(function (category) {

        let cat = `
        <div class="cat">
           <h1>${category}</h1>
           <div class="details">
           <a href="cat_product.html?catValue=${category}">Products</a>
           </div>
        
        </div>`;

        return cat;//the category will be added to the categories list (categoriesWillBeAdded)
    }).join(''); // to erase the commas ,


    document.querySelector(".cont .container .row").innerHTML =  categoriesWillBeAdded;
    mani();


    let parent=document.querySelector(".cont");//parentNode
    let category1=document.querySelectorAll(".cat");
    
    //console.log(category1);
    //to manipulate the neww added items ---->jquery
}

function mani(){
    let r=document.querySelectorAll(".cat");
   
  
    r.forEach(function(ele){
       
        
         ele.onmouseenter=function(){
        
          let a=ele.children[1] ;//details child
         
          a.classList.toggle("togle");
          console.log(a);
         }

         ele.onmouseleave=function(){
        
          let a=ele.children[1];
          a.classList.toggle("togle");
          console.log(a);
          
         } 
    })
    console.log(8);
   
}

 