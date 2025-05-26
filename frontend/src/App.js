import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ProductList from "./components/views/products/ProductList";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductList />} />
              <Route
                path="*"
                element={
                  <div className="not-found">
                    <h2>Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                    <a href="/products">Back to Products</a>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
