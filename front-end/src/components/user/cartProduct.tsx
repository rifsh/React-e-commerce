import { useContext, useEffect, useState } from "react"
import { NavBarContext } from "./NavBarContext";
import { userService } from "../../services/user-service";
import { IntProductList } from "../../model/interfaces/product-interface";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Bounce, toast } from "react-toastify";


const CartProduct = () => {
    const [products, setProducts] = useState<IntProductList[]>([]);
    let [productCount, setProductCount] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { userId } = useContext(NavBarContext);

    const fetchCart = async () => {
        try {
            const products = await userService.fetchCartProducts(userId);
            setTotalPrice(products.data.datas.totalPrice)
            setProducts(products.data.datas.cartProducts.map((x) => x.productId).flat());

        } catch (error) {
            throw error
        }
    }
    const handleDelete = async (productId: string) => {
        try {
            const resposne = await userService.deleteProductFromCart(productId, userId);
            toast.warning(resposne.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            fetchCart()
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCart()
    }, [userId]);

    const handleIncrement = (productId: string) => {
        setProducts((prev) => {
            console.log(prev.map((x) => { return x._id === productId }));
            return prev
        })
    }
    const handleDecrement = (productId: string) => {
        if (productCount > 0) {
            setProductCount((prev) => prev - 1);
        }
    }

    return (
        <div className="mx-auto mb-10 md:flex-row flex-col flex items-start overflow-hidden rounded-lg -mt-[90px]">
            <div className="flex-1 md:h-screen overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="mb-6 sticky top-0 bg-white px-2 py-3 shadow-md">
                    <h1 className="text-3xl md:text-4xl font-light flex items-center">
                        <div className="w-[2px] h-[40px] bg-gray-400 mr-3"></div>
                        <p>Your Shopping Cart</p>
                    </h1>
                </div>
                {products?.length === 0 && <div className="flex justify-center">
                    <h1 className="text-2xl text-gray-500">Your cart is empty</h1>
                </div>}
                {/* Product-list */}
                {products.length > 0 && <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
                    {products.map((x) => {
                        return (
                            <div className="flex items-center w-full" key={x._id}>
                                <div
                                    className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4 w-full"
                                    key={x._id}
                                >
                                    {/* Image Section */}
                                    <Link to={`/view-product/${x._id}`} className="w-20 h-20 rounded-full overflow-hidden">
                                        <img
                                            src={x.image}
                                            className="w-full h-full object-cover"
                                            alt={x.title}
                                        />
                                    </Link>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <Link to={`/view-product/${x._id}`} className="text-lg font-semibold">{x.title}</Link>
                                        <p className="text-sm text-gray-500">{x.category}</p>
                                        <p className="text-sm text-gray-500">{x.author}</p>
                                    </div>

                                    <div className="flex items-center space-x-4 flex-1 justify-center">
                                        <button
                                            id="decrementBtn"
                                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full w-10 h-10 flex justify-center items-center"
                                            onClick={() => handleDecrement(x._id)}
                                        >
                                            <span className="text-2xl font-bold">-</span>
                                        </button>

                                        <span id="quantity" className="text-lg font-semibold">{productCount}</span>

                                        <button
                                            id="incrementBtn"
                                            className="bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full w-10 h-10 flex justify-center items-center"
                                            onClick={() => handleIncrement(x._id)}
                                        >
                                            <span className="text-2xl font-bold">+</span>
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right flex-1">
                                        <p className="text-xl font-bold text-gray-700">${x.price}</p>
                                    </div>
                                </div>
                                <MdOutlineDeleteOutline onClick={() => handleDelete(x._id)} role="button" className="text-4xl ms-3" />
                            </div>
                        );
                    })}
                </div>}
                <div className="sticky bottom-0 shadow-md shadow-gray-500 bg-white w-full flex items-center justify-between px-2 py-3 text-lg">
                    <Link to={'/all-products'} className="font-bold text-gray-400 flex items-center cursor-pointer">
                        <FaLongArrowAltLeft className="me-3" />
                        <span>Back to shop</span>
                    </Link>
                    {products.length > 0 && <p className="font-semibold text-gray-700 font-mono">Subtotal: <span className="font-extrabold font-mono">{totalPrice} $</span></p>}
                </div>
            </div>
            <div className="ms-3 md:flex-none w-full p-4 md:w-1/3 bg-gray-800 text-white shadow-xl shadow-gray-800 sticky top-0 h-[330px]">
                Cart details
            </div>
        </div >
    )
}

export default CartProduct