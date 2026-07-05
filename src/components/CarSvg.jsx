// Vrolijke platte SVG-auto's. Elke 'body'-vorm heeft een eigen silhouet.

const BODIES = {
  beetle: 'M20 70 Q22 45 45 38 Q75 25 110 38 Q133 45 140 70 Z',
  mini: 'M18 70 Q18 48 40 44 L48 30 Q80 22 105 30 L118 44 Q142 48 142 70 Z',
  hatch: 'M15 70 Q15 50 35 46 L45 30 Q85 24 112 32 L124 46 Q145 50 145 70 Z',
  jeep: 'M15 70 L15 45 L35 45 L42 28 L115 28 L122 45 L145 45 L145 70 Z',
  sport: 'M12 70 Q14 52 40 48 L55 34 Q90 28 115 36 L128 50 Q148 54 148 70 Z',
  super: 'M10 70 Q12 56 35 52 L52 38 Q95 30 122 42 L134 54 Q150 58 150 70 Z',
}

export default function CarSvg({ car, size = 160, locked = false, className = '' }) {
  const path = BODIES[car.body] || BODIES.beetle
  const fill = locked ? '#C4C4C4' : car.color
  const accent = locked ? '#9E9E9E' : car.accent
  return (
    <svg
      viewBox="0 0 160 100"
      width={size}
      height={size * 0.625}
      className={className}
      role="img"
      aria-label={car.name}
    >
      {/* carrosserie */}
      <path d={path} fill={fill} stroke={accent} strokeWidth="3" strokeLinejoin="round" />
      {/* raam */}
      <path
        d="M55 42 Q80 34 105 42 L110 54 L50 54 Z"
        fill={locked ? '#DDDDDD' : '#CFE8FF'}
        stroke={accent}
        strokeWidth="2"
      />
      {/* koplamp */}
      <circle cx="142" cy="62" r="5" fill={locked ? '#BBBBBB' : '#FFF3B0'} stroke={accent} strokeWidth="2" />
      {/* wielen */}
      <g>
        <circle cx="45" cy="74" r="14" fill="#333" />
        <circle cx="45" cy="74" r="7" fill={locked ? '#888' : '#EEE'} />
        <circle cx="118" cy="74" r="14" fill="#333" />
        <circle cx="118" cy="74" r="7" fill={locked ? '#888' : '#EEE'} />
      </g>
      {locked && (
        <text x="80" y="60" textAnchor="middle" fontSize="30">
          🔒
        </text>
      )}
    </svg>
  )
}
