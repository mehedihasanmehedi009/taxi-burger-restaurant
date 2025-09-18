const lodCategories = () => {
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories));
};

const lodFood = (id) => {
  fetch(`https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then((res) => res.json())
    .then((data) => DisplayFood(data.foods));
};

const DisplayFood = (Food) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  for (const item of Food) {
    const FoodCard = document.createElement("div");
    FoodCard.innerHTML += `
          <div class="p-5 bg-white flex gap-3 shadow rounded-xl m-5">
            <div class="img flex-1">
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[200px] rounded-xl h-[170px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                 ${item.title}
              </h1>

              <div class="badge badge-warning">${item.category}</div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price"</span> BDT
                  $ <span class="price">${item.price}</span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>
        `;
    foodContainer.appendChild(FoodCard);
  }
};
const DisplayCategories = (categories) => {
  //   console.log(data);
  const categoriesContainer = document.getElementById("category-container");
  //   console.log(categoriesContainer);
  categoriesContainer.innerHTML = "";
  for (let item of categories) {
    // console.log(item);
    const categoriesCard = document.createElement("div");
    categoriesCard.innerHTML = `
       <button onclick="lodFood(${item.id})" class="btn btn-block shadow btn-category">
            <img
              src=${item.categoryImg}
              alt=""
              class="w-10"
            /> ${item.categoryName}
          </button>
          
      `;
    categoriesContainer.appendChild(categoriesCard);
  }
};

lodCategories();
