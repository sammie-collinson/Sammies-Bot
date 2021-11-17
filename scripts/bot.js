const axios = require('axios').default;

const getCocktails = async function (){
    const cocktails = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    return cocktails.data.drinks[0];
}

const getRecipes = async function (){
    const recipes = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    return recipes.data.meals[0];
}

const veggieMeals = async function (){
    const veggies = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian');
    const randomVegRecipe = Math.floor(Math.random() * veggies.data.meals.length);
    return veggies.data.meals[randomVegRecipe];
}

const nonAlcoholic = async function(){
    const mocktail = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
    const randomMocktail = Math.floor(Math.random() * mocktail.data.drinks.length);
    return mocktail.data.drinks[randomMocktail];
}

module.exports = function (bot) {
    bot.hear(/\!cocktail ideas/i, async function (res){
        let cocktails = await getCocktails();
        let cocktailName = cocktails.strDrink;
        let firstIngredient = cocktails.strIngredient1;
        let secondIngredient = cocktails.strIngredient2;
        let thirdIngredient = cocktails.strIngredient3;
        let picture = cocktails.strDrinkThumb;
        console.log(cocktailName);
        console.log(cocktails);
        return res.send(`Why don't you try a ${cocktailName}? Ingredients include: ${firstIngredient}, ${secondIngredient}, ${thirdIngredient}. ${picture}`);
    })
    bot.hear(/bored/i, function (res){
        return res.send(`:face_with_monocle::face_with_monocle::face_with_monocle: *Oh, you're bored?*:face_with_monocle::face_with_monocle::face_with_monocle: \nLet's plan a dinner party! Request any of these things by typing: \n"!Cocktail Ideas" \n"!Games" or \n"!Food"`);
    })
    bot.hear(/\!food/i, async function (res){
        let recipes = await getRecipes();
        let mealName = recipes.strMeal;
        let mealVideo = recipes.strYoutube;
        console.log(mealName);
        console.log(recipes);
        return res.send(`Try serving up ${mealName}! Instructions on how to make this can be found at this video: ${mealVideo}`);
    })
    bot.hear(/\!games/i, function (res){
        return res.send(`How many players do you have? Respond with '# players'`);
    })
    bot.hear(/(.*) players/i, function (res){
        let num
        num = parseInt(res.match[0])
        console.log(num);
        if (num < 3){
            return res.send(`Ah, a small get together I see! Try playing Taco vs. Burrito. \nhttps://www.amazon.com/Taco-Burrito-Popular-Surprisingly-Strategic/dp/B07JZTBV9C`);
        } else if (num >= 3 && num < 6){
            return res.send(`It's time to Settle. Settle some Catan. \nhttps://www.amazon.com/Mayfair-Games-MFG3061-Settlers-Catan/dp/B000W7JWUA`);
        } else {
            return res.send(`Oh, you've got a crowd coming over! May I suggest ruining your friendships with Secret Hitler? \nhttps://www.amazon.com/Secret-Hitler/dp/B01JKD4HYC/ref=sr_1_1?keywords=secret+hitler&qid=1637179714&s=toys-and-games&sr=1-1`);
        }
    })
    bot.respond(/What is your favorite (.*)?\?/i, function(msg){
        let fav
        fav = msg.match[1]
        console.log(fav);
        switch (fav) {
            case 'food':
                return msg.reply(`I do love it when Jeff Bezos lets me taste his dinner to see if it is poisoned`);
            case 'game':
                return msg.reply(`I am a robot, so I don't have any friends. So I like playing Tetris.`);
            case 'drink':
                return msg.reply(`Glug, glug, glug....*burp* robot beer.`);
            default:
                return msg.reply(`I don't have a favorite ${fav}. Tell me yours.`);
        }
    })
    bot.respond(/What was the best dinner party you ever went to?/i, function (msg){
        return msg.send(`The Office Season 4 Episode 13.`);
    })
    bot.respond(/veggie/i, async function(msg){
        let vegMeal = await veggieMeals();
        console.log(vegMeal);
        let vegRecipeName = vegMeal.strMeal;
        let vegRecipePic = vegMeal.strMealThumb;
        return msg.reply(`For your vegetarian guests, try serving ${vegRecipeName} \n${vegRecipePic}`);
    })
    bot.hear(/vegetarian/i, function(res){
        res.send(`Oh you need vegetarian options? That's fine! Just say, "@sammie-bot veggie" and I'll give you an idea.`);
    })
    bot.respond(/Hi my name is (.*)/i, function (msg){
        let name;
        name = msg.match[1];
        if (name == 'sammie-bot'){
            return msg.send("You're not sammie-bot--I'm sammie-bot!")
        } else {
            return msg.reply(`Nice to meet you, ${name}!`)
        }
    })
    bot.hear(/non-alcoholic/i, function(res){
        res.send(`Ah, I also hate hangovers. \n\nFor a random Zero-Proof Mocktail, just say "@sammie-bot zero proof" and I'll send you one!`);
    })
    bot.respond(/zero proof/i, async function(msg){
        let sober = await nonAlcoholic();
        console.log(sober);
        let mocktailName = sober.strDrink;
        let mocktailPic = sober.strDrinkThumb;
        return msg.reply(`Sip on a ${mocktailName}! \n${mocktailPic}`);
    })
    bot.respond(/what celebrity would you have at your party\?/i, function(msg){
        return msg.reply(`I'd invite Bender Rodrigues! \nhttps://memegenerator.net/img/instances/54953324.jpg`);
    }) 
    bot.hear(/What day is today\?/i, function(res){
        let date = new Date().toDateString();
        return res.send(`Today is ${date} - a perfect day for a dinner party.`);
    })
    bot.respond(/give me a random dinner and drink combo/i, async function(msg){
        let randomDinner = await getRecipes();
        console.log(randomDinner);
        let randomMealName = randomDinner.strMeal;
        let randomMealPic = randomDinner.strMealThumb;
        let randomDrink = await getCocktails();
        let randomDrinkName = randomDrink.strDrink;
        let randomDrinkPic = randomDrink.strDrinkThumb;
        return msg.reply(`Try serving: \n*${randomMealName}* for dinner and \n*${randomDrinkName}* for drinks! \n${randomMealPic} \n${randomDrinkPic}`)
    })
}