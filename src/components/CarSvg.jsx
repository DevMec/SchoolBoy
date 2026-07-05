import { useId } from 'react'

// Zeven auto's, elk met een eigen, herkenbaar silhouet — en hoe verder je
// komt, hoe indrukwekkender de auto. Alle auto's kijken naar rechts.

function Wheel({ cx, cy, r, style = 'steel' }) {
  cx = Number(cx)
  cy = Number(cy)
  r = Number(r)
  const spokes = []
  const spokeCount = style === 'steel' ? 0 : 5
  for (let i = 0; i < spokeCount; i++) {
    const a = (i * 2 * Math.PI) / spokeCount - Math.PI / 2
    spokes.push(
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={cx + Math.cos(a) * r * 0.52}
        y2={cy + Math.sin(a) * r * 0.52}
        stroke={style === 'gold' ? '#8a6d1a' : '#9aa0ad'}
        strokeWidth={r * 0.16}
        strokeLinecap="round"
      />
    )
  }
  const rimColor =
    style === 'gold' ? '#e8c14d' : style === 'sport' ? '#c7ccd6' : style === 'alloy' ? '#cfd3da' : '#b9bdc6'
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#16181d" />
      <circle cx={cx} cy={cy} r={r * 0.94} fill="#26292f" />
      <circle cx={cx} cy={cy} r={r * 0.6} fill={rimColor} />
      {spokes}
      <circle cx={cx} cy={cy} r={r * 0.16} fill={style === 'gold' ? '#b28a1f' : '#7c828e'} />
      {/* glansje op de band */}
      <path
        d={`M ${cx - r * 0.75} ${cy - r * 0.45} A ${r * 0.88} ${r * 0.88} 0 0 1 ${cx + r * 0.1} ${cy - r * 0.87}`}
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={r * 0.12}
        strokeLinecap="round"
      />
    </g>
  )
}

function Shadow() {
  return <ellipse cx="100" cy="82" rx="80" ry="6" fill="rgba(20,40,20,0.18)" />
}

function BodyGradient({ id, light, base, dark }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={light} />
      <stop offset="0.55" stopColor={base} />
      <stop offset="1" stopColor={dark} />
    </linearGradient>
  )
}

function GlassGradient({ id }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#eaf6ff" />
      <stop offset="1" stopColor="#9cc8ea" />
    </linearGradient>
  )
}

function Sparkle({ x, y, s, delay }) {
  x = Number(x)
  y = Number(y)
  s = Number(s)
  const d = `M ${x} ${y - s} L ${x + s * 0.28} ${y - s * 0.28} L ${x + s} ${y} L ${x + s * 0.28} ${y + s * 0.28} L ${x} ${y + s} L ${x - s * 0.28} ${y + s * 0.28} L ${x - s} ${y} L ${x - s * 0.28} ${y - s * 0.28} Z`
  return <path d={d} fill="#fff" className="sparkle" style={{ animationDelay: delay }} />
}

/* ── De auto's ── */

function Kever({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#a8e08a" base="#6cbb48" dark="#4e9330" />
        <GlassGradient id={`${g}g`} />
      </defs>
      <Shadow />
      {/* carrosserie: ronde kever-koepel */}
      <path
        d="M20 76 L20 66 C20 54 28 48 42 46 C50 45 53 42 58 35 C68 22 96 20 110 29 C117 34 119 42 130 45 C152 48 172 58 176 70 L177 76 Z"
        fill={`url(#${g}b)`}
        stroke="#3f7a26"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* raam */}
      <path d="M64 42 C70 30 94 28 104 34 C109 37 110 41 114 43 L98 44 Z M64 42 L92 44 L98 44"
        fill="none" />
      <path d="M63 43 C70 30 95 28 105 35 C109 38 111 42 116 44 Z" fill={`url(#${g}g)`} stroke="#3f7a26" strokeWidth="2" />
      <line x1="92" y1="30" x2="92" y2="44" stroke="#3f7a26" strokeWidth="2" />
      {/* spatborden */}
      <path d="M32 76 A 20 20 0 0 1 72 76 Z" fill="#5aa838" stroke="#3f7a26" strokeWidth="2" />
      <path d="M128 76 A 20 20 0 0 1 168 76 Z" fill="#5aa838" stroke="#3f7a26" strokeWidth="2" />
      {/* koplamp & bumper */}
      <circle cx="166" cy="56" r="5.5" fill="#fff6c9" stroke="#c9a227" strokeWidth="2" />
      <rect x="172" y="68" width="12" height="4" rx="2" fill="#d7dbe2" />
      <rect x="14" y="68" width="12" height="4" rx="2" fill="#d7dbe2" />
      {/* deurlijn + glans */}
      <path d="M96 46 C96 58 96 66 94 74" stroke="#3f7a26" strokeWidth="2" fill="none" />
      <path d="M40 50 C50 45 58 40 66 32" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Wheel cx="52" cy="76" r="14" style="steel" />
      <Wheel cx="148" cy="76" r="14" style="steel" />
    </>
  )
}

function Mini({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#ff8a80" base="#e13a3a" dark="#b02020" />
        <GlassGradient id={`${g}g`} />
      </defs>
      <Shadow />
      {/* body: klein & hoog */}
      <path
        d="M26 76 L26 58 C26 52 30 49 38 48 L46 34 C48 30 52 28 58 28 L118 28 C124 28 128 30 131 35 L140 48 C152 49 160 53 162 60 L163 76 Z"
        fill={`url(#${g}b)`}
        stroke="#8e1717"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* wit dak — hét Mini-kenmerk */}
      <path d="M46 34 C48 30 52 28 58 28 L118 28 C124 28 128 30 131 35 L133 38 L44 38 Z"
        fill="#f6f7f9" stroke="#8e1717" strokeWidth="2.5" strokeLinejoin="round" />
      {/* ramen */}
      <path d="M50 40 L58 40 L58 48 L45 48 Z" fill={`url(#${g}g)`} stroke="#8e1717" strokeWidth="2" />
      <path d="M62 40 L126 40 L131 48 L62 48 Z" fill={`url(#${g}g)`} stroke="#8e1717" strokeWidth="2" />
      <line x1="94" y1="40" x2="94" y2="48" stroke="#8e1717" strokeWidth="2" />
      {/* motorkap-strepen */}
      <path d="M142 50 L148 62" stroke="#f6f7f9" strokeWidth="4" strokeLinecap="round" />
      <path d="M149 48 L155 60" stroke="#f6f7f9" strokeWidth="4" strokeLinecap="round" />
      {/* koplamp */}
      <circle cx="156" cy="58" r="6" fill="#fff6c9" stroke="#c9a227" strokeWidth="2" />
      {/* deurlijn + glans */}
      <path d="M94 48 L94 74" stroke="#8e1717" strokeWidth="2" />
      <path d="M34 54 C42 50 50 44 54 38" stroke="rgba(255,255,255,0.45)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Wheel cx="54" cy="76" r="13" style="steel" />
      <Wheel cx="140" cy="76" r="13" style="steel" />
    </>
  )
}

function Golf({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#7fb3e8" base="#3e7bc4" dark="#28598f" />
        <GlassGradient id={`${g}g`} />
      </defs>
      <Shadow />
      {/* hatchback: vlakke achterklep links, neus rechts */}
      <path
        d="M22 76 L22 56 L26 44 L52 40 L68 27 C70 25 74 24 78 24 L114 24 C120 24 124 26 128 30 L140 40 L164 44 C172 46 176 52 177 58 L178 76 Z"
        fill={`url(#${g}b)`}
        stroke="#1d4570"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* ramen */}
      <path d="M30 42 L52 39 L52 50 L29 50 Z" fill={`url(#${g}g)`} stroke="#1d4570" strokeWidth="2" />
      <path d="M58 40 L70 29 C72 27 75 27 78 27 L108 27 L112 40 Z" fill={`url(#${g}g)`} stroke="#1d4570" strokeWidth="2" />
      <path d="M116 40 L114 28 C119 28 122 30 125 33 L131 40 Z" fill={`url(#${g}g)`} stroke="#1d4570" strokeWidth="2" />
      {/* koplamp + achterlicht */}
      <path d="M166 46 L176 52 L176 58 L164 54 Z" fill="#ffe9a8" stroke="#c9a227" strokeWidth="1.5" />
      <rect x="22" y="48" width="7" height="8" rx="2" fill="#e8503a" />
      {/* deurlijnen + greep + glans */}
      <path d="M86 40 L86 74 M118 42 L120 74" stroke="#1d4570" strokeWidth="2" fill="none" />
      <rect x="90" y="46" width="12" height="3" rx="1.5" fill="#1d4570" />
      <path d="M34 52 C48 48 62 40 72 30" stroke="rgba(255,255,255,0.4)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Wheel cx="54" cy="76" r="14" style="alloy" />
      <Wheel cx="148" cy="76" r="14" style="alloy" />
    </>
  )
}

