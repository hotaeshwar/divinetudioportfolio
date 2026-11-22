import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
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

function RevealBlock({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView(0.1);
  const base = {
    opacity: 0,
    transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    transform:
      direction === "left"  ? "translateX(-36px)" :
      direction === "right" ? "translateX(36px)"  :
      "translateY(28px)",
  };
  const active = { opacity: 1, transform: "translate(0)" };
  return (
    <div ref={ref} style={inView ? { ...base, ...active } : base} className={className}>
      {children}
    </div>
  );
}

const WHATSAPP_NUMBER = "919779433175";

const SERVICES = [
  "Residential Design",
  "Commercial Design",
  "Public Design",
  "Interior Design",
  "Office Design",
  "Restaurant Design",
  "Renovation / Remodelling",
  "Architectural Consultation",
  "Landscape Design",
  "Other / General Enquiry",
];

const INFO_ITEMS = [
  {
    label: "WhatsApp / Call",
    value: "+91 97794 33175",
    href: `https://wa.me/919779433175`,
  },
  {
    label: "Email",
    value: "devinestudio56@gmail.com",
    href: "mailto:devinestudio56@gmail.com",
  },
  {
    label: "Website",
    value: "www.devinestudio.com",
    href: "https://www.devinestudio.com",
  },
  {
    label: "Studio Address",
    value: "SOHO 926, Block D&E, Chandigarh Citi Center, VIP Road, Zirakpur, Punjab 140603",
    href: "https://maps.google.com/?q=SOHO+926+Block+D+E+Chandigarh+Citi+Center+VIP+Road+Zirakpur+Punjab+140603",
  },
  {
    label: "Service Area",
    value: "Punjab · Haryana · Rajasthan · Chandigarh",
    href: null,
  },
];

function WhatsAppIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.507 13.453C32.07 11.01 28.79 9.664 25.3 9.664c-7.19 0-13.044 5.854-13.044 13.044 0 2.298.6 4.543 1.742 6.516L12 36.336l7.31-1.916a13.017 13.017 0 0 0 5.987 1.523h.006c7.188 0 13.041-5.854 13.041-13.044 0-3.485-1.356-6.762-3.837-9.246ZM25.3 33.77h-.005a10.82 10.82 0 0 1-5.513-1.507l-.396-.235-4.1 1.075 1.094-3.995-.258-.41A10.81 10.81 0 0 1 14.44 22.71c0-5.99 4.876-10.865 10.869-10.865 2.902 0 5.628 1.13 7.678 3.184a10.8 10.8 0 0 1 3.179 7.683c-.003 5.99-4.878 10.858-10.866 10.858Zm5.96-8.135c-.327-.163-1.931-.953-2.23-1.062-.299-.109-.517-.163-.734.163-.218.327-.843 1.062-1.034 1.28-.19.218-.381.245-.708.082-.327-.164-1.38-.508-2.629-1.622-.972-.866-1.628-1.937-1.818-2.264-.19-.326-.02-.503.143-.665.147-.146.327-.381.49-.572.164-.19.218-.326.327-.544.109-.218.055-.409-.027-.572-.082-.163-.735-1.77-1.007-2.423-.265-.636-.535-.55-.735-.56-.19-.009-.408-.011-.625-.011-.218 0-.572.082-.871.408-.299.327-1.142 1.116-1.142 2.722s1.169 3.158 1.333 3.376c.163.218 2.3 3.513 5.573 4.926.779.336 1.387.537 1.861.688.782.249 1.494.214 2.057.13.628-.093 1.932-.79 2.204-1.552.272-.762.272-1.416.19-1.553-.08-.136-.298-.218-.625-.381Z"
        fill="white"
      />
    </svg>
  );
}

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSent(false);
  };

  const buildWhatsAppMessage = () => {
    const service = form.service || "General Enquiry";
    const lines = [
      `Hello Ar. Amrita,`,
      ``,
      `I'm interested in *${service}*.`,
      ``,
      `*Name:* ${form.name || "—"}`,
      `*Phone:* ${form.phone || "—"}`,
      form.message ? `*Message:* ${form.message}` : null,
      ``,
      `Looking forward to hearing from you.`,
    ].filter((l) => l !== null);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const [headerRef, headerInView] = useInView(0.1);

  return (
    <section
      id="contact"
      className="w-full py-10 sm:py-14 lg:py-18 overflow-hidden"
      style={{ background: "#1d293d", fontFamily: "'Cormorant Garamond', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .contact-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(243,236,0,0.15);
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-weight: 300;
          padding: 10px 13px;
          outline: none;
          transition: border-color 0.25s, background 0.25s;
          appearance: none;
          -webkit-appearance: none;
        }
        .contact-input::placeholder { color: rgba(255,255,255,0.3); }
        .contact-input:focus {
          border-color: #f3ec00;
          background: rgba(243,236,0,0.04);
        }
        .contact-input option {
          background: #1d293d;
          color: #fff;
        }

        .field-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.54rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(243,236,0,0.7);
          display: block;
          margin-bottom: 5px;
        }

        .section-label-contact {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #f3ec00;
        }

        .yellow-rule {
          display: block;
          width: 40px;
          height: 2px;
          background: #f3ec00;
          margin-top: 10px;
        }

        .info-row {
          border-left: 2px solid rgba(243,236,0,0.15);
          padding-left: 14px;
          transition: border-color 0.3s;
        }
        .info-row:hover { border-left-color: #f3ec00; }

        .wa-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #f3ec00;
          color: #1d293d;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 12px 20px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          margin-top: 4px;
        }
        .wa-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(243,236,0,0.25);
        }

        .wa-direct-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.57rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .wa-direct-btn:hover {
          background: #1ebe5d;
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(37,211,102,0.35);
        }

        .bg-dots-contact {
          background-image: radial-gradient(rgba(243,236,0,0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }

        .select-arrow {
          position: relative;
        }
        .select-arrow::after {
          content: '';
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 4px solid rgba(243,236,0,0.6);
          pointer-events: none;
        }
      `}</style>

      {/* Dot grid */}
      <div className="fixed inset-0 bg-dots-contact pointer-events-none" style={{ zIndex: 0 }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="mb-8 sm:mb-10"
        >
          <span className="section-label-contact block mb-2">Get in Touch</span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
            }}
          >
            Let's Build Something{" "}
            <span style={{ color: "#f3ec00", fontStyle: "italic" }}>Extraordinary</span>
          </h2>
          <span className="yellow-rule" />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "0.97rem",
              fontWeight: 300,
              color: "rgba(255,255,255,0.5)",
              marginTop: "10px",
              maxWidth: "440px",
              lineHeight: 1.65,
            }}
          >
            Share your vision with Ar. Amrita Sachdeva — receive a response directly on WhatsApp.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* ── LEFT — Form ── */}
          <RevealBlock direction="left" delay={0}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              {/* Name + Phone — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="field-label">Your Name</label>
                  <input
                    className="contact-input"
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">Phone / WhatsApp</label>
                  <input
                    className="contact-input"
                    type="tel"
                    name="phone"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="field-label">Service Required</label>
                <div className="select-arrow">
                  <select
                    className="contact-input pr-10"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="field-label">
                  Brief Message{" "}
                  <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  className="contact-input resize-none"
                  name="message"
                  rows={3}
                  placeholder="Describe your project, location, or any specific requirements…"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* WhatsApp submit */}
              <button type="submit" className="wa-btn">
                <WhatsAppIcon size={16} />
                Send via WhatsApp
              </button>

              {sent && (
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.15em",
                    color: "#25D366",
                    textAlign: "center",
                    marginTop: "2px",
                  }}
                >
                  ✓ WhatsApp opened — your message is ready to send!
                </p>
              )}

            </form>
          </RevealBlock>

          {/* ── RIGHT — Info ── */}
          <RevealBlock direction="right" delay={120}>
            <div className="flex flex-col gap-5 lg:pt-1">

              {/* Studio info cards */}
              <div className="flex flex-col gap-4">
                {INFO_ITEMS.map((item, i) => (
                  <RevealBlock key={item.label} delay={i * 80} direction="right">
                    <div className="info-row py-0.5">
                      <span
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "0.5rem",
                          fontWeight: 600,
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "rgba(243,236,0,0.55)",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1rem",
                            fontWeight: 400,
                            color: "#fff",
                            display: "block",
                            marginTop: "3px",
                            textDecoration: "none",
                            transition: "color 0.2s",
                          }}
                          onMouseEnter={e => e.target.style.color = "#f3ec00"}
                          onMouseLeave={e => e.target.style.color = "#fff"}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1rem",
                            fontWeight: 400,
                            color: "rgba(255,255,255,0.75)",
                            marginTop: "3px",
                          }}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </RevealBlock>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div style={{ flex: 1, height: "1px", background: "rgba(243,236,0,0.12)" }} />
                <div style={{ width: "5px", height: "5px", background: "#f3ec00", transform: "rotate(45deg)" }} />
                <div style={{ flex: 1, height: "1px", background: "rgba(243,236,0,0.12)" }} />
              </div>

              {/* Direct WhatsApp CTA */}
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "0.93rem",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "10px",
                    lineHeight: 1.6,
                  }}
                >
                  Prefer to reach out directly? Chat with Ar. Amrita on WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Ar. Amrita, I'd like to discuss a design project with de'Vine sTudiO.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-direct-btn"
                >
                  <WhatsAppIcon size={15} />
                  Chat on WhatsApp
                </a>
              </div>

              {/* Quote */}
              <div
                style={{
                  borderLeft: "2px solid rgba(243,236,0,0.2)",
                  paddingLeft: "16px",
                }}
              >
                <blockquote
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(0.92rem, 1.3vw, 1.05rem)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.65,
                  }}
                >
                  "Every great space begins with a conversation."
                </blockquote>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.28em",
                    color: "rgba(243,236,0,0.5)",
                    textTransform: "uppercase",
                    display: "block",
                    marginTop: "6px",
                  }}
                >
                  — Ar. Amrita Sachdeva
                </span>
              </div>

            </div>
          </RevealBlock>

        </div>
      </div>
    </section>
  );
}