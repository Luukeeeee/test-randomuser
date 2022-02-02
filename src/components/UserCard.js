import React from "react";
import "../styles/userCard.css";

const UserCard = ({ user }) => {
  return (
    <div className="card">
      <div className="photo">
        <img src={user.picture.large} />
      </div>
      <h1>
        {user.name.first}{' '}{user.name.last}
      </h1>
      <h2> </h2>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};

export default UserCard;
