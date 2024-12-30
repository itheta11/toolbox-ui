import { useState } from "react";

const JsonViewer = ({ data, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => setExpanded(!expanded);

  const isObject = (val) => {
    return val && typeof val === "object" && !Array.isArray(val);
  };

  return (
    <div style={{ paddingLeft: depth * 20, fontFamily: "monospace" }}>
      {isObject(data) || Array.isArray(data) ? (
        <>
          <span onClick={toggleExpand} style={{ cursor: "pointer" }}>
            {expanded ? "[-]" : "[+]"}{" "}
          </span>
          <span>{Array.isArray(data) ? "[Array]" : "{Object}"}</span>
          {expanded && (
            <div>
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong>{" "}
                  <JsonViewer data={value} depth={depth + 1} />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <span>{JSON.stringify(data)}</span>
      )}
    </div>
  );
};

export default JsonViewer;
