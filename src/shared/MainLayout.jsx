import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "@/icons";
import CustomersView from "@/pages/CustomersView";
import AppBar from "./AppBar";
import MainContent from "./MainContent";
import NavigationMenu from "./NavigationMenu";

function MainLayout() {
  return (
    <div className="flex h-dvh p-2 lg:p-4 lg:p-6">
      <div className="h-full w-[18%] bg-white mr-6 rounded-xl hidden lg:flex flex-col">
        <NavigationMenu />
      </div>

      <div className="w-full lg:w-[82%] h-full">
        <Sheet>
          <AppBar>
            <SheetTrigger className="block lg:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <MenuIcon className="w-6 h-6 " />
              </Button>
            </SheetTrigger>
          </AppBar>

          <SheetContent side="left" className="flex flex-col overflow-y-auto">
            <NavigationMenu />
          </SheetContent>
        </Sheet>

        <MainContent>
          <CustomersView />
        </MainContent>
      </div>
    </div>
  );
}

export default MainLayout;
