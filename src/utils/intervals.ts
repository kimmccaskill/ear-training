export interface Interval {
  note: string;
  label: string;
}

export const intervals: Interval[] = [
  { note: 'C#4', label: 'minor 2nd' },
  { note: 'D4', label: 'Major 2nd' },
  { note: 'Eb4', label: 'minor 3rd' },
  { note: 'E4', label: 'Major 3rd' },
  { note: 'F4', label: 'Major 4th' },
  { note: 'F#4', label: 'Aug 4th/Dim 5th' },
  { note: 'G4', label: 'Major 5th' },
  { note: 'Ab4', label: 'minor 6th' },
  { note: 'A4', label: 'Major 6th' },
  { note: 'Bb4', label: 'minor 7th' },
  { note: 'B4', label: 'Major 7th' },
  { note: 'C5', label: 'Octave' },
];
