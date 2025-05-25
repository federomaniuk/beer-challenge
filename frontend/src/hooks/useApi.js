import { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:3001/api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    fetchData,
  };
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const { loading, error, fetchData } = useApi();

  const getProducts = async () => {
    try {
      const data = await fetchData("/products");
      setProducts(data);
      return data;
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    loading,
    error,
  };
};
