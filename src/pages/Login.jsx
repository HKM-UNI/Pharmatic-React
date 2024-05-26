import { Button } from "@/components/ui/button";

function Login() {
  return (
    <div className="flex h-dvh justify-center items-center">
      <LoginContainer></LoginContainer>
    </div>
  );
}

function LoginContainer() {
  return (
    <div className="flex w-5/6 sm:w-2/3 h-5/6 sm:h-2/3 bg-pharmaticFade p-3 rounded-xl">
      <PillsBackground />
      <div className="w-full md:w-1/2 h-full bg-orange-100 rounded-r-xl"></div>
    </div>
  );
}

function PillsBackground() {
  return (
    <div className="w-1/2 h-full hidden md:block bg-pills-background bg-cover rounded-l-xl"></div>
  );
}

function LoginForm() {
  return (
    <>
      <Button onClick="">Login</Button>
    </>
  );
}

export default Login;
