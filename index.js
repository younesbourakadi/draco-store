// let articles = [

//     {
//         name: "arbalète",
//         price: 9.80,
//         quantity: 4,
//     },
//     {
//         name: "armure",
//         price: 7.90,
//         quantity: 7,
//     },
//     {
//         name: "flèche",
//         price: 4.50,
//         quantity: 46,
//     },
//     {
//         name: "calice",
//         price: 3.80,
//         quantity: 26,
//     },
//     {
//         name: "carte",
//         price: 2.50,
//         quantity: 50,
//     },
//     {
//         name: "casque",
//         price: 9.90,
//         quantity: 8,
//     },
//     {
//         name: "potion",
//         price: 5.60,
//         quantity: 36,
//     },
//     {
//         name: "épée",
//         price: 10.80,
//         quantity: 8,
//     },
//     {
//         name: "luth",
//         price: 8.20,
//         quantity: 7,
//     },
//     {
//         name: "masse",
//         price: 13.80,
//         quantity: 5,
//     },
//     {
//         name: "torche",
//         price: 14.80,
//         quantity: 16,
//     },
//     {
//         name: "bouclier",
//         price: 11.80,
//         quantity: 4,
//     }
//   ]



async function getJsonData() {
  const response = await fetch("articles.json");
  const data = await response.json();
  return data;
}

// data is an object and not an array, so I create another function to access at the Array instead of the object. 

async function getArticlesData() {
  const articlesData = await getJsonData();
  const articles = articlesData.articles;

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
    if (getCartTotalVAT(cart) > 100 && !cart.some(item => item.name === "coffre")) {
      cart.push({ name: "coffre", price: 0, quantity: 1 });
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
    const index = cart.findIndex(item => item.name === itemName);
    if (index !== -1) {
      cart.splice(index, 1);
    }
  }

  function changeQuantityInCart(num, name) {
    let item = cart.find(item => item.name === name);
    if (item) {
      item.quantity = num;
    }
  }

  function addQuantityInCart(name) {
    const items = cart.filter(item => item.name === name);
    if (items.length === 0) {
      return;
    }
    items[0].quantity++;
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
  const searchBar = document.getElementById("searchBar");
  const itemList = document.getElementById("item__list");
  let searchTerm = "";

  let filteredArticles = articles;


  function replaceAccent(string) {
    return string
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, '');
  }


  function renderArticles() {
    itemList.innerHTML = "";
    filteredArticles.forEach(article => {
      const coins = convertGoldToSilverAndGold(article.price);
      if (article.quantity > 0) {
        const item = document.createElement("li");
        item.className = "card";
        item.innerHTML = `
        <h3 class="card__ttl">${article.name}</h3>
        <img class="card__img" src="./img/${article.name}.png" id="${article.name}" data-img-name="${article.name}">
        <div class="card__price">
          <span class="card__sc"><img src="img/po.png" class="card__coins">${coins.gold}</span>
          <span class="card__sc"><img src="img/pa.png" class="card__coins">${coins.silver}</span>
          <span class="card__gc">stock : ${article.quantity}</span>
        </div>
        <button class="card__btn" > 
          <img src="img/cart.png" alt="panier" class="card__img--cart" id="add-to-cart">
        </button>
      `;
        itemList.appendChild(item);
      }
    });
  }
  function filterArticles() {
    if (searchTerm === "") {
      filteredArticles = articles;
      return;
    }
    let searchWords = replaceAccent(

      searchTerm.toLowerCase()
    ).split(" ");
    filteredArticles = [];

    for (let i = 0; i < searchWords.length; i++) {
      let currentWord = searchWords[i];
      let matchedArticles = articles.filter(article => {
        let articleName = article.name.toLowerCase();
        return replaceAccent(articleName).includes(currentWord);
      });
      filteredArticles.push(...matchedArticles);
    }

    filteredArticles = [...new Set(filteredArticles)];
  }

  searchBar.addEventListener("input", () => {
    // filteredArticles.forEach(item => {
    //   if (searchBar.value === replaceAccent(item.name)) {
      //   }
      // });
      
    searchTerm = searchBar.value;

    console.log(replaceAccent(searchBar.value));

    filterArticles()
    renderArticles();
  });
  renderArticles();














  for (let s = 0; s < articles.length; s++) {
    if (articles[s].quantity <= 3 && articles[s].quantity >= 1) {
      // console.log (articles[s].quantity)
      window.alert(`!!!!!! ${articles[s].name} a moin de 3 pièces en stock. !!!!!! `)
    } else if (articles[s].quantity === undefined || articles[s].quantity === 0)
      window.alert(`!!!!!! STOCK EPUISE !!!!!! ${articles[s].name} !!!!!! STOCK EPUISE !!!!!! `)
  }

  //TTC
  const cartSilver = document.getElementById("cart__silver");
  const cartGold = document.getElementById("cart__gold");

  //HT
  const cartSilverHT = document.getElementById("cart__silver-HT");
  const cartGoldHT = document.getElementById("cart__gold-HT");

  const cartList = document.getElementById("cart__list");
  function renderCart() {
    // cartTotalTTC.innerText = getCartTotalVAT(cart).toLocaleString("fr-FR", {
    //   maximumFractionDigits: 2
    // });

    // cartTotalHT.innerText = getCartTotal(cart).toLocaleString("fr-FR", {
    //   maximumFractionDigits: 2
    // });


    const { gold, silver } = convertGoldToSilverAndGold(getCartTotalVAT(cart));
    const { gold: goldHT, silver: silverHT } = convertGoldToSilverAndGold(getCartTotal(cart));


    console.log(cartGoldHT, cartSilverHT);
    console.log(goldHT, silverHT);
    console.log(convertGoldToSilverAndGold(getCartTotal(cart)));


    cartGold.innerText = gold;
    cartSilver.innerText = silver;
    cartGoldHT.innerText = goldHT;
    cartSilverHT.innerText = silverHT;
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

        renderCart()

      });

      const inputField = cartItem.querySelector("#input");
      inputField.addEventListener("change", () => {
        changeQuantityInCart(inputField.value, item.name);

        renderCart()
      });

      const addButton = cartItem.querySelector("#inc");
      addButton.addEventListener("click", () => {
        addQuantityInCart(item.name);
        inputField.value = parseInt(inputField.value) + 1;
        renderCart();
      });

      const decButton = cartItem.querySelector("#dec");
      decButton.addEventListener("click", () => {
        removeQuantityInCart(item.name);
        inputField.value = parseInt(inputField.value) > 0 ? parseInt(inputField.value) - 1 : 0;

        renderCart()

      });
      cartList.appendChild(cartItem);
    });

  }

  const buttons = document.querySelectorAll("#add-to-cart");
  buttons.forEach(button => {
    button.addEventListener("click", event => {
      console.log(button);
      const imgName = event.target.parentElement.parentElement.querySelector(".card__img").dataset.imgName;
      addItemToCart(imgName, 1, getItemPrice(articles, imgName));
      renderCart();

    });
  });





}

getArticlesData();
