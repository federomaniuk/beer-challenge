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
      id: product.id,
      brand: product.brand,
      image: product.image,
      prices: prices,
    };
  });

  res.json(productsWithPrices);
});

app.get("/api/stock-price/:sku", (req, res) => {
  const { sku } = req.params;
  const stockData = stockPrice[sku];

  if (!stockData) {
    return res.status(404).json({ error: "SKU not found" });
  }

  res.json({
    sku: sku,
    price: stockData.price,
    stock: stockData.stock,
  });
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const productWithPrices = {
    id: product.id,
    brand: product.brand,
    image: product.image,
    style: product.style,
    substyle: product.substyle,
    abv: product.abv,
    origin: product.origin,
    information: product.information,
    skus: product.skus.map((sku) => {
      const stockData = stockPrice[sku.code];
      return {
        code: sku.code,
        name: sku.name,
        price: stockData ? stockData.price : null,
        stock: stockData ? stockData.stock : null,
      };
    }),
  };

  res.json(productWithPrices);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
