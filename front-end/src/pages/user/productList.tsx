import ProductListing from "../../components/user/product-listing"

function ProductList() {
    return (
        <div className="px-4 py-4">
            <h1 className="text-3xl font-bold">All Books</h1>
            <div className=" py-2 flex items-center justify-center">
                <ProductListing />
            </div>
        </div>
    )
}

export default ProductList