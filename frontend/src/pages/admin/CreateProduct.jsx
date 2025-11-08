import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {nanoid} from "nanoid"
import {useDispatch} from "react-redux"
import { asyncCreateProduct } from "../../store/actions/productActions"



const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const CreateProductHandler = (product) => {
    product.id = nanoid()
    // console.log(product);
    navigate("/")
    dispatch(asyncCreateProduct(product))
    reset()
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="bg-white/10 p-8 rounded">
        <h1 className="text-3xl font-bold uppercase mb-6 text-center">Create Product</h1>
        <form onSubmit={handleSubmit(CreateProductHandler)}  className="flex flex-col">
          <input className="text-xl border-b outline-0  mb-6 p-1" type="url" {...register("image")} placeholder="image URL" />
          <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("title")} placeholder="title" />
          <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("price")} placeholder="0.00)" />
          <input className="text-xl border-b outline-0  mb-6 p-1" type="text" {...register("category")} placeholder ="category" />
          <textarea className="text-xl border-b outline-0  mb-6 p-1" {...register("description")} placeholder="Description"></textarea>
          <button className="text-xl px-4 py-2 bg-blue-400 rounded">Create</button>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct
