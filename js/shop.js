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
        name: 'Instant cake mixture',
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
let prices = [];
let qtties = [];
let discounted = [];

let total = 0;

// Exercise 1
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

    qtties = cart.map(items => items.quantity);
    let count = qtties.reduce((sum, n) => sum + n, 0)
    console.log('item count: ' + count)

    document.getElementById('count_product').innerHTML = count;
}

// Exercise 2
function cleanCart() { // TODO: delete all items from cart array
    total = 0;
    cart.splice(0);
    document.getElementById('cart_list').innerHTML = '';
    document.getElementById('total_price').innerHTML = total;
}

// Exercise 3
function calculateTotal() {
    total = 0;
    // Calculate total price of the cart using the "cartList" array
    // TODO: array cart items prices, array item quantities.
    prices = cart.map(items => items.price);
    qtties = cart.map(items => items.quantity);
    // TODO: multiply price at index i * qtty at index i
    cart.forEach((item) => {
        if (item.id === 1 && item.quantity >= 3) {//cooking oil
            let discItem = discounted.find(discItem => discItem.id === 1);
            total += discItem ? discItem.subtotalWithDiscount : item.price * item.quantity;
        } else if (item.id === 3 && item.quantity >= 10) {//cake mix
            let discItem = discounted.find(discItem => discItem.id === 3);
            total += discItem ? discItem.subtotalWithDiscount : item.price * item.quantity;
        } else {//no discounts
            total += item.price * item.quantity;
        }
    });

    document.getElementById('total_price').innerHTML = total.toFixed(2);
    return total.toFixed(2);
}

// Exercise 4
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    // TODO: check qtties, if qtty >= offer->number apply discount in ofer->percent

    cart.forEach(item => {
        if (item.offer && item.quantity >= item.offer.number) {
            let discount = item.price * (item.offer.percent / 100);
            let discountedTotal = Number(((item.price - discount) * item.quantity).toFixed(2));

            discounted.push({ ...item, subtotalWithDiscount: discountedTotal });
        }
    });
    return discounted;
}

// Exercise 5
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let text = '';
    cart.forEach((item) => {
        let itemIndex = discounted.findIndex(discItem => discItem.id === item.id);
        let cartItemIndex = cart.findIndex(cItem => cItem.id === item.id);
        if (item.id != 1 && item.id != 3) {
            text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="removeFromCart(${item.id})"> - </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="addToCart(${item.id})"> + </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="deleteFromCart(${item.id})"> Delete </button></td>
            </tr>`;
        }
        else if (item.id == 1) {
            if (cart[cartItemIndex].quantity >= 3) {
                text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${discounted[itemIndex].subtotalWithDiscount}</td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="removeFromCart(1)"> - </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="addToCart(1)"> + </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="deleteFromCart(1)"> Delete </button></td>
            </tr>`;
            }
            else if (cart[cartItemIndex].quantity < 3) {
                text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="removeFromCart(1)"> - </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="addToCart(1)"> + </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="deleteFromCart(1)"> Delete </button></td>
            </tr>`;
            }
        }
        else if (item.id == 3) {
            if (cart[cartItemIndex].quantity >= 10) {
                text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${discounted[itemIndex].subtotalWithDiscount}</td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="removeFromCart(3)"> - </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="addToCart(3)"> + </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="deleteFromCart(3)"> Delete </button></td>
            </tr>`;
            }
            else if (cart[cartItemIndex].quantity < 10) {
                text += `
            <tr>
                <th scope="row">${item.name}</th>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="removeFromCart(3)"> - </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="addToCart(3)"> + </button></td>
                <td><button class="btn btn-outline-dark fw-bolder" onclick="deleteFromCart(3)"> Delete </button></td>
            </tr>`;
            }
        }
    });

    document.getElementById('cart_list').innerHTML = text;
}


// ** Nivell II **

// Exercise 7
function removeFromCart(id) {
    const cartIndex = cart.findIndex(item => item.id === id); // have to find index of product with passed id in the cart array
    console.log('------REMOVING ITEM------');

    if (cart[cartIndex].quantity > 1) {
        cart[cartIndex].quantity -= 1;
        console.log(`-1 ${cart[cartIndex].name}, remaining: ${cart[cartIndex].quantity}`);
    }
    else if (cart[cartIndex].quantity === 1) {
        console.log(`${cart[cartIndex].name} removed`);
        cart.splice(cartIndex, 1);
    }
    console.log(cart);

    // need to update promotions, total and print cart after every removal
    applyPromotionsCart();
    calculateTotal();
    printCart();

}

// Exercise 8
function addToCart(id) {
    const cartIndex = cart.findIndex(item => item.id === id); // have to find index of product with passed id in the cart array
    console.log('------ADDING ITEM------');

    cart[cartIndex].quantity += 1;
    console.log(`+1 ${cart[cartIndex].name}, remaining: ${cart[cartIndex].quantity}`);

    console.log(cart);

    // need to update promotions, total and print cart after every removal
    applyPromotionsCart();
    calculateTotal();
    printCart();

}

function deleteFromCart(id) {
    const cartIndex = cart.findIndex(item => item.id === id); // have to find index of product with passed id in the cart array
    console.log('------DELETING ITEM------');

    console.log(`${cart[cartIndex].name} removed`);
    cart.splice(cartIndex, 1);

    console.log(cart);

    // need to update promotions, total and print cart after every removal
    applyPromotionsCart();
    calculateTotal();
    printCart();

}

function open_modal() {
    applyPromotionsCart();
    console.log('discounted: ' + discounted);
    calculateTotal();
    console.log('total: ' + total);
    printCart();
}