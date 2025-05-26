import express from "express";
import cors from "cors";
import products from "./products.js";
import stockPrice from "./stock-price.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/products", (req, res) => {
  const productsWithPrices = products.map((product) => {
    const prices = product.skus.map((sku) => {
      const stockData = stockPrice[sku.code];
      return {
        sku: sku.code,
        name: sku.name,
        price: stockData ? stockData.price : null,
        stock: stockData ? stockData.stock : null,
      };
    });

    return {
      brand: product.brand,
      image: product.image,
      prices: prices,
    };
  });

  res.json(productsWithPrices);
});

app.get("/api/stock-price/:sku", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
