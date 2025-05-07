'use client'

import React from 'react'
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props{
    initialQuantity: number;
    onQuantityChange: ( quantity: number) => void;
    maxQuantity?: number;
}

export const QuantitySelector = ({ initialQuantity, onQuantityChange, maxQuantity }: Props) => {


    const onValueChange = (value: number) => {
        if(initialQuantity + value < 1) return
        
        if(maxQuantity){
            if(initialQuantity + value > maxQuantity) return
        }
        onQuantityChange(initialQuantity + value)
    }

  return (
    <div className='flex'>
        <button onClick={() => onValueChange(-1)}>
            <IoRemoveCircleOutline size={30}/>
        </button>

        <span className='w-20 mx-3 px-5 py-1 bg-gray-200 text-center rounded-md'> 
            {initialQuantity} 
        </span>

        <button onClick={() => onValueChange(1)}>
            <IoAddCircleOutline size={30}/>
        </button>
    </div>
  )
}
