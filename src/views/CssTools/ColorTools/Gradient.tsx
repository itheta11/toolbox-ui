import { useState } from "react";

const Gradient = () => {
  const [gradientType, setGradientType] = useState("linear");
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState([
    { color: "#ff0000", position: 0 },
    { color: "#0000ff", position: 100 },
  ]);

  const handleTypeChange = (e) => setGradientType(e.target.value);

  const handleAngleChange = (e) => setAngle(e.target.value);

  const handleColorChange = (index, key, value) => {
    const newStops = [...colorStops];
    newStops[index][key] = value;
    setColorStops(newStops);
  };

  const addColorStop = () => {
    setColorStops([...colorStops, { color: "#ffffff", position: 50 }]);
  };

  const generateGradient = () => {
    const stops = colorStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");
    return gradientType === "linear"
      ? `linear-gradient(${angle}deg, ${stops})`
      : `radial-gradient(${stops})`;
  };

  const gradient = generateGradient();

  return (
    <div className="app">
      <h1>CSS Gradient Generator</h1>
      <div className="controls">
        <label>
          Gradient Type:
          <select value={gradientType} onChange={handleTypeChange}>
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </label>
        {gradientType === "linear" && (
          <label>
            Angle:
            <input type="number" value={angle} onChange={handleAngleChange} />
          </label>
        )}
        <div className="color-stops">
          {colorStops.map((stop, index) => (
            <div key={index} className="color-stop">
              <input
                type="color"
                value={stop.color}
                onChange={(e) =>
                  handleColorChange(index, "color", e.target.value)
                }
              />
              <input
                type="number"
                value={stop.position}
                onChange={(e) =>
                  handleColorChange(index, "position", e.target.value)
                }
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>
        <button onClick={addColorStop}>Add Color Stop</button>
      </div>
      <div className="preview" style={{ background: gradient }}></div>
      <textarea value={`background: ${gradient};`} readOnly />
    </div>
  );
};

export default Gradient;
