import { button, hidden } from "../styles/InputFileUi.module.css"
import Image from "next/image";
import spinner from "../public/icons/spinner.svg";

export default function InputFile({
  isload,
  refFile,
  accept = "image/*,.png,.jpg,.gif,.webp",
  handlerUploadFile
}) {

  const handlePick = (e) => {
    e.preventDefault()
    refFile.current.click()
  }

  return (
    <div>
      <button className={button} onClick={handlePick}>
        {isload
          ? <Image src={spinner} height={40} width={40} alt="loading..." />
          : <span>Загрузить изображение</span>
        }
      </button>
      <input
        className={hidden}
        ref={refFile}
        type="file"
        onChange={handlerUploadFile}
        accept={accept}
      />
    </div>
  )
}
