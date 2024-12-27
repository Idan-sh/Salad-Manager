import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className="app-header">
      <h1>Salad Manager</h1>
      <nav className="app-header__nav">
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/create-ingredient">Create New Ingredient</NavLink>
        <NavLink to="/create-salad">Create New Salad</NavLink>
        <NavLink to="/trivia">Trivia</NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
