import Image from "next/image";
import { card, img_wrapper, img, description } from "../styles/Card.module.css";

export default function Card({ product }) {
  const imageUrl = process.env.API_URL + "images/" + product.images

  return (
    <div className={card}>
      <div className={img_wrapper}>
        <Image
          className={img}
          src={imageUrl}
          layout="responsive"
          width={700}
          height={475}
          alt={product.name}
        />
      </div>
      <div className={description}>
        <div>{ product.name }</div>
        <div>
          <strong>{ product.price }</strong>
          <strong> руб.</strong>
        </div>
      </div>
    </div>
  )
}

