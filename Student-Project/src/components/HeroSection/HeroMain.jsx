import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeroMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    age: "",
    status: "Active",
  });

  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch students from API
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setStudents(response.data.users || response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:8000/api/user/${editingId}`, formData);
        toast.success("Student updated successfully!", { position: "top-right" });
      } else {
        await axios.post("http://localhost:8000/api/user", formData);
        toast.success("Student added successfully!", { position: "top-right" });
      }

      // Reset form & refresh data
      setFormData({ name: "", image: "", age: "", status: "Active" });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Edit student
  const handleEdit = (id) => {
    const studentToEdit = students.find((student) => student.id === id || student._id === id);
    if (studentToEdit) {
      setFormData(studentToEdit);
      setEditingId(studentToEdit.id || studentToEdit._id);
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
      toast.success("Student deleted successfully!", { position: "top-right" });

      // Refresh data after deletion
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id && student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Student Management</h1>
      
      <form onSubmit={submitForm} className="bg-white p-6 shadow-md rounded-lg w-96 mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingId !== null ? "Edit Student" : "Add Student"}</h2>

        {/* Image Preview */}
        {formData.image && (
          <div className="flex justify-center mb-3">
            <img src={formData.image} alt="Preview" className="w-20 h-20 rounded-full border shadow-md" />
          </div>
        )}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <select name="status" value={formData.status} onChange={handleChange} className="w-full mb-3 p-2 border rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded">
          {editingId !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      {/* Student List Table */}
      <div className="w-full max-w-2xl">
        {students.length > 0 && (
          <table className="min-w-full bg-white p-4 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Profile</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id || student._id} className="border-b">
                  <td className="py-2 px-4">
                    <img src={student.image || "https://via.placeholder.com/150"} alt={student.name} className="w-12 h-12 rounded-full" />
                  </td>
                  <td className="py-2 px-4 font-semibold">{student.name}</td>
                  <td className="py-2 px-4">{student.age}</td>
                  <td className="py-2 px-4">
                    <span className={`${student.status === "Active" ? "text-green-500" : "text-red-500"}`}>{student.status}</span>
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleEdit(student.id || student._id)} className="text-blue-500 mr-2">Edit</button>
                    <button onClick={() => handleDelete(student.id || student._id)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HeroMain;