function Jeep({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#ffc27a" base="#e8933c" dark="#b96a1d" />
        <GlassGradient id={`${g}g`} />
      </defs>
      <Shadow />
      {/* stoer & hoekig, hoog op de wielen */}
      <path
        d="M20 72 L20 50 L26 48 L28 34 L36 30 L100 30 L104 34 L106 46 L150 46 L172 50 L176 56 L176 72 Z"
        fill={`url(#${g}b)`}
        stroke="#8a4d0f"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* imperiaal (dakrek) */}
      <path d="M32 30 L32 25 L98 25 L98 30 M44 25 L44 30 M64 25 L64 30 M84 25 L84 30" stroke="#5c4326" strokeWidth="2.5" fill="none" />
      {/* ramen */}
      <path d="M34 34 L62 34 L62 46 L30 46 Z" fill={`url(#${g}g)`} stroke="#8a4d0f" strokeWidth="2" />
      <path d="M66 34 L98 34 L101 46 L66 46 Z" fill={`url(#${g}g)`} stroke="#8a4d0f" strokeWidth="2" />
      {/* wielkasten (flares) */}
      <path d="M28 72 L32 58 L70 58 L76 72 Z" fill="#c87722" stroke="#8a4d0f" strokeWidth="2" />
      <path d="M122 72 L128 58 L162 58 L168 72 Z" fill="#c87722" stroke="#8a4d0f" strokeWidth="2" />
      {/* grille + koplamp + trekhaak */}
      <path d="M170 52 L170 66 M165 52 L165 66 M160 52 L160 66" stroke="#8a4d0f" strokeWidth="2" />
      <circle cx="172" cy="49" r="4.5" fill="#fff6c9" stroke="#c9a227" strokeWidth="2" />
      <rect x="12" y="62" width="8" height="4" rx="2" fill="#5c4326" />
      {/* reservewiel achterop */}
      <circle cx="21" cy="56" r="9" fill="#16181d" />
      <circle cx="21" cy="56" r="4.5" fill="#3a3d44" />
      <Wheel cx="52" cy="74" r="17" style="alloy" />
      <Wheel cx="145" cy="74" r="17" style="alloy" />
    </>
  )
}

function Porsche({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#f2f4fa" base="#c3c8d6" dark="#8f96aa" />
        <GlassGradient id={`${g}g`} />
      </defs>
      <Shadow />
      {/* 911: laag, vloeiende lijn, aflopende achterkant */}
      <path
        d="M14 74 C14 64 18 59 28 57 L36 55 C48 34 68 27 90 27 C108 27 120 32 128 42 L146 50 C168 53 180 59 183 66 C184 70 184 72 184 74 Z"
        fill={`url(#${g}b)`}
        stroke="#5d6373"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* raam: gebogen fastback */}
      <path d="M44 52 C54 36 70 30 88 30 C102 30 112 34 119 42 L108 48 L60 52 Z" fill={`url(#${g}g)`} stroke="#5d6373" strokeWidth="2" />
      <path d="M78 31 L76 50" stroke="#5d6373" strokeWidth="2" />
      {/* ronde koplamp-bult — typisch Porsche */}
      <circle cx="168" cy="55" r="6.5" fill="#fff6c9" stroke="#b8b28a" strokeWidth="2" />
      <path d="M156 50 C162 46 170 46 175 50" stroke="#5d6373" strokeWidth="2" fill="none" />
      {/* doorlopend achterlicht */}
      <path d="M14 62 L26 60 L26 64 L14 66 Z" fill="#e8503a" />
      {/* deurlijn + greep + glans */}
      <path d="M104 48 L108 72" stroke="#5d6373" strokeWidth="2" />
      <path d="M112 52 L124 52" stroke="#5d6373" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 56 C52 38 74 30 96 29" stroke="rgba(255,255,255,0.7)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Wheel cx="50" cy="75" r="14" style="sport" />
      <Wheel cx="150" cy="75" r="14" style="sport" />
    </>
  )
}

function Ferrari({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#ff7a6b" base="#e1332d" dark="#a31313" />
        <linearGradient id={`${g}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6b7684" />
          <stop offset="1" stopColor="#2c333d" />
        </linearGradient>
      </defs>
      <Shadow />
      {/* lage wig met spoiler */}
      <path
        d="M14 74 L14 60 L18 52 L24 54 L56 46 C64 32 82 26 100 26 C116 26 128 31 136 40 L156 46 L180 54 C186 57 188 62 188 68 L188 74 Z"
        fill={`url(#${g}b)`}
        stroke="#7c0d0d"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* spoiler */}
      <path d="M12 50 L30 47 L31 51 L13 54 Z" fill="#a31313" stroke="#7c0d0d" strokeWidth="2" />
      <path d="M20 51 L20 58" stroke="#7c0d0d" strokeWidth="3" />
      {/* donkere cockpit */}
      <path d="M62 46 C70 33 84 29 99 29 C111 29 121 33 128 40 L112 45 Z" fill={`url(#${g}g)`} stroke="#7c0d0d" strokeWidth="2" />
      {/* zij-luchthapper — typisch Ferrari */}
      <path d="M96 56 L122 52 L126 60 L100 63 Z" fill="#7c0d0d" />
      {/* gele badge */}
      <circle cx="150" cy="52" r="4" fill="#ffd23f" stroke="#b8901d" strokeWidth="1.5" />
      {/* koplamp: scherp streepje */}
      <path d="M170 50 L184 56 L182 60 L168 55 Z" fill="#fff" opacity="0.85" />
      {/* glans */}
      <path d="M28 52 C56 42 84 30 112 31" stroke="rgba(255,255,255,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Sparkle x="42" y="24" s="5" delay="0s" />
      <Sparkle x="176" y="38" s="4" delay="0.9s" />
      <Wheel cx="50" cy="75" r="14" style="sport" />
      <Wheel cx="152" cy="75" r="14" style="sport" />
    </>
  )
}

function Lambo({ g }) {
  return (
    <>
      <defs>
        <BodyGradient id={`${g}b`} light="#ffe680" base="#f5c400" dark="#c79300" />
        <linearGradient id={`${g}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a6472" />
          <stop offset="1" stopColor="#20252d" />
        </linearGradient>
      </defs>
      <Shadow />
      {/* extreme hoekige wig */}
      <path
        d="M12 74 L12 58 L22 50 L58 44 L84 28 L116 26 L142 38 L172 48 L188 58 L188 74 Z"
        fill={`url(#${g}b)`}
        stroke="#8f6a00"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* grote achtervleugel */}
      <path d="M8 42 L34 38 L35 43 L9 47 Z" fill="#2c2c2e" stroke="#141416" strokeWidth="1.5" />
      <path d="M18 44 L20 52 M28 42 L30 50" stroke="#141416" strokeWidth="3" />
      {/* hoekige donkere cockpit */}
      <path d="M62 44 L86 30 L114 28 L128 37 L100 43 Z" fill={`url(#${g}g)`} stroke="#8f6a00" strokeWidth="2" />
      {/* zwarte luchthappers */}
      <path d="M56 52 L78 48 L74 60 L52 62 Z" fill="#23262c" />
      <path d="M130 42 L146 44 L142 52 L128 50 Z" fill="#23262c" />
      {/* scherpe neus-lijnen + koplamp */}
      <path d="M158 50 L184 58" stroke="#8f6a00" strokeWidth="2" />
      <path d="M168 50 L186 56 L184 60 L166 54 Z" fill="#fff" opacity="0.9" />
      {/* uitlaatvuur-oranje achterlicht */}
      <path d="M12 60 L20 58 L20 63 L12 65 Z" fill="#ff5a2d" />
      {/* glans */}
      <path d="M30 50 L60 45 L86 31" stroke="rgba(255,255,255,0.55)" strokeWidth="4" fill="none" strokeLinecap="round" />
      <Sparkle x="40" y="22" s="6" delay="0s" />
      <Sparkle x="150" y="26" s="4.5" delay="0.7s" />
      <Sparkle x="184" y="44" s="4" delay="1.4s" />
      <Wheel cx="48" cy="75" r="14" style="gold" />
      <Wheel cx="154" cy="75" r="14" style="gold" />
    </>
  )
}

const DRAWINGS = {
  kever: Kever,
  mini: Mini,
  golf: Golf,
  jeep: Jeep,
  porsche: Porsche,
  ferrari: Ferrari,
  lambo: Lambo,
}

export default function CarSvg({ car, size = 160, locked = false, className = '' }) {
  const g = useId().replace(/:/g, '')
  const Drawing = DRAWINGS[car.id] || Kever
  return (
    <svg
      viewBox="0 0 200 100"
      width={size}
      height={size * 0.5}
      className={className}
      style={locked ? { filter: 'grayscale(1)', opacity: 0.55 } : undefined}
      role="img"
      aria-label={car.name}
    >
      <Drawing g={g} />
      {locked && (
        <text x="100" y="62" textAnchor="middle" fontSize="34">
          🔒
        </text>
      )}
    </svg>
  )
}
