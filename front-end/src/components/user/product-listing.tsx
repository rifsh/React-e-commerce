import { useEffect, useState } from 'react';
import { productService } from '../../services/product-service';
import { IntProductList } from '../../model/interfaces/product-interface';


function ProductListing() {
    const [products, setProducts] = useState<IntProductList[]>();

    useEffect(() => {
        const fetchData = async () => {
            const data = await productService.fetchAllProducts();
            setProducts(data.data.datas);
        }

        fetchData()
    }, [])

    return (
        <div className="px-3 py-2 flex items-center justify-center">
            <div className="main grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {products?.map((x) => {
                    return (
                        <div className="card-main max-w-[300px] shadow-lg rounded-md overflow-hidden" key={x._id}>
                            <div className="img h-[390px] overflow-hidden">
                                <img
                                    src={x.image}
                                    alt={x.title || 'Book'}
                                    className="h-full w-full object-cover hover:scale-110 transition-all"
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
                    );
                })}
            </div>
        </div>

    )
}

export default ProductListing