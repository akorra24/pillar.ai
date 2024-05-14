import Footer from "./components/Footer";
import Header from "./components/Header";
import BodyBackground from "../assets/body_background.jpg";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${BodyBackground})`,
        backgroundSize: "100% 100%",
      }}
      className="bg-center bg-cover bg-no-repeat flex flex-col px-3 pt-2"
    >
      <Header />
      <Footer />
    </div>
  );
}

export default App;
