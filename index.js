//  categoriesContainer
const loading = (load) => {
  if (load == true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("food-container").classList.add("hidden");
  } else {
    document.getElementById("food-container").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
  }
};

const lodCategories = () => {
  fetch(" https://taxi-kitchen-api.vercel.app/api/v1/categories")
    .then((res) => res.json())
    .then((data) => DisplayCategories(data.categories));
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
       <button id="item-btn-${item.id}" onclick="lodFood(${item.id})" class="btn btn-block shadow btn-category mt-2 md:justify-start items-center rounded-lg">
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
//  foodall lod
const LodFoods = () => {
  fetch(`https://taxi-kitchen-api.vercel.app/api/v1/foods/random/`)
    .then((res) => res.json())
    .then((data) => DisplayFood(data.foods));
};

//  foodContain
const lodFood = (id) => {
  // btn color
  loading(true);
  const nums = document.querySelectorAll(".btn-category");
  nums.forEach((btn) => btn.classList.remove("Active"));
  const mun = document.getElementById(`item-btn-${id}`);
  mun.classList.add("Active");

  fetch(`https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`)
    .then((res) => res.json())
    .then((data) => DisplayFood(data.foods));
};

const DisplayFood = (Food) => {
  // console.log(Food);
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  for (const item of Food) {
    const FoodCard = document.createElement("div");
    FoodCard.innerHTML = `
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

              <div  onclick='lodDitals("${item.id}")' class="badge badge-warning cursor-pointer">${item.category}</div>

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

    loading(false);
  }
};

// lodDitails
const lodDitals = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => DitailsContainer(data.details));
};

const DitailsContainer = (Zoom) => {
  const DisplayModel = document.getElementById("daitail-Cantainer");
  DisplayModel.innerHTML = `
   <div>
            <h2 class="text-3xl font-bold mb-4">${Zoom.title}</h2>
          </div>
           <div>
            <img
              src="${Zoom.foodImg}"
              alt=""
            />
          </div>
          <div class=" badge badge-primary mt-5">
          ${Zoom.area}
            
          </div>
          <div>
            <a href="${Zoom.video}" class="btn btn-warning my-6"> Watch in Video</a>
          </div>
           
  `;

  document.getElementById("my_modal_5").showModal();

  // console.log(Zoom);
};

LodFoods();
lodCategories();
