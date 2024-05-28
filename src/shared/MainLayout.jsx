import AppBar from "./AppBar";
import Drawer from "./Drawer";
import MainContent from "./MainContent";

function MainLayout() {
  return (
    <div className="flex h-dvh p-6">
      <Drawer />
      <div className="w-full md:w-[80%] h-full">
        <AppBar />
        <MainContent />
      </div>
    </div>
  );
}

export default MainLayout;
