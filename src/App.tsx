import { Nav } from "./components/Nav";
import { Cursor } from "./components/Cursor";
import { ScrollProgress } from "./components/ScrollProgress";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { POV } from "./sections/POV";
import { Work } from "./sections/Work";
import { Capabilities } from "./sections/Capabilities";
import { Experience } from "./sections/Experience";
import { About } from "./sections/About";
import { Contact } from "./sections/Contact";

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Hero />
        <POV />
        <Work />
        <Capabilities />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
