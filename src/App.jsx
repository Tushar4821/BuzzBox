import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      
      <Header />

      <main>
        <Outlet />  
      </main>

      <Footer />

    </div>
  );
}

export default App;
