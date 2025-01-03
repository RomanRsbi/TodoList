import { useState, useEffect } from 'react';

export default function Timer({ min, sec }) {
  const [seconds, setSeconds] = useState(Number(sec) + Number(min) * 60);
  const [isActive, setIsActive] = useState(false);

  function nullFirst(t) {
    if (t.toString().length === 1) return '0' + t;
    return t.toString();
  }

  function toTime(s) {
    return nullFirst(Math.trunc(s / 60)) + ':' + nullFirst(s % 60);
  }

  useEffect(() => {
    setSeconds(seconds => {
      seconds = Number(sec) + Number(min) * 60;
      return seconds;
    });
  }, [min, sec]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(oneTick, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds, isActive]);

  const oneTick = () => {
    if (seconds === 0) return;
    setSeconds(seconds => {
      return seconds - 1;
    });
  };

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  return (
    <span className="description">
      <button className="icon icon-play" onClick={startTimer}></button>
      <button className="icon icon-pause" onClick={stopTimer}></button>
      {seconds === 0 ? 'Time is up' : toTime(seconds)}
    </span>
  );
}
