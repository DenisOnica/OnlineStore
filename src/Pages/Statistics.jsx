// src/StatisticsPage.js
import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const StatisticsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching product data:", error));
  }, []);

  // Prepare data for graphs
  const addToCartData = products.map((product) => ({
    name: product.name,
    addToCartCount: product.addToCartCount,
  }));
  const purchaseData = products.map((product) => ({
    name: product.name,
    purchaseCount: product.purchaseCount,
  }));
  const polarityData = products.map((product) => ({
    name: product.name,
    avg_polarity: product.avg_polarity,
  }));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Products Statistics
      </h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add to Cart Count
        </h2>
        <div className="flex justify-center">
          <BarChart width={600} height={300} data={addToCartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="addToCartCount" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Purchase Count
        </h2>
        <div className="flex justify-center">
          <BarChart width={600} height={300} data={purchaseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="purchaseCount" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Average Polarity
        </h2>
        <div className="flex justify-center">
          <BarChart width={600} height={300} data={polarityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avg_polarity" fill="#ffc658" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
