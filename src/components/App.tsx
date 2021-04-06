import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'wouter';

import { LabelAnnotation } from '../api';
import {
  markCurrentAsDone,
  selectCurrentPrompt,
  selectDonePrompts,
} from '../reducers/prompts';

import Header from './Header';
import PromptView from './PromptView';
import ResultView from './ResultView';
import Printer from './Printer';
import DoneView from './DoneView';

function App(): JSX.Element {
  const currentPrompt = useSelector(selectCurrentPrompt);
  const donePrompts = useSelector(selectDonePrompts);
  const dispatch = useDispatch();

  // const debug = new URLSearchParams(location.search).has('debug');
  // const labelsList = labels.map((l) => l.description).join(',');

  const onNext = () => {
    dispatch(markCurrentAsDone());
  };

  return (
    <div className="h-screen bg-gray-50">
      <div className="min-h-screen max-w-125 mx-auto px-4 flex flex-col items-stretch text-center">
        <Header />

        <Route path="/">
          <Redirect to="/0" />
        </Route>

        <Route path="/:index">
          {(params) => <PromptView index={parseInt(params.index || '0', 10)} />}
        </Route>

        {/*{currentPrompt && (*/}
        {/*  <>*/}
        {/*    {!labelsInPrompt && (*/}
        {/*      <PromptView*/}
        {/*        currentPrompt={currentPrompt}*/}
        {/*        onSetLabels={setLabels}*/}
        {/*      />*/}
        {/*    )}*/}

        {/*    {hasLabels && !labelsInPrompt && <h2>Wrong! Try again!</h2>}*/}

        {/*    {labelsInPrompt && (*/}
        {/*      <ResultView currentPrompt={currentPrompt} onNext={onNext} />*/}
        {/*    )}*/}
        {/*  </>*/}
        {/*)}*/}

        {!currentPrompt && donePrompts.length && (
          <DoneView totalPromptsCount={donePrompts.length} />
        )}

        <Route path="/all" component={Printer} />

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
