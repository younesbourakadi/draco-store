const articles = [
    {
        name: "Arbalète",
        price: 9.80,
        quantity: 10,
    },
    {
        name: "Armure" ,
        price: 7.90,
        quantity: 7,
    }, 
    {
        name: "Arrow",
        price: 4.50,
        quantity: 46,
    },
    {
        name: "Calice" ,
        price: 3.80,
        quantity: 26,
    },
    {
        name: "Carte",
        price: 2.50,
        quantity: 50,
    },
    {
        name:  "Casque" ,
        price: 9.90,
        quantity: 8,
    },
    {
        name: "potion" ,
        price: 5.60,
        quantity: 36,
    },
    {
        name: "sword" ,
        price: 10.80,
        quantity: 14,
    }
]


function getAllStoreItems(arr){
  let items = [];
  let item = {name: '', price: 0.00}
  arr.forEach(i => {
    item = {name: i.name, price: i.price}
    items.push(item);
  });
  return items;
}



