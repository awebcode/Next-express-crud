import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())
const PORT = 5000;

app.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json({ message: "success", products });
});

app.post("/create", async (req, res) => {
  const { name, price, description } = req.body;
  console.log({ body: req.body });
  const product = await prisma.product.create({
    data: {
      name,
      price: Number(price),
      description,
    },
  });
  res.json({ message: "success",  product });
});


app.put("/update/:id", async (req, res): Promise<any> => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    // First, get the current product details
    const currentProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Prepare the data object with current values as defaults
    const updatedData = {
      name: name || currentProduct.name, // Use new name or default to current name
      price: price ? Number(price) : currentProduct.price, // Use new price or default to current price
      description: description || currentProduct.description, // Use new description or default to current description
    };

    // Update the product with the new or default values
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updatedData,
    });

    res.json({ message: "success", product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
});



app.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    const products = await prisma.product.delete({
        where: {
            id: id,
        },
    });
    res.json({ message: "success", data: products });
})

app.listen(PORT, () => {
  console.log(`Rest apis listening on port ${PORT}`);
});
