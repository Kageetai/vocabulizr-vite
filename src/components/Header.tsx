import React from 'react';

interface Props {
  hasDonePrompts: boolean;
}

function Header({ hasDonePrompts }: Props): JSX.Element {
  return (
    <div className="pt-4 mb-2 flex justify-between">
      <img src="/logo.png" alt="Babbel Language Lab Logo" />

      <button className="clean" disabled={!hasDonePrompts}>
        🖨
      </button>
    </div>
  );
}

export default Header;
