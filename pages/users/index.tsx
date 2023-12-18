import Layout from "@/components/Layout";
import { useState, useEffect, ChangeEvent } from "react";
import { TypeUser } from "@/types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";
import ButtonSelect from "@/components/ButtonSelect";
import { useRouter } from "next/router";
import BoxContent from "@/components/BoxContent";
import styles from "@/styles/pages/users/indexUsers.module.css";

const UserPage = () => {
  const [openUser, setOpenUser] = useState<TypeUser>();
  const [previewAvatar, setPreviewAvatar] = useState<string>();

  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeUser>();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFile = e.target.files;

      let image: string = "";

      if (selectedFile && selectedFile[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            image = e.target.result as string;
            setPreviewAvatar(image);
          }
        };
        reader.readAsDataURL(selectedFile[0]);
      }
    }
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userAvatar = localStorage.getItem("user");
      if (userAvatar !== null) {
        const parseUser = JSON.parse(userAvatar);
        setOpenUser(parseUser.data);
      }
    } else {
      console.error("Todavía no se ha iniciado sesión");
    }
  }, []);

  const signOff = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  return (
    <Layout
      title="Page Registered User"
      titlePage="Bienvenid@ a la información de usuarios"
      description="Página principal de usuarios"
      image="/silla.png"
    >
      <div className={styles.containerUserBox}>
        <BoxContent title="Datos">
          <div className={styles.userBox}>
            <div className={styles.containerUser}>
              <Image
                src={
                  openUser?.avatar !== undefined
                    ? openUser.avatar
                    : "/logo-cat.png"
                }
                alt="Avatar image"
                width={80}
                height={80}
                priority
                style={{
                  border: "2px solid #68bb6c",
                  borderRadius: "50%",
                  backgroundColor: "#68bb6c",
                  objectFit: "cover",
                }}
              />
              <div>
                <h3>
                  Nombre: <span>{openUser?.name}</span>
                </h3>
                <h3>
                  email: <span>{openUser?.email}</span>
                </h3>
              </div>
            </div>

            <div>
              <h3>Modificar avatar:</h3>
              <br />
              <div className={styles.updateAvatar}>
                <Controller
                  name="avatar"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]),
                          handleAvatarChange(e);
                      }}
                    />
                  )}
                />

                {previewAvatar && (
                  <div>
                    <p>Vista previa:</p>
                    <Image
                      src={previewAvatar}
                      alt="New avatar image"
                      width={80}
                      height={80}
                      priority
                      style={{
                        border: "2px solid #68bb6c",
                        borderRadius: "50%",
                        backgroundColor: "#68bb6c",
                        objectFit: "cover",
                      }}
                    />
                    <ButtonSelect
                      title="Actualizar"
                      type="submit"
                      selectClass="buttonRun"
                      selectSecondClass="buttonSend"
                    />
                  </div>
                )}
              </div>
            </div>

            <ButtonSelect
              title="Cerrar sesión"
              functionElement={signOff}
              selectClass="buttonRun"
              selectSecondClass="buttonDelete"
            />
          </div>
        </BoxContent>
      </div>

      <div>
        <h3>Aquí van los usuarios registrados</h3>
      </div>
    </Layout>
  );
};

export default UserPage;