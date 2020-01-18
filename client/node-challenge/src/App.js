import React, { useState, useEffect } from 'react';
import axios from 'axios';

// styling 
import './App.css';
import { BigBoy, BUTT } from './appstyles';

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
    <BigBoy>
      <div className="App">
        {data ? <h1>{data.message}</h1> : <h1></h1>}
        {projects ? (
          <div className="proj-cont">
            <h1>Projects!</h1>
            {projects.map((proj, ind) => (
              <div>
                <h2>Project ID: {proj.id}</h2>
                <h2>Name: {proj.name}</h2>
                <h3>Description: {proj.description}</h3>
                <h4>Completed: {proj.completed ? "false" : "true"}</h4>
                <BUTT onClick={() => {deleteProjButt(proj.id)}}>Delete</BUTT>
              </div>
            ))}
          </div>
        ) : (
          <h1></h1>
        )}
        {actions ? (
          <div className="actions-cont">
            <h1>Actions!</h1>
            {actions.map((act, ind) => (
              <div>
                <h2>Action ID: {act.id}</h2>
                <h3>Attached to project: {act.project_id}</h3>
                <h3>Description: {act.description}</h3>
                <h3>Notes: {act.notes}</h3>
                <h4>Completed: {act.completed ? "false" : "true"}</h4>
                <BUTT onClick={() => {deleteActButt(act.id)}}>Delete</BUTT>
              </div>
            ))}
          </div>
        ) : (
          <h1></h1>
        )}
      </div>
    </BigBoy>
  );
}

export default App;
