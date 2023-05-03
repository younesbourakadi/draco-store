const articles = [
    {
        name: "arbalète",
        price: 9.80,
        quantity: 10,
    },
    {
        name: "armure",
        price: 7.90,
        quantity: 7,
    },
    {
        name: "arrow",
        price: 4.50,
        quantity: 46,
    },
    {
        name: "calice",
        price: 3.80,
        quantity: 26,
    },
    {
        name: "carte",
        price: 2.50,
        quantity: 50,
    },
    {
        name: "casque",
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

function addItemToCart(itemName, soldQuantity, price) {
  const item = { name: itemName, price, soldQuantity };
  cart.push(item);
}

// function addItemToCart(itemName, soldQuantity, price) {
//   const item = { name: itemName, price, soldQuantity };
//   cart.push(item);
// }


function getItemPrice(arr, itemName) {
    let price = 0;
    arr.forEach(i => {
        if (i.name == itemName) {
            price = i.price;
        }
    });
    return price;
}

function convertGoldToSilverAndGold(price) {
  let gold = Math.floor(price);
  let silver = Math.round((price - gold) * 10);
  return { gold , silver };
}

// function removeItemFromCart(arr, itemName) {
//     cart.splice(itemName, 1);
//     }

function changeQuantityInCart(num) {
    //     // if (e.key === enter){
    cart[0].soltQuantity = num;
    // }
}








