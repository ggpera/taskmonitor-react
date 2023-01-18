import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  const [time, setTime] = useState(0);
  const [run, setRun] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    let interval;
    let start;
    let running = props.active;
    let savedTime = props.time;

    if (running) {
      setRun(running);
      setActive(running);
      let now = Date.now();
      let startTime = props.start;
      console.log(now);
      console.log(startTime);
      if (startTime <= now) {
        start = now - startTime;
        setTime(start);
      } else {
        start = savedTime;
        setTime(start);
      }
    }

    if (run) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!run) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [props.active, props.start, props.time, run]);

  const saveStart = () => {
    const active = true;
    const start = Date.now();
    props.startCallback(start, active, props.id);
  };
  const saveStop = (time) => {
    const active = false;
    const start = 0;
    props.stopCallback(start, time, active, props.id);
    console.log(time);
  };
  const reset = () => {
    setRun(false);
    setActive(false);
    setTime(0);
    saveStop(0);
  };

  return (
    <div>
      <div className='numbers'>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={active ? 'timer-spinner' : 'hidden'} />
        </div>
      </div>
      <div className='buttons'>
        <button
          className='watch'
          onClick={() => {
            setRun(true);
            setActive(true);
            saveStart();
          }}
        >
          Aktivoi
        </button>
        <button
          className='watch'
          onClick={() => {
            setRun(false);
            setActive(false);
            saveStop(time, active);
          }}
        >
          Pysäytä
        </button>
        <button className='watch' onClick={() => reset()}>
          Nollaa
        </button>
      </div>
    </div>
  );
};
export default Timer;
