import { Toaster } from "@/components/ui/toaster";

function MainContent({ children }) {
  return (
    <div className="w-full grow overflow-auto rounded-b-xl bg-pharmaticFade p-3">
      {children}
      <Toaster />
    </div>
  );
}

export default MainContent;
