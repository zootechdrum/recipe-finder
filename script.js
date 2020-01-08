const Recipe = [
{
  name: "Herb Marinated Feta",
  ingredients: [
  "8 ounces feta cheese, cut into ½-inch cubes",
  "2 teaspoons Herbes de Provence",
  "1 cup extra-virgin olive oil"],

  directions:
  ["Layer the feta and herbs in a clean jar. Pour in the olive oil until it covers the cheese (about 1 cup). Let marinate in the refrigerator at least 8 hours. Serve with crackers."] },

{
  name: "Grilled Cheese",
  ingredients: [
  "2 slices Cheddar cheese",
  "2 slices white bread",
  "1.5 tablespoons butter, divided"],

  directions: [
  "Preheat skillet over medium heat.", " Generously butter one side of a slice of bread.", "Place bread butter-side-down onto skillet bottom and add 1 slice of cheese.", "Butter a second slice of bread on one side and place butter-side-up on top of sandwich.", "Grill until lightly browned and flip over;", "continue grilling until cheese is melted. ", "Repeat with remaining 2 slices of bread", "butter and slice of cheese."] },

{
  name: "Sugar Cookies",
  ingredients: [
  "2 3/4 cups all-purpose flour",
  "1 teaspoon baking soda",
  "1 cup butter, softened",
  "1 1/2 cups white sugar",
  "1 egg"],

  directions: [
  "Preheat oven to 375 degrees F (190 degrees C).", "In a small bowl, stir together flour, baking soda, and baking powder. Set aside.",
  "In a large bowl, cream together the butter and sugar until smooth.", "Beat in egg and vanilla.", "Gradually blend in the dry ingredients.",
  "Roll rounded teaspoonfuls of dough into balls, and place onto ungreased cookie sheets.",
  "Bake 8 to 10 minutes in the preheated oven, or until golden.", "Let stand on cookie sheet two minutes before removing to cool on wire racks."] }];




class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentRecipe: Recipe[0] };


    this.handler = this.handler.bind(this);
  }

  componentDidMount() {
    localStorage.setItem("Recipes", JSON.stringify(Recipe));
  }

  handler(food) {
    for (let i = 0; i < Recipe.length; i++) {
      if (food === Recipe[i].name) {
        this.setState({ currentRecipe: Recipe[i] });
      }
    }
  }

  render() {
    return (
      React.createElement("div", { class: "container" },
      React.createElement("h1", { id: "title", class: "text-center" }, "Recipe Finder"),
      React.createElement("ul", { class: "recipe" },
      Recipe.map((recipe) =>
      React.createElement("li", { class: "recipeItem", onClick: this.handler.bind(this, recipe.name) },
      recipe.name))),



      React.createElement(RecipeDetails, { recipe: this.state.currentRecipe })));


  }}


function RecipeDetails(props) {
  const ingredient = props.recipe.ingredients;
  const direction = props.recipe.directions;

  const directions = direction.map(direction => React.createElement("li", null, direction));
  const ingredientItems = ingredient.map(ingredient => React.createElement("li", null, ingredient));
  return (
    React.createElement("div", null,
    React.createElement("h2", { class: "text-center" }, props.recipe.name),
    React.createElement("ul", null, ingredientItems),
    React.createElement("ol", null, directions)));


}

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));