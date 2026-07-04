import "./TopProducts.css";

const products = [

  {
    name: "RayBan Frame",
    sold: 42,
  },

  {
    name: "Blue Cut Lens",
    sold: 36,
  },

  {
    name: "Titanium Frame",
    sold: 28,
  },

];

function TopProducts(){

  return(

    <div className="report-widget">

      <div className="widget-header">

        <h3>

          Top Selling Products

        </h3>

      </div>

      {

        products.map((product,index)=>(

          <div
            className="widget-item"
            key={index}
          >

            <div>

              <h4>

                {product.name}

              </h4>

              <p>

                {product.sold} Sold

              </p>

            </div>

            <span>

              #{index+1}

            </span>

          </div>

        ))

      }

    </div>

  );

}

export default TopProducts;