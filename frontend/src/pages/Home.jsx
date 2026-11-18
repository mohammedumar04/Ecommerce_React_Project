import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";
import { useEffect, useState } from "react";
import axios from '../api/axiosconfig'
import InfinateScroll from 'react-infinite-scroll-component'

const Home = () => {
  const dispatch = useDispatch()
  // const products = useSelector((state) => state.productReducer.products)
  const users = useSelector((state) => state.userReducer.users)
  const [products, setproducts] = useState([])
  const [hasMore, sethasMore] = useState(true)
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/products?_limit=8&_start=${products.length}`)
      if(data.length == 0){
        sethasMore(false)
      } else {
        sethasMore(true)
        // setproducts(data) // it rewrites the past date by new data ,even we can write like this setproducts([...products,...data]) even this can miss little data in between
        setproducts((prev) => [...prev, ...data]) //==> best way to achieve what we need ,like leaving past data as same and adding more to it.

      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const addToCartHandler = (product) => {
    const copyuser = { ...users, cart: [...users.cart] }
    const x = copyuser.cart.findIndex((c) => c?.product?.id == product.id)
    // console.log(x);
    if (x == -1) {
      copyuser.cart.push({ product, quantity: 1 })
    } else {
      copyuser.cart[x] = {
        product,
        quantity: copyuser.cart[x].quantity + 1,
      }
    }
    dispatch(asyncUpdateUser(copyuser.id, copyuser))
  }

  const renderProducts = products.map((product) => {
    return (
      <article
        key={product.id}
        className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-lg hover:shadow-slate-200/60"
      >
        <Link
          to={`/products/${product.id}`}
          className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-6"
        >
          <img
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            src={product.image}
            alt={product.title}
          />
        </Link>
        <div className="flex flex-1 flex-col pt-4">
          <h2 className="line-clamp-2 min-h-12 text-sm font-medium leading-6 text-slate-800">
            {product.title}
          </h2>
          <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
            ₹ {product.price}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500">
            {product.description}
          </p>
          <div className="mt-auto flex items-center gap-3 pt-5">
            <button
              onClick={() => addToCartHandler(product)}
              className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Add to cart
            </button>
            <Link
              to={`/products/${product.id}`}
              className="text-sm font-medium text-slate-500 transition-colors hover:text-indigo-700"
            >
              Details
            </Link>
          </div>
        </div>
      </article>
    )
  })

  return (
    <section>
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Curated for you
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Find your next favorite.
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Thoughtful picks, everyday essentials, and a little something special.
        </p>
      </div>
      <InfinateScroll
        dataLength={products.length}
        next={fetchProducts}
        loader={
          <p className="py-8 text-center text-sm text-slate-500">
            Loading more products...
          </p>
        }
        hasMore={hasMore}
        endMessage={
          <p className="py-8 text-center text-sm text-slate-500">
            You&apos;ve seen everything.
          </p>
        }
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {renderProducts}
        </div>
      </InfinateScroll>
    </section>
  )
}

export default Home
