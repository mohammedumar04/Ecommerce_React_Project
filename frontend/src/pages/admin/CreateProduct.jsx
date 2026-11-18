import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"
import { useDispatch } from "react-redux"
import { asyncCreateProduct } from "../../store/actions/productActions"

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"

const CreateProduct = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const CreateProductHandler = (product) => {
    product.id = nanoid()
    navigate("/")
    dispatch(asyncCreateProduct(product))
    reset()
  }

  return (
    <section className="mx-auto max-w-2xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Store management
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Add a product
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Add the details customers need to discover your new item.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(CreateProductHandler)}
        className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
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
        <button className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:w-auto">
          Create product
        </button>
      </form>
    </section>
  )
}

export default CreateProduct
