import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

function WorkoutPage() {
  const { id } = useParams();

  const[workout, setWorkout] = useState(null);
  const[exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [exerciseName, setExerciseName] = useState("");
  const [sets, setSets] = useState([{ weight: "", reps: "" , }]);

  
  useEffect(() => {

    const token = localStorage.getItem("token")
  
    setIsLoading(true);
    setError(null);
    setWorkout(null);
    setExercises([]);

    fetch(`http://localhost:8080/api/workouts/${id}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setWorkout(data);
        setExercises(data.exercises || []); 
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetching error: ", err);
        setError(err.message);
        setIsLoading(false);
      });

  }, [id]);

  const handleSetChange = (index, field, value) => {
    const updatedSets = [...sets];
    updatedSets[index][field] = value; 
    setSets(updatedSets);
  };

  const addSetRow = () => {
    setSets([...sets, { weight: "", reps: "" }]);
  };

  const removeSetRow = (index) => {
    const updatedSets = sets.filter((_, i) => i !== index);
    setSets(updatedSets);
  };

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        
       
        const payload = {
            exercise: exerciseName,
            sets: sets 
        };

      
        const response = await axios.post(
            `http://localhost:8080/api/workouts/${id}/exercises`, 
            payload,
            { headers: { "Authorization": `Bearer ${token}` } }
        );

        
        setExercises([...exercises, response.data]);
  
        setShowAddForm(false);
        setExerciseName("");
        setSets([{ weight: "", reps: "" }]);

    } catch (err) {
        console.error("Error adding exercise:", err);
        alert("Failed to add exercise. Check console for details.");
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading workout...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!workout) return <div className="p-8 text-center">Workout not found.</div>;


  return (
    <div className="p-8 max-w-4xl mx-auto">
      

      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{workout.name || "Workout Details"}</h1>
            <p className="text-gray-500 mt-1">
                Date: {workout.date ? workout.date : "No date set"}
            </p>
        </div>
        
       
        <button 
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition shadow-md font-semibold"
        >
            + Add Exercise
        </button>
      </div>

    
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Exercise</h2>
                    
                    <form onSubmit={handleAddExercise}>
                        {/* EXERCISE NAME INPUT */}
                        <div className="mb-5">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Exercise Name</label>
                            <input 
                                type="text"
                                value={exerciseName} 
                                onChange={(e) => setExerciseName(e.target.value)}
                                placeholder="e.g. Bench Press"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" 
                                required 
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Sets</label>
                            <div className="space-y-3">
                                {sets.map((set, index) => (
                                    <div key={index} className="flex gap-3 items-center">
                                        <span className="text-gray-400 font-mono w-6 text-right">{index + 1}.</span>
                                        
                                        <input 
                                            type="number" 
                                            placeholder="kg/lbs"
                                            value={set.weight}
                                            onChange={(e) => handleSetChange(index, "weight", e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none" 
                                            required
                                        />
                                        
                                        <input 
                                            type="number" 
                                            placeholder="Reps"
                                            value={set.reps}
                                            onChange={(e) => handleSetChange(index, "reps", e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none" 
                                            required
                                        />

                                       
                                        {sets.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeSetRow(index)} 
                                                className="text-red-400 hover:text-red-600 font-bold px-2 text-xl"
                                                title="Remove set"
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            <button 
                                type="button" 
                                onClick={addSetRow} 
                                className="mt-3 text-sm text-indigo-600 font-bold hover:text-indigo-800 flex items-center gap-1"
                            >
                                + Add Set
                            </button>
                        </div>
                        
                      
                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <button 
                                type="button" 
                                onClick={() => setShowAddForm(false)} 
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-sm transition"
                            >
                                Save Exercise
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      )}

      <div className="space-y-6">
        {exercises.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No exercises added yet.</p>
                <p className="text-gray-400 text-sm mt-1">Click the button above to get started!</p>
            </div>
        ) : (
            exercises.map((exercise, i) => (
                <div key={exercise.id || i} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                    {/* Exercise Header */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{exercise.name}</h3>
                            {/* Shows Muscle Group if backend filled it in */}
                            {exercise.muscleGroup && (
                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded mt-1 inline-block">
                                    {exercise.muscleGroup.toUpperCase()}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Sets List */}
                    <div className="p-6">
                        <div className="grid grid-cols-3 gap-4 text-sm font-semibold text-gray-500 mb-2 border-b pb-2">
                            <span>SET</span>
                            <span>WEIGHT</span>
                            <span>REPS</span>
                        </div>
                        
                        {exercise.sets && exercise.sets.map((set, setIndex) => (
                            <div key={setIndex} className="grid grid-cols-3 gap-4 py-2 text-gray-700 border-b border-gray-100 last:border-0">
                                <div className="font-mono text-gray-400">{setIndex + 1}</div>
                                <div className="font-medium">{set.weight} <span className="text-xs text-gray-400">kg/lbs</span></div>
                                <div className="font-medium">{set.reps}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}

export default WorkoutPage;