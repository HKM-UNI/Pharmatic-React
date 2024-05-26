import Drawer from "./Drawer";
import MainContent from "./MainContent";

function MainLayout() {
  return (
    <div className="flex h-dvh p-6">
      <Drawer />
      <MainContent />
    </div>
  );
}

export default MainLayout;
