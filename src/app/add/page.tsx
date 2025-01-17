"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
  title:string,
  desc:string,
  price:number,
  catSlug:string
}

type Option = {
  title: string,
  additionalPrice: number,
}

const AddPage = () => {
  const {data:session, status} = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title:"",
    desc:"",
    price:0,
    catSlug:""
  });

  const [option, setOption] = useState<Option>({
    title:"",
    additionalPrice:0,
  })

  const [options, setOptions] = useState<Option[]>([])
  const [file, setFile] = useState<File>();

  const router = useRouter();

  if(status === "loading"){
    return <p>Loading...</p>
  }

  if(status === "unauthenticated" || !session?.user.isAdmin){
    router.push("/");
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    setInputs((prev) => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const changeOption = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setOption((prev) => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleChangeImage = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const item = (target.files as FileList)[0]
    setFile(item);
  }

  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = await upload();
      const res = await fetch("http://localhost:3000/api/products",{
        method:"POST",
        headers:{"Content-Type":"multipart/form-data"},
        body:JSON.stringify({
          img:url,
          ...inputs,
          options
        })
      });

      const data = await res.json();
      router.push(`/product/${data.id}`)

    } catch (error) {
      console.log(error);
    }
  }

  const upload = async () => {
    const data = new FormData();
    data.append("file",file!)
    data.append("upload_preset","restaurant")
    const res = await fetch("https://api.cloudinary.com/v1_1/ddkdubvjj/image/upload",{
      method:"POST",
      body:data
    });
    const resData = await res.json();
    return resData.url;
  }

  return (
    <div>
      <form className="shadow-lg flex flex-wrap gap-4 p-8" onSubmit={handleSubmit}>
        <h1 className="font-bold text-4xl mb-2 text-gray-300">Add New Product</h1>
        <div className="w-full flex flex-col gap-2 ">
          <label>Title</label>
          <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text" name="title"/>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label>Image</label>
          <input className="ring-1 ring-red-200 p-2 rounded-sm" type="file" id="file" onChange={handleChangeImage}/>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label>Description</label>
          <textarea onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" name="desc"/>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label>Price</label>
          <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="number" name="price"/>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          {/* Must Be Same with Category List */}
          <label>Category</label>
          <input onChange={handleChange} className="ring-1 ring-red-200 p-2 rounded-sm" type="text" name="catSlug"/>
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label>Options</label>
          <div>
            <input onChange={changeOption} className="ring-1 ring-red-200 p-2 rounded-sm" type="text" placeholder="Title" name="title"/>
            <input onChange={changeOption} className="ring-1 ring-red-200 p-2 rounded-sm" type="number" placeholder="Additional Price" name="additionalPrice"/>
          </div>
          <div className="w-52 bg-red-500 text-white p-2" onClick={()=>setOptions((prev) => [...prev,option])}>Add Option</div>
        </div>
        <div>
          {options.map((item) => (
            <div className="ring-1 p-2 ring-red-500 rounded-md cursor-pointer" key={item.title} onClick={()=>setOptions(options.filter(opt => opt.title !== item.title))}>
              <span>{item.title}</span>
              <span>${item.additionalPrice}</span>
            </div>
          ))}
        </div>
        <button type="submit" className="p-4 w-48 bg-red-500 text-white rounded-md relative h-14 flex items-center justify-center" >Submit</button>
      </form>
    </div>
  )
}

export default AddPage
