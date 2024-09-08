"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({id}:{id:string}) => {
  const {data:session, status} = useSession();
  const router = useRouter();

  if(status === "loading"){
    return <p>Loading...</p>
  }

  if(status === "unauthenticated" || !session?.user.isAdmin){
    return;
  }

  const handleDelete = async() => {
    const res = await fetch(`http://localhost:3000/api/products/${id}`,{
        method:"DELETE"
    });

    if(res.status === 200){
        router.push("/menu")
        toast("The Product has been deleted")
    }else {
        const data = await res.json()
        toast.error(data.message);
    }
  }

  return (
    <button className="bg-red-400 p-2 rounded-full top-4 right-4 absolute" onClick={handleDelete}>
        <Image src={"/close.png"} alt="" width={20} height={20} className="bg-white rounded-full" />
    </button>
  )
}

export default DeleteButton
