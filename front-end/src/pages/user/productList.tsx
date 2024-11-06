import ProductListing from "../../components/user/productListing"

function ProductList() {
    return (
        <div className="">
            <h1 style={{ fontFamily: 'fantasy' }} className="text-3xl">ALL <span className="font-normal">COLLECTIONS ——</span></h1>
            <div className="mt-4 flex items-center justify-center">
                <ProductListing value="all" />
            </div>
        </div>
    )
}

export default ProductList