'use client';

import { Interval, intervals } from '@/utils/intervals';
import { Button } from '@/components/ui/button';
import Selection from './Selection';
import { SetStateAction, useEffect, useState } from 'react';
import * as Tone from 'tone';
import { random } from 'lodash';

const synth = new Tone.Synth().toDestination();
export const randomInterval = () => {
  return random(0, intervals.length - 1);
};

const EarTraining = () => {
  const [interval, setInterval] = useState(intervals[randomInterval()]);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);

  const playInterval = (newNote: Interval) => {
    synth.triggerAttackRelease('C4', '4n');
    setTimeout(() => {
      synth.triggerAttackRelease(newNote.note, '4n');
    }, 1000);
  };

  const handleClick = () => {
    playInterval(interval);
  };

  const handleSelectInterval = (value: SetStateAction<string>) => {
    if (!submitted) {
      setSelected(value);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (selected === interval.note) {
      setFeedback('Correct!');
      setStreak(streak + 1);
    } else {
      setFeedback(`Incorrect! It was a ${interval.label}`);
      setStreak(0);
    }
  };

  const handleNextInterval = () => {
    const newInterval = intervals[randomInterval()];
    setInterval(newInterval);
    setSelected('');
    setFeedback('');
    setSubmitted(false);
    playInterval(newInterval);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="border-b scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-12">
        Ear training 101
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Streak: {streak}</h3>
      <Button onClick={handleClick}>Play interval</Button>
      {interval && (
        <Selection
          interval={interval}
          selected={selected}
          submitted={submitted}
          handleSelect={handleSelectInterval}
        />
      )}
      <Button onClick={handleSubmit} disabled={submitted}>
        Submit
      </Button>

      <Button onClick={handleNextInterval}>Next interval</Button>
      {feedback && (
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          {feedback}
        </h2>
      )}
    </main>
  );
};

export default EarTraining;
