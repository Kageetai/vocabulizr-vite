import React from 'react';

function Header(): JSX.Element {
  return (
    <div className="pt-4">
      <img src="/logo.png" alt="Babbel Language Lab Logo" />

      <h1>¡Bienvenido a Buscamara!</h1>

      <p>Learn a new Spanish word and saying with your camera.</p>
    </div>
  );
}

export default Header;
