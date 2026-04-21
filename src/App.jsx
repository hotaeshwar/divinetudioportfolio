import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import Project from "./components/Project";
import ContactUs from "./components/Contactus";

function SplashScreen() {
  return (
    <div style={styles.overlay}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,700&family=Montserrat:wght@300;400;500;600;700&display=swap');

        @keyframes spinCW    { to { transform: rotate(360deg); } }
        @keyframes spinCCW   { to { transform: rotate(-360deg); } }
        @keyframes pulseDot  { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.35; transform:scale(0.55); } }
        @keyframes barSlide  { 0% { width:0%; margin-left:0; } 50% { width:65%; } 100% { width:0%; margin-left:100%; } }
        @keyframes blinkText { 0%,100% { opacity:1; } 50% { opacity:0.25; } }
        @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes dotGrid   { 0%,100% { opacity:0.4; } 50% { opacity:0.7; } }

        .splash-ring-1 { animation: spinCW  1.3s linear infinite; }
        .splash-ring-2 { animation: spinCCW 0.9s linear infinite; }
        .splash-ring-3 { animation: spinCW  1.8s linear infinite; }
        .splash-dot    { animation: pulseDot 1.3s ease-in-out infinite; }
        .splash-bar    { animation: barSlide 2.6s ease-in-out infinite; }
        .splash-blink  { animation: blinkText 1.5s ease-in-out infinite; }
        .splash-entry  { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .splash-entry-2{ animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
        .splash-entry-3{ animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.34s both; }

        .splash-dot-bg {
          background-image: radial-gradient(rgba(243,236,0,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          animation: dotGrid 3s ease-in-out infinite;
        }
      `}</style>

      {/* Dot grid — same as AboutUs */}
      <div className="splash-dot-bg" style={styles.dotGrid} />

      <div style={styles.inner}>

        {/* ── Ring loader ── */}
        <div className="splash-entry" style={styles.ringWrap}>
          <div
            className="splash-ring-1"
            style={{ ...styles.ring, borderTopColor: "#f3ec00", borderRightColor: "transparent", borderBottomColor: "transparent", borderLeftColor: "transparent" }}
          />
          <div
            className="splash-ring-2"
            style={{ ...styles.ring, inset: "12px", borderTopColor: "transparent", borderRightColor: "rgba(243,236,0,0.45)", borderBottomColor: "transparent", borderLeftColor: "transparent" }}
          />
          <div
            className="splash-ring-3"
            style={{ ...styles.ring, inset: "24px", borderTopColor: "transparent", borderRightColor: "transparent", borderBottomColor: "rgba(243,236,0,0.22)", borderLeftColor: "transparent" }}
          />
          <div className="splash-dot" style={styles.dot} />
        </div>

        {/* ── Brand label ── */}
        <div className="splash-entry-2" style={styles.textBlock}>
          <span style={styles.sectionLabel}>Principal Architect &amp; Founder</span>

          <div style={styles.dividerRow}>
            <div style={styles.dividerLine} />
            <div style={styles.dividerDiamond} />
            <div style={styles.dividerLine} />
          </div>

          <h1 style={styles.heading}>
            Welcome to{" "}
            <span style={styles.headingNormal}>AR,COD</span>
          </h1>
          <h1 style={styles.headingItalicYellow}>
            <span>Amrita Sachdeva</span>
          </h1>
          <p style={styles.subHeading}>Portfolio</p>

          <div style={styles.dividerRow}>
            <div style={styles.dividerLine} />
            <div style={styles.dividerDiamond} />
            <div style={styles.dividerLine} />
          </div>

          <div style={styles.pillRow}>
            {["Residential", "Commercial", "Public Design"].map((s) => (
              <span key={s} style={styles.pill}>{s}</span>
            ))}
          </div>
        </div>

        {/* ── Progress bar + loading text ── */}
        <div className="splash-entry-3" style={styles.barSection}>
          <div style={styles.barWrap}>
            <div className="splash-bar" style={styles.barFill} />
          </div>
          <span className="splash-blink" style={styles.loadingText}>
            Loading Experience...
          </span>
        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "#1d293d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    overflow: "hidden",
  },
  dotGrid: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
  },
  inner: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  },
  ringWrap: {
    position: "relative",
    width: "96px",
    height: "96px",
  },
  ring: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    borderWidth: "2px",
    borderStyle: "solid",
  },
  dot: {
    position: "absolute",
    inset: "38px",
    background: "#f3ec00",
    borderRadius: "50%",
  },
  textBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    textAlign: "center",
  },
  sectionLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.62rem",
    fontWeight: 600,
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "#f3ec00",
  },
  dividerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "4px 0",
  },
  dividerLine: {
    width: "48px",
    height: "1px",
    background: "rgba(243,236,0,0.3)",
  },
  dividerDiamond: {
    width: "7px",
    height: "7px",
    background: "#f3ec00",
    transform: "rotate(45deg)",
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.1,
    margin: 0,
  },
  headingNormal: {
    color: "#fff",
  },
  headingItalicYellow: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
    fontWeight: 700,
    fontStyle: "italic",
    color: "#f3ec00",
    lineHeight: 1.05,
    margin: 0,
  },
  subHeading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    fontWeight: 300,
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    margin: 0,
  },
  pillRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginTop: "4px",
  },
  pill: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    fontWeight: 600,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "7px 18px",
    border: "1px solid rgba(243,236,0,0.35)",
    color: "rgba(255,255,255,0.65)",
    background: "rgba(243,236,0,0.03)",
  },
  barSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  barWrap: {
    width: "220px",
    height: "1px",
    background: "rgba(243,236,0,0.15)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    background: "#f3ec00",
  },
  loadingText: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.58rem",
    fontWeight: 600,
    letterSpacing: "0.38em",
    textTransform: "uppercase",
    color: "rgba(243,236,0,0.55)",
  },
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: "#1d293d", minHeight: "100vh" }}>
      {loading && <SplashScreen />}

      {!loading && (
        <>
          <Navbar />
          <main className="pt-20">
            <section id="home"><Home /></section>
            <section id="about"><Aboutus /></section>
            <section id="projects"><Project /></section>
            <section id="contact"><ContactUs /></section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;