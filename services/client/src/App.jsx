import React from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import About from "./components/About";
import NavBar from "./components/NavBar";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserProfile from "./components/UserProfile";
import Message from "./components/Message";

class App extends React.Component {
  state = {
    users: [],
    title: "Sentimental",
    accessToken: null,
    messageText: null,
    messageType: null,
    showModal: false,
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    const headers = { Accept: "application/json" };

    axios
      .get(`${process.env.REACT_APP_USERS_SERVICE_URL}/users`, { headers })
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  removeUser = (user_id) => {
    const headers = {
      Accept: "application/json",
    };

    axios
      .delete(`${process.env.REACT_APP_USERS_SERVICE_URL}/users/${user_id}`, {
        headers,
      })
      .then((response) => {
        this.getUsers();
        this.createMessage("success", "User removed.");
      })
      .catch((err) => {
        console.log(err);
        this.createMessage("danger", "Something went wrong.");
      });
  };

  onRegisterFormSubmit = (data) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/register`, data, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        this.getUsers();
        this.createMessage("success", "You have registered successfully.");
      })
      .catch((err) => {
        console.log(err);
        this.createMessage("danger", "That user already exists.");
      });
  };

  onLoginFormSubmit = (data) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    axios
      .post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/login`, data, {
        headers,
      })
      .then((response) => {
        this.setState({ accessToken: response.data.access_token });
        this.getUsers();
        window.localStorage.setItem(
          "refreshToken",
          response.data.refresh_token
        );
        this.createMessage("success", "You have logged in successfully.");
      })
      .catch((err) => {
        console.log(err);
        this.createMessage("danger", "Incorrect email and/or password.");
      });
  };

  isAuthenticated = () => {
    if (this.state.accessToken) {
      return true;
    }
    return false;
  };

  onLogOutUser = () => {
    window.localStorage.removeItem("refreshToken");
    this.setState({ accessToken: null });
    this.createMessage("success", "You have logged out.");
  };

  createMessage = (type, text) => {
    this.setState({
      messageText: text,
      messageType: type,
    });

    setTimeout(() => {
      this.removeMessage();
    }, 3000);
  };

  removeMessage = () => {
    this.setState({ messageText: null, messageType: null });
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <NavBar
          title={this.state.title}
          handleLogOutUser={this.onLogOutUser}
          isAuthenticated={this.isAuthenticated}
        />
        <section className="section">
          <div className="container">
            {this.state.messageType && this.state.messageText && (
              <Message
                messageText={this.state.messageText}
                messageType={this.state.messageType}
                removeMessage={this.removeMessage}
              />
            )}
            <div className="columns">
              <div className="column is-half">
                <br />
                <Switch>
                  <Route path="/" component={About} exact />
                  <Route
                    path="/register"
                    render={() => {
                      return (
                        <RegisterForm
                          isAuthenticated={this.isAuthenticated}
                          handleRegisterFormSubmit={this.onRegisterFormSubmit}
                        />
                      );
                    }}
                    exact
                  />
                  <Route
                    path="/login"
                    render={() => {
                      return (
                        <LoginForm
                          isAuthenticated={this.isAuthenticated}
                          handleLoginFormSubmit={this.onLoginFormSubmit}
                        />
                      );
                    }}
                    exact
                  />
                  <Route
                    path="/profile"
                    render={() => {
                      return (
                        <UserProfile
                          accessToken={this.state.accessToken}
                          isAuthenticated={this.isAuthenticated}
                        />
                      );
                    }}
                    exact
                  />
                </Switch>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
