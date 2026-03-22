import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/Layout/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <ScrollToTop/>
      <Header />
      <main>
        <Outlet />  
      </main>
      <Footer />

    </div>
  );
}

export default App;
