import FormAddedProduct from "../components/FormAddedProduct";
import useAuth from "../hooks/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();
  console.log(user.isAdmin)

  useEffect(() => {
    if (!user.isAdmin) router.push("/")
  }, [router, user.isAdmin])

  if (!user.isAdmin) return <div>Загрузка...</div>

  return (
    <FormAddedProduct />
  )
}
