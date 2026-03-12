import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Community from "./components/Community";
import Connect from "./components/Connect";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <Hero />
        <About />
        <Community />
        <Connect />
      </div>
      <Footer />
    </main>
  );
}
