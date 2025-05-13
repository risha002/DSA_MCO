//log in 
//using function
function login() {
   let username = prompt("Enter cashier username: "); //prompts the user for a cashier's un
   alert(`Welcome, ${username}!`);
}

//4 categories menu
//using objects array
let menu = {
    Burgers: [
        //5 sub-categories of burger
        {Name: "Cripsy Chicken", 
            Info: "A crispy chicken sandwhich with yellow cheddar, cucumber pickles, and our secret sauce!", 
            Price: 199, 
            Stock: 100},
        {Name: "Classic Cheeseburger", 
            Info: "Juicy beef patty topped with melted cheddar cheese, lettuce, tomato, onions, pickles, and our signature sauze on a toasred bun.", 
            Price: 99, 
            Stock: 100},
    ],

    Sides: [
        //5 sub categories of sides
        {Name: "French Fries",
            Info: "Cripsy, golden fries with a light salt finish.",
            Price: 65, 
            Stock:"100"},

        {Name: "Cheesy Fries",
            Info: "Fries topped with creamy cheddar cheese sauce.",
            Price: 85,
            Stock: 100
        },
    ],

    Drinks: [
        //5 sub categories of drinks
        {Name: "Iced Tea",Price:49, Stock:100}
    ],

    Desserts: [
        //5 sub categories of desserts
        {Name: "Cake",Price:199, Stock:100}
    ]
};

//cart to hold orders
let cart = [];

function ordering() {
    let message = "Choose a category: \n1. Burger\n2. Slides\n3. Drinks\n4. Desserts\n5. Go to cart\n6. Check Out\n7. Cancel Order";
    let choice = prompt(message);

    switch (choice) {
        case "1":
            alert("Burger");
            break;
        case "2":
            alert("Slides");
            break;
        case "3":
            alert("Drinks");
            break;
        case "4":
            alert("Desserts");
            break;
        case "5":
           alert("Cart");
            break;
        case "6":
            alert("Check-out");
            break;
        case "7":
            alert("Cancel ordering'");
            break;
        default:
            alert("Invalid choice. Try again");
            ordering();
    }
}

login();
ordering();
