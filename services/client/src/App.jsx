import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import authComponents from "./components/auth";
import userComponents from "./components/user";
import navBarComponents from "./components/navbar";
import keyWordComponents from "./components/keyword";
import About from "./components/About";
import Message from "./components/Message";

class App extends React.Component {
  state = {
    user: null,
    accessToken: null,
    messageText: null,
    messageType: null,
  };

  onRegisterFormSubmit = async (payload) => {
    try {
      const registerApiUrl = `${process.env.REACT_APP_SERVER_URL}/auth/register`;
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      await axios.post(registerApiUrl, payload, { headers });
      this.createMessage("green", "You have registered successfully.");
    } catch (error) {
      this.createMessage("red", "That user already exists.");
      console.log(error);
    }
  };

  onLoginFormSubmit = async (payload) => {
    try {
      const loginApiUrl = `${process.env.REACT_APP_SERVER_URL}/auth/login`;
      let headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
      const authResponse = await axios.post(loginApiUrl, payload, { headers });
      this.createMessage("green", "Sign-In successful.");
      this.setState({ accessToken: authResponse.data.access_token });
      window.localStorage.setItem(
        "refreshToken",
        authResponse.data.refresh_token
      );

      const userDetailApiUrl = `${process.env.REACT_APP_SERVER_URL}/users/${authResponse.data.user_id}`;
      headers.Authorization = `Bearer ${this.state.accessToken}`;
      const userResponse = await axios.get(userDetailApiUrl, { headers });
      this.setState({ user: userResponse.data });
    } catch (error) {
      console.log("Invalid credentials");
    }
  };

  onUpdateUserFormSubmit = async (payload) => {
    try {
      const updateUserApiUrl = `${process.env.REACT_APP_SERVER_URL}/users/${this.state.user.id}`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${this.state.accessToken}`,
        "Content-Type": "application/json",
      };
      delete payload.password;
      const userResponse = await axios.put(updateUserApiUrl, payload, {
        headers,
      });
      this.setState({ user: userResponse.data });
    } catch (error) {
      console.log("Invalid credentials");
    }
  };

  onRemoveUserClick = async () => {
    try {
      const deleteUserApiUrl = `${process.env.REACT_APP_SERVER_URL}/users/${this.state.user.id}`;
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${this.state.accessToken}`,
      };
      await axios.delete(deleteUserApiUrl, {
        headers,
      });
      window.localStorage.removeItem("refreshToken");
      this.setState({ accessToken: null });
    } catch (error) {}
  };

  onLogOutClick = () => {
    window.localStorage.removeItem("refreshToken");
    this.setState({ accessToken: null });
  };

  isAuthenticated = () => {
    if (this.state.accessToken) {
      return true;
    }
    return false;
  };

  createMessage = (type, text) => {
    this.setState({
      messageText: text,
      messageType: type,
    });

    setTimeout(() => {
      this.removeMessage();
    }, 5000);
  };

  removeMessage = () => {
    this.setState({ messageText: null, messageType: null });
  };

  onAddKeywordFormSubmit = async () => {
    console.log("Hello");
  };

  render() {
    return (
      <div className="ui">
        <navBarComponents.NavBar
          isAuthenticated={this.isAuthenticated}
          handleLogOutClick={this.onLogOutClick}
        />
        <div className="ui container">
          <div className="ui segment">
            {this.state.messageType && this.state.messgeText && (
              <Message
                messageText={this.state.messageText}
                messageType={this.state.messageType}
                removeMessage={this.removeMessage}
              />
            )}
            <div className="ui grid">
              <div className="two wide column" />
              <div className="twelve wide column">
                <Switch>
                  <Route path="/" exact component={About} />
                  <Route
                    path="/register"
                    exact
                    component={() => (
                      <authComponents.RegisterUser
                        handleRegisterFormSubmit={this.onRegisterFormSubmit}
                        isAuthenticated={this.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    path="/login"
                    exact
                    component={() => (
                      <authComponents.LoginUser
                        handleLoginFormSubmit={this.onLoginFormSubmit}
                        isAuthenticated={this.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    path="/profile"
                    exact
                    component={() => (
                      <userComponents.ShowUser
                        user={this.state.user}
                        handleRemoveUserClick={this.onRemoveUserClick}
                        isAuthenticated={this.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    path="/update"
                    exact
                    component={() => (
                      <userComponents.UpdateUser
                        user={this.state.user}
                        isAuthenticated={this.isAuthenticated}
                        handleUpdateUserFormSubmit={this.onUpdateUserFormSubmit}
                      />
                    )}
                  />
                  <Route
                    path="/keyword"
                    exact
                    component={() => (
                      <keyWordComponents.KeywordList
                        isAuthenticated={this.isAuthenticated}
                      />
                    )}
                  />
                  <Route
                    path="/keyword/1"
                    exact
                    component={() => (
                      <keyWordComponents.KeywordDetail
                        isAuthenticated={this.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </div>
              <div className="two wide column" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
