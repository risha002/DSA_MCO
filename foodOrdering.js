// Login function to greet the cashier
function login() {
    let username = prompt("Enter cashier username:");
    let password = prompt("Enter password: ")

    let validUsername = "cashier";
    let validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        alert(`Welcome, ${username}!`);
    } else {
        alert("Invalid username or password. Try again");
        login();
    }
}

// Menu data containing categories and items with their details (name, price, stock)
let menu = {
    Burgers: [
        {Name: "Crispy Chicken", Info: "Crispy sandwhich", Price: 199, Stock: 100},
        {Name: "Cheeseburger", Info: "With cheddar", Price: 149, Stock: 100},
        {Name:"Double Patty Burger", Info: "2 beef patties", Price: 249, Stock: 100},
        {Name: "Bacon Mushroom Melt", Info: "With bacon and mushrooms", Price: 229, Stock: 100},
        {Name: "Spicky Chicken Burger", Info: "Hot and spicy", Price: 209, Stock: 100}
    ],

    Sides: [
        {Name: "French Fries", Info: "Classic fries", Price: 65, Stock: 100},
        {Name: "Cheesy Fries", Info: "With cheese", Price: 85, Stock: 100},
        {Name:"Potato Wedges", Info: "Seasoned wedges", Price: 95,Stock: 100},
        {Name: "Onion Rings", Info: "Crispy rings", Price: 75, Stock: 100 },
        {Name: "Mashed Potato", Info: "With gravy", Price: 90, Stock: 100}
    ],

    Drinks: [
        {Name: "Iced Tea", Info: "Sweet tea", Price: 49, Stock: 100},
        {Name: "Soda", Info: "Coke/Pepsi", Price: 39, Stock: 100 },
        {Name: "Bottled Water", Info: "500ml", Price: 25, Stock: 100 },
        {Name: "Milkshake", Info: "Vanilla/Chocolate", Price: 125, Stock: 100},
        {Name: "Lemonade", Info: "Fresh lemon drink", Price: 99, Stock: 100}
    ],

    Desserts: [
        { Name: "Cake", Info: "Slice", Price: 199, Stock: 100 },
        { Name: "Ice Cream", Info: "1 scoop", Price: 89, Stock: 100 },
        { Name: "Brownie", Info: "Chocolate treat", Price: 79, Stock: 100 },
        { Name: "Donut", Info: "Glazed", Price: 69, Stock: 100 },
        { Name: "Halo-Halo", Info: "Pinoy dessert", Price: 99, Stock: 100 }
    ]
}

// Cart to hold items that the cashier selects for the order
let cart = [];

// Main menu for navigating the system
function mainMenu() {
    let choice = prompt("Main Menu:\n1. Order\n2. Cart\n3. Checkout\n4. Cancel");
    switch (choice) {
        case "1":
            ordering(); //go to order menu
            break;
        case "2":
            viewCart();//view cart
            break;
        case "3":
            checkout(); //proceed to checkout
            break;
        case "4":
            let confirmExit = confirm("Are you sure you want to cancel the order?");
            if (confirmExit) {
                alert("Order cancelled.");
            }else{
                mainMenu(); //go back if not confirmed
            }
            break;
        default:
            alert("Invalid choice.");
            mainMenu(); //re-show menu if invalid
    }
}

// Function for ordering items
function ordering() {
    //prompting the user to select a category number
    let catChoice = prompt("Select Category:\n1. Burgers\n2. Sides\n3. Drinks\n4. Desserts\n5. Back"); 
    let category;
    
    //assign category based on user's choice
    switch (catChoice) {
        case "1": category = "Burgers"; break;
        case "2": category = "Sides"; break;
        case "3": category = "Drinks"; break;
        case "4": category = "Desserts"; break;
        case "5": mainMenu(); return; //go back to main menu
        default:
            alert("Invalid choice.");
            ordering(); //retry if invalid
            return;
    }

    let items = menu[category]; //get items from selected category
    let itemList = `${category} Menu:\n`;

    //list items in that category
    for (let i = 0; i < items.length; i++) {
        itemList += `${i + 1}. ${items[i].Name} - ₱${items[i].Price} (${items[i].Stock} left)\n`;
    }

    //ask which item to add
    let itemChoice = prompt(itemList + "\nSelect item number to add:");
    let index = parseInt(itemChoice) - 1;

    if (index >= 0 && index < items.length) {
        let qty = parseInt(prompt("Enter quantity:")); //ask for the quantity
        if (qty > 0 && qty <= items[index].Stock) {
            cart.push({ Name: items[index].Name, Price: items[index].Price, Qty: qty });
            items[index].Stock -= qty; //reduce stock
            alert("Added to cart.");
        } else {
            alert("Invalid quantity.");
        }
    } else {
        alert("Invalid selection.");
    }

    ordering(); //loop back to order more
}

// Function to view the current cart
function viewCart() {
    if (cart.length === 0) {
        alert("Cart is empty.");
        mainMenu();
        return;
    }

    let cartText = "Cart:\n";

    //list cart items
    for (let i = 0; i < cart.length; i++) {
        cartText += `${i + 1}. ${cart[i].Name} x${cart[i].Qty} - ₱${cart[i].Price * cart[i].Qty}\n`;
    }

    let action = prompt(cartText + "\nOptions:\n1. Remove Item\n2. Back");
    if (action === "1") {
        let remove = parseInt(prompt("Enter item number to remove:")) - 1;
        if (remove >= 0 && remove < cart.length) {
            cart.splice(remove, 1); //remove from cart
            alert("Item removed.");
        } else {
            alert("Invalid item.");
        }
    }

    mainMenu(); //return to main menu
}

// Function for checking out and calculating total price
function checkout() {
    if (cart.length === 0) {
        alert("Cart is empty.");
        mainMenu();
        return;
    }

    let receipt = "Receipt:\n";
    let total = 0;

    //loop through cart to build receiot and calculate total
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let subtotal = item.Price * item.Qty;
        total += subtotal;
        receipt += `${item.Name} x${item.Qty} - ₱${subtotal}\n`;
    }

    receipt += `Total: ₱${total}`;
    alert(receipt);

    let payment = parseFloat(prompt("Enter payment amount:")); //ask to payment
    if (payment >= total) {
        let change = payment - total;
        alert(`Payment received: ₱${payment}\nChange: ₱${change.toFixed(2)}\nThank you!`);
        cart = []; // clear cart
    } else {
        alert("Insufficient payment. Please try again.");
    }

    mainMenu(); //reyurn to main menu
}

// Run the program
login(); //start login
mainMenu(); //start menu
