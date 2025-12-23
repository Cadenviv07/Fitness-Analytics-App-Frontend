import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function DashboardPage() {
  const [workouts, setWorkouts] = useState([]);
  const[newWorkout, setNewWorkout] = useState({ workout: "", date: "" })
  const email = localStorage.getItem("email");

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  
  const fetchWorkouts = async () => {

    if(!token) return;
    try {
        const res = await axios.get(`http://localhost:8080/api/workouts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWorkouts(res.data);
      } catch (err) {
        console.error("Failed to fetch workouts:", err);
      }
    };
    
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchWorkouts();
    }
  }, [email]);

  const handleChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleCreateWorkout = async(e) => {
    e.preventDefault();
    try{
      console.log("Token being sent:", localStorage.getItem("token"));
      await axios.post("http://localhost:8080/api/workouts", newWorkout, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Workout created succsessfully!");
      setNewWorkout({workout: "" , date: ""});
      fetchWorkouts();
    }catch(err){
      console.error("Error creating workout:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login")
  }

  return (
    <>
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <h1>FullStacked</h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>

    <div className="p-8">
      {/* CREATE WORKOUT FORM SECTION */}
      <div className="mb-10 p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Create New Workout</h2>
        <form onSubmit={handleCreateWorkout} className="flex flex-col gap-4 max-w-md">
          <input
            type="text"
            name="workout" 
            placeholder="Workout Name (e.g. Leg Day)"
            value={newWorkout.workout}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="date" 
            value={newWorkout.date}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Workout
          </button>
        </form>
      </div>

      {/* WORKOUT LIST SECTION */}
      <h1 className="text-2xl font-semibold mb-6">Your Workouts</h1>
      <ul className="space-y-4">
        {workouts?.map((w) => (
          <li key={w.id}>
            <Link to={`/workout/${w.id}`} className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200">
              <h2 className="text-xl font-bold">{w.workout}</h2>
              <p className="text-gray-700 mt-1">
                {w.muscleGroups?.join(", ") || "No muscle groups set"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}