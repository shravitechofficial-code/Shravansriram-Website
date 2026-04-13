import { motion, useAnimationFrame, useMotionValue, useSpring } from "motion/react";
import { useState, useEffect, useRef } from "react";

export default function FloatingShapes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Multiple systems configuration
  const systems = [
    {
      id: "alpha",
      centerX: 0.25,
      centerY: 0.3,
      sunColor: "#FFD700",
      sunSize: 30,
      planets: [
        { size: 10, color: "#A5A5A5", rx: 60, ry: 40, speed: 0.0004 },
        { size: 14, color: "#2271B3", rx: 100, ry: 70, speed: 0.00025 },
        { size: 12, color: "#E27B58", rx: 140, ry: 100, speed: 0.00015 },
      ]
    },
    {
      id: "beta",
      centerX: 0.75,
      centerY: 0.7,
      sunColor: "#FF4500",
      sunSize: 40,
      planets: [
        { size: 12, color: "#E3BB76", rx: 80, ry: 60, speed: 0.0003 },
        { size: 18, color: "#D39C7E", rx: 130, ry: 90, speed: 0.0002 },
        { size: 8, color: "#8B4513", rx: 180, ry: 130, speed: 0.0001 },
      ]
    },
    {
      id: "gamma",
      centerX: 0.5,
      centerY: 0.15,
      sunColor: "#ADD8E6",
      sunSize: 20,
      planets: [
        { size: 6, color: "#FFFFFF", rx: 50, ry: 30, speed: 0.0005 },
        { size: 10, color: "#708090", rx: 90, ry: 60, speed: 0.00035 },
      ]
    }
  ];

  const stars = useRef(Array.from({ length: 150 }).map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.8 + 0.2
  })));

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#020202]">
      {/* Stars */}
      {stars.current.map((star, i) => (
        <div 
          key={`star-${i}`}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity
          }}
        />
      ))}

      {systems.map((system) => (
        <System key={system.id} system={system} mousePos={mousePos} />
      ))}

      {/* Mouse Star (Giant Star) */}
      <motion.div 
        className="absolute w-12 h-12 rounded-full blur-sm bg-white/80"
        style={{
          left: mousePos.x - 6,
          top: mousePos.y - 6,
          boxShadow: "0 0 40px 10px rgba(255, 255, 255, 0.2), 0 0 80px 20px rgba(255, 255, 255, 0.05)"
        }}
      />
      <motion.div 
        className="absolute w-48 h-48 rounded-full blur-3xl bg-white/5"
        style={{
          left: mousePos.x - 96,
          top: mousePos.y - 96,
        }}
      />
    </div>
  );
}

function System({ system, mousePos }: { system: any, mousePos: { x: number, y: number }, key?: any }) {
  return (
    <>
      {/* Sun */}
      <div 
        className="absolute rounded-full blur-sm opacity-40"
        style={{
          left: `${system.centerX * 100}%`,
          top: `${system.centerY * 100}%`,
          width: system.sunSize,
          height: system.sunSize,
          backgroundColor: system.sunColor,
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 40px ${system.sunColor}44`
        }}
      />

      {/* Orbits and Planets */}
      <svg className="absolute inset-0 w-full h-full">
        {system.planets.map((p: any, i: number) => (
          <ellipse
            key={`orbit-${system.id}-${i}`}
            cx={`${system.centerX * 100}%`}
            cy={`${system.centerY * 100}%`}
            rx={p.rx}
            ry={p.ry}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {system.planets.map((planet: any, i: number) => (
        <Planet 
          key={`${system.id}-planet-${i}`} 
          planet={planet} 
          system={system}
          mousePos={mousePos}
        />
      ))}
    </>
  );
}

function Planet({ planet, system, mousePos }: { planet: any, system: any, mousePos: { x: number, y: number }, key?: any }) {
  const x = useMotionValue(window.innerWidth * system.centerX);
  const y = useMotionValue(window.innerHeight * system.centerY);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);

  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const angle = useRef(Math.random() * Math.PI * 2);
  const stateX = useRef(window.innerWidth * system.centerX);
  const stateY = useRef(window.innerHeight * system.centerY);

  useAnimationFrame((time, delta) => {
    // Mouse Gravity Effect
    const dx = mousePos.x - stateX.current;
    const dy = mousePos.y - stateY.current;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Base Orbital Position
    angle.current += planet.speed * delta;
    const centerX = window.innerWidth * system.centerX;
    const centerY = window.innerHeight * system.centerY;
    const orbitX = centerX + Math.cos(angle.current) * planet.rx;
    const orbitY = centerY + Math.sin(angle.current) * planet.ry;

    // Gravity Pull: The closer the mouse, the more the planet is pulled towards it
    const gravityRadius = 400;
    const gravityStrength = dist < gravityRadius ? (1 - dist / gravityRadius) * 0.3 : 0;
    
    const targetX = orbitX + (mousePos.x - orbitX) * gravityStrength;
    const targetY = orbitY + (mousePos.y - orbitY) * gravityStrength;
    
    stateX.current += (targetX - stateX.current) * 0.05;
    stateY.current += (targetY - stateY.current) * 0.05;

    x.set(stateX.current);
    y.set(stateY.current);
  });

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: planet.size,
        height: planet.size,
        x: springX,
        y: springY,
        scale: springScale,
        opacity: 0.4,
        backgroundColor: planet.color,
        boxShadow: `inset -${planet.size/4}px -${planet.size/4}px ${planet.size/2}px rgba(0,0,0,0.5), 0 0 8px ${planet.color}22`,
        left: -planet.size / 2,
        top: -planet.size / 2,
      }}
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.8),transparent)]" />
      <div className="absolute inset-0 rounded-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
    </motion.div>
  );
}
