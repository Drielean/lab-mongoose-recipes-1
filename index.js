const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
	.connect(MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((self) => {
		console.log(`Connected to the database: "${self.connection.name}"`);
		// Before adding any documents to the database, let's delete all previous entries
		return self.connection.dropDatabase();
	})
	.then(async () => {
		// Run your code here, after you have insured that the connection was made
		const newRecipe = await Recipe.create({
			title: 'Pizza',
			level: 'Easy Peasy',
			ingredients: ['Pizza Dough', 'Toppings', 'Tomato Sauce', 'Cheeze'],
			cuisine: 'Italian',
			dishType: 'main_course',
			image:
				'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
			duration: 45,
			creator: 'Random Italian Person',
			created: new Date('11-06-1889'),
		});

		const manyRecipes = await Recipe.insertMany(data);

		const updateRigatoni = await Recipe.findOneAndUpdate(
			{ title: 'Rigatoni alla Genovese' },
			{ $set: { duration: 100 } },
			{ new: true }
		);
		console.log(updateRigatoni);

		const deleteCarrotCake = await Recipe.deleteOne({
			title: "Carrot Cake"
		});

		console.log("Carrot Cake deleted")
	})
	.catch((error) => {
		console.error('Error connecting to the database', error);
	});
