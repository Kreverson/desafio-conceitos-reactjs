import React, { useEffect } from "react";

import "./styles.css";
import { useState } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then( res => {
      setRepositories(res.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        title: `New title ${Date.now()}`,
        url: "https://github.com/Kreverson/desafio-conceitos-reactjs",
        techs: ['Nodejs', 'Reactjs']
      }
    );

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if(response.status !== 204)
      return;

    const newRepositories = repositories.filter(item => item.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button type="button" onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
