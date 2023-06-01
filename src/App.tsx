import React, { CSSProperties, useEffect, useState, useRef } from "react";
import snapIcon from "./snapicon.png";

const circleIconStyle: CSSProperties = {
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  overflow: "hidden",
  position: "fixed",
  top: "10px",
  right: "10px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  cursor: "pointer",
  transition: "transform 0.3s, box-shadow 0.3s",
};

const hoveredCircleIconStyle: CSSProperties = {
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)", // Updated box shadow value for hovered state
};

const logoStyle: CSSProperties = {
  width: "100%",
  height: "auto",
};

function App() {
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) {
        return;
      }

      setPosition({
        x: e.clientX - rel.x,
        y: e.clientY - rel.y,
      });
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dragging, rel]);

  const circleIconStyleDraggable: CSSProperties = {
    ...circleIconStyle,
    top: position.y + "px",
    left: position.x + "px",
    transform: hovered ? "scale(1.1)" : "scale(1)", // Scale transformation when hovered
    ...(hovered && hoveredCircleIconStyle), // Apply the additional styles for the hovered state
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) {
      return;
    }
    const targetElement = targetRef.current;
    if (!targetElement) {
      return;
    }
    const targetRect = targetElement.getBoundingClientRect();
    const posX = e.clientX - targetRect.left;
    const posY = e.clientY - targetRect.top;
    setDragging(true);
    setRel({ x: posX, y: posY });
  };

  const onMouseEnter = () => {
    setHovered(true);
  };

  const onMouseLeave = () => {
    setHovered(false);
  };

  const onClick = () => {
    console.log("Component clicked!");
  };

  return (
    <div
      ref={targetRef}
      style={circleIconStyleDraggable}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <img src={snapIcon} alt="Logo" style={logoStyle} draggable={false} />
    </div>
  );
}

export default App;
