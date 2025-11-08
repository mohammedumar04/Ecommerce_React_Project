import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { asyncDeleteProduct, asyncUpdateProduct } from "../../store/actions/productActions"
import { nanoid } from "@reduxjs/toolkit"

const ProductDetails = () => {
    const { id } = useParams()
    const products = useSelector((state)=>state.productReducer.products)
    const users = useSelector((state)=>state.userReducer.users)
    const product = products?.find((p) => p.id == id)
    // console.log(product);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            "image": product?.image,
            "title": product?.title,
            "price": product?.price,
            "description": product?.description,
            "category": product?.category,
        }
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const ProductDetailsHandler = (product) => {
        product.id = nanoid()
        // console.log(product);
        dispatch(asyncUpdateProduct(id, product))
        // navigate("/products")
        reset()
    }

    const DeleteHandler = () => {
        dispatch(asyncDeleteProduct(id))
        navigate("/")

    }

    return product ?
        <>
            <div className="p-20">
                <img className="w-[200px]" src={product.image} alt="Not Found!" />
                <h1 className="text-3xl uppercase font-bold ">{product.title}</h1>
                <h2 className="text-2xl text-green-400">₹{product.price}</h2>
                <p>{product.description}</p>
            </div>
            <hr />
            {users && users?.isAdmin && <div className="w-[50%] h-full flex flex-col justify-start">
                <div className="bg-white/10 p-8 rounded mb-10 mt-10">
                    <h1 className="text-3xl font-bold uppercase mb-6 text-center w-[50%]">Update Product</h1>
                    <form onSubmit={handleSubmit(ProductDetailsHandler)} className="flex flex-col">
                        <input className="text-xl border-b outline-0  mb-6 p-1" type="url" {...register("image")} placeholder="image URL" />
                        <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("title")} placeholder="title" />
                        <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("price")} placeholder="0.00)" />
                        <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("category")} placeholder="category" />
                        <textarea className="text-xl border-b outline-0  mb-6 p-1" {...register("description")} placeholder="Description"></textarea>
                        <button className="text-xl px-4 py-2 bg-blue-400 rounded mb-5">Update Product</button>
                    </form>
                        <button onClick={DeleteHandler} className="text-xl px-4 py-2 bg-red-400 rounded">Delete Product</button>

                </div>
            </div>}
        </> : "loading"
}

export default ProductDetails
