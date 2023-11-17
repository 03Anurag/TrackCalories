class calorieTracker {
    constructor() {
        this.calorielimit = 0;
        this.totalcalorie = 0;
        this.meals = [];
        this.workouts = [];

        this.displaycaloLimit();
        this.displaytotalCalories();
        this.displayconsumedCalories();
        this.displayburnedCalories();
        this.displayremainingCalories();
        this.displayprogressCalories();
    }


    addMeal(meal) {
        this.meals.push(meal);
        this.totalcalorie += meal.calorie;

        this.displaymealBox(meal);
        this.render();
    }

    addWorkout(workout) {
        this.workouts.push(workout);
        this.totalcalorie -= workout.calorie;

        this.displayworkoutBox(workout);
        this.render();
    }

    displaycaloLimit() {
        const div = document.querySelector('.limit');
        div.innerHTML =
            ` <h1>${this.calorielimit}</h1>
        <h3>Daily Calorie Limit</h3>`;
    }

    displaytotalCalories() {
        const totalEl = document.querySelector('.gain-loss');
        totalEl.innerHTML =
            `<h1>${this.totalcalorie}</h1>
        <h3>gain/loss</h3>`
    }

    displayconsumedCalories() {
        const consumedEl = document.querySelector('.consumed');
        const consumedCal = this.meals.reduce((sum, meal) => sum + meal.calorie, 0)
        consumedEl.innerHTML =
            ` <h1>${consumedCal}</h1>
        <h3>Calories Consumed</h3>`
    }
    displayburnedCalories() {
        const consumedEl = document.querySelector('.burned');
        const burnedCal = this.workouts.reduce((sum, workout) => sum + workout.calorie, 0)
        consumedEl.innerHTML =
            `<h1>${burnedCal}</h1>
        <h3>Calories Burned</h3>`
    }
    displayremainingCalories() {
        const remainEl = document.querySelector('.remaining');
        const remaining = this.calorielimit - this.totalcalorie;
        const progressbarEl = document.querySelector('.progress-bar');

        remainEl.innerHTML =
            ` <h1>${remaining}</h1>
        <h3>Calories Remaining</h3>`

        if (remaining < 0) {
            remainEl.style.backgroundColor = '#dc3545';
            progressbarEl.style.backgroundColor = '#dc3545'
        } else {
            remainEl.style.backgroundColor = '#e9ecef';
            progressbarEl.style.backgroundColor = '#599f3d'
        }
    }
    displayprogressCalories() {
        const progressEl = document.querySelector('.progress-bar');

         if(this.totalcalorie===0 && this.calorielimit===0){
            progressEl.style.width = `${0}%`;
            return;
        }
        const percentage = (this.totalcalorie / this.calorielimit) * 100;
        const width = Math.min(percentage, 100);
        progressEl.style.width = `${width}%`
    }
    displaymealBox(meal) {
        const showMealEl = document.querySelector('.meals')
        const div = document.createElement('div');
        div.classList.add('food');
        div.setAttribute('data-id', `${meal.id}`);

        div.innerHTML =
            ` <p>${meal.name}</p>
        <div class="food-count">${meal.calorie}</div>
        <i class="fa-solid fa-x"></i>`

        showMealEl.appendChild(div);
    }
    displayworkoutBox(workout) {
        const showWorkoutEl = document.querySelector('.workouts')
        const div = document.createElement('div');
        div.classList.add('workout');
        div.setAttribute('data-id', `${workout.id}`)

        div.innerHTML =
            ` <p>${workout.name}</p>
        <div class="food-count">${workout.calorie}</div>
        <i class="fa-solid fa-x"></i>`

        showWorkoutEl.appendChild(div);
    }

    removeMealBox(mealId) {
        const findmealIndex = this.meals.findIndex((meal) => meal.id === mealId);
        if (findmealIndex != -1) {
            const meal = this.meals[findmealIndex];
            this.totalcalorie -= meal.calorie;
            this.meals.splice(findmealIndex, 1);
            this.render();
        }
    }
    removeWorkoutBox(workoutId) {
        const findworkoutIndex = this.workouts.findIndex((workout) => workout.id === workoutId);
        if (findworkoutIndex != -1) {
            const workout = this.workouts[findworkoutIndex];
            this.totalcalorie += workout.calorie;
            this.workouts.splice(findworkoutIndex, 1);
            this.render();
        }
    }
    clearAll() {
        this.calorielimit = 0;
        this.totalcalorie = 0;
        this.meals = [];
        this.workouts = [];

        this.displaycaloLimit();
        this.render();
    }

    setLimit(value) {
        this.calorielimit = value;

        this.displaycaloLimit();
        this.render();
    }


    render() {
        this.displaytotalCalories()
        this.displayconsumedCalories();
        this.displayburnedCalories();
        this.displayremainingCalories();
        this.displayprogressCalories();
    }
}


