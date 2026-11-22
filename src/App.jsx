import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Aboutus from "./components/Aboutus";
import Project from "./components/Project";
import ContactUs from "./components/Contactus";

function App() {
  return (
    <div style={{ background: "#1d293d", minHeight: "100vh" }}>
      <Navbar />
      <main className="pt-20">
        <section id="home"><Home /></section>
        <section id="about"><Aboutus /></section>
        <section id="projects"><Project /></section>
        <section id="contact"><ContactUs /></section>
      </main>
    </div>
  );
}

export default App;
