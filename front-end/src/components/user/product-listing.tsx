import { useContext, useEffect, useState } from 'react';
import { productService } from '../../services/product-service';
import { IntProductList } from '../../model/interfaces/product-interface';
import { Link } from 'react-router-dom';
import { NavBarContext } from './NavBarContext';

function ProductListing() {
    const [products, setProducts] = useState<IntProductList[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navBarContext = useContext(NavBarContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productService.fetchAllProducts();
                console.log(data);
                setProducts(data.data.datas);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setError('Failed to fetch products');
                setLoading(false)
            }
        }

        const fetchProductCategory = async () => {
            setLoading(true)
            try {
                const products = await productService.fetchProductByCategories(navBarContext.data);
                setProducts(products.data.datas);
                
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        if (navBarContext.data.length > 0) {
            fetchProductCategory()
        } else {
            fetchData()
        }

    }, [navBarContext.data])
    if (loading) {
        return (
            <div>
                <h1 className='text-5xl text-gray-400 font-mono font-bold'>Loading ...</h1>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1 className='text-5xl text-gray-400 font-mono font-bold'>{error}</h1>
            </div>
        )
    }

    return (

        <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3  w-full">
            {products?.map((x) => {
                return (
                    <div className="card-main h-[500px] max-w-[310px] shadow-lg rounded-md overflow-hidden" key={x._id}>
                        <div className="img h-[400px] overflow-hidden">
                            <Link to={`/view-product/${x._id}`}>
                                <img
                                    src={x.image}
                                    alt={x.title || 'Book'}
                                    className="h-full w-full object-cover hover:scale-105 transition-all"
                                />
                            </Link>
                        </div>
                        <div className='mt-3 flex items-center justify-between px-2'>
                            <div>
                                <h1 className='text-lg font-medium font-serif '>{x.title}</h1>
                                <p>—{x.author} </p>
                            </div>
                            <div className='text-end'>
                                <p className='font-mono'>{x.price} </p>
                                <button className='border border-black py-1 px-1 rounded-md font-bold'>Add to cart</button>
                            </div>
                        </div>
                    </div>

                );
            })}
        </div>

    )
}

export default ProductListing