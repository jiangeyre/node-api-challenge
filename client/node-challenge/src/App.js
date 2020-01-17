import React, { useState, useEffect } from 'react';
import axios from 'axios';

// styling 
import './App.css';

function App() {
  const [data, setData] = useState();
  const [actions, setActions] = useState();
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios.get("http://localhost:8000")
      .then(res => {
        setData(res.data);
        console.log(res);
        console.log(data);
      })
  }, [data, setData]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/actions')
      .then(res => {
        setActions(res.data);
      })
  }, [setActions]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/projects')
      .then(res => {
        setProjects(res.data);
      })
  }, [setProjects]);

  const deleteActButt = (id) => {
    axios.delete(`http://localhost:8000/api/actions/${id}`)
      .then(res => {
        console.log(res);
        setActions(actions.filter((item, ind) =>
        item.id !== id))
      })
      .catch(err => console.log(err))
  };

  const deleteProjButt = (id) => {
    axios.delete(`http://localhost:8000/api/projects/${id}`)
      .then(res => {
        console.log(res);
        setProjects(projects.filter((item, ind) =>
        item.id !== id))
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="App">
      {data ? <h1>{data.message}</h1> : <h1></h1>}
      {actions ? (
        <div>
          {actions.map((act, ind) => (
            <div>
              <h1>{act.id}</h1>
              <h2>{act.project_id}</h2>
              <h2>{act.description}</h2>
              <h2>{act.notes}</h2>
              <h2>{act.completed}</h2>
              <button onClick={() => {deleteActButt(act.id)}}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <h1></h1>
      )}
      {projects ? (
        <div>
          {projects.map((proj, ind) => (
            <div>
              <h1>{proj.id}</h1>
              <h2>{proj.project_id}</h2>
              <h2>{proj.description}</h2>
              <h2>{proj.notes}</h2>
              <h2>{proj.completed}</h2>
              <button onClick={() => {deleteProjButt(proj.id)}}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export default App;
