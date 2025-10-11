import React from "react";

const Characters = ({ characters, setCharacters }) => {
  // console.log(characters)

  //Función para resetear los personajes
  const resetCharacters = () => {
    setCharacters(null);
  };
  return (
    <div className="characters">
      <div> Characters</div>
      <span className="back-home" onClick={resetCharacters}>
        {" "}
        Volver al inicio
      </span>
      <div className="container-characters">
        {characters.map((character, index) => (
          <div className="character-container" key={index}>
            <div>
              <img src={character.image} alt={character.name} />
            </div>
            <div>
              <h3>{character.name}</h3>
              <h6>
                {character.status === "Alive" ? (
                  <>
                    <span className="alive" />
                    Alive
                  </>
                ) : (
                  <>
                    <span className="dead" />
                    Dead
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
      <span className="back-home" onClick={resetCharacters}>
        {" "}
        Volver al inicio
      </span>
    </div>
  );
};

export default Characters;
