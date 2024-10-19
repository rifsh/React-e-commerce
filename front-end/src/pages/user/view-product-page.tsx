import { Params, useParams } from "react-router-dom";
import ViewProduct from "../../components/user/view-product";

function ViewProductPpage() {
    const productId: Params<string> = useParams();    
    
    return (
        <div>
            <ViewProduct productId={productId} />
        </div>
    )
}

export default ViewProductPpage