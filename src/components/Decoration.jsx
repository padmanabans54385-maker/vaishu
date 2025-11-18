"use client"

export default function Decoration() {
  function qPoint(t, p0, p1, p2) {
    const u = 1 - t
    const x = u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x
    const y = u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y
    return { x, y }
  }
  function qTangent(t, p0, p1, p2) {
    const dx = 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x)
    const dy = 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y)
    const len = Math.hypot(dx, dy) || 1
    return { x: dx / len, y: dy / len }
  }
  function flagPolygon(t, side) {
    const p0L = { x: 0, y: 50 }
    const p1L = { x: 250, y: 140 }
    const p2L = { x: 500, y: 0 }
    const p0R = { x: 1000, y: 50 }
    const p1R = { x: 750, y: 140 }
    const p2R = { x: 500, y: 0 }

    const p = side === "left" ? qPoint(t, p0L, p1L, p2L) : qPoint(t, p0R, p1R, p2R)
    const tan = side === "left" ? qTangent(t, p0L, p1L, p2L) : qTangent(t, p0R, p1R, p2R)

    const base = window.innerWidth > 768 ? 40 : 60
    const half = base / 2
    const height = 38

    const tx = tan.x
    const ty = tan.y

    let nx = -ty
    let ny = tx
    if (ny < 0) {
      nx = -nx
      ny = -ny
    }

    const x1 = p.x - tx * half
    const y1 = p.y - ty * half
    const x2 = p.x + tx * half
    const y2 = p.y + ty * half
    const xt = p.x + nx * height
    const yt = p.y + ny * height

    return `${x1.toFixed(2)},${y1.toFixed(2)} ${x2.toFixed(2)},${y2.toFixed(2)} ${xt.toFixed(2)},${yt.toFixed(2)}`
  }

  const flagColors = ["fill-rose-400", "fill-sky-400", "fill-amber-400", "fill-emerald-400", "fill-fuchsia-400"]
  const flagsPerSide = window.innerWidth > 768 ? 10 : 7

  return (
    <div className="pointer-events-none fixed inset-0  z-40">
      {/* top bunting bar */}
      <div className="relative h-28 md:h-32 lg:h-48 w-full">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 160" preserveAspectRatio="none">
          <path
            d="M 0 50 Q 250 140 500 0"
            className="fill-none stroke-rose-300/90"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 1000 50 Q 750 140 500 0"
            className="fill-none stroke-violet-300/90"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {Array.from({ length: flagsPerSide }).map((_, i) => {
            const t = (i + 1) / (flagsPerSide + 1)
            const color = flagColors[i % flagColors.length]
            return (
              <polygon key={`L${i}`} points={flagPolygon(t, "left")} className={`${color} opacity-95 drop-shadow`} />
            )
          })}

          {Array.from({ length: flagsPerSide }).map((_, i) => {
            const t = (i + 1) / (flagsPerSide + 1)
            const color = flagColors[(i + 1) % flagColors.length]
            return (
              <polygon key={`R${i}`} points={flagPolygon(t, "right")} className={`${color} opacity-95 drop-shadow`} />
            )
          })}
        </svg>
      </div>

      {/* left ribbon */}
      <svg
        className="absolute left-2 top-0 h-40 w-16 md:h-48 md:w-18 -z-1"
        viewBox="0 0 64 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="leftRibbon" x1="0" x2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <path
          d="M16 0 C 6 28, 32 56, 12 84 C -4 112, 28 128, 10 156"
          stroke="url(#leftRibbon)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          className="drop-shadow"
        />
      </svg>

      {/* right ribbon */}
      <svg
        className="absolute right-2 top-0 h-40 w-16 md:h-48 md:w-18 -z-1"
        viewBox="0 0 64 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rightRibbon" x1="0" x2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path
          d="M48 0 C 58 28, 32 56, 52 84 C 68 112, 36 128, 54 156"
          stroke="url(#rightRibbon)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          className="drop-shadow"
        />
      </svg>
    </div>
  )
}
