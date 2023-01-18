import React from 'react';
import kis from './media/kis.png';

function InfoComponent() {
  return (
    <div>
      <div className='center'>
        <br></br>
        <h1 className='main'>Tietoa sovelluksesta</h1>
      </div>
      <div className='info'>
        <h2 className='tasktitle'>Käyttöohjeet</h2>
        <div className='bg2'>
          <p>
            Seuranta-sivulla käyttäjä pystyy suodattamaan haluamiansa tehtäviä
            näkyviin klikkaamalla valitsemaansa kategoriaa. Avautuvassa
            tehtäväpalstassa käyttäjä voi aktivoida ja raahata tehtäviä.
            Tehtävät-sivulla käyttäjä voi muokata ja poistaa olemassaolevia
            tehtäviä, sekä lisätä uusia tehtäviä. Klikkaamalla muokkaa-nappia
            muokattavan tehtävän tiedot ilmestyvät "Muokkaa tehtävää"
            -lomakkeelle muokattavaksi. Kategoriat-sivulla käyttäjä voi poistaa
            ja lisätä kategorioita.
          </p>
        </div>
      </div>
      <div className='info'>
        <img src={kis} className='App-img' alt='kissa' />
      </div>
            <div className='info'>
        <p>Copyright: Petri Ranta</p>
      </div>
    </div>
  );
}

export default InfoComponent;
