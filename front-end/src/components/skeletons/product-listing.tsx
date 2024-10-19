import { Skeleton } from "@mui/material"

const ProductListingSkeleton = () => {
    let item = [1, 2, 3, 4, 5, 6, , 7, 8, 9, 10];
    return (
        <div className="mb-10 grid items-center justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3  w-full">
            {item.map((x) => {
                return (
                    <div className=" bg-white shadow-lg max-w-[310px]" key={x.valueOf()}>
                        <Skeleton animation='wave' variant="rounded" height={350} />
                        <div className="flex items-center justify-between px-2 p-3">
                            <div className="mt-3 ">
                                <Skeleton animation='wave' className="mb-2" variant="rounded" width={100} height={20} />
                                <Skeleton variant="rounded" width={120} height={20} />
                            </div>
                            <div className="mt-3 flex flex-col items-end justify-end">
                                <Skeleton animation='wave' className="mb-2" variant="rounded" width={40} height={20} />
                                <Skeleton animation='wave' className="" variant="rounded" width={100} height={35} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ProductListingSkeleton