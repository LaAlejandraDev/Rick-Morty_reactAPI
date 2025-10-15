import React, { useState } from "react";

const Characters = ({ characters, setCharacters }) => {
  // Estados nuevos para búsqueda y paginación
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [personajesActuales, setPersonajesActuales] = useState(characters);

  // Función para volver al inicio (ya estaba)
  const resetCharacters = () => {
    setCharacters(null);
  };

  // Función para traer personajes según búsqueda y página
  const traerPersonajes = async (
    numPagina = pagina,
    terminoBusqueda = busqueda
  ) => {
    let url = `https://rickandmortyapi.com/api/character?page=${numPagina}`;
    if (terminoBusqueda) {
      url = `https://rickandmortyapi.com/api/character/?name=${terminoBusqueda}`;
    }

    const api = await fetch(url);
    const personajesApi = await api.json();

    if (personajesApi.results) {
      setPersonajesActuales(personajesApi.results);
      setTotalPaginas(personajesApi.info.pages);
    } else {
      setPersonajesActuales([]);
      setTotalPaginas(1);
    }
  };

  // Manejar input de búsqueda
  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    setPagina(1);
    traerPersonajes(1, valor);
  };

  // Funciones de paginación
  const siguiente = () => {
    if (pagina < totalPaginas) {
      const nuevaPagina = pagina + 1;
      setPagina(nuevaPagina);
      traerPersonajes(nuevaPagina, busqueda);
    }
  };

  const anterior = () => {
    if (pagina > 1) {
      const nuevaPagina = pagina - 1;
      setPagina(nuevaPagina);
      traerPersonajes(nuevaPagina, busqueda);
    }
  };

  return (
    <div className="characters">
      <span className="back-home" onClick={resetCharacters}>
        Volver al inicio
      </span>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={busqueda}
        onChange={manejarBusqueda}
        className="input-search"
      />

      <div className="container-characters">
        {personajesActuales.map((character, index) => (
          <div className="character-container" key={index}>
            <div>
              <img src={character.image} alt={character.name} />
            </div>
            <div>
              <h3>{character.name}</h3>
              <h6>
                {character.status === "Alive" ? (
                  <>
                    <span className="alive" /> Alive
                  </>
                ) : (
                  <>
                    <span className="dead" /> Dead
                  </>
                )}
              </h6>
              <p>
                <span className="text-gray">Episodios:</span>
                <span>{character.episode.length}</span>
              </p>
              <p>
                <span className="text-gray">Especie:</span>
                <span>{character.species}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de paginación */}
      <div className="pagination">
        <button onClick={anterior} disabled={pagina === 1}>
          Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button onClick={siguiente} disabled={pagina === totalPaginas}>
          Siguiente
        </button>
      </div>

      <span className="back-home" onClick={resetCharacters}>
        Volver al inicio
      </span>
    </div>
  );
};

export default Characters;
