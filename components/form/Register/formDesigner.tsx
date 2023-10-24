import ButtonBack from "@/components/ButtonBack";
import Link from "next/link";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";
import styles from "@/styles/form.module.css";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import ModalForm from "@/components/ModalForm";
import ModalFormDesign from "@/components/ModalFormDesign";

export type TypeFormDesignerData = {
  name: string;
  surname: string;
  nationality: string;
  summary: string;
  image: File;
  birthdate: string;
  dateOfDeath: string;
};

export type TypeFormDesignerDataExtended = Omit<
  TypeFormDesignerData,
  "image"
> & {
  image: string;
};

const FormDesignerPage = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenSend, setIsOpenSend] = useState<boolean>(false);
  //   const [infoSent, setInfoSent] = useState<TypeFormDataExtended>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalSend = () => {
    setIsOpenSend(true);
  };

  const closeModalSend = () => {
    setIsOpenSend(false);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeFormDesignerData>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      const selectedFiles = e.target.files;

      // console.log(selectedFiles);

      let image: string = "";

      if (selectedFiles && selectedFiles[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            image = e.target.result as string;
            setPreviewImage(image);
          }
        };
        reader.readAsDataURL(selectedFiles[0]);
      }

      setIsEmpty(false);
    }
  };

  const handleDeleteFiles = () => {
    setPreviewImage("");
    setIsEmpty(true);
  };

  const onSubmit: SubmitHandler<TypeFormDesignerData> = async (data) => {
    console.log("DATOS", data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("nationality", data.nationality);
    formData.append("summary", data.summary);
    formData.append("image", data.image);
    formData.append("birthdate", data.birthdate);
    formData.append("dateOfDeath", data.dateOfDeath);

    console.log(formData.get("name"));
    
    console.log(formData.get("image"));

    try {
      const response = await fetch("http://localhost:4001/api/designer", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        // setInfoSent(responseData.data);
        openModalSend();
        reset();
        console.log("RESPUESTA API OK", responseData);
      } else {
        console.log("ERROR", response.status);
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <>
      <div className={styles.containerForm}>
        <div className={styles.containerLeft}>
          <h2>Registra un nuevo diseño 🪑</h2>
          <Image
            src="/imageForm/formDesign.png"
            alt="image"
            width={450}
            height={450}
            priority
          />
        </div>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerSup}>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                type="text"
                {...register("name", { required: "Debes indicar este campo" })}
              />
              <span>Nombre del diseñador</span>
            </div>

            <div className={styles.inputBox}>
              <input type="surname" {...register("surname")} />
              <span>Apellido del diseñador</span>
            </div>

            <div className={styles.inputBox}>
              <input type="nationality" {...register("nationality")} />
              <span>Nacionalidad</span>
            </div>
          </div>

          <div className={styles.containerLower}>
            <div className={`${styles.inputBox} ${styles.inputSummary}`}>
              <textarea rows={7} cols={50} {...register("summary")} />
              <span>Resumen</span>
            </div>
            <div className={styles.inputImage}>
              <span>Imagen</span>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      type="file"
                      id="image"
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]),
                        console.log("que es esto", e.target.files?.[0])
                        handleFileChange(e)
                      }}
                    />
                    <label
                      htmlFor="image"
                      className={styles.customFileLabel}
                      data-empty={isEmpty}
                    >
                      {isEmpty ? (
                        <p className={styles.beforeImages}>
                          Seleccionar archivo
                        </p>
                      ) : (
                        <p className={styles.afterImages}>
                          Archivo seleccionado
                        </p>
                      )}
                    </label>
                  </>
                )}
              />

              <ModalForm
                previewImage={previewImage}
                isOpen={isOpen}
                closeModal={closeModal}
              />

              {isEmpty === false ? (
                <div className={styles.buttonImages}>
                  <button
                    className={`${styles.buttonModal} ${styles.buttonSend}`}
                    onClick={(event) => {
                      openModal(), event.preventDefault();
                    }}
                  >
                    Vista previa
                  </button>

                  <button
                    className={`${styles.buttonModal} ${styles.buttonDelete}`}
                    onClick={handleDeleteFiles}
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <button className={styles.buttonSendForm} type="submit">
            ENVIAR
          </button>

          {/* <ModalFormDesign
            isOpenSend={isOpenSend}
            closeModalSend={closeModalSend}
            infoSent={infoSent as TypeFormDataExtended}
          /> */}
        </form>
      </div>

      <Link href="/">
        <ButtonBack title="Volver" color="button" />
      </Link>
    </>
  );
};

export default FormDesignerPage;
