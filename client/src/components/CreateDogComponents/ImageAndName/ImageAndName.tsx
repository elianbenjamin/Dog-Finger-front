import { useAppContext } from "../../../hooks/contextHooks";
import style from "./imageAndName.module.scss";

interface Props {
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteImage: () => void;
}

const ImageAndName = ({
  handleNameChange,
  handleFileChange,
  handleDrop,
  deleteImage,
}: Props) => {
  const { createdDog } = useAppContext();

  return (
    <div className={style.ImageAndName}>
      <section className={style.nameSection}>
        <h3>Nombre</h3>
        <div>
          <input onChange={handleNameChange} value={createdDog.name} />
        </div>
      </section>

      <section className={style.imageSection}>
        <div
          className={style.imageContainer}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            name="img"
            id="image-input"
            onChange={handleFileChange}
          />

          <p>Selecciona una imagen o arrastra hasta aquí</p>

          {createdDog.img && (
            <>
              <img
                className={style.img}
                src={
                  typeof createdDog.img === "string"
                    ? createdDog.img
                    : URL.createObjectURL(createdDog.img)
                }
              />
              <img
                className={style.blurImg}
                src={
                  typeof createdDog.img === "string"
                    ? createdDog.img
                    : URL.createObjectURL(createdDog.img)
                }
              />
            </>
          )}
        </div>

        {!createdDog.img ? (
          <label className={style.btn} htmlFor="image-input">
            Seleccionar imagen
          </label>
        ) : (
          <button className={style.btn} onClick={deleteImage}>
            Eliminar imagen
          </button>
        )}
      </section>
    </div>
  );
};

export default ImageAndName;
