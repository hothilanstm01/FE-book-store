import React, { useEffect, useState } from 'react'
import prouctApi from '../../../../../api/productApi'
import ItemProduct from '../../ListProduct/Components/ItemProduct'
const ListNew = () => {
    const [productNew, setProductNew] = useState([])
    useEffect(() => {
        const filter =  {
            createdAt:""
        }
        const fetchProductHot = async (filter) =>{

            const res = await prouctApi.GetProducts(filter);
            setProductNew(res.data);
        }

        fetchProductHot(filter)
    }, [])

    const data = productNew.slice(0,5);
    console.log(data);
    return (
        <div className="List-product">
            <ItemProduct data={data}/>
        
        </div>
    )
}

export default ListNew
