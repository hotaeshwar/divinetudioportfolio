import { useEffect, useState } from "react";

// Counter animation hook
function useCounter(target, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, start }) {
  const count = useCounter(value, 2200, start);
  return (
    <div className="flex flex-col items-center">
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
          fontWeight: 700,
          color: "#f3ec00",
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.45)",
          marginTop: "5px",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => setStarted(true), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className="min-h-screen w-full flex items-center relative overflow-hidden"
      style={{ background: "#1d293d" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .hero-img-glow {
          filter: drop-shadow(0 0 40px rgba(243,236,0,0.4)) drop-shadow(0 0 90px rgba(243,236,0,0.18));
        }
        .bg-dots {
          background-image: radial-gradient(rgba(243,236,0,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .anim-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1);
        }
        .anim-left.on { opacity: 1; transform: translateX(0); }

        .anim-right {
          opacity: 0;
          transform: translateX(50px);
          transition: opacity 1s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .anim-right.on { opacity: 1; transform: translateX(0); }

        .anim-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.4s;
        }
        .anim-up.on { opacity: 1; transform: translateY(0); }

        .brk { position: absolute; width: 28px; height: 28px; }
        .brk-tl { top: -8px; left: -8px; border-top: 2px solid #f3ec00; border-left: 2px solid #f3ec00; }
        .brk-tr { top: -8px; right: -8px; border-top: 2px solid #f3ec00; border-right: 2px solid #f3ec00; }
        .brk-bl { bottom: -8px; left: -8px; border-bottom: 2px solid #f3ec00; border-left: 2px solid #f3ec00; }
        .brk-br { bottom: -8px; right: -8px; border-bottom: 2px solid #f3ec00; border-right: 2px solid #f3ec00; }

        .btn-primary {
          background: #f3ec00;
          color: #1d293d;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 13px 30px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .btn-primary:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(243,236,0,0.3);
        }
        .btn-outline {
          background: transparent;
          color: #f3ec00;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          padding: 12px 28px;
          border: 1.5px solid rgba(243,236,0,0.55);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-outline:hover {
          background: #f3ec00;
          color: #1d293d;
          border-color: #f3ec00;
          transform: translateY(-2px);
        }

        .stat-sep { width: 1px; height: 40px; background: rgba(243,236,0,0.2); }

        .chip {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.58rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          border: 1px solid rgba(243,236,0,0.18);
          padding: 5px 11px;
          transition: border-color 0.2s, color 0.2s;
        }
        .chip:hover { border-color: #f3ec00; color: #f3ec00; }
      `}</style>

      {/* Dot grid */}
      <div className="absolute inset-0 bg-dots pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-0 right-0 pointer-events-none"
        style={{ width: "500px", height: "500px", background: "radial-gradient(circle, rgba(243,236,0,0.13) 0%, transparent 65%)", transform: "translate(30%,-30%)", filter: "blur(4px)" }} />
      <div className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: "380px", height: "380px", background: "radial-gradient(circle, rgba(243,236,0,0.09) 0%, transparent 65%)", transform: "translate(-30%,30%)", filter: "blur(4px)" }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20 lg:py-0 min-h-screen flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── LEFT — Image ── */}
          <div className={`w-full lg:w-5/12 flex justify-center anim-left ${visible ? "on" : ""}`}>
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse at center, rgba(243,236,0,0.32) 0%, transparent 68%)",
                filter: "blur(22px)",
                transform: "scale(1.18)",
                zIndex: 0,
              }} />

              <div className="brk brk-tl" /><div className="brk brk-tr" />
              <div className="brk brk-bl" /><div className="brk brk-br" />

              <div className="relative z-10 overflow-hidden" style={{ width: "clamp(240px, 36vw, 370px)" }}>
                <img
                  src="/media/logo.png"
                  alt="de'Vine sTudiO"
                  className="w-full object-cover hero-img-glow"
                  style={{ display: "block", minHeight: "360px", background: "rgba(255,255,255,0.03)" }}
                  onError={e => { e.target.src = "https://placehold.co/370x490/1d293d/f3ec00?text=de'Vine+sTudiO"; }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "#f3ec00" }} />
              </div>

              <div className="absolute z-20 px-3 py-1.5" style={{ background: "#f3ec00", right: "-14px", top: "28px" }}>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.24em", color: "#1d293d", textTransform: "uppercase" }}>Architect</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT — Text ── */}
          <div className={`w-full lg:w-7/12 text-white anim-right ${visible ? "on" : ""}`}>

            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", letterSpacing: "0.38em", color: "#f3ec00", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
              Architects &amp; Interior Designers
            </span>

            {/* Firm name as hero headline */}
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", lineHeight: 1.04, marginBottom: "6px" }}>
              <span className="block" style={{ fontSize: "clamp(2.8rem, 7vw, 5.2rem)", fontWeight: 700, color: "#fff" }}>
                de'Vine
              </span>
              <span className="block italic" style={{ fontSize: "clamp(2.8rem, 7vw, 5.2rem)", fontWeight: 700, color: "#f3ec00" }}>
                sTudiO
              </span>
            </h1>

            <div style={{ marginBottom: "22px", marginTop: "14px" }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500, letterSpacing: "0.1em", color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)", display: "block" }}>
                Principal Architect &amp; Founder — Ar. Amrita Sachdeva
              </span>
              <div style={{ marginTop: "10px", width: "52px", height: "2px", background: "#f3ec00" }} />
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.98rem, 1.4vw, 1.08rem)", fontWeight: 300, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: "440px", marginBottom: "28px" }}>
              With over a decade of visionary practice,{" "}
              <span style={{ color: "#fff", fontWeight: 600 }}>Ar. Amrita Sachdeva</span> crafts spaces where architecture and emotion intertwine. As the founder of{" "}
              <span style={{ color: "#f3ec00", fontWeight: 600 }}>de'Vine sTudiO</span>, she leads a studio celebrated for timeless design and deeply personal spaces.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4" style={{ marginBottom: "24px" }}>
              <button
                className="btn-outline"
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                Our Story
              </button>
            </div>

            {/* Specialty chips */}
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "36px" }}>
              {["Residential", "Interior Design", "Commercial", "Sustainable"].map(tag => (
                <span key={tag} className="chip">{tag}</span>
              ))}
            </div>

            {/* Stats */}
            <div className={`flex flex-wrap gap-8 sm:gap-10 anim-up ${visible ? "on" : ""}`}>
              <StatCard value={10}  suffix="+" label="Years of Excellence" start={started} />
              <div className="stat-sep hidden sm:block self-center" />
              <StatCard value={200} suffix="+" label="Projects Completed"  start={started} />
              <div className="stat-sep hidden sm:block self-center" />
              <StatCard value={150} suffix="+" label="Happy Clients"       start={started} />
              <div className="stat-sep hidden sm:block self-center" />
              <StatCard value={15}  suffix="+" label="Awards Won"          start={started} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}