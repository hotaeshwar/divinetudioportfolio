import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const links = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const location                    = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Track active section via scroll position — works for any section height
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const onScroll = () => {
      const scrollY = window.scrollY + 120; // offset for navbar height
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActiveHash(`#${current}`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct active link on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveHash(href);
    }
    setMenuOpen(false);
  };

  const isActive = (href) => activeHash === href;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

        .nav-link-item {
          position: relative;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 4px;
          transition: color 0.25s ease;
        }
        .nav-link-item::after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 1.5px;
          background: #f3ec00;
          transition: width 0.3s cubic-bezier(0.22,1,0.36,1),
                      left  0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-link-item:hover { color: #fff !important; }
        .nav-link-item:hover::after { width: 100%; left: 0; }

        .nav-link-item.nav-active { color: #f3ec00 !important; }
        .nav-link-item.nav-active::after { width: 100%; left: 0; }

        /* Mobile links */
        .mob-link {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(243,236,0,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: color 0.2s, padding-left 0.25s;
        }
        .mob-link:hover       { color: #f3ec00 !important; padding-left: 6px; }
        .mob-link.nav-active  { color: #f3ec00 !important; }

        .mob-arrow {
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.25s;
          font-size: 0.8rem;
          color: #f3ec00;
        }
        .mob-link:hover .mob-arrow,
        .mob-link.nav-active .mob-arrow { opacity: 1; transform: translateX(0); }

        /* Slide-down drawer */
        .mob-drawer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .mob-drawer.open { max-height: 300px; }

        /* Hamburger */
        .hline {
          display: block;
          height: 1.5px;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease;
        }
      `}</style>

      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? "rgba(29,41,61,0.97)" : "rgba(29,41,61,0.82)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(243,236,0,0.1)",
          transition: "background 0.3s",
        }}
      >
        {/* Main row */}
        <div
          className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between"
          style={{ height: scrolled ? "62px" : "74px", transition: "height 0.3s" }}
        >
          {/* Empty left side — no logo */}
          <div />

          {/* Desktop links — right */}
          <div className="hidden md:flex items-center gap-10">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`nav-link-item${isActive(href) ? " nav-active" : ""}`}
                style={{ color: isActive(href) ? "#f3ec00" : "rgba(255,255,255,0.68)" }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 focus:outline-none"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            aria-label="Toggle menu"
          >
            <span className="hline" style={{
              width: "22px",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              background: menuOpen ? "#f3ec00" : "#fff",
            }} />
            <span className="hline" style={{
              width: "14px",
              opacity: menuOpen ? 0 : 1,
              background: "#fff",
            }} />
            <span className="hline" style={{
              width: "22px",
              transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              background: menuOpen ? "#f3ec00" : "#fff",
            }} />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`mob-drawer md:hidden ${menuOpen ? "open" : ""}`}
          style={{ borderTop: menuOpen ? "1px solid rgba(243,236,0,0.1)" : "none" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 sm:px-10 pb-2">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`mob-link${isActive(href) ? " nav-active" : ""}`}
                style={{ color: isActive(href) ? "#f3ec00" : "rgba(255,255,255,0.68)" }}
              >
                {label}
                <span className="mob-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}