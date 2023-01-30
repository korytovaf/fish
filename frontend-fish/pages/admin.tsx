import {FormAddedProduct} from "../components/FormAddedProduct";
import {useAuth} from "../hooks/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Admin() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user?.isAdmin) router.push("/").then(r => r)
  }, [router, user?.isAdmin])

  return (
    <FormAddedProduct />
  )
}
