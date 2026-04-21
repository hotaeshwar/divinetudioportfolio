import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Maximize2 } from 'lucide-react';

const ProjectGallery = () => {
  const projectImages = {
    Residential: [
      { 
        name: "Panchkula Residence", 
        location: "Panchkula", 
        size: "300 SQYD", 
        images: ["/media/residential1.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-1"
      },
      { 
        name: "Jaipur Residence", 
        location: "Jaipur", 
        size: "200 SQYD", 
        images: ["/media/residential2.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-2"
      },
      { 
        name: "Kalka Residence", 
        location: "Kalka", 
        size: "200 SQYD", 
        images: ["/media/residential3.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-3"
      },
      { 
        name: "Zirakpur Residence", 
        location: "Zirakpur", 
        size: "1 Kanal (600 SQYD)", 
        images: ["/media/residential4.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-4"
      },
      { 
        name: "Ambala Residence", 
        location: "Ambala", 
        size: "500 SQYD", 
        images: ["/media/residential5.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-5"
      }
    ],
    Commercial: [
      { 
        name: "Commercial Project", 
        location: "", 
        images: ["/media/commercial5.jpg", "/media/commercial1.jpg", "/media/commercial2.jpg", "/media/commercial3.jpg", "/media/office4.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-6"
      }
    ],
    Offices: [
      { 
        name: "Office Project", 
        location: "", 
        images: ["/media/office2.jpg", "/media/office1.jpg", "/media/office3.jpg", "/media/office6.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-8"
      }
    ],
    Restaurant: [
      { 
        name: "Restaurant Project", 
        location: "", 
        images: ["/media/restaurant1.jpg", "/media/restaurant2.jpg", "/media/restaurant3.jpg", "/media/restaurant4.jpg"],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-7"
      }
    ],
    Interior: [
      { 
        name: "Interior Project", 
        location: "", 
        images: [
          "/media/interior1.jpg", 
          "/media/interior2.jpg", 
          "/media/interior3.jpg", 
          "/media/interior4.jpg", 
          "/media/interior11.jpg", 
          "/media/interior21.jpg", 
          "/media/interior31.jpg", 
          "/media/interrior4.jpg"
        ],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-9"
      }
    ],
    Collaboration: [
      { 
        name: "Architectural Innovations", 
        location: "", 
        images: [],
        driveLink: "https://drive.google.com/drive/folders/your-folder-id-10"
      }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState('Residential');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState({});

  const categories = Object.keys(projectImages);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const itemRefs = useRef({});

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (tabsRef.current) observer.observe(tabsRef.current);
    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleNextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedProject.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        (prev - 1 + selectedProject.images.length) % selectedProject.images.length
      );
    }
  };

  return (
    <section 
      id="our-projects" 
      ref={sectionRef}
      className="py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{ backgroundColor: '#1d293d', fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .section-label-proj {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: #f3ec00;
          display: block;
          margin-bottom: 0.75rem;
        }

        .section-heading-proj {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #ffffff;
          line-height: 1.1;
        }

        .yellow-rule-proj {
          display: block;
          width: 52px;
          height: 2px;
          background: #f3ec00;
          margin-top: 12px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn  { animation: fadeIn  0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
      `}</style>

      <div className="container mx-auto px-3 sm:px-4 md:px-6">

        {/* ── Section Header ── */}
        <div 
          id="section-header"
          ref={headerRef}
          className={`mb-8 sm:mb-12 md:mb-16 transition-all duration-700 transform ${
            visibleItems['section-header'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left-aligned, matching AboutUs style */}
          <span className="section-label-proj">Portfolio</span>
          <h2 className="section-heading-proj">Our Projects</h2>
          <span
            className={`yellow-rule-proj transition-all duration-700 delay-300 ${
              visibleItems['section-header'] ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Category Tabs */}
        <div 
          id="category-tabs"
          ref={tabsRef}
          className={`flex justify-center mb-8 sm:mb-10 md:mb-12 space-x-2 sm:space-x-3 md:space-x-4 flex-wrap transition-all duration-700 delay-100 transform ${
            visibleItems['category-tabs'] 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category, idx) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                transitionDelay: `${idx * 50}ms`,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
              className={`
                px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 m-1 rounded-full transition-all duration-300
                ${selectedCategory === category 
                  ? 'bg-yellow-300 text-gray-900 shadow-lg transform scale-105' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'}
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {projectImages[selectedCategory].map((project, index) => {
            const itemId = `${selectedCategory}-${index}`;
            return (
              <div 
                key={index}
                id={itemId}
                ref={(el) => (itemRefs.current[itemId] = el)}
                onClick={() => handleProjectClick(project)}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionDuration: '700ms'
                }}
                className={`
                  relative group overflow-hidden rounded-lg shadow-2xl 
                  ${selectedCategory === "Collaboration" 
                    ? "bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-300 sm:col-span-2 lg:col-span-3 h-56 sm:h-64 md:h-72 lg:h-80" 
                    : "bg-gray-800"
                  }
                  transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
                  cursor-pointer
                  ${visibleItems[itemId] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                  }
                `}
              >
                {selectedCategory === "Collaboration" ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4 sm:px-6 lg:px-12">
                      <span
                        className="inline-block px-3 sm:px-4 py-1 sm:py-2 mb-2 sm:mb-4 bg-gray-900 rounded-full transform -rotate-2"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#f3ec00" }}
                      >
                        {selectedCategory}
                      </span>
                      <h3
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.5rem, 3vw, 2.5rem)", fontWeight: 700, color: "#1d293d" }}
                        className="mb-1 sm:mb-2"
                      >
                        {project.name}
                      </h3>
                      <div
                        className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 rounded-lg shadow-lg transform group-hover:translate-y-0 translate-y-2 transition-transform duration-300"
                        style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#f3ec00" }}
                      >
                        View This Project
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {project.images[0] && (
                      <div className="relative overflow-hidden">
                        <img 
                          src={project.images[0]} 
                          alt={project.name} 
                          className="w-full h-48 sm:h-56 md:h-64 object-cover 
                                     filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                      </div>
                    )}
                    <div className="p-3 sm:p-4 md:p-5">
                      <h3
                        className="mb-1 sm:mb-2 group-hover:text-yellow-300 transition-colors duration-300"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.1rem, 2vw, 1.35rem)", fontWeight: 700, color: "#ffffff" }}
                      >
                        {project.name}
                      </h3>
                      {project.location && (
                        <p
                          className="mb-0.5 flex items-center gap-1"
                          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)" }}
                        >
                          <MapPin size={10} strokeWidth={1.8} /> {project.location}
                        </p>
                      )}
                      {project.size && (
                        <p className="flex items-center gap-1" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)" }}>
                          <Maximize2 size={10} strokeWidth={1.8} /> {project.size}
                        </p>
                      )}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-yellow-300 rounded-full p-1.5 sm:p-2 shadow-md transform rotate-0 group-hover:rotate-45 transition-transform duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5-5m0 0l-5-5m5 5H4" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Project Modal */}
        {selectedProject && selectedProject.images.length > 0 && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
            <div className="bg-gray-900 rounded-lg overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col transform animate-slideUp">
              {/* Modal Header */}
              <div className="p-3 sm:p-4 md:p-5 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 700, color: "#f3ec00" }}
                  >
                    {selectedProject.name}
                  </h3>
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)" }} className="flex items-center gap-2 flex-wrap">
                    {selectedProject.location && <span className="flex items-center gap-1"><MapPin size={10} strokeWidth={1.8} /> {selectedProject.location}</span>}
                    {selectedProject.size && <span className="flex items-center gap-1"><Maximize2 size={10} strokeWidth={1.8} /> {selectedProject.size}</span>}
                  </p>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-yellow-300 transition-colors duration-300 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Image Viewer */}
              <div className="relative flex-grow">
                <div className="h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden bg-black">
                  <img 
                    src={selectedProject.images[currentImageIndex]} 
                    alt={`${selectedProject.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain animate-fadeIn"
                  />
                </div>
                
                {selectedProject.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute top-1/2 left-1 sm:left-2 -translate-y-1/2 bg-yellow-300 text-gray-900 rounded-full p-2 sm:p-3 shadow-lg hover:bg-yellow-400 transition-all duration-300 focus:outline-none hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute top-1/2 right-1 sm:right-2 -translate-y-1/2 bg-yellow-300 text-gray-900 rounded-full p-2 sm:p-3 shadow-lg hover:bg-yellow-400 transition-all duration-300 focus:outline-none hover:scale-110"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-3 sm:p-4 flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 sm:pb-0 border-t border-gray-700">
                {selectedProject.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-10 sm:h-12 md:h-14 w-14 sm:w-16 md:w-20 flex-shrink-0 rounded-md overflow-hidden transition-all duration-300 ${
                      idx === currentImageIndex 
                        ? 'ring-2 ring-yellow-300 scale-110 shadow-lg' 
                        : 'opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Drive Link */}
              <div className="p-3 sm:p-4 md:p-5 border-t border-gray-700 flex justify-end">
                <a 
                  href={selectedProject.driveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}
                  className="inline-flex items-center px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-yellow-300 text-gray-900 rounded-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  View more images
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;