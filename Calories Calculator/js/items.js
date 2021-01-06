/*jshint esversion: 6 */

const data = {
    // Store current food element to update or delete it
    currentFood: null,
    // Store total of foods calories
    totalCalories: 0
};



// used for store each food as a object in LS
class Food {
    constructor(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
}

// Item Controller: take values from User interface to LS
class Item {
    /* 
    Generat IDs for foods and store them from User interface to LS
    And return food object
    */
    static addFood(name, calories) {
        const foods = Storage.getFoods();
        let id;
        if (foods.length > 0) {
            id = foods[foods.length - 1].id + 1;
        } else {
            id = 0;
        }

        calories = parseInt(calories);

        const newFood = new Food(id, name, calories);
        Storage.storeFood(newFood);

        return newFood;

    }

    // input: Elemnt id, updated name and calories - to Update food in LS by 
    static updateFood(id, name, calories) {
        const foods = Storage.getFoods(),
            index = Item.getFoodIndex(id);

        foods[index].name = name;
        foods[index].calories = calories;
        Storage.updateFood(foods[index]);
    }

    // Get food index in list to update foods in LS
    static getFoodIndex(id) {
        const food = document.getElementById(id),
            parent = food.parentNode,
            index = Array.prototype.indexOf.call(parent.children, food);

        return index;
    }

    // store current food to edit
    static setCurrentFood(item) {
        data.currentFood = item;
    }

    // Get Current food that stored
    static getCurrentFood() {
        return data.currentFood;
    }

    // Get total calories from foods stored in LS and return it
    static totalCalories() {
        let total = 0;
        const foods = Storage.getFoods();

        foods.forEach(item => total += item.calories);
        data.totalCalories = total;

        return data.totalCalories;
    }
}