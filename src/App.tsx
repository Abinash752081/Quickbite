import React, { useState, useEffect, useCallback } from "react";

// --- Type Definitions ---

// Defines the shape of props for simple icon components
type IconProps = {
  className: string;
};

// Represents a recipe summary as returned by search/filter endpoints
type RecipeSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

// Represents the full details of a single recipe
type RecipeDetails = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  // Allows for up to 20 ingredients and measures, which can be string or null
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

// --- Helper & Icon Components ---

const ChefHatIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5.3 4.2C6.3 3.4 7.6 3 9 3c1.4 0 2.7.4 3.7 1.2M18.7 4.2C17.7 3.4 16.4 3 15 3c-1.4 0-2.7.4-3.7 1.2" />
    <path d="M12 13V6" />
    <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
    <path d="M12 21a9 9 0 0 0 9-9" />
    <path d="M12 21a9 9 0 0 0-9-9" />
  </svg>
);

const SearchIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const XIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const VegIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect
      x="15"
      y="15"
      width="70"
      height="70"
      stroke="#4ade80"
      strokeWidth="10"
      fill="none"
    />
    <circle cx="50" cy="50" r="15" fill="#4ade80" />
  </svg>
);

const NonVegIcon: React.FC<IconProps> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className}>
    <rect
      x="15"
      y="15"
      width="70"
      height="70"
      stroke="#f87171"
      strokeWidth="10"
      fill="none"
    />
    <path d="M 50,30 L 70,70 L 30,70 Z" fill="#f87171" />
  </svg>
);

// --- Main UI Components ---

type HeaderProps = {
  setCurrentPage: React.Dispatch<React.SetStateAction<"home" | "about">>;
};

const Header: React.FC<HeaderProps> = ({ setCurrentPage }) => (
  <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center space-x-3">
          <ChefHatIcon className="h-8 w-8 text-green-400" />
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Quick<span className="text-green-400">Bite</span>
          </h1>
        </div>
        <nav className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => setCurrentPage("home")}
            className="text-gray-300 hover:text-green-400 transition-colors font-medium text-base"
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage("about")}
            className="text-gray-300 hover:text-green-400 transition-colors font-medium text-base"
          >
            About
          </button>
        </nav>
      </div>
    </div>
  </header>
);

type FilterPillProps = {
  label: string;
  category: string;
  activeFilters: Record<string, string>;
  setActiveFilters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
};

const FilterPill: React.FC<FilterPillProps> = ({
  label,
  category,
  activeFilters,
  setActiveFilters,
}) => {
  const isActive = activeFilters[category] === label;
  const handleClick = () => {
    setActiveFilters(() => {
      // Allow only one filter to be active at a time for simplicity with the API
      if (isActive) {
        return {}; // Clear filters if clicking the active one
      } else {
        return { [category]: label }; // Set new filter
      }
    });
  };
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
        isActive
          ? "bg-green-500 text-white shadow-lg"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
    >
      {label}
    </button>
  );
};

type FiltersProps = {
  filterOptions: Record<string, string[]>;
  activeFilters: Record<string, string>;
  setActiveFilters: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
};

