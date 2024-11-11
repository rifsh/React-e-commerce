import { Skeleton } from "@mui/material"

const ProductViewingSkeleton = () => {
    return (
        <div className="">
            <Skeleton width={390} animation='wave' variant="rounded" height={500} />
        </div>
    )
}

export default ProductViewingSkeleton