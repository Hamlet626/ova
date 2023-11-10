import React, { useState } from 'react';
import { useRange, UseRangeProps } from 'react-instantsearch';

const unsetNumberInputValue = '';

export function RangeInput(props: UseRangeProps) {
  const { start, range, canRefine, refine } = useRange(props);
  const step = 1 / Math.pow(10, 0);
  const values = {
    min:
      start[0] !== -Infinity && start[0] !== range.min
        ? start[0]
        : unsetNumberInputValue,
    max:
      start[1] !== Infinity && start[1] !== range.max
        ? start[1]
        : unsetNumberInputValue,
  };
  const [prevValues, setPrevValues] = useState(values);

  const [{ from, to }, setRange] = useState({
    from: values.min?.toString(),
    to: values.max?.toString(),
  });

  if (values.min !== prevValues.min || values.max !== prevValues.max) {
    setRange({ from: values.min?.toString(), to: values.max?.toString() });
    setPrevValues(values);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        refine([from ? Number(from) : undefined, to ? Number(to) : undefined]);
      }}
    >
      <label>
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={stripLeadingZeroFromInput(from || unsetNumberInputValue)}
          step={step}
          placeholder={range.min?.toString()}
          disabled={!canRefine}
          onInput={({ currentTarget }) => {
            const value = currentTarget.value;

            setRange({ from: value || unsetNumberInputValue, to });
          }}
        />
      </label>
      <span>to</span>
      <label>
        <input
          type="number"
          min={range.min}
          max={range.max}
          value={stripLeadingZeroFromInput(to || unsetNumberInputValue)}
          step={step}
          placeholder={range.max?.toString()}
          disabled={!canRefine}
          onInput={({ currentTarget }) => {
            const value = currentTarget.value;

            setRange({ from, to: value || unsetNumberInputValue });
          }}
        />
      </label>
      <button type="submit">Go</button>
    </form>
  );
}

function stripLeadingZeroFromInput(value: string): string {
  return value.replace(/^(0+)\d/, (part) => Number(part).toString());
}