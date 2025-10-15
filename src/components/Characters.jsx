import React, { useState, useEffect } from "react";

const Characters = ({ characters, setCharacters }) => {
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [personajesActuales, setPersonajesActuales] = useState(characters);

  // Volver al inicio
  const resetCharacters = () => {
    setCharacters(null);
  };

  // Traer personajes desde la API según página o búsqueda
  const traerPersonajes = async (numPagina = 1, terminoBusqueda = "") => {
    let url = `https://rickandmortyapi.com/api/character?page=${numPagina}`;
    if (terminoBusqueda) {
      url = `https://rickandmortyapi.com/api/character/?name=${terminoBusqueda}&page=${numPagina}`;
    }

    try {
      const api = await fetch(url);
      const data = await api.json();
      if (data.results) {
        setPersonajesActuales(data.results);
        setTotalPaginas(data.info.pages);
      } else {
        setPersonajesActuales([]);
        setTotalPaginas(1);
      }
    } catch (error) {
      console.error("Error al traer personajes:", error);
      setPersonajesActuales([]);
      setTotalPaginas(1);
    }
  };

  // Traer los personajes cuando se carga el componente por primera vez
  useEffect(() => {
    traerPersonajes(pagina, busqueda);
  }, []);

  // Manejar input de búsqueda
  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    setPagina(1);
    traerPersonajes(1, valor);
  };

  // Paginación
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
        ⬅ Volver al inicio
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
        {personajesActuales.length > 0 ? (
          personajesActuales.map((character, index) => (
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
                  <span className="text-gray">Episodios:</span>{" "}
                  {character.episode.length}
                </p>
                <p>
                  <span className="text-gray">Especie:</span>{" "}
                  {character.species}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#ccc" }}>
            No se encontraron personajes
          </p>
        )}
      </div>

      {/* Botones de paginación */}
      <div className="pagination">
        <button onClick={anterior} disabled={pagina === 1}>
          ⬅ Anterior
        </button>
        <span>
          Página {pagina} de {totalPaginas}
        </span>
        <button onClick={siguiente} disabled={pagina === totalPaginas}>
          Siguiente ➡
        </button>
      </div>

      <span className="back-home" onClick={resetCharacters}>
        Volver al inicio
      </span>
    </div>
  );
};

export default Characters;