const Filters: React.FC<FiltersProps> = ({
  filterOptions,
  activeFilters,
  setActiveFilters,
}) => (
  <section className="mb-16 p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
    <h3 className="text-2xl font-bold text-white mb-6 text-center sm:text-left">
      Find Inspiration
    </h3>
    <div className="flex flex-col space-y-6">
      {Object.entries(filterOptions).map(([category, labels]) => (
        <div key={category}>
          <h4 className="font-semibold text-gray-300 mb-3 text-lg capitalize">
            {category}
          </h4>
          <div className="flex flex-wrap gap-3">
            {labels.map((label) => (
              <FilterPill
                key={label}
                label={label}
                category={category}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    <p className="text-xs text-gray-500 mt-6 text-center sm:text-left">
      * Note: 'Category' and 'Cuisine' filters are functional. 'Mood' and 'Time'
      are for demonstration purposes.
    </p>
  </section>
);

type RecipeCardProps = {
  recipe: RecipeSummary;
  onSelectRecipe: (id: string) => void;
  index: number;
};

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  index,
}) => (
  <button
    onClick={() => onSelectRecipe(recipe.idMeal)}
    className="group text-left block bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1 animate-fade-in-up"
    style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
  >
    <div className="relative">
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src =
            "https://placehold.co/600x400/1F2937/a7f3d0?text=Image+Not+Found";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-0"></div>
      <div className="absolute top-3 right-3 bg-gray-900/60 p-1.5 rounded-full backdrop-blur-sm">
        <ChefHatIcon className="h-5 w-5 text-green-400" />
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg text-white truncate group-hover:text-green-400 transition-colors">
        {recipe.strMeal}
      </h3>
      <p className="text-sm text-green-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
        View Recipe &rarr;
      </p>
    </div>
  </button>
);

type RecipeModalProps = {
  recipe: RecipeDetails;
  isLoading: boolean;
  onClose: () => void;
};

const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  isLoading,
  onClose,
}) => {
  const getIngredients = (): string[] => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetails];
      const measure = recipe[`strMeasure${i}` as keyof RecipeDetails];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const getDietaryType = (
    recipe: RecipeDetails
  ): "veg" | "non-veg" | "unknown" => {
    if (!recipe || !recipe.strCategory) return "unknown";
    const nonVegCategories = [
      "Seafood",
      "Chicken",
      "Beef",
      "Pork",
      "Lamb",
      "Goat",
      "Side",
    ];
    if (recipe.strCategory === "Vegetarian" || recipe.strCategory === "Vegan")
      return "veg";
    if (nonVegCategories.includes(recipe.strCategory)) return "non-veg";
    return "non-veg"; // Default to non-veg if category is not explicitly veg
  };

  const dietaryType = getDietaryType(recipe);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <p className="text-white">Loading recipe...</p>
          </div>
        ) : (
          <>
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-3xl font-bold text-white pr-4">
                  {recipe.strMeal}
                </h2>
                {dietaryType === "veg" && (
                  <div className="flex-shrink-0 flex items-center space-x-2 bg-green-900/50 text-green-300 px-3 py-1 rounded-full">
                    <VegIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">Veg</span>
                  </div>
                )}
                {dietaryType === "non-veg" && (
                  <div className="flex-shrink-0 flex items-center space-x-2 bg-red-900/50 text-red-300 px-3 py-1 rounded-full">
                    <NonVegIcon className="w-6 h-6" />
                    <span className="font-semibold text-sm">Non-Veg</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">
                    Ingredients
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {getIngredients().map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-2">
                    Instructions
                  </h3>
                  <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {recipe.strInstructions}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-900/50 rounded-full p-2 transition-colors"
        >
          <XIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-16 px-4 text-center animate-fade-in-up">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
      About QuickBite
    </h2>
    <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed">
      Welcome to QuickBite, your number one source for culinary inspiration!
      We're dedicated to giving you the very best of recipe ideas, with a focus
      on simplicity, creativity, and deliciousness.
      <br />
      <br />
      Founded with a passion for cooking, QuickBite has come a long way from its
      beginnings. When we first started out, our passion for helping people
      overcome the daily "what to cook?" dilemma drove us to create this
      platform. Now, we serve users all over the world and are thrilled to be a
      part of the creative wing of the food industry.
      <br />
      <br />
      We hope you enjoy our recipes as much as we enjoy offering them to you. If
      you have any questions or comments, please don't hesitate to contact us.
      Happy cooking!
    </p>
  </div>
);

const Footer: React.FC = () => (
  <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} QuickBite. All Rights Reserved.</p>
      <p className="text-sm">Created with passion for good food.</p>
    </div>
  </footer>
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetails | null>(
    null
  );
  const [isModalLoading, setIsModalLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<"home" | "about">("home");

  // Debounce search query
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500); // 500ms delay
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const fetchRecipeDetails = async (id: string): Promise<void> => {
    setIsModalLoading(true);
    setSelectedRecipe({} as RecipeDetails); // Set a temporary empty object to open modal
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data: { meals: RecipeDetails[] | null } = await response.json();
      if (data.meals) {
        setSelectedRecipe(data.meals[0]);
      } else {
        setSelectedRecipe(null);
      }
    } catch (err) {
      console.error("Failed to fetch recipe details:", err);
      setSelectedRecipe(null);
    } finally {
      setIsModalLoading(false);
    }
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    let url = "";
    const activeCategory = activeFilters.Category;
    const activeCuisine = activeFilters.Cuisine;

    if (activeCategory) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`;
    } else if (activeCuisine) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${activeCuisine}`;
    } else if (debouncedSearchQuery) {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchQuery}`;
    } else {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`; // Default empty search
    }

    if (!url) {
      setIsLoading(false);
      setRecipes([]);
      return;
    }

    try {
      const response = await fetch(url);
      const data: { meals: RecipeSummary[] | null } = await response.json();
      // The API returns a meal named "Kuurdak" which has a broken/missing image
      const filteredMeals = (data.meals || []).filter(
        (meal) => meal.strMeal !== "Kuurdak"
      );
      setRecipes(filteredMeals);
    } catch (err) {
      setError("Could not fetch recipes. Please try again later.");
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, activeFilters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Clear filters when user starts typing in search bar
  useEffect(() => {
    if (searchQuery) {
      setActiveFilters({});
    }
  }, [searchQuery]);

  const filterOptions: Record<string, string[]> = {
    Mood: ["Comfort Food", "Quick & Easy", "Healthy", "Fancy"],
    Time: ["< 15 min", "< 30 min", "< 1 hour", "1 hour+"],
    Category: [
      "Vegetarian",
      "Seafood",
      "Dessert",
      "Pasta",
      "Chicken",
      "Breakfast",
    ],
    Cuisine: ["Italian", "Japanese", "Indian", "Chinese", "French", "Mexican"],
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap'); 
        body { font-family: 'Inter', sans-serif; } 
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        .animate-fade-in { animation: fadeIn 0.3s ease-in-out forwards; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-in-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-in-out forwards; }
      `}</style>

      <Header setCurrentPage={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow w-full">
        {currentPage === "home" ? (
          <div>
            <section className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Find Your Next Meal
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-8">
                Search by recipe name or use our filters to discover something
                new and delicious.
              </p>
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  e.preventDefault()
                }
                className="max-w-xl mx-auto flex items-center bg-gray-800 rounded-full p-2 shadow-lg focus-within:ring-2 focus-within:ring-green-500 transition-shadow"
              >
                <SearchIcon className="h-6 w-6 mx-3 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  placeholder="e.g., carbonara, sushi, curry..."
                  className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none"
                />
              </form>
            </section>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "150ms" }}
            >
              <Filters
                filterOptions={filterOptions}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            </div>

            <section
              className="animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center sm:text-left">
                Recipe Ideas
              </h2>
              {isLoading ? (
                <p className="text-center text-gray-400">
                  Finding yummy recipes...
                </p>
              ) : error ? (
                <p className="text-center text-red-400">{error}</p>
              ) : recipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {recipes.map((recipe, index) => (
                    <RecipeCard
                      key={recipe.idMeal}
                      recipe={recipe}
                      onSelectRecipe={fetchRecipeDetails}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400">
                  No recipes found. Try another search or filter!
                </p>
              )}
            </section>
          </div>
        ) : (
          <AboutPage />
        )}
      </main>

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          isLoading={isModalLoading}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      <Footer />
    </div>
  );
}
