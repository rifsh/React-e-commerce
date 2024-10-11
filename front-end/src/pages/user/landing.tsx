
function Landing() {
    return (
        <div>
            <div className="upperbar pb-1 flex flex-col items-center justify-center">
                <div className="text-center">
                    <p>Every Purchase Supports Independent Bookstores.</p>
                    <p className="font-bold"> A Better Way to Buy Books Online</p>
                </div>
            </div>
            <div className="fluid-container">
                <div id="carouselExample" className="carousel slide">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/10/30/27926_Quote_A1_DiscoverWinner_10-30.jpg"
                                className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/10/31/27927_Quote_A3_Absolution_10-31.jpg"
                                className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2023/09/27/27677_Quote_A1_DiscoverShortlistAnnouncement_09-27.jpg"
                                className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="flex-col items-center justify-center">
                <h4 className="ms-10 mt-10 text-4xl font-extralight">Give the Gift of Good Fiction</h4>
                <div className="flex items-center justify-center mt-4">

                    <div className="card me-5 cards" >
                        <a href="">
                            <img className="card-img-top w-100"
                                src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&product=path%5B/pimages/9781982104498_p0_v4%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
                                alt="Card image cap" />
                        </a>
                        <div className="card-body">
                            <h5 className="card-title">Jesmyn Ward</h5>
                            <p className="card-text">—Joy Kuriyan</p>
                        </div>
                    </div>
                    <div className="card me-5 cards">
                        <img className="card-img-top w-100"
                            src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&product=path%5B/pimages/9780525558965_p0_v3%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
                            alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">The Fraud</h5>
                            <p className="card-text">—Panamel</p>
                        </div>
                    </div>
                    <div className="card me-5 cards">
                        <img className="card-img-top w-100"
                            src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&product=path%5B/pimages/9780593538241_p0_v2%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
                            alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Land of Milk and Honey</h5>
                            <p className="card-text">—C Pam Zhang</p>
                        </div>
                    </div>
                    <div className="card cards">
                        <img className="card-img-top w-100"
                            src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&set=key%5Bresolve.format%5D,value%5Bwebp%5D&product=path%5B/pimages/9780593536117_p0_v3%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
                            alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Wellness</h5>
                            <p className="card-text">—Brit Bennett</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing