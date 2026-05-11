import { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    fetch("https://my-project-backend1.onrender.com/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  };

  const addJob = async () => {
    await fetch("https://my-project-backend1.onrender.com/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        price
      })
    });

    setTitle("");
    setPrice("");

    loadJobs();
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Фриланс Биржа 🚀</h1>

      <div style={{ marginBottom: "30px" }}>
        <input
          placeholder="Название заказа"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button onClick={addJob}>
          Добавить заказ
        </button>
      </div>

      {jobs.map(job => (
        <div
          key={job._id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px"
          }}
        >
          <h2>{job.title}</h2>
          <p>💰 {job.price}$</p>
        </div>
      ))}
    </div>
  );
}

export default App;