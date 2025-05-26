import { useState, useEffect, useCallback } from "react";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, options = {}) => {
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
  }, []);

  return {
    loading,
    error,
    fetchData,
  };
};

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const { loading, error, fetchData } = useApi();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchData("/products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    getProducts();
  }, [fetchData]);

  return {
    products,
    loading,
    error,
  };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const { loading, error, fetchData } = useApi();

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return;

      try {
        const data = await fetchData(`/products/${productId}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    getProduct();
  }, [productId, fetchData]);

  const refetch = useCallback(async () => {
    if (!productId) return;
    try {
      const data = await fetchData(`/products/${productId}`);
      setProduct(data);
      return data;
    } catch (err) {
      console.error("Error fetching product:", err);
      return null;
    }
  }, [productId, fetchData]);

  return {
    product,
    loading,
    error,
    refetch,
  };
};

export const useStockPrice = () => {
  const { fetchData } = useApi();

  const getStockPrices = async (skus) => {
    try {
      const promises = skus.map((sku) => fetchData(`/stock-price/${sku}`));
      const results = await Promise.all(promises);
      return results;
    } catch (err) {
      console.error("Error fetching stock prices:", err);
      return [];
    }
  };

  return {
    getStockPrices,
  };
};
