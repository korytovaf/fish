import Image from "next/image";
import { card, img_wrapper, img, description, basket_btn, product_name, product_name_description, basket_wrapper, delete_icon } from "../styles/Card.module.css";
import {basket_count} from "../styles/Header.module.css";
import useBasket from "../hooks/useBasket";
import {useCallback, useEffect, useRef, useState} from "react";
import useSWR from "swr";
import {fetcher} from "../helpers/fetcher";
import {
  AlertDialog, AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import useAuth from "../hooks/useAuth";

export default function Card({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const router = useRouter();
  const { data, mutate } = useSWR(process.env.API_URL + "products", fetcher)
  const imageUrl = process.env.API_URL + "images/" + product.images;
  const { addProduct, basketProducts } = useBasket();
  const { user } = useAuth();
  const [basketProductVolume, setBasketProductVolume] = useState(null);

  const addedVolumeProduct = useCallback(() => {
    const filter = basketProducts.filter(i => i._id === product._id)
    if (filter.length > 0) {
      setBasketProductVolume(filter[0].volume)
    }
  }, [basketProducts, product._id])

  useEffect(() => {
    if (basketProducts.length <= 0) return
    addedVolumeProduct();
  }, [addedVolumeProduct, basketProducts])

  const addProductToBasket = () => {
    addProduct(product);
    addedVolumeProduct();
  }

  const deleteProduct = async () => {
    await fetcher(process.env.API_URL + "products/" + product._id, { method: 'DELETE' })
    await mutate(data.filter(i => i._id === product._id))
    onClose()
  }

  return (
    <div className={card}>
      {user.isAdmin && (
        <div className={delete_icon}>
          <IconButton
            onClick={onOpen}
            colorScheme='red'
            aria-label='Удалить продукт'
            icon={<DeleteIcon />}
          />
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Удаление продукта
                </AlertDialogHeader>

                <AlertDialogBody>
                  Уверен? Восстановить продукт не получится.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Отменить
                  </Button>
                  <Button colorScheme='red' onClick={deleteProduct} ml={3}>
                    Удалить
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </div>
      )}

      <div className={img_wrapper} >
        <Image
          className={img}
          src={imageUrl}
          layout="fill"
          objectFit="cover"
          alt={product.name}
        />
      </div>
      <div className={description}>
        <div className={product_name}>{ product.name }</div>
        <div className={product_name_description}>{ product.description }</div>
        <div className={basket_wrapper}>
          <div>
            <strong>от </strong>
            <strong>{ product.price }</strong>
            <strong>{` руб. / ${product.unit}`}</strong>
          </div>

          <Button colorScheme='blue' onClick={addProductToBasket} >
            В корзину
            {/*{basketProductVolume && <div className={basket_count}>{basketProductVolume}</div>}*/}
          </Button>
          {/*<button type="button" onClick={addProductToBasket} className={basket_btn}>*/}
          {/*  В корзину*/}
          {basketProductVolume && <div className={basket_count}>{basketProductVolume}</div>}
          {/*</button>*/}
        </div>
      </div>
    </div>
  )
}

