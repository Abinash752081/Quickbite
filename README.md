# 🍜 QuickBite Recipe Finder

QuickBite is a modern, responsive web application built with React and TypeScript that allows users to discover exciting new recipes. Users can search for meals by name or browse through categories and cuisines to find inspiration for their next culinary adventure.



---

## ✨ Features

-   **Recipe Search**: A dynamic search bar to find recipes by name.
-   **Debounced Input**: API calls are only made after the user stops typing to prevent rate-limiting and improve performance.
-   **Category & Cuisine Filtering**: Filter recipes by popular categories (e.g., Vegetarian, Seafood) or cuisines (e.g., Italian, Indian).
-   **Interactive Recipe Cards**: A clean, grid-based layout of recipe cards with hover animations.
-   **Detailed Recipe Modal**: Clicking a recipe card opens a modal with a detailed view, including:
    -   High-quality image
    -   Formatted ingredient list
    -   Step-by-step instructions
    -   Dietary classification (Veg/Non-Veg)
-   **Responsive Design**: A mobile-first design that looks great on all devices, from phones to desktops.
-   **Simple Routing**: Seamless navigation between the Home and About pages.
-   **Loading & Error States**: Clear feedback is provided to the user while data is being fetched or if an error occurs.

---

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **API**: [TheMealDB API](https://www.themealdb.com/api.php)
-   **Deployment**: Codesandbox

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/en/) (which includes npm) installed on your system.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Abinash752081/Quickbite.git](https://github.com/Abinash752081/Quickbite.git))
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd quickbite
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm start
    ```

The application should now be running on `http://localhost:3000`.

---

## 🏗️ Project Structure

For this assignment, the entire application logic is contained within `src/App.tsx` for simplicity and ease of review.

```
/
|-- public/
|-- src
|   |-- App.tsx         # Main component with all logic and sub-components
|   |-- index.css       # Tailwind CSS setup and global styles
|   +-- main.tsx        # Entry point for the React app
|-- package.json
+-- README.md
```

-   **`App.tsx`**: Contains all components, state management, API calls, and type definitions. In a larger application, components, types, and API logic would be split into separate files and folders for better organization.

---

## ✍️ Author

-   **Abinash MIshra** - Naukri0925
-   [https://github.com/Abinash752081]
