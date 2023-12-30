import React from "react";
import Card from "../../card/Card";


import "./ProductForm.scss";

const ProductForm = ({
  product,
  imagePreview,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product displayflex">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">
              Supported Formats: jpg, jpeg, png
            </code>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="image-preview">
                <img src={imagePreview} alt="product" />
              </div>
            ) : (
              <p>No image set for this poduct.</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="Product name"
            name="name"
            value={product?.name || ''}
            onChange={handleInputChange}
          />

          <label>Product Category:</label>
          <input
            type="text"
            placeholder="Product Category"
            name="category"
            value={product?.category || ''}
            onChange={handleInputChange}
          />

          <label>Product Price:</label>
          <input
            type="text"
            placeholder="Product Price"
            name="price"
            value={product?.price || ''}
            onChange={handleInputChange}
          />

          <label>Product Quantity:</label>
          <input
            type="text"
            placeholder="Product Quantity"
            name="quantity"
            value={product?.quantity || ''}
            onChange={handleInputChange}
          />
          <label>Production Date:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="production_date"
            value={product?.production_date || ''}
            onChange={handleInputChange}
          />
          <label>Expiry Date:</label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            name="expiry_date"
            value={product?.expiry_date || ''}
            onChange={handleInputChange}
          />
          <label>Product Description:</label>
            <textarea
              cols="30"
              rows="10"
              name="description"
              placeholder="Product Description"
              value={product?.description || ''}
              onChange={handleInputChange}
              style={{width: "100%"}}
            ></textarea>
          
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};



export default ProductForm;
