/*jshint esversion: 6 */

// Storage controller
class Storage {
    // Get all foods from LS to using them at all parts of project
    static getFoods() {
        let items;
        // Check if storage has foods 
        if (localStorage.getItem('foods') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('foods'));
        }

        return items;
    }

    // Store Foods in LS
    static storeFood(item) {
        const items = Storage.getFoods();

        items.push(item);
        localStorage.setItem('foods', JSON.stringify(items));
    }

    // Update food in LS
    static updateFood(updatedFood) {
        const items = Storage.getFoods();

        items.forEach((item, index) => {
            if (updatedFood.id === item.id) {
                items.splice(index, 1, updatedFood);
            }
        });

        localStorage.setItem('foods', JSON.stringify(items));
    }

    // Delete food from LS by ID
    static deleteFood(id) {
        const items = Storage.getFoods();

        items.forEach((item, index) => {
            if (id === item.id) {
                items.splice(index, 1);
            }
        });

        localStorage.setItem('foods', JSON.stringify(items));
    }

    // CLear all food items in LS
    static clearAll() {
        localStorage.removeItem('foods');
    }
}