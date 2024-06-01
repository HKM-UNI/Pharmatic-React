import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex h-dvh justify-center items-center">
      <LoginContainer>
        <PillsBackground />
        <div className="flex w-full xl:w-1/2 h-full bg-white rounded-r-xl justify-center">
          <LoginForm fakeLogin={() => navigate("/")} />
        </div>
      </LoginContainer>
    </div>
  );
}

function LoginContainer({ children }) {
  return (
    <div className="flex w-5/6 h-5/6 bg-pharmaticFade p-3 rounded-xl">
      {children}
    </div>
  );
}

function PillsBackground() {
  return (
    <div className="w-1/2 h-full hidden xl:block bg-pills-background bg-cover rounded-l-xl"></div>
  );
}

function LoginForm({ fakeLogin }) {
  return (
    <>
      <div className="flex-col justify-center w-4/5 self-center">
        <PharmaticLogo />
        <h2 className="text-2xl font-bold mb-6">Inicio de Sesión</h2>
        <form /*onSubmit={handleSubmit}*/>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <Input
              type="email"
              id="email"
              //value={email}
              //onChange={}
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <Input
              type="password"
              id="password"
              //value={password}
              //onChange={(e) => ()}
              placeholder="Contraseña"
              required
            />
          </div>
          <div className="flex justify-center">
            <Button size="lg" onClick={() => fakeLogin()}>
              Iniciar Sesión
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

function PharmaticLogo() {
  return (
    <img
      src="../../assets/PharmaticLogo.png"
      alt="logo pharmatic"
      className="w-64 h-auto my-3"
    ></img>
  );
}

export default Login;
