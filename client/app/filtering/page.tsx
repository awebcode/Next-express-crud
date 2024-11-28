"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming ShadCN's Button component is installed
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Technology", "Health", "Education", "Lifestyle", "Business"];
const popularData = [
  { id: 1, title: "AI in 2024", category: "Technology" },
  { id: 2, title: "Healthy Living Tips", category: "Health" },
  { id: 3, title: "Online Learning Platforms", category: "Education" },
  { id: 4, title: "Work-Life Balance", category: "Lifestyle" },
    { id: 5, title: "The Future of Programming", category: "Technology" },
  
];

const FilterComponent = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredData =
    activeCategory === "All"
      ? popularData
      : popularData.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title and Subtitle */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2 ">
          Category <span className="text-blue-500">Filter</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Choose a category to explore relevant articles.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 my-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Filtered Data with Transition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimatePresence mode="wait">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <motion.div
                key={item.id}
                className="p-4 rounded-lg shadow-md border bg-card"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Category: {item.category}
                </p>
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center col-span-full text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              No items found in this category.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FilterComponent;
