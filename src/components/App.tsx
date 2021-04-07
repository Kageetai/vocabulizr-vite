import React from 'react';
import { Redirect, Route, Switch } from 'wouter';
import { useSelector } from 'react-redux';

import { selectUndoneIndex } from '../reducers/prompts';

import Header from './Header';
import PromptView from './PromptView';
import ResultView from './ResultView';
import EndView from './EndView';

function App(): JSX.Element {
  const undoneIndex = useSelector(selectUndoneIndex);

  return (
    <div className="h-screen bg-gray-50">
      <div className="min-h-screen max-w-125 mx-auto px-4 flex flex-col items-stretch text-center">
        <Header />

        <Switch>
          <Route path="/">
            <Redirect to={`/${undoneIndex >= 0 ? undoneIndex : 'end'}`} />
          </Route>

          <Route path="/end" component={EndView} />

          <Route path="/:index">
            {(params) => <PromptView index={parseInt(params.index, 10)} />}
          </Route>

          <Route path="/:index/success">
            {(params) => <ResultView index={parseInt(params.index, 10)} />}
          </Route>
        </Switch>

        <div className="text-center mt-auto py-2">
          <img
            className="m-auto max-h-4"
            src="/logo.png"
            alt="Babbel Language Lab Logo"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
