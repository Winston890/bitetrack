import React from "react";

const NutritionDetails = ({ nutritionData }) => {
  if (!nutritionData) return null; // Don't render if no data

  return (
    <div className="nutrition-table">
      <h2>Nutrition Details</h2>
      <table>
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
            {Object.entries(nutritionData).map(([key, value]) => (
                <React.Fragment key={key}>
                <tr>
                    <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                    <td>{value}</td>
                </tr>
                </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default NutritionDetails;
