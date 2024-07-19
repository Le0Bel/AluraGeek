import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const addProduct = document.getElementById("add-product")
const cardContainer = document.getElementById("cards-container")
const inputName = document.getElementById("name")
const inputPrice = document.getElementById("price")
const inputImage = document.getElementById("image")
 

async function listarCards() {
    const conexion = await fetch("http://localhost:3000/cards")
    const conexionConvertida = await conexion.json()

    return conexionConvertida
}


function handleDelete (e){
deleteCard(e.target.id)
}

async function listar() {
    const listAIP = await listarCards()

    listAIP.map((card)=> {
        cardContainer.innerHTML += `
    <div class="card-container">
        <img src="${card.imgUrl}"/>
        <div class="card-container--info">
            <p>${card.name}</p>
            <div class="card-container--value">
                <p>$${card.price}</p>  
                <button class="card-close" id=${card.id}>x</button>
            </div>
        </div>
    </div>
    `
    }) 
    
    let elementsArray = document.querySelectorAll("button.card-close");
    elementsArray.forEach((el)=> el.addEventListener("click", handleDelete ))
    
    
    
       
    
}



async function createCard(imgUrl,name, price) {
    const conexion = await fetch("http://localhost:3000/cards", {
        method:"POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify({
            id: uuidv4(),
            imgUrl:imgUrl,
            name:name,
            price:price
        })
    })
    const conexionConvertida = conexion.json()
    return conexionConvertida
}

listar()

addProduct.addEventListener('submit', async function(e) {
    e.preventDefault()
    console.log("producto subido")
    await createCard(inputImage.value,inputName.value,inputPrice.value)
})


    
async function deleteCard(id) {
    const conexion = await fetch(`http://localhost:3000/cards/${id}`,{method:"DELETE"})

    const conexionConvertida = conexion.json()
    return conexionConvertida
}




/* <img src="http://img3.wikia.nocookie.net/__cb20100317190512/starwars/images/0/0c/Stormtrooper_Commando.jpg"/> */


