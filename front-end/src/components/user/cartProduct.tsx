import { useContext, useEffect, useState } from "react"
import { NavBarContext } from "./NavBarContext";
import { userService } from "../../services/user-service";
import { IntProductList } from "../../model/interfaces/product-interface";


const CartProduct = () => {
    const [products, setProducts] = useState<IntProductList[]>([]);
    const { userId } = useContext(NavBarContext);

    const fetchCart = async () => {
        try {
            const products = await userService.fetchCartProducts(userId);
            console.log(products.data.datas.totalPrice);
            setProducts(products.data.datas.products);

        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    return (
        <div className="mx-auto flex items-start">
            <div className="w-full">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl font-light flex items-center">
                        <div className="w-[2px] h-[40px] bg-gray-400 mr-3"></div>
                        <p>Your Shopping Cart</p>
                    </h1>
                </div>

                {/* Product-list */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1">
                    {products.map((x) => {
                        return (
                            <div
                                className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center space-x-4"
                                key={x._id}
                            >
                                {/* Image Section */}
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img
                                        src={x.image}
                                        className="w-full h-full object-cover"
                                        alt={x.title}
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <p className="text-lg font-semibold">{x.title}</p>
                                    <p className="text-sm text-gray-500">{x.category}</p>
                                    <p className="text-sm text-gray-500">{x.author}</p>
                                </div>

                                {/* Price */}
                                <div className="text-right">
                                    <p className="text-xl font-bold text-gray-700">${x.price}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="">
                sssss
            </div>
        </div>
    )
}

export default CartProduct