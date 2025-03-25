import { useEffect, useState, useCallback } from "react";
import { useAuth } from "react-oidc-context";
import { FaRedo } from "react-icons/fa";
import "./NutritionHistory.css";

const NutritionHistory = () => {
  const auth = useAuth();
  const userSub = auth.user?.profile?.sub;
  const [history, setHistory] = useState(() => {
    const cachedData = sessionStorage.getItem("nutritionHistory");
    return cachedData ? JSON.parse(cachedData) : [];
  });
  const [loading, setLoading] = useState(history.length === 0);
  const [error, setError] = useState(null);

  const fetchNutritionHistory = useCallback(async () => {
    if (!userSub) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://3vd10i2cz5.execute-api.us-east-1.amazonaws.com/dev/calorie_run_details?sub=${encodeURIComponent(userSub)}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setHistory(data);
        sessionStorage.setItem("nutritionHistory", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Failed to fetch nutrition history", error);
      setError("Failed to load nutrition history.");
    } finally {
      setLoading(false);
    }
  }, [userSub]);

  useEffect(() => {
    if (history.length === 0) {
      fetchNutritionHistory();
    }
  }, [userSub, history.length, fetchNutritionHistory]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Nutrition History</h2>
        <button className="refresh-button" onClick={fetchNutritionHistory}>
          <FaRedo className="refresh-icon" />
        </button>
      </div>
      {history.length === 0 ? (
        <p className="no-history">No history available.</p>
      ) : (
        <div className="table-container">
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>{new Date(entry.timestamp_unix * 1000).toLocaleDateString()}</td>
                  <td>{new Date(entry.timestamp_unix * 1000).toLocaleTimeString()}</td>
                  <td className="calories">{entry.calories}</td>
                  <td className="protein">{entry.protein}g</td>
                  <td className="carbs">{entry.carbohydrate}g</td>
                  <td className="fat">{entry.fat}g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NutritionHistory;
