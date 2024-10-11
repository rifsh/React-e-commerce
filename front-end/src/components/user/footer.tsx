
function Footer() {
    return (
        <footer className="text-center text-lg-start text-white bg-[#45526e]">
            <div className="container p-4 pb-0">
                <section className="">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">
                                Books
                            </h6>
                            <p>
                                Buy Books Online at BN.com, America’s Favorite Bookstore
                                No matter what you’re a fan of, from Fiction to Biography,
                                Sci-Fi, Mystery, YA, Manga, and more, Barnes & Noble has the perfect book for you. Shop
                                bestselling books from the NY Times Bestsellers list, or get personalized
                                recommendations to find something new and unique! Discover kids books for children of
                                all ages including classics like Dr. Seuss to modern favorites like the Dog Man series.
                            </p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Products</h6>
                            <p>
                                <a className="text-white">Action books</a>
                            </p>
                            <p>
                                <a className="text-white">Sci-fi</a>
                            </p>
                            <p>
                                <a className="text-white">History</a>
                            </p>
                            <p>
                                <a className="text-white">horror</a>
                            </p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">
                                Useful links
                            </h6>
                            <p>
                                <a className="text-white">Action books</a>
                            </p>
                            <p>
                                <a className="text-white">Sci-fi</a>
                            </p>
                            <p>
                                <a className="text-white">History</a>
                            </p>
                            <p>
                                <a className="text-white"></a>
                            </p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                            <p><i className="fas fa-home mr-3"></i> Kotakkal, Chenguvetty, Kearal, INDIA</p>
                            <p><i className="fas fa-envelope mr-3"></i> safa@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +91 9074144467</p>
                        </div>
                    </div>
                </section>

                <hr className="my-3" />

                <section className="p-3 pt-0">
                    <div className="row d-flex align-items-center">
                        <div className="col-md-7 col-lg-8 text-center text-md-start">
                            <div className="p-3">
                                © 223 Copyright:
                                <a className="text-white" href="https://mdbootstrap.com/">rifsh.com</a>
                            </div>
                        </div>

                        <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                            <a className="btn btn-outline-light btn-floating m-1" role="button"><i
                                className="fab fa-facebook-f"></i></a>

                            <a className="btn btn-outline-light btn-floating m-1" role="button"><i
                                className="fab fa-twitter"></i></a>

                            <a className="btn btn-outline-light btn-floating m-1" role="button"><i
                                className="fab fa-google"></i></a>

                            <a className="btn btn-outline-light btn-floating m-1" role="button"><i
                                className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </section>
            </div>
        </footer>
    )
}

export default Footer