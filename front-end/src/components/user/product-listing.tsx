import { ReactElement, useContext, useEffect, useState } from 'react';
import { productService } from '../../services/product-service';
import { IntProductList } from '../../model/interfaces/product-interface';
import { Link } from 'react-router-dom';
import { NavBarContext } from './NavBarContext';
import ProductListingSkeleton from '../skeletons/product-listing';
import { InterfaceProductListProps } from '../../model/interfaces/props-interface';
import { Pagination } from '@mui/material';

function ProductListing({ value, cateogry, id }: InterfaceProductListProps): ReactElement {
    const [products, setProducts] = useState<IntProductList[]>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchNotFound, setSearchNotFound] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const navBarContext = useContext(NavBarContext);

    const fetchData = async () => {
        try {
            const data = await productService.fetchProductsByPagination(page);
            setTotalPage(data.data.totalPages)
            setProducts(data.data.products);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setError('Failed to fetch products');
            setLoading(false)
        }
    }
    const fetchrelatedProducts = async (category: string) => {
        setLoading(true);

        try {
            const products = await productService.fetchProductByCategories(category ? category : navBarContext.data);
            if (products.data.datas.length === 0) { setError('No Book found') };
            setProducts(products.data.datas.filter((x) => { return x._id !== id }));
            setLoading(false);
        } catch (error) {
            setError('No Book found');
            setLoading(false);
        }
    }
    const fetchProductCategory = async (category?: string) => {
        setLoading(true);

        try {
            const products = await productService.fetchProductByCategories(category ? category : navBarContext.data);
            if (products.data.datas.length === 0) { setError('No Book found') };

            setProducts(products.data.datas);
            setLoading(false);
        } catch (error) {
            setError('No Book found');
            setLoading(false);
        }
    }
    const SearchedProducts = async () => {
        setLoading(true);

        try {
            const products = await productService.fetchProductBySearchKey(navBarContext.searchValue);
            if (!products.data.datas.length) {
                setLoading(false);
                setSearchNotFound(`Book ${navBarContext.searchValue} is not found`);
            } else {
                setLoading(false);
                setSearchNotFound(null);
                setProducts(products.data.datas)
            }
        } catch (error) {
            console.log(error);
            setError('No Book found');
        }
    }
    useEffect(() => {

        if (value === 'related') {
            fetchrelatedProducts(cateogry)
        } else {
            if (navBarContext.data.length > 0 && navBarContext.data !== 'all books') {
                fetchProductCategory()
            } else if (navBarContext.searchValue) {
                SearchedProducts()
            }
            else {
                fetchData()
            }
        }

    }, [navBarContext.data, navBarContext.searchValue, id, page]);

    const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
        e;
        setPage(value);
    }

    if (loading) {
        return (
            <div className='flex flex-col w-full'>
                <ProductListingSkeleton />
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

    if (searchNotFound) {
        return (
            <div>
                <h1 className='text-5xl text-gray-400 font-mono font-bold'>{searchNotFound}</h1>
            </div>
        )
    }

    return (

        <div className="flex flex-col items-center justify-center">
            <div className="grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3  w-full">
                {products?.map((x) => {
                    return (
                        <div className="card-main h-[500px] max-w-[310px] shadow-lg rounded-md overflow-hidden" key={x._id}>
                            <div className="img h-[400px] overflow-hidden" draggable='false' >
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
                                    <h1 className='text-lg font-semibold font-sans '>{x.title}</h1>
                                    <p>—{x.author} </p>
                                </div>
                                <div className='text-end'>
                                    <p className='font-bold text-gray-800'>₹{x.price}</p>
                                    <button className='border border-black py-1 px-1 rounded-md font-bold hover:bg-gray-800 hover:text-white transition-all focus:ring-2 focus:ring-gray-500'>Add to cart</button>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
            <Pagination
                count={totalPage}
                variant="outlined"
                shape="rounded"
                page={page}
                onChange={handlePagination}
            />
        </div>

    )
}

export default ProductListing