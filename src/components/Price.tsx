"use client"
import { ProductType } from '@/app/types/types';
import { useCartStore } from '@/app/utils/store';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

type Props = {
  price: number;
  id: string;
  options?:{title:string; additionalPrice:number;}[]
}

const Price = ({product}:{product:ProductType}) => {
  const [total, setTotal] = useState(product?.price)
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);
  const {addToCart} = useCartStore();

  useEffect(()=> {
    if(product?.options?.length){
      setTotal(quantity * product.price + product.options[selected].additionalPrice)
    }
  },[quantity, selected, product]);

  const handleCart = () => {
    addToCart({id:product.id, title:product.title, img: product.img, price:total, ...(product.options?.length && {optionTitle: product.options[selected].title}) , quantity:quantity})
    toast.success("Item Has been Added to The Cart")
  }

  useEffect(()=>{
    useCartStore.persist.rehydrate();
  },[])

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-2xl font-bold'>${total}</h2>
      {/* OPTIONS CONTAINER */}
      <div className='flex gap-4'>
        {
          product?.options?.length && product.options?.map((option, index) => (<button key={option.title} className='min-w-[6rem] p-2 ring-1 ring-red-500 rounded-md' style={{background: selected === index ? "rgb(248 113 113)" : "white", color: selected === index ? "white": "red"}} onClick={()=>setSelected(index)}>{option.title}</button>))
        }
      </div>
      {/* QUANTITY AND ADD BUTTON CONTAINER */}
      <div className='flex items-center justify-between'>
        {/* QUANTITY */}
        <div className='flex justify-between w-full p-3 ring-1 ring-red-500'>
          <span>Quantity</span>
          <div className='flex gap-4 items-center'>
            <button onClick={()=> setQuantity((prev) => prev > 1 ? prev - 1 : 1)}>{'<'}</button>
            <span>{quantity}</span>
            <button onClick={()=> setQuantity((prev) => prev < 9 ? prev + 1 : 9)}>{'>'}</button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500 rounded-r-md' onClick={handleCart}>Add To Cart</button>
      </div>
    </div>
  )
}

export default Price
