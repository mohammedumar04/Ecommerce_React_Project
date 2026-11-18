import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { asyncDeleteProduct, asyncUpdateProduct } from "../../store/actions/productActions"
import { nanoid } from "@reduxjs/toolkit"

const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"

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

    return product ? (
        <section className="space-y-10">
            <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:grid-cols-2 lg:items-center">
                <div className="flex aspect-square items-center justify-center rounded-2xl bg-slate-50 p-8">
                    <img
                        className="max-h-full max-w-full object-contain"
                        src={product.image}
                        alt={product.title}
                    />
                </div>
                <div className="py-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        {product.category}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                        {product.title}
                    </h1>
                    <p className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                        ₹ {product.price}
                    </p>
                    <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                        {product.description}
                    </p>
                </div>
            </div>
            {users?.isAdmin && (
                <div className="max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        Store management
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                        Edit product
                    </h2>
                    <form onSubmit={handleSubmit(ProductDetailsHandler)} className="mt-6 space-y-5">
                        <label className="block space-y-2 text-sm font-medium text-slate-700">
                            Image URL
                            <input className={inputClass} type="url" {...register("image")} placeholder="https://..." />
                        </label>
                        <label className="block space-y-2 text-sm font-medium text-slate-700">
                            Product name
                            <input className={inputClass} type="text" {...register("title")} placeholder="Product title" />
                        </label>
                        <div className="grid gap-5 sm:grid-cols-2">
                            <label className="block space-y-2 text-sm font-medium text-slate-700">
                                Price
                                <input className={inputClass} type="number" step="0.01" {...register("price")} placeholder="0.00" />
                            </label>
                            <label className="block space-y-2 text-sm font-medium text-slate-700">
                                Category
                                <input className={inputClass} type="text" {...register("category")} placeholder="Category" />
                            </label>
                        </div>
                        <label className="block space-y-2 text-sm font-medium text-slate-700">
                            Description
                            <textarea
                                className={`${inputClass} min-h-32 resize-y`}
                                {...register("description")}
                                placeholder="Describe this product"
                            />
                        </label>
                        <div className="flex flex-wrap gap-3">
                            <button className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                                Save changes
                            </button>
                            <button
                                type="button"
                                onClick={DeleteHandler}
                                className="rounded-full border border-rose-200 px-5 py-3 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50"
                            >
                                Delete product
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    ) : (
        <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500">
            Loading product...
        </div>
    )
}

export default ProductDetails
