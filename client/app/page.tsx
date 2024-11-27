"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const fetchData = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
  const data = await res.json();
  return data.products;
};

const ProductCard: React.FC<{
  product: Product;
  onDelete: (id: string) => void;
  onUpdate: (product: Product) => void;
}> = ({ product, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [form, setForm] = React.useState<Product>({ ...product });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(form);
    setIsEditing(false);
  };

  return (
    <Card className="w-[350px] my-4">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Product" : product.name}</CardTitle>
        <CardDescription>{!isEditing && product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                name="description"
                id="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                id="price"
                type="number"
                value={form.price}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <div>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Save</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => onDelete(product.id)}>
              Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default function ProductsComponent() {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Product[]>([]);
  const [form, setForm] = React.useState({ name: "", description: "", price: 0 });

  React.useEffect(() => {
    setLoading(true);
    fetchData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateProduct = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const serverRes = await res.json();
    setData([...data, serverRes.product]);
    setForm({ name: "", description: "", price: 0 });
  };

  const handleDeleteProduct = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/delete/${id}`, {
      method: "DELETE",
    });
    setData(data.filter((product) => product.id !== id));
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/update/${updatedProduct.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      }
    );
    const serverRes = await res.json();
    setData(
      data.map((product) =>
        product.id === updatedProduct.id ? serverRes.product : product
      )
    );
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container flex flex-col items-center justify-center my-7 space-y-6">
      {/* Create Product Form */}
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            Fill in the details below to add a new product.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                placeholder="Product Name"
                onChange={handleFormChange}
                value={form.name}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                name="description"
                id="description"
                placeholder="Product Description"
                onChange={handleFormChange}
                value={form.description}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                name="price"
                id="price"
                type="number"
                placeholder="Product Price"
                onChange={handleFormChange}
                value={form.price.toString()}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleCreateProduct}>Add Product</Button>
        </CardFooter>
      </Card>

      {/* Product List */}
      <div className="space-y-4">
        {data.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        ))}
      </div>
    </div>
  );
}
