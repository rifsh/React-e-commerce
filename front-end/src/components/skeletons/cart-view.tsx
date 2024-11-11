import { Skeleton } from "@mui/material"
import { MdOutlineDeleteOutline } from "react-icons/md"

const CartView = () => {

    let count: number[] = [1, 2, 3, 4];

    return (
        <div>
            {count.map((x) => {
                return (
                    <div className="flex items-center w-full mb-[12px]" key={x.valueOf()}>
                        <div className="bg-gray-100 min-w-[772px] p-4 rounded-lg flex items-center justify-between">
                            <div className="flex items-center min-w-[470px] justify-between">
                                <div className="">
                                    <Skeleton variant="circular" width={90} height={90} />
                                </div>
                                <div>
                                    <Skeleton variant="rounded" width={178} height={20} />
                                    <Skeleton className="my-1" variant="rounded" width={90} height={20} />
                                    <Skeleton variant="rounded" width={140} height={20} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton className="mx-3" variant="rounded" width={20} height={30} />
                                    <Skeleton variant="circular" width={40} height={40} />
                                </div>
                            </div>


                            <div className="">
                                <Skeleton variant="rounded" width={60} height={20} />
                            </div>

                        </div>
                        <MdOutlineDeleteOutline className="text-4xl ms-[15px]" />
                    </div>
                )
            })}
        </div>
    )
}

export default CartView