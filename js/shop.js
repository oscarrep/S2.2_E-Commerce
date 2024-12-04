// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
let products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1
let inCart = false;

let productsQtty = products.map(products => ({ ...products, quantity: 0 })); // can't modify products array, so i'm creating a new one with a quantity property

function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    let productIndex = productsQtty.findIndex(product => product.id === id); // finds index of product with passed id in the product array
    // 2. Add found product to the cart array
    const cartIndex = cart.findIndex(product => product.id === id); // finds index of product with passed id in the cart array

    // TODO: if product with passed id is in cart: qtty +1, else copy it to cart array then qtty +1
    if (cartIndex !== -1) cart[cartIndex].quantity++;
    else {
        const toAdd = { ...productsQtty[productIndex], quantity: 1 }; // copies obj at productIndex to cart array
        cart.push(toAdd);
    }
    console.log(cart);
}

// Exercise 2
function cleanCart() { // TODO: delete all items from cart array
    cart.splice(0);
}

// Exercise 3
let prices = [];
let qtties = [];
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    // TODO: array cart items prices, array item quantities.
    prices = cart.map(items => items.price);
    qtties = cart.map(items => items.quantity);
    // TODO: multiply price at index i * qtty at index i
    for (let i = 0; i < prices.length; i++) { total += prices[i] * qtties[i]; }
    return total;
}

// Exercise 4
let discounted = [];
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    // TODO: check qtties, if qtty >= offer->number apply discount in ofer->percent

    cart.forEach(item => {
        if (item.offer && item.quantity >= item.offer.number) {
            let discount = item.price * (item.offer.percent / 100);
            let discountedTotal = (item.price - discount) * item.quantity;

            discounted.push({ ...item, subtotalWithDiscount: discountedTotal });
        }
    });
    return discounted;
}

// Exercise 5
function printCart(discounted) {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let text = '';
    cart.forEach((item) => {
        if (item.id != 1 && item.id != 3) {
            text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity}</td>
            </tr>`;
        }
        else if (item.id == 1) {
            let index = discounted.findIndex(item => item.id === id);
            text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${discounted[index].subtotalWithDiscount}</td>
            </tr>`;
        }
        else if (item.id == 3) {
            let index = discounted.findIndex(item => item.id === id);
            text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${discounted[index].subtotalWithDiscount}</td>
            </tr>`;
        }
    })


    return document.getElementById('cart_list').innerHTML = text;


}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {

}

function open_modal(discounted) {
    printCart(discounted);
}