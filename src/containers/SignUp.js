import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <div>
      <form
        onSubmit={async event => {
          event.preventDefault();
        }}
      >
        <input
          type="texte"
          placeholder=""
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          type="email"
          placeholder=""
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder=""
          value={password1}
          onChange={event => {
            setPassword1(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder=""
          value={password2}
          onChange={event => {
            setPassword2(event.target.value);
          }}
        ></input>

        <Link to="/" className="create-an-account-button">
          <input type="submit">Créer mon Compte Personnel</input>
        </Link>
      </form>
    </div>
  );
}

export default SignUp;
