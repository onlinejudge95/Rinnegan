import React from "react";

const AddUser = (props) => {
  return (
    <form onSubmit={(event) => props.addUser(event)}>
      <div className="field">
        <label className="label is-large" htmlFor="input-username">
          Username
        </label>
        <input
          name="username"
          id="input-username"
          className="input is-large"
          type="text"
          placeholder="Enter a username"
          value={props.username}
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="field">
        <label className="label is-large" htmlFor="input-email">
          Email
        </label>
        <input
          name="email"
          id="input-email"
          className="input is-large"
          type="email"
          placeholder="Enter an email"
          value={props.email}
          onChange={props.handleChange}
          required
        />
      </div>
      <div className="field">
        <label className="label is-large" htmlFor="input-password">
          Password
        </label>
        <input
          name="password"
          id="input-password"
          className="input is-large"
          type="password"
          placeholder="Enter a password"
          value={props.password}
          onChange={props.handleChange}
          required
        />
      </div>
      <input
        type="submit"
        className="button is-primary is-large is-fullwidth"
        value="Submit"
      />
    </form>
  );
};

export default AddUser;
