import { useEffect, useRef, useState } from "react";

// Intersection observer hook for scroll reveal
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// Animated counter hook — counts from 0 to target on scroll-in
function useCountUp(target, suffix = "", duration = 1600) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0" + suffix);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplay(Math.floor(eased * target) + suffix);
            if (progress < 1) requestAnimationFrame(tick);
            else setDisplay(target + suffix);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, duration]);

  return [ref, display];
}

// Single animated section block
function RevealBlock({ children, delay = 0, direction = "up" }) {
  const [ref, inView] = useInView(0.12);
  const base = {
    opacity: 0,
    transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    transform:
      direction === "left" ? "translateX(-36px)" :
      direction === "right" ? "translateX(36px)" :
      "translateY(28px)",
  };
  const active = { opacity: 1, transform: "translate(0)" };
  return (
    <div ref={ref} style={inView ? { ...base, ...active } : base}>
      {children}
    </div>
  );
}

// Individual stat with its own counter ref
function AnimatedStat({ target, suffix, label, delay }) {
  const [ref, display] = useCountUp(target, suffix, 1600);
  return (
    <div
      ref={ref}
      className="flex flex-col items-center"
      style={{
        opacity: 1,
        transitionDelay: `${delay}ms`,
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "2.2rem",
          fontWeight: 700,
          color: "#f3ec00",
          lineHeight: 1,
          minWidth: "3ch",
          textAlign: "center",
        }}
      >
        {display}
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.58rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginTop: "4px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// Location data
const locations = [
  {
    state: "Chandigarh",
    tag: "Tricity Hub",
    cities: ["Chandigarh", "Mohali", "Panchkula"],
    desc: "The cosmopolitan heart of Northwest India — Ar. COD Amrita's primary base, serving the Tricity region with full-service architectural and interior design solutions.",
    color: "#f3ec00",
  },
  {
    state: "Punjab",
    tag: "Heritage Roots",
    cities: ["Abohar", "Fazilka", "Amritsar"],
    desc: "From the cultural grandeur of Amritsar to the emerging towns of Abohar and Fazilka — crafting residences and commercial spaces that honor Punjab's rich identity.",
    color: "#f3ec00",
  },
  {
    state: "Rajasthan",
    tag: "Desert Elegance",
    cities: ["Vijaynagar"],
    desc: "Bringing contemporary design sensibility to Vijaynagar — merging Rajasthan's timeless aesthetic traditions with modern spatial functionality.",
    color: "#f3ec00",
  },
  {
    state: "Haryana",
    tag: "Urban Growth",
    cities: ["Sirsa", "Gurgaon", "Panchkula"],
    desc: "From the corporate corridors of Gurgaon to the developing landscapes of Sirsa — delivering spaces that meet the demands of Haryana's rapid urban evolution.",
    color: "#f3ec00",
  },
];

// Values / philosophy ladder
const philosophy = [
  {
    num: "01",
    title: "People-First Design",
    body: "Every space begins with its inhabitants. Ar. COD Amrita listens deeply before she draws — understanding how her clients live, work, and feel at home.",
  },
  {
    num: "02",
    title: "Contextual Architecture",
    body: "From Chandigarh's modernist grid to Rajasthan's desert palette — each project is designed in dialogue with its place, climate, and culture.",
  },
  {
    num: "03",
    title: "Detail as Signature",
    body: "The difference between good and extraordinary lives in the details. Every material choice, joint, and finish is considered with intention.",
  },
  {
    num: "04",
    title: "Timeless Over Trendy",
    body: "Trends fade; spaces endure. Ar. COD Amrita designs for the long arc — spaces that remain beautiful and relevant decades after completion.",
  },
];

export default function AboutUs() {
  const [heroRef, heroInView] = useInView(0.1);

  return (
    <div
      className="w-full min-h-screen"
      style={{ background: "#1d293d", fontFamily: "'Cormorant Garamond', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .bg-dots-about {
          background-image: radial-gradient(rgba(243,236,0,0.06) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .ladder-line {
          position: absolute;
          left: 50%;
          top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(243,236,0,0.25) 10%, rgba(243,236,0,0.25) 90%, transparent);
          transform: translateX(-50%);
        }
        @media (max-width: 767px) {
          .ladder-line { left: 20px; }
        }

        .ladder-dot {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #f3ec00;
          border: 2px solid #1d293d;
          box-shadow: 0 0 0 3px rgba(243,236,0,0.25);
          flex-shrink: 0;
        }

        .location-card {
          border: 1px solid rgba(243,236,0,0.12);
          background: rgba(255,255,255,0.025);
          transition: border-color 0.3s, background 0.3s, transform 0.3s;
        }
        .location-card:hover {
          border-color: rgba(243,236,0,0.4);
          background: rgba(243,236,0,0.04);
          transform: translateY(-3px);
        }

        .city-pill {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid rgba(243,236,0,0.3);
          color: rgba(255,255,255,0.6);
          transition: all 0.2s;
        }
        .city-pill:hover {
          border-color: #f3ec00;
          color: #f3ec00;
          background: rgba(243,236,0,0.06);
        }

        .service-pill {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 8px 20px;
          border: 1px solid rgba(243,236,0,0.35);
          color: rgba(255,255,255,0.65);
          background: rgba(243,236,0,0.03);
          transition: all 0.25s;
          cursor: default;
        }
        .service-pill:hover {
          border-color: #f3ec00;
          color: #f3ec00;
          background: rgba(243,236,0,0.07);
        }

        .philo-row {
          border-left: 2px solid rgba(243,236,0,0.15);
          transition: border-color 0.3s;
          padding-left: 24px;
        }
        .philo-row:hover { border-left-color: #f3ec00; }

        .section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #f3ec00;
        }

        .yellow-rule {
          display: block;
          width: 52px; height: 2px;
          background: #f3ec00;
          margin-top: 12px;
        }

        .stats-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 28px 0 24px;
        }
        .stats-divider-line {
          width: 50px; height: 1px;
          background: rgba(243,236,0,0.2);
        }
        .stats-divider-dot {
          width: 5px; height: 5px;
          background: #f3ec00;
          transform: rotate(45deg);
        }
        .service-section-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: rgba(243,236,0,0.55);
          text-align: center;
          margin-bottom: 14px;
        }
      `}</style>

      {/* Dot grid overlay */}
      <div className="fixed inset-0 bg-dots-about pointer-events-none" style={{ zIndex: 0 }} />

      <div className="relative z-10">

        {/* ══ HERO INTRO ══ */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 py-24 lg:py-32"
        >
          <div className="max-w-4xl w-full text-center">
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(32px)",
                transition: "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <span className="section-label block mb-6">About the Architect</span>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.05,
                  marginBottom: "0.2em",
                }}
              >
                Ar. COD Amrita
              </h1>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#f3ec00",
                  lineHeight: 1.05,
                  marginBottom: "1.2rem",
                }}
              >
                Sachdeva
              </h1>

              <div
                style={{
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 1s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 1s cubic-bezier(0.22,1,0.36,1) 0.2s",
                }}
              >
                <p
                  className="mx-auto"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.85,
                    maxWidth: "640px",
                    marginBottom: "2rem",
                  }}
                >
                  Principal Architect &amp; Founder of{" "}
                  <span style={{ color: "#f3ec00", fontWeight: 600 }}>de'Vine sTudiO</span>,
                  Ar. COD Amrita Sachdeva has spent over a decade transforming visions into living spaces.
                  Her practice spans four states, eight cities, and hundreds of stories told through architecture.
                </p>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 mb-10">
                  <div style={{ width: "60px", height: "1px", background: "rgba(243,236,0,0.3)" }} />
                  <div style={{ width: "8px", height: "8px", background: "#f3ec00", transform: "rotate(45deg)" }} />
                  <div style={{ width: "60px", height: "1px", background: "rgba(243,236,0,0.3)" }} />
                </div>

                {/* ── Animated quick stats row ── */}
                <div className="flex flex-wrap justify-center gap-10">
                  {[
                    { target: 10,  suffix: "+", label: "Years",    delay: 0   },
                    { target: 4,   suffix: "",  label: "States",   delay: 120 },
                    { target: 8,   suffix: "+", label: "Cities",   delay: 240 },
                    { target: 200, suffix: "+", label: "Projects", delay: 360 },
                  ].map((stat) => (
                    <AnimatedStat key={stat.label} {...stat} />
                  ))}
                </div>

                {/* ── Service specialisations ── */}
                <div className="stats-divider">
                  <div className="stats-divider-line" />
                  <div className="stats-divider-dot" />
                  <div className="stats-divider-line" />
                </div>
                <div className="service-section-label">Design Specialisations</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Residential", "Commercial", "Public Design"].map((s) => (
                    <span key={s} className="service-pill">{s}</span>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══ PHILOSOPHY LADDER ══ */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28" style={{ borderTop: "1px solid rgba(243,236,0,0.1)" }}>
          <div className="max-w-5xl mx-auto">
            <RevealBlock delay={0}>
              <span className="section-label block mb-3">Design Philosophy</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                How She Approaches Every Space
              </h2>
              <span className="yellow-rule" />
            </RevealBlock>

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
              {philosophy.map((item, i) => (
                <RevealBlock key={item.num} delay={i * 120} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className="philo-row py-2">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(243,236,0,0.5)" }}>
                      {item.num}
                    </span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", fontWeight: 700, color: "#fff", margin: "6px 0 8px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.75 }}>
                      {item.body}
                    </p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CITIES LADDER ══ */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28" style={{ borderTop: "1px solid rgba(243,236,0,0.1)" }}>
          <div className="max-w-5xl mx-auto">

            <RevealBlock delay={0}>
              <span className="section-label block mb-3">Service Footprint</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>
                Cities &amp; Locations We Serve
              </h2>
              <span className="yellow-rule" />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", fontWeight: 300, color: "rgba(255,255,255,0.55)", marginTop: "14px", maxWidth: "520px", lineHeight: 1.75 }}>
                Ar. COD Amrita Sachdeva's practice extends across Northwest India — bringing the same standard of excellence to every city she serves.
              </p>
            </RevealBlock>

            {/* Ladder / timeline */}
            <div className="relative mt-16">
              <div className="ladder-line" />
              <div className="flex flex-col gap-0">
                {locations.map((loc, i) => {
                  const isLeft = i % 2 === 0;
                  return (
                    <RevealBlock key={loc.state} delay={i * 150} direction={isLeft ? "left" : "right"}>
                      <div className={`relative flex items-start gap-6 py-8 ${isLeft ? "md:flex-row flex-row" : "md:flex-row-reverse flex-row"}`}>
                        <div className={`w-full md:w-[calc(50%-32px)] location-card p-6 sm:p-8 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(243,236,0,0.6)" }}>
                                {loc.tag}
                              </span>
                              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: "#fff", lineHeight: 1, marginTop: "4px" }}>
                                {loc.state}
                              </h3>
                            </div>
                          </div>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.98rem", fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "16px" }}>
                            {loc.desc}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {loc.cities.map(city => (
                              <span key={city} className="city-pill">{city}</span>
                            ))}
                          </div>
                        </div>
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                          <div className="ladder-dot" />
                        </div>
                      </div>
                    </RevealBlock>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CLOSING STATEMENT ══ */}
        <section className="px-6 sm:px-10 lg:px-16 py-20 lg:py-28 text-center" style={{ borderTop: "1px solid rgba(243,236,0,0.1)" }}>
          <div className="max-w-3xl mx-auto">
            <RevealBlock delay={0}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div style={{ width: "40px", height: "1px", background: "rgba(243,236,0,0.3)" }} />
                <div style={{ width: "6px", height: "6px", background: "#f3ec00", transform: "rotate(45deg)" }} />
                <div style={{ width: "40px", height: "1px", background: "rgba(243,236,0,0.3)" }} />
              </div>
              <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "2rem" }}>
                "Architecture is not just about buildings — it is about the people who inhabit them, the memories they create, and the lives they enable."
              </blockquote>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#f3ec00", textTransform: "uppercase", fontWeight: 600 }}>
                — Ar. COD Amrita Sachdeva
              </span>
            </RevealBlock>
          </div>
        </section>

      </div>
    </div>
  );
}