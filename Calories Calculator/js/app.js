/*jshint esversion: 6 */

// UI Controller: add and edit foods in user Interface
class UI {
	// Food Li in list 
	static foodHTML(id, name, calories) {
		const html = `
			<li id="${id}" class="item border py-3 px-4">
				<strong>${name}</strong> : ${calories} Calories
				<i id="edit-food" class="edit-food fa fa-pencil float-end"></i>
			</li>`;

		return html;
	}

	// To display all foods and total calories from LS in UI 
	static showFoods() {
		const foods = Storage.getFoods();
		foods.forEach(item => {
			document.querySelector('#foods-list').innerHTML +=
				UI.foodHTML(item.id, item.name, item.calories);
		});

		UI.getTotalCalories();
	}

	// Add food to UI and get total calories
	static addFoodToList(name, calories) {
		let food;
		if (name && calories) {
			food = Item.addFood(name, calories);

			document.querySelector('#foods-list').innerHTML +=
				UI.foodHTML(food.id, food.name, food.calories);

			document.querySelector('#name').value = '';
			document.querySelector('#calories').value = '';
			UI.getTotalCalories();
		}
	}

	// Edit and update food at list in UI
	static updateFoodInList() {
		const currentFood = Item.getCurrentFood(),
			nameInput = document.querySelector('#name').value,
			caloriesInput = parseInt(document.querySelector('#calories').value);

		if (nameInput && caloriesInput) {
			document.getElementById(currentFood.id).innerHTML = `
				<strong>${nameInput}</strong> : ${caloriesInput} Calories
				<i id="edit-food" class="edit-food fa fa-pencil float-end"></i>`;
				
			Item.updateFood(currentFood.id, nameInput, caloriesInput);
			UI.cancelEdit();
			UI.getTotalCalories();
		}
	}

	// Delete food from list in UI
	static deleteFoodFromList() {
		const currentFood = Item.getCurrentFood();

		document.getElementById(currentFood.id).remove();
		Storage.deleteFood(currentFood.id);
		UI.cancelEdit();
		UI.getTotalCalories();
	}

	// Show edit state and get food name and calories in inputs
	static editFood(target) {
		if (target.classList.contains('edit-food')) {
			const foods = Storage.getFoods();
			document.querySelector('.add-btn').classList.add('d-none');
			document.querySelector('.edit-btns').classList.remove('d-none');

			foods.forEach(item => {
				if (target.parentElement.id == item.id) {
					Item.setCurrentFood(item);
					document.querySelector('#name').value = item.name;
					document.querySelector('#calories').value = item.calories;
				}
			});
		}
	}

	// cancel edit state
	static cancelEdit() {
		document.querySelector('.add-btn').classList.remove('d-none');
		document.querySelector('.edit-btns').classList.add('d-none');
		document.querySelector('#name').value = '';
		document.querySelector('#calories').value = '';
	}

	// Clear all foods at foods list in UI
	static clearAll() {
		while (document.querySelector('#foods-list').firstChild) {
			document.querySelector('#foods-list').firstChild.remove();
		}

		if (document.querySelector('.add-btn').classList.contains('d-none')) {
			UI.cancelEdit();
		}

		Storage.clearAll();
		UI.getTotalCalories();
	}

	// Get total calories in UI
	static getTotalCalories() {
		document.querySelector('#t-cal').innerText = Item.totalCalories();
	}
}

// load all event listeners
loadEventListeners();

// Group all events
function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', UI.showFoods());

	document.querySelector('#add').addEventListener('click', e => {
		const nameInput = document.querySelector('#name').value,
			caloriesInput = document.querySelector('#calories').value;

		UI.addFoodToList(nameInput, caloriesInput);
	});

	document.querySelector('#foods-list').addEventListener('click', e => UI.editFood(e.target));
	document.querySelector('#back').addEventListener('click', UI.cancelEdit);
	document.querySelector('#update').addEventListener('click', UI.updateFoodInList);
	document.querySelector('#delete').addEventListener('click', UI.deleteFoodFromList);
	document.querySelector('#clear').addEventListener('click', UI.clearAll);
}