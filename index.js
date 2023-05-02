const articles = [
    {
        name: "arbalète",
        price: 9.80,
        quantity: 10,
    },
    {
<<<<<<< HEAD
        name: "armure",
=======
        name: "Armure",
>>>>>>> 397893f7a248c67bda30484f4f8afea157c22c43
        price: 7.90,
        quantity: 7,
    },
    {
        name: "arrow",
        price: 4.50,
        quantity: 46,
    },
    {
<<<<<<< HEAD
        name: "calice",
=======
        name: "Calice",
>>>>>>> 397893f7a248c67bda30484f4f8afea157c22c43
        price: 3.80,
        quantity: 26,
    },
    {
        name: "carte",
        price: 2.50,
        quantity: 50,
    },
    {
<<<<<<< HEAD
        name: "casque",
=======
        name: "Casque",
>>>>>>> 397893f7a248c67bda30484f4f8afea157c22c43
        price: 9.90,
        quantity: 8,
    },
    {
        name: "potion",
        price: 5.60,
        quantity: 36,
    },
    {
        name: "sword",
        price: 10.80,
        quantity: 0,
    }
]

let cart = []

function getAllAvailableStoreItems(arr) {
    return arr.filter(item => item.quantity > 0)
}

function addItemToCart(itemName, soltQuantity, price, arr) {
    let item = { name: itemName, price: price, soltQuantity: soltQuantity }
    cart.push(item);
}


function getItemPrice(arr, itemName){
  let price = 0;
  arr.forEach(i => {
    if(i.name == itemName) {
      price = i.price;
    }
  });
  return price;
}


addItemToCart ('potion', 8, getItemPrice (articles, 'potion'), articles);
// console.log (cart);

addItemToCart ('arrow', 18, getItemPrice (articles, 'arrow'), articles);
console.log (cart);