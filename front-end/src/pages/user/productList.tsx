// import React from 'react'

import ProductListing from "../../components/user/product-listing"

function ProductList() {
    return (
        <div className="px-4 py-4">
            <h1 className="text-3xl font-bold">All Books</h1>
            <ProductListing />
        </div>
    )
}

export default ProductList