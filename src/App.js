import axios from "axios";
import { useState, useEffect } from "react";
import UserCard from "./components/UserCard";
import "./styles/body.css";

function App() {
  const [users, setUsers] = useState([]);
  const [renderUsers, setRenderUsers] = useState([]);
  const [text, setText] = useState("Loading users...");
  const [filter, setFilter] = useState("all");

  // render users when start the website
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=32")
      .then((res) => {
        setUsers(res.data.results);
        setRenderUsers(res.data.results);
      })
      .catch((err) => setText(err));
  }, []);

  // filter gender
  useEffect(() => {
    const filterGender = (gender) => {
      const filterResult = users.filter(user => user.gender === gender);
      setRenderUsers(filterResult);
    }
    const male = document.getElementById('male');
    const female = document.getElementById('female');
    const all = document.getElementById('all');
    if (filter === 'male') {
      filterGender('male');
      all.classList.remove('selected');
      male.classList.add('selected');
      female.classList.remove('selected');
    } else if (filter === 'female') {
      filterGender('female');
      all.classList.remove('selected');
      male.classList.remove('selected');
      female.classList.add('selected');
    } else {
      setRenderUsers(users);
      all.classList.add('selected');
      male.classList.remove('selected');
      female.classList.remove('selected');
    }
  }, [filter])

  return (
    <div className="App">
      <h1 className="title">RandomUser</h1>
      <div className="filter">
        <span className="selected" id="all" onClick={() => setFilter("all")}>All</span>
        <span id="male" onClick={() => setFilter("male")}>Male</span>
        <span id="female" onClick={() => setFilter("female")}>Female</span>
      </div>
      {renderUsers.length === 0 ? (
        <p>{text}</p>
      ) : (
        <div className="grid-box">
          {renderUsers.map((user) => {
            return <UserCard user={user} key={Math.random()} />;
          })}
        </div>
      )}
    </div>
  );
}

export default App;
