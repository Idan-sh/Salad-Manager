import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Products from "./pages/Products";
import Trivia from "./pages/Trivia";
import CreateIngredient from "./pages/CreateIngredient";
import CreateSalad from "./pages/CreateSalad";
import AppHeader from "./components/AppHeader";

const PagesRouter = () => {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/create-ingredient" element={<CreateIngredient />} />
        <Route path="/create-salad" element={<CreateSalad />} />
        <Route path="/trivia" element={<Trivia />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PagesRouter;
