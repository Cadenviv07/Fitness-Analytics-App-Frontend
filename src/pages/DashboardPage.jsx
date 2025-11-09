import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/workouts/${email}`);
        setWorkouts(res.data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      }
    };
    fetchWorkouts();
  }, [email]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Workout Dashboard</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={workouts}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="weight" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">All Workouts</h2>
        <ul className="space-y-2">
          {workouts.map((w) => (
            <li key={w.id} className="p-3 bg-gray-100 rounded-md">
              {w.date}: {w.name} — {w.sets}×{w.reps} @ {w.weight}kg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}