// src/ProductStatisticsPage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ProductStatistics = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product data from your API
    axios
      .get(`http://localhost:3000/api/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product data:", error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  } else {
    console.log(product);
  }

  const { name, addToCartCount, purchaseCount, avg_polarity } = product;
  console.log(name, addToCartCount, purchaseCount, avg_polarity);

  const data = [
    { name: "Add to Cart Count", value: addToCartCount },
    { name: "Purchase Count", value: purchaseCount },
    { name: "Average Polarity", value: avg_polarity },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Statistics for {name}
      </h1>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-center mb-6">Metrics</h2>
        <div className="flex justify-center">
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default ProductStatistics;
