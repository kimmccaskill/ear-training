import { Interval, intervals } from '@/utils/intervals';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { randomInterval } from './EarTraining';
import { shuffle, includes } from 'lodash';
import { SetStateAction, useEffect, useState } from 'react';

interface SelectionProps {
  interval: Interval;
  selected: string;
  submitted: boolean;
  handleSelect: (value: SetStateAction<string>) => void;
}

const Selection = ({ interval, selected, submitted, handleSelect }: SelectionProps) => {
  const [options, setOptions] = useState<Interval[]>([]);

  const generateOptions = (interval: Interval) => {
    const nonShuffled: Interval[] = [interval];
    while (nonShuffled.length < 4) {
      let random = intervals[randomInterval()];
      if (!includes(nonShuffled, random)) {
        nonShuffled.push(random);
      }
    }
    if (nonShuffled.length === 4) {
      const shuffled = shuffle(nonShuffled);
      setOptions(shuffled);
    }
  };

  useEffect(() => {
    generateOptions(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  return (
    <RadioGroup onValueChange={handleSelect}>
      {options.map(option => {
        return option?.note ? (
          <div className="flex items-center space-x-2" key={option.note}>
            <RadioGroupItem
              value={option.note}
              id={option.label}
              checked={selected === option.note}
              disabled={submitted}
            />
            <Label htmlFor="option-one">{option.label}</Label>
          </div>
        ) : null;
      })}
    </RadioGroup>
  );
};

export default Selection;
