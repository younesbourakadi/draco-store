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

function getItemPrice(items, itemName) {
  const item = items.find(i => i.name === itemName);
  return item ? item.price : 0;
}

function convertGoldToSilverAndGold(items, itemName) {
  let price = getItemPrice(items, itemName);
  let gold = Math.floor(price);
  let silver = Math.round((price - gold) * 10);
  return { gold , silver };
}


function getCartTotal(cart){
  return cart.reduce((acc, curr) => acc + curr.price * curr.soldQuantity, 0);
}

function getCartTotalVAT(cart){
  const vat = 1.13;
  return (getCartTotal(cart) * vat).toFixed(2);
}

console.log(getCartTotal([{name: 'casque', price: 4.30, soldQuantity: 5}, {name: 'potion', price: 3.57, soldQuantity: 3}]))
console.log(getCartTotalVAT([{name: 'casque', price: 4.30, soldQuantity: 5}, {name: 'potion', price: 3.57, soldQuantity: 3}]))

