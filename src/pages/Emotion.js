import React from "react";
import { useState } from "react";

export default function Emotion() {
  const [stomachPain, setStomachPain] = useState({
    isHurt: false,
    date: Date.now(),
    value: 1,
  });
  const [value, setValue] = useState();
  const handleStomachPain = () => {
    setStomachPain({ isHurt: true, date: Date.now(), value: 1 });
  };

  <input
    type="range"
    min="1"
    max="500"
    value={value}
    onChange={({ target: { value: radius } }) => {
      setValue(radius);
    }}
  />;
  console.log("val", value);
  console.log("stomach", stomachPain);
  return (
    <div>
      <div>Emotion</div>
      <div>
        <button>☹</button>
        <button>☺</button>
        <button>😒</button>
        <button>🤢</button>
        <button onClick={handleStomachPain}>stomach</button>
      </div>
      <div>
        {stomachPain.isHurt === true ? (
          <>
            ❤
            <input
              type="range"
              maxValue={20}
              minValue={0}
              defaultValue={stomachPain.value}
              value={stomachPain.value}
              onChange={(e) =>
                setStomachPain((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
            />
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
