import { useState } from "react";
import "./App.css";
import imagenRickMorty from "./img/rick-morty.png";
import Characters from "./components/Characters";

const App = () => {
  //Agregamos un estado para almacenar los datos de perosnajes
  const [characters, setCharacters] = useState(null);

  const reqApi = async () => {
    //Realizamos la peticion fetch
    const api = await fetch("https://rickandmortyapi.com/api/character");
    //Recuperaos los personajes
    const characterApi = await api.json();
    console.log(characterApi);

    setCharacters(characterApi.results);
  };

  return (
    <div className="App">
      <header>
        <h1 className="title">Rick & Morty</h1>

        {characters ? (
          <Characters characters={characters} />
        ) : (
          <>
            <img src={imagenRickMorty} alt="RickMorty" className="img-home" />

            <button onClick={reqApi} className="btn-search">
              Buscar Personajes
            </button>
          </>
        )}
      </header>
    </div>
  );
};

export default App;
