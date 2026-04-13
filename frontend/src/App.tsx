import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div className="bg-[#101828] w-screen h-screen overflow-hidden">
        <Dashboard />
        <Toaster />
      </div>
    </>
  );
};

export default App;
