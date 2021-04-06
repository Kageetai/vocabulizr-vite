import React from 'react';
import { Link } from 'wouter';

interface Props {
  hasDonePrompts: boolean;
}

function Header({ hasDonePrompts }: Props): JSX.Element {
  return (
    <div className="pt-4 mb-2 flex justify-between">
      <img src="/logo.png" alt="Babbel Language Lab Logo" />

      <Link href="/all">
        <button className="clean" disabled={!hasDonePrompts}>
          🖨
        </button>
      </Link>
    </div>
  );
}

export default Header;
