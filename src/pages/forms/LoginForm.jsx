import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { Form, FormInput } from "@/components/custom_form";

import { AuthContext } from "@/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useContext } from "react";

export function LoginForm() {
  const { login, loggingIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const formSchema = yup
    .object({
      username: yup.string().required("Este campo es requerido"),
      password: yup.string().required("Este campo es requerido"),
    })
    .required();

  const loginDefaults = {
    username: "",
    password: "",
  };

  const onLogin = async (data) => {
    await login(data);
    navigate("/");
  };

  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: loginDefaults,
  });

  return (
    <div className="flex h-full w-4/5 flex-col place-content-center">
      <div className="flex flex-col items-center">
        <PharmaticLogo />
        <h2 className="mb-6 text-2xl font-bold">Inicio de Sesión</h2>
        <Form className="w-3/4 space-y-5" form={form} onValidSubmit={onLogin}>
          <FormInput
            fieldname="username"
            placeholder="usuario"
            label="Nombre de usuario o correo electrónico"
          />
          <FormInput
            type="password"
            fieldname="password"
            placeholder="*****"
            label="Contraseña"
          />
          <div className="flex justify-center">
            <Button type="submit" size="lg">
              {loggingIn ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

function PharmaticLogo() {
  return (
    <img
      src="../../assets/PharmaticLogo.png"
      alt="logo pharmatic"
      className="my-3 h-auto w-64"
    ></img>
  );
}
