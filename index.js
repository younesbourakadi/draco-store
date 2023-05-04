const articles = [
    {
        name: "arbalète",
        price: 9.80,
        quantity: 2,
    },
    {
        name: "armure",
        price: 7.90,
        quantity: 7,
    },
    {
        name: "flèche",
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
        name: "épée",
        price: 10.80,
        quantity: 8,
    },
    {
        name: "luth",
        price: 8.20,
        quantity: 7,
    },
    {
        name: "masse",
        price: 13.80,
        quantity: 5,
    },
    {
        name: "torche",
        price: 14.80,
        quantity: 16,
    },
    {
        name: "bouclier",
        price: 11.80,
        quantity: 0,
    }
  ]
  
  
let cart = []


function getAllAvailableStoreItems(arr) {
    return arr.filter(item => item.quantity > 0)
}


function addItemToCart(name, quantity, price) {
  const item = cart.find(item => item.name === name);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
}


function getItemPrice(items, itemName) {
    const item = items.find(i => i.name === itemName);
    return item ? item.price : 0;
}

// function convertGoldToSilverAndGold(items, itemName) {
//     let price = getItemPrice(items, itemName);
//     let gold = Math.floor(price);
//     let silver = Math.round((price - gold) * 10);
//     return { gold, silver };
// }

function convertGoldToSilverAndGold(total) {
    let gold = Math.floor(total);
    let silver = Math.round((total - gold) * 10);
    return { gold, silver };
}

function removeItemFromCart(itemName) {
    cart.splice(itemName, 1);
}

function changeQuantityInCart(num, name) {
  let item = cart.find(item => item.name === name);
  if (item) {
    item.quantity = num;
  }
}

function addQuantityInCart(name) {
  const matchingItems = cart.filter(item => item.name === name);
  if (matchingItems.length === 0) {
    return;
  }
  matchingItems[0].quantity++;
}

function removeQuantityInCart(name) {
  const item = cart.find(item => item.name === name);
  if (item && item.quantity > 0) {
    item.quantity--;
    return item.quantity;
  }
  return 0;
}

function getCartTotal(cart) {
    return cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
}

function getCartTotalVAT(cart) {
    const vat = 1.13;
    return Number((getCartTotal(cart) * vat).toFixed(2));
}

const cartTotalTTC = document.getElementById("cart__total-TTC");
const cartTotalHT = document.getElementById("cart__total-HT");
const itemList = document.getElementById("item-list");



for (let i = 0; i < articles.length; i++) {

  if (articles[i].quantity > 0) {
    const item = document.createElement("li");
    item.className = "card";
    item.innerHTML = `
      <h3 class="card__ttl">${articles[i].name}</h3>
      <img class="card__img" src="./img/${articles[i].name}.png" id="${articles[i].name}" data-img-name="${articles[i].name}">
      <div class="card__price">
        <span class="card__sc">$${articles[i].price.toFixed(2)}</span>
        <span class="card__gc">stock : ${articles[i].quantity}</span>
      </div>
      <button class="card__btn" > 
        <img src="img/cart.png" alt="panier" class="card__img--cart" id="add-to-cart">
      </button>
    `;
    itemList.appendChild(item);
  }
}

for (let s = 0; s < articles.length ; s++) {
  if (articles[s].quantity <= 3 && articles[s].quantity >= 1) {
    // console.log (articles[s].quantity)
    window.alert (`!!!!!! ${articles[s].name} a moin de 3 pièces en stock. !!!!!! `)
  } else if ( articles[s].quantity === undefined || articles[s].quantity === 0)
  window.alert (`!!!!!! STOCK EPUISE !!!!!! ${articles[s].name} !!!!!! STOCK EPUISE !!!!!! `)
}

const cartSilver = document.getElementById("cart__silver");
const cartGold = document.getElementById("cart__gold");

const cartList = document.getElementById("cart__list");
function renderCart() {
  cartList.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement("article");
    cartItem.className = "itm";
    cartItem.innerHTML = `
    
      <div class="itm__wrap">
        <img src="./img/${item.name}.png" alt="${item.name}" class="itm__img">
        <h3 class="itm__ttl">${item.name}</h3>
      </div>
      <div class="itm__qty">
        <button class="itm__button itm__button--remove" id="dec">-</button>
        <input type="number" class="itm__input" value="${item.quantity}" min="1" max="10" id="input">
        <button class="itm__button itm__button--add" id="inc">+</button>
      </div>
      <button class="itm__button">
        <img src="./img/bin.png" alt="poubelle" class="itm__img--bin" id="remove">
      </button>
    `;

    const removeButton = cartItem.querySelector("#remove");
    removeButton.addEventListener("click", () => {
      removeItemFromCart(item.name);
      cartItem.remove();
    });

    const inputField = cartItem.querySelector("#input");
    inputField.addEventListener("change", () => {
      changeQuantityInCart(inputField.value, item.name);
    });

    const addButton = cartItem.querySelector("#inc");
    addButton.addEventListener("click", () => {
      addQuantityInCart(item.name);
      inputField.value = parseInt(inputField.value) + 1;
    });

    const decButton = cartItem.querySelector("#dec");
    decButton.addEventListener("click", () => {
      removeQuantityInCart(item.name);
      inputField.value = parseInt(inputField.value) > 0 ? parseInt(inputField.value) - 1 : 0;
    });

    cartList.appendChild(cartItem);
  });
}

const buttons = document.querySelectorAll("#add-to-cart");
buttons.forEach(button => {
  button.addEventListener("click", event => {

    const imgName = event.target.parentElement.parentElement.querySelector(".card__img").dataset.imgName;
    addItemToCart(imgName, 1, getItemPrice(articles, imgName));
    renderCart();
cartTotalTTC.innerText = getCartTotalVAT(cart).toLocaleString("fr-FR", {
  maximumFractionDigits: 2
});

cartTotalHT.innerText = getCartTotal(cart).toLocaleString("fr-FR", {
  maximumFractionDigits: 2
});
const { gold, silver } = convertGoldToSilverAndGold(getCartTotalVAT(cart));
cartGold.innerText = gold;
cartSilver.innerText = silver;
  });
});


