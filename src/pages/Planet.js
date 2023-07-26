import React, { useState } from 'react';

const Planet = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setError('');

    if (query.trim() === '') {
      setPlanets([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`https://swapi.dev/api/planets/?search=${query}`);
      if (!response.ok) {
        throw new Error('Error fetching');
      }
      const data = await response.json();
      setPlanets(data.results);
    } catch (error) {
      setError('Error');
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h3>Search Parameters</h3>
      <div>
        <input
          type="text"
          placeholder="Type-along search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <section>
        <header>
          <div className="col">Name</div>
          <div className="col">Population</div>
        </header>
        {planets.map((planet) => (
          <div key={planet.name}>
            <div className="col">{planet.name}</div>
            <div title={planet.population !== 'unknown' ? planet.population : ''} className="col">
              {planet.population !== 'unknown' && (
                <>
                  {'\u{1F468}'.repeat(Math.ceil(parseInt(planet.population) / 1000000))}
                </>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Planet;