class Meal {
    constructor(name, calorie) {
        this.id = Math.random().toString(16).slice(2)
        this.name = name;
        this.calorie = calorie;
    }
}
class Workout {
    constructor(name, calorie) {
        this.id = Math.random().toString(16).slice(2)
        this.name = name;
        this.calorie = calorie;
    }
}


class App {
    constructor() {
        this.tracker = new calorieTracker();

        document.querySelector('.meal-form').addEventListener('submit', this.newMeal.bind(this));
        document.querySelector('.workout-form').addEventListener('submit', this.newWorkout.bind(this));
        document.querySelector('.meals').addEventListener('click', this.removeMeal.bind(this));
        document.querySelector('.workouts').addEventListener('click', this.removeWorkout.bind(this));
        document.querySelector('.reset-button').addEventListener('click', this.resetData.bind(this));
        document.querySelector('.set-limit').addEventListener('click', this.addActive.bind(this));
        document.querySelector('.limit-inp').addEventListener('submit', this.setdailyLimit.bind(this));
        document.querySelector('.fa-xmark').addEventListener('click', this.removeActive.bind(this));
    }

    newMeal(e) {
        e.preventDefault();

        const mealName = document.querySelector('.meal-inp');
        const mealCalories = document.querySelector('.meal-calo');

        if (mealName.value === '' || mealCalories.value === '') {
            alert('Please fill all fields');
            return;
        }

        const meal = new Meal(mealName.value, +mealCalories.value);
        this.tracker.addMeal(meal);


        mealName.value = '';
        mealCalories.value = '';
    }
    newWorkout(e) {
        e.preventDefault();

        const workoutName = document.querySelector('.workout-inp');
        const workoutCalories = document.querySelector('.workout-calo');

        if (workoutName.value === '' || workoutCalories.value === '') {
            alert('Please fill all fields');
            return;
        }

        const workout = new Meal(workoutName.value, +workoutCalories.value);
        this.tracker.addWorkout(workout);

        workoutName.value = '';
        workoutCalories.value = '';
    }

    removeMeal(e) {
        if (e.target.classList.contains('fa-x')) {
            const mealId = e.target.closest('.food').getAttribute('data-id')
            this.tracker.removeMealBox(mealId);

            e.target.closest('.food').remove();
        }
    }
    removeWorkout(e) {
        if (e.target.classList.contains('fa-x')) {
            const workoutId = e.target.closest('.workout').getAttribute('data-id')
            this.tracker.removeWorkoutBox(workoutId);

            e.target.closest('.workout').remove();
        }
    }

    resetData() {
        if (confirm('Are you sure')) {
            const foods = document.querySelectorAll('.food');
            const workouts = document.querySelectorAll('.workout');

            foods.forEach((food) => food.remove());
            workouts.forEach((workout) => workout.remove());

            this.tracker.clearAll();
        }
    }

    addActive() {
        document.querySelector('.limit-inp').classList.add('active');
    }
    setdailyLimit(e) {
        e.preventDefault();
        const caloLimit = document.querySelector('.get-caloLimit');
        if (caloLimit.value === '') {
            alert('Please set the limit');
        } else {
            this.tracker.setLimit(caloLimit.value);
            caloLimit.value = '';
        }
    }

    removeActive() {
        document.querySelector('.limit-inp').classList.remove('active');
    }
}

const app = new App()















// const tracker= new calorieTracker();

// const meal= new Meal('breakfast',300);
// const lunch=new Meal('lunch',300)
// const workout= new Workout('treadmill',100);
// const run=new Workout('running',250);

// tracker.addMeal(meal);
// tracker.addMeal(lunch);
// tracker.addWorkout(workout)
// tracker.addWorkout(run);

// console.log(tracker.totalcalorie);
