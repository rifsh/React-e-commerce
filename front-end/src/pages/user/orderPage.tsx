import Order from "../../components/user/order"

const OrderPage = () => {
    return (
        <div className="">
            <h1 className="text-5xl font-medium">Your orders</h1>
            <div>
                <Order/>
            </div>
        </div>
    )
}

export default OrderPage