import React, { useEffect, useState } from 'react'
import { InterfaceViewProductProps } from '../../model/interfaces/props-interface'
import { productService } from '../../services/product-service'
import { IntProductList } from '../../model/interfaces/product-interface'
import { FaCartShopping } from 'react-icons/fa6'
import ProductListing from './product-listing'
import ProductViewingSkeleton from '../skeletons/product-viewing'

const ViewProduct: React.FC<InterfaceViewProductProps> = ({ productId }) => {
    const [product, setProduct] = useState<IntProductList>();

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const data = await productService.fetchProductById(productId.id);
                setProduct(data.data.datas);

            } catch (error) {

            }
        }

        fetchProductById()
    }, [productId])

    return (
        <div className="w-full min-h-screen bg-gray-100 p-5 flex flex-col">
            {!product && <ProductViewingSkeleton />}
            {product && (
                <div className="flex flex-col lg:flex-row h-full items-center justify-center lg:space-x-10 space-y-10 lg:space-y-0">
                    {/* Product Image */}
                    <div className="flex-1 max-w-[390px] h-[500px] w-full flex items-center justify-center overflow-hidden rounded-lg shadow-lg">
                        <img
                            className="h-full w-full object-cover"
                            src={product.image}
                            alt={product.title}
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 w-full px-5 lg:px-10 py-10 lg:py-0 flex flex-col justify-between space-y-6 lg:space-y-8">
                        {/* Title and Category */}
                        <div className="space-y-2">
                            <h1 className="text-3xl lg:text-5xl text-gray-800 font-semibold">
                                {product.title}
                            </h1>
                            <small className="text-md lg:text-lg text-gray-500 font-light">
                                ({product.category})
                            </small>
                        </div>

                        {/* Description */}
                        <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Price */}
                        <p className="text-2xl font-sans lg:text-3xl text-gray-700 font-bold">
                            {product.price} ₹
                        </p>

                        {/* Add to Cart Button */}
                        <div>
                            <button
                                style={{ wordSpacing: "0.2rem", letterSpacing: "0.1rem" }}
                                className="bg-orange-600 py-3 px-6 rounded-full text-white flex items-center justify-center transition-all hover:bg-orange-500 focus:ring-4 focus:ring-orange-300"
                            >
                                <FaCartShopping className="text-xl mr-2" />
                                <span className="font-sans font-medium">Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className='mt-14'>
                <h1 className='text-6xl font-sans my-3'>Related products</h1>
                {product && <ProductListing value='related' cateogry={product.category} id={product._id} />}
            </div>
        </div>

    )
}

export default ViewProduct