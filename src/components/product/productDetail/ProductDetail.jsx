import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import {SpinnerImg} from "../../loader/Loader";
import calculateExpiryDate from '../../../utilities/expiry';
import stockStatus from '../../../utilities/stockStatus';
import "./ProductDetail.scss";
import { toast } from "react-toastify";




const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  

  
let expiryDate = "";

if (product) {
expiryDate = calculateExpiryDate(product.expiry_date);
}


let expiryString = "";
if (expiryDate !== "expired") {
  if (expiryDate.years > 0) {
    expiryString += `${expiryDate.years} ${expiryDate.years > 1 ? 'years' : 'year'}, `;
  }
  if (expiryDate.months > 0) {
    expiryString += `${expiryDate.months} ${expiryDate.months > 1 ? 'months' : 'month'}, `;
  }
  expiryString += `${expiryDate.days} ${expiryDate.days > 1 ? 'days' : 'day'}`;
} else {
  expiryString = "expired";
}

  
let displayExpiryDate = expiryDate === "expired" ? "expired" : expiryString;


  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      toast.message("Something went rong, please reload the page");
    }
  }, [isLoggedIn, isError, message, dispatch,id]);

  return (
    <div className="product-detail --pad">
      <h3 className="--mt">Product Detail</h3>
      {isLoading && <SpinnerImg classes="spinner" />}
      <Card cardClass="card">
        
        {product && (
          <div className="detail">
            <Card cardClass="group image-card">
            {isLoading ? (
              <SpinnerImg classes="spinner-visibility"/>
              ) : (
            product?.image ? (
            <img
           src={product.image.filePath}
           alt={product.image.fileName}
          />
          ) : (
          <p>No image set for this product</p>
           )
           )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b> {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in stock : </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in stock : </b> {"$"}
              {product.price * product.quantity}
            </p>
            <p>
              <b>&rarr; Production Date : </b> 
              {product.production_date}
            </p>
            <p>
              <b>&rarr; Expiry Date : </b> {product.expiry_date} </p>
            <p>
               <b>&rarr; Expires in : </b> 
               {displayExpiryDate}
            </p>

            <hr />
            <p>{product.description}</p>
            
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("en-US")}
            </code>
            <div>
            <Link to={`/edit-product/${id}`} className="edit" >
            Edit Product
            </Link>
            <Link to={`/li-productdetail/${id}`} className="edit" >
            Create Product QRcode
            </Link>
            </div>
          </div>
          
        )}
      </Card>
                        
    </div>
  );
};

export default ProductDetail;
