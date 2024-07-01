import { Toaster } from "@/components/ui/toaster";
import { LoginForm } from "./forms";

function Login() {
  return (
    <div className="flex h-dvh items-center justify-center">
      <LoginContainer>
        <PillsBackground />
        <div className="flex h-full w-full justify-center rounded-r-xl bg-white py-3 lg:py-0 xl:w-1/2">
          <LoginForm />
        </div>
      </LoginContainer>
      <Toaster />
    </div>
  );
}

function LoginContainer({ children }) {
  return (
    <div className="flex h-auto w-5/6 rounded-xl bg-pharmaticFade p-3 md:h-5/6">
      {children}
    </div>
  );
}

function PillsBackground() {
  return (
    <div className="hidden h-full w-1/2 rounded-l-xl bg-pills-background bg-cover xl:block"></div>
  );
}

export default Login;
