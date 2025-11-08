import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../store/actions/userActions";
import { Suspense, useEffect, useState } from "react";
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
      <div key={product.id} className="block w-[20vw] h-[62vh] rounded-[7px] overflow-hidden bg-white/10 p-4">
        <img className="w-[16vw] h-[32vh] object-contain mb-2 rounded-[9px] " src={product.image} alt="Not found" />
        <h1 className="text-2xl text-center mb-1 uppercase font-bold">{product.title.slice(0, 50)}</h1>
        <p className="text-2xl text-green-400 text-center mb-1">₹ {product.price}</p>
        <p className="text-xl text-center mb-1">{product.description.slice(0, 2)}... <Link to={`/products/${product.id}`} className="text-blue-500">more info</Link></p>
        <button onClick={() => { addToCartHandler(product) }} className="text-gray-900 bg-white px-4 py-2 rounded ml-20 text-xl">Add to cart</button>
      </div>
    )
  })

  return (
    <InfinateScroll dataLength={products.length}
      next={fetchProducts}
      loader={<h4>Loading...</h4>}
      hasMore = {hasMore}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      
    ><div className="p-10 flex flex-wrap gap-10"><Suspense fallback={<h1>LOADING</h1>}>{renderProducts}</Suspense></div></InfinateScroll>

  )
}

export default Home
