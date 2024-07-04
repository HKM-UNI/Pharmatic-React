import { Form } from "@/components/custom_form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { fetchImageAsObjectUrl } from "@/helpers";
import {
  useCreateUser,
  useUserData,
  useUpdateUser,
  useUpdateUserPermissions,
  useUpdateUserImage,
  useInitialFormOptions,
} from "@/hooks/user_hooks";
import DynamicPanel from "@/shared/DynamicPanel";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  userFormDefaults,
  userFormSchema,
  userFormEditSchema,
} from "./UserFormSchema";
import UserFormMain from "./UserFormMain";
import UserFormPermissions from "./UserFormPermissions";
// import UserFormPermissions from "./UserFormPermissions";

export function UserForm({ edit = false }) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { username } = useParams();

  /* Ya que "productId" puede ser "undefined" o "null",
      "producData" también puede ser "undefined" o "null"
      y debe ser validado en cualquier parte.
  */
  const [userData, errorOnUserData] = useUserData(username);

  // Opciones iniciales para los LazyFormComboBox
  const initialOpts = useInitialFormOptions(userData);

  const [updateUser, isUpdating] = useUpdateUser();
  const [updateUserPermissions, isUpdatingPermissions] =
    useUpdateUserPermissions();
  const [createUser, isCreating] = useCreateUser();
  const [updateUserImage, isUpdatingImage] = useUpdateUserImage();

  const manualRoleChange = useRef(false);

  // Esta es la ruta que se usara en la imagen
  // En modo edicion se cambia a una ruta "ObjectUrl" que corresponde a la del producto.
  const [defaultImageSrc, setDefaultImageSrc] = useState("/user_default.png");

  const form = useForm({
    resolver: yupResolver(edit ? userFormEditSchema : userFormSchema),
    defaultValues: userFormDefaults,
  });

  useEffect(() => {
    if (errorOnUserData) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo obtener los datos del usuario",
      });
    }
  }, [errorOnUserData]);

  useEffect(() => {
    if (edit && userData) {
      // Si esta en modo edicion y se recuperaron correctamente los datos del producto
      // Actualiza los valores del formulario
      updateUserForm(userData);
    }
  }, [userData]);

  /** @param {User} u */
  function updateUserForm(u) {
    /*
      "formData" contendrá los valores transformados para coincidir con el esquema.
      Por ejemplo, "expirationDate" viene en formato string, pero hay que pasarlo a Date
        o los precios que tambien estan en string, pero hay que pasarlos a numeros.
      El esquema tampoco tiene datos anidados, entonces tambien necesitan mappping.
    */
    const formData = {
      username: u.username,
      email: u.email,
      password: null,
      pharmacistCode: u.pharmacistCode,
      phone: u.phone,
      roleId: u.role?.id,
      permissions: null,
      imageFile: null,
    };

    if (u.imageUrl) {
      updateFormImage(u.imageUrl);
    }

    manualRoleChange.current = true;  
    form.reset(formData);
  }

  function updateFormImage(url) {
    fetchImageAsObjectUrl(url).then((objUrl) => setDefaultImageSrc(objUrl));
  }

  // Vuelve a procesar los datos para coincidir con los de backend.
  function preProcess(data) {}

  async function handleSubmit(data) {
    preProcess(data);
    let user = { username: "" };

    if (edit) {
      /* Aunque sean datos directos de "formData",
          ya se incluye el username necesario
      */
      user = await updateUser(data);
    } else {
      user = await createUser(data);
    }

    if (data.permissions?.length > 1) {
      const patched = data.permissions.map((p) => ({ ...p, id: p.scope_id }));

      await updateUserPermissions({
        username: user.username,
        permissions: patched,
      });
    }

    if (data.imageFile) {
      await updateUserImage({
        username: user.username,
        image: data.imageFile,
      });
    }

    navigate("/usuarios");
  }

  function handleCancellation() {
    navigate("/usuarios");
  }

  const buttonSubmitContent = () => {
    if (isUpdating || isCreating || isUpdatingImage || isUpdatingPermissions) {
      return <Loader2 className="animate-spin"></Loader2>;
    }
    return edit ? "Guardar" : "Confirmar";
  };

  return (
    <DynamicPanel
      leftActions={
        <>
          <h2 className="text-lg font-bold">
            {edit ? "Editar" : "Nuevo"} Usuario
          </h2>
        </>
      }
      rightActions={
        <>
          <Button variant="destructive" onClick={handleCancellation}>
            Cancelar
          </Button>
          <Button form="product-form" type="submit">
            {buttonSubmitContent()}
          </Button>
        </>
      }
    >
      <Form
        id="product-form"
        form={form}
        onValidSubmit={handleSubmit}
        className="h-full px-10 py-5"
      >
        <Tabs defaultValue="main">
          <TabsList className="mx-auto grid w-1/3 grid-cols-2">
            <TabsTrigger value="main">Principal</TabsTrigger>
            <TabsTrigger value="permissions">Permisos</TabsTrigger>
          </TabsList>
          <TabsContent value="main">
            <UserFormMain edit={edit} defaultImgSrc={defaultImageSrc} />
          </TabsContent>
          <TabsContent value="permissions">
            <UserFormPermissions
              manualRoleChange={manualRoleChange.current}
              restoreSpec={() => manualRoleChange.current = false}
              userId={userData?.id}
              initialOptions={initialOpts}
            />
          </TabsContent>
        </Tabs>
      </Form>
    </DynamicPanel>
  );
}
