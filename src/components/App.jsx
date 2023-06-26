import React from 'react';

import { useState } from 'react';

import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions.jsx';
import { Statistics } from '../components/Statistics/Statistics.jsx';
import { Section } from '../components/SectionTitle/SectionTitle.jsx';
import { Notification } from '../components/Notification/Notification.jsx';

const App = () => {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = state;
    return good + neutral + bad;
  };

  const handleAnyFeedback = options => {
    setState(prevState => ({
      ...prevState,
      [options]: prevState[options] + 1,
    }));
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = state;
    return Math.round((good / countTotalFeedback()) * 100);
  };

  //  render() {
  // const options = { good, neutral, bad };

  const options = Object.keys(state);

  return (
    <div className="container">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleAnyFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            state={state}
            countTotalFeedback={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
