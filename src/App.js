import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [jobs, setJobs] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  useEffect(() => {

    fetch("https://my-project-backend1.onrender.com/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));

  }, []);




  const register = async () => {

    const response = await fetch(
      "https://my-project-backend1.onrender.com/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    alert(data.message);
  };




  const login = async () => {

    const response = await fetch(
      "https://my-project-backend1.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      }
    );

    const data = await response.json();

    if (data.token) {

      localStorage.setItem("token", data.token);

      alert("Вход выполнен");

    } else {

      alert(data.message);

    }
  };



  return (
    <div style={{ padding: 20 }}>

      <h1>GODFREELANCE</h1>

      <h2>Регистрация / Вход</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={register}>
        Регистрация
      </button>

      <button onClick={login}>
        Войти
      </button>

      <hr />

      <h2>Заказы</h2>

      {jobs.map(job => (

        <div
          key={job._id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10
          }}
        >

          <h3>{job.title}</h3>

          <p>{job.price}$</p>

        </div>

      ))}

    </div>
  );
}

export default App;