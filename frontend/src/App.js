import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ProductList from "./components/views/products/ProductList";
import ProductDetail from "./components/views/products/ProductDetail";
import { UserProvider } from "./contexts/UserContext";

function App() {
  const routes = [
    {
      path: "/",
      element: <Navigate to="/products" replace />,
    },
    {
      path: "/products",
      element: <ProductList />,
    },
    {
      path: "/product/:productSlug",
      element: <ProductDetail />,
    },
    {
      path: "*",
      element: (
        <div className="not-found">
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist.</p>
          <a href="/products">Back to Products</a>
        </div>
      ),
    },
  ];
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <main className="app-main">
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
