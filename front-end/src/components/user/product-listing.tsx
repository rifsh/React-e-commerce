import { useEffect, useState } from 'react';
import { productService } from '../../services/product-service';
import { IntProductList } from '../../model/interfaces/product-interface';
import { Link } from 'react-router-dom';


function ProductListing() {
    const [products, setProducts] = useState<IntProductList[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await productService.fetchAllProducts();
                setProducts(data.data.datas);
                setLoading(false)
            } catch (error) {
                console.log(error);

                setError('Failed to fetch products');
                setLoading(false)

            }
        }

        fetchData()
    }, [])
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

        <div className="main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products?.map((x) => {
                return (
                    <Link to={`/view-product/${x._id}`} key={x._id}>
                        <div className="card-main max-w-[300px] shadow-lg rounded-md overflow-hidden">
                            <div className="img h-[390px] overflow-hidden">
                                <img
                                    src={x.image}
                                    alt={x.title || 'Book'}
                                    className="h-full w-full object-cover hover:scale-105 transition-all"
                                />
                            </div>
                            <div className='mt-3 flex items-center justify-between px-2'>
                                <div>
                                    <h1 className='text-lg font-medium font-serif '>{x.title}</h1>
                                    <p>—{x.author} </p>
                                </div>
                                <div>
                                    <p>{x.price} </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>

    )
}

export default ProductListing