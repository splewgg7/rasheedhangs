import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Login2 from "../components/Login2";
import { Redirect, withRouter } from "react-router-dom";
axios.defaults.withCredentials = true;

function Home() {
  const history = useHistory();
  const [status, setStatus] = useState(() =>
    JSON.parse(localStorage.getItem("loginContext"))
  );
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [feed, setFeed] = useState([]);
  const inputRef = useRef(null);

  // React.useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("loginContext"));
  //   if (data) {
  //     setStatus(data);
  //   }
  // }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        await axios
          .get("http://localhost:5000/api", {
            withCredentials: true,
            cancelToken: source.token,
          })
          .then((x) => {
            if (!x.data.username) {
              setStatus(false);
            }
            setName(x.data.username);
          });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    let mount = true;
    if (mount) {
      document.title = `Welcome ${name}`;
    }
    return () => (mount = false);
  }, [name]);

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/logout");
    localStorage.setItem("loginContext", JSON.stringify(false));
    history.push("/");
    alert("logged out");
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const newPost = { username: name, post };
        await axios.post("http://localhost:5000/api/post", newPost);
        alert("Post Success");
        inputRef.current.value = "";
        window.location.reload();
      } catch (error) {
        alert("post failed");
      }
    },
    [name, post]
  );
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getNewsfeed = async () => {
        const newBody = { username: name };
        await axios
          .post("http://localhost:5000/api/newsfeed", newBody, {
            withCredentials: true,
          })
          .then((x) => {
            setFeed(x.data);
          });
      };
      getNewsfeed();
    }
    return () => (mounted = false);
  }, [name]);

  return (
    <div>
      {status ? (
        <div>
          <h1>Welcome {name}</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <h3>Post Something</h3>
            <textarea
              ref={inputRef}
              required
              minLength="6"
              maxLength="40"
              rows="10"
              cols="30"
              id="post-area"
              onChange={(e) => {
                setPost(e.target.value);
              }}
            ></textarea>
            <button type="submit">Post</button>
          </form>
          {feed
            .slice()
            .reverse()
            .map((x) => (
              <div key={x}>{x}</div>
            ))}
          <br />
          <br />
          <br />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default withRouter(Home);
