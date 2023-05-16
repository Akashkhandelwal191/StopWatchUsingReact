import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [Hour, SetHour] = useState("00");
  const [Min, SetMin] = useState("00");
  const [Sec, SetSec] = useState("00");
  const [MilliSec, SetMilliSec] = useState("00");
  const [IsStop, SetIsStop] = useState(true);
  const [TimeStamps, SetTimeStamps] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!IsStop) {
        SetMilliSec((prevMilliSec) => {
          let newMilliSec = parseInt(prevMilliSec) + 1;

          if (newMilliSec === 100) {
            SetSec((prevSec) => {
              let newSec = parseInt(prevSec) + 1;
              return newSec < 10 ? "0" + newSec : newSec.toString();
            });
            newMilliSec = 0;
          }

          return newMilliSec < 10 ? "0" + newMilliSec : newMilliSec.toString();
        });

        if (Sec === "59") {
          SetSec("00");
          SetMin((prevMin) => {
            let newMin = parseInt(prevMin) + 1;
            return newMin < 10 ? "0" + newMin : newMin.toString();
          });
        }

        if (Min === "59") {
          SetMin("00");
          SetHour((prevHour) => {
            let newHour = parseInt(prevHour) + 1;
            return newHour < 10 ? "0" + newHour : newHour.toString();
          });
        }
      }
    }, 10);

    return () => {
      clearInterval(timer);
    };
  }, [IsStop, Hour, Min, Sec, MilliSec]); // Include IsStop as a dependency to ensure the effect runs when it changes

  const start = () => {
    if (IsStop) {
      console.log("IsStop Run");
      SetIsStop(false);
    }
  };

  const stop = () => {
    SetIsStop(true);
    console.log("Stop Run");
  };

  const reset = () => {
    SetIsStop(true);
    SetMilliSec("00");
    SetSec("00");
    SetMin("00");
    SetHour("00");
  };

  const savelog = () => {
    if (IsStop === false) {
      const str = `${Hour}:${Min}:${Sec}.${MilliSec}`;
      const CurrentState = [...TimeStamps];
      CurrentState.push(str);
      SetTimeStamps(CurrentState);
    }
  };

  const ClearAllLog = () => {
    const CurrentState = [...TimeStamps];
    CurrentState.splice(0,CurrentState.length);
    SetTimeStamps(CurrentState);
  };

  const deletetime = (id) =>{
   
      const CurrentState = [...TimeStamps];
      CurrentState.splice(id,1);
      SetTimeStamps(CurrentState);
  }

  const getRandomColor = ()=>{
     
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    randomColor = "#" + randomColor;

    return randomColor;
  }



  return (
    <>
      <div className="outerdiv">
      <div className="TimerBox">
        <h1>StopWatch</h1>
        <h3>
          {Hour}:{Min}:{Sec}.{MilliSec}
        </h3>
        <div>
          <button style={{ backgroundColor: "green" }} onClick={start}>
            Start
          </button>
          <button style={{ backgroundColor: "red" }} onClick={stop}>
            Stop
          </button>
          <button style={{ backgroundColor: "yellow" }} onClick={reset}>
            Reset
          </button>
          <button style={{ backgroundColor: "blue" }} onClick={savelog}>
            SaveLog
          </button>
        </div>
      </div>
      </div>
      {TimeStamps.length >= 1 ? (
        <div id="SideLog" style={{ display: "block" }}>
          <div className="statement">
            <h1>Time Laps</h1> 
            <button style={{ backgroundColor: "red"}} className="ClearAllLogBtn" onClick={ClearAllLog}>
              Clear All Laps
            </button>
          </div>
          <hr />
          <div className="timelapses">
            <ul>
              {TimeStamps.map((item, index) => (
                <li key={index} style={{backgroundColor: getRandomColor()}}><span>{item}</span><span><i className="fa-solid fa-square-xmark" onClick={()=> deletetime(index)}></i></span></li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h2>{null}</h2>
      )}
    </>
  );
};

export default Stopwatch;
