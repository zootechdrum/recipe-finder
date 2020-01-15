$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

    const noRecipe = {
      name: "Recipe has not been Added",
      directions: ["Please add recipe"],
      ingredients: ["Please add recipe"]
    };

let recipes = [
  {
    name: "Herb Marinated Feta",
    ingredients: [
      "8 ounces feta cheese, cut into ½-inch cubes",
      "2 teaspoons Herbes de Provence",
      "1 cup extra-virgin olive oil"
    ],
    directions: [
      "Layer the feta and herbs in a clean jar. Pour in the olive oil until it covers the cheese (about 1 cup). Let marinate in the refrigerator at least 8 hours. Serve with crackers."
    ]
  },
  {
    name: "Grilled Cheese",
    ingredients: [
      "2 slices Cheddar cheese",
      "2 slices white bread",
      "1.5 tablespoons butter, divided"
    ],
    directions: [
      "Preheat skillet over medium heat.",
      " Generously butter one side of a slice of bread.",
      "Place bread butter-side-down onto skillet bottom and add 1 slice of cheese.",
      "Butter a second slice of bread on one side and place butter-side-up on top of sandwich.",
      "Grill until lightly browned and flip over;",
      "continue grilling until cheese is melted. ",
      "Repeat with remaining 2 slices of bread",
      "butter and slice of cheese."
    ]
  }
];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentRecipe: recipes[0],
      showModal: false,
      newRecipe:{
        name: '',
        ingredients:[],
        directions:[]
      }
    };

    this.handler = this.handler.bind(this);
    this.delete = this.delete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

    if (
      localStorage.getItem("recipes") !== null &&
      localStorage.getItem("recipes") !== "[]"
    ) {
      
      const getLocalStore = localStorage.getItem("recipes");
      const newObject = JSON.parse(getLocalStore);
      recipes = newObject;
      this.setState({ currentRecipe: recipes[0] });
    } else if (localStorage.getItem("recipes") === "[]") {
      recipes = [];
      recipes.push(noRecipe);
      this.setState({ currentRecipe: recipes[0] });
    }
  }
 handleChange(event){
   var recipeToAdd = {...this.state.newRecipe};
   
   if(event.target.name === 'name'){
     recipeToAdd[event.target.name] = event.target.value;
   }else{
     recipeToAdd[event.target.name] = event.target.value.split(",")
   }

    this.setState({newRecipe: recipeToAdd}) 
 }
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    console.log(recipes)
    for(var k = 0; k < recipes.length; k++){
      if(recipes[k].name === "Recipe has not been Added"){
        recipes.splice(k,1)
        // console.log(recipes)
      }
    }

    recipes.push(this.state.newRecipe)
    console.log(recipes)
    localStorage.setItem("recipes", JSON.stringify(recipes))
    this.setState({ show: false, currentRecipe:recipes[0] });
  };

  delete(recipe) {
    const updatedRecipes = recipes.filter(item => item.name !== recipe);
    const updateLocalStore = localStorage.setItem(
      "recipes",
      JSON.stringify(updatedRecipes)
    );
    const getLocalStore = localStorage.getItem("recipes");
    if(getLocalStore === "[]"){
      recipes = [];
       recipes.push(noRecipe)
      this.setState({currentRecipe: recipes[0]})     
    }else{
    const newObject = JSON.parse(getLocalStore);
    recipes = newObject;
    console.log("k")
    this.setState({ currentRecipe: recipes[0] });
      }
  }

  handler(food) {
    for (let i = 0; i < recipes.length; i++) {
      if (food === recipes[i].name) {
        this.setState({ currentRecipe: recipes[i] });
      }
    }
  }

  render() {
    return (
      <div class="container">
        <Modal show={this.state.show} handleChange={this.handleChange} handleClose={this.hideModal} />
        <h1 id="title" class="text-center">
          Recipe Finder{" "}
          <i onClick={this.showModal} class="far fa-plus-square" />
        </h1>
        <ul class="recipe">
          {recipes.map(recipe => (
            <li
              className="recipeItem"
              onClick={this.handler.bind(this, recipe.name)}
            >
              {recipe.name}{" "}
              <i
                onClick={this.delete.bind(this, recipe.name)}
                className={
                  recipe.name !== "Recipe has not been Added"
                    ? "fas fa-times"
                    : ""
                }
                data-placement="right"
                data-toggle="tooltip"
                title="Delete Recipe"
              />
            </li>
          ))}
        </ul>
        <RecipeDetails recipe={this.state.currentRecipe} />
      </div>
    );
  }
}

function RecipeDetails(props) {
  const ingredient = props.recipe.ingredients;
  const direction = props.recipe.directions;

  const directions = direction.map(directionList => <li>{directionList}</li>);
  const ingredientItems = ingredient.map(ingredient => <li>{ingredient}</li>);
  return (
    <div>
      <h2 class="text-center">{props.recipe.name}</h2>
      <div className="ingredient-content">
        <h3 className="ingredient-title">Ingredients</h3>
        <ul>{ingredientItems}</ul>
      </div>
      <div className="direction-content">
        <h3 className="direction-title">Directions</h3>
        <ol>{directions}</ol>
      </div>
    </div>
  );
}

function Modal({ handleClose, show, children, handleChange }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="model-main">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Recipe Name</label>
            <input
              name = "name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <div class="form-group">
              <label for="exampleInputEmail1">Ingredients in Recipe</label>
              <input
                name = "ingredients"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              <small id="emailHelp" class="form-text text-muted">
                Format Expected: 2 apples,3 oranges,4 cookies, 30 pies
              </small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Directions for Recipe</label>
              <input
                name="directions"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange}
              />
              <small id="emailHelp" class="form-text text-muted">
                Format Expected: dump juice,squeeze juice,bake pie
              </small>
            </div>
          </div>
          <div className="text-center background-button">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-success"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
