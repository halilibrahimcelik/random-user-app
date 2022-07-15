import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [person, setPerson] = useState("");
  const [title, setTitle] = useState("name");
  const [content, setContent] = useState("");
  const [userList, setUserList] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setPerson(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => getData(), []);
  useEffect(() => {
    setTitle("name");
    setContent(
      person.name &&
        `${person.name.title} ${person.name.first} ${person.name.last}`
    );
  }, [person]);

  const newUserHandler = () => {
    getData();
  };
  const hoverHandler = (e) => {
    if (e.target.dataset.label) {
      const key = e.target.dataset.label;
      setTitle(key);
      if (key === "age") setContent(person.dob.age);
      else if (key === "street") setContent(person.location.street.name);
      else if (key === "password") setContent(person.login.password);
      else if (key === "name")
        setContent(
          `${person.name.title} ${person.name.first} ${person.name.last}`
        );
      else setContent(person[key]);
    }
  };
  const addUserHandler = () => {
    setUserList((prevList) => {
      if (
        prevList.every((element) => element.login.uuid !== person.login.uuid)
      ) {
        return [...prevList, person];
      } else return prevList;
    });
  };
  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img
            src={person.picture?.medium || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{content}</p>
          <div className="values-list" onMouseOver={hoverHandler}>
            <button className="icon" data-label="name">
              <img
                src={person.gender === "female" ? womanSvg : manSvg}
                alt="user"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img
                src={person.gender === "female" ? womanAgeSvg : manAgeSvg}
                alt="age"
                id="iconImg"
              />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={newUserHandler}>
              new user
            </button>
            <button className="btn" type="button" onClick={addUserHandler}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr className="body-tr" key={user.login.uuid}>
                  <td className="td">{user.name.first}</td>
                  <td className="td">{user.email}</td>
                  <td className="td">{user.phone}</td>
                  <td className="td">{user.dob.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}
export default App;
