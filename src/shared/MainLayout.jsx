import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "@/icons";
import AppBar from "./AppBar";
import MainContent from "./MainContent";
import NavigationMenu from "./NavigationMenu";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex h-dvh p-2 lg:p-3">
      <div className="mr-6 hidden h-full w-[16%] flex-col overflow-auto rounded-xl bg-white xl:flex">
        <NavigationMenu />
      </div>

      <div className="flex h-full w-full flex-col xl:w-[84%]">
        <AppBar>
          <Sheet>
            <SheetTrigger className="block xl:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col overflow-y-auto">
              <NavigationMenu />
            </SheetContent>
          </Sheet>
        </AppBar>

        <MainContent>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}

export default MainLayout;
