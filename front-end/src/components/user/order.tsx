
const Order = () => {
  const date: Date = new Date;
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options).replace('', '');

  return (
    <div>
      <div className="mt-3">
        <h4 className="font-medium text-lg text-gray-400">Date: <span className="text-gray-500">{formattedDate}</span></h4>
      </div>
      <hr className="mt-3" />

      {/* Product-lista */}
      <div className="w-full h-screen">
        <div className="w-full h-[180px] mt-4 flex items-center justify-between">

          <div className="flex items-center w-4/12 justify-between">
            {/* Image */}

            <div className="w-[190px] h-[190px] bg-gray-100 border border-gray-400 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dgt8gzzif/image/upload/v1705296609/products/gfigf72sszqyme4rsqbg.jpg"
                alt="Product Image"
                className="w-[170px] h-[170px] object-contain rounded-lg"
              />
            </div>

            {/* Details */}
            <div className="text-lg">
              <h1 className="font-bold text-2xl mb-2">Divergent</h1>
              <p className="font-medium text-gray-500">—Veronica Roth <span className="font-thi text-gray-400">|</span> horror</p>
            </div>
          </div>

          {/* Price */}
          <div>
              <p className="font-bold text-5xl mb-2">₹900.00</p>
              <p className="font-medium text-xl text-right text-gray-400">Qty: 2</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Order