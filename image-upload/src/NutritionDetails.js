import React from "react";
import "./NutritionDetails.css"; // Add styling if needed

const NutritionDetails = ({ nutritionData }) => {
  return (
    <div className="nutrition-details">
      <h2>Nutrition Information</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(nutritionData).map(([key, value]) => (
            <tr key={key}>
              <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionDetails;
