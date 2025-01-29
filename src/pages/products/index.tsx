import ProductCard from "@/components/products/ProductCard";
import { ProductService } from "@/services/products-services";
import Head from "next/head";
import SidebarFilterOptions from './SidebarFilterOptions';
import { Suspense } from "react";
import Loading from "../../components/loading/Loading"; 
import {Product} from '../../lib/dataTypes';
export const revalidate = 24*60*60; // Revalidate data in 24 hours

export const getServerSideProps=async(context:any)=>{
  const {query}=context;
  const {minRating,minPrice,category,searchText}=query;

  let filteredProducts:Product[]=[];//initialize empty array for fallback
  try{
    filteredProducts=await ProductService.getProducts();//fetch products 
     // console.log(filteredProducts,filteredProducts.length);
  // Filter by rating
  if (minRating) {
    filteredProducts = filteredProducts.filter(
      (prod: any) => prod.rating.rate >= Number(minRating)
    );
  }
  // Filter by price
  if (minPrice) {
    filteredProducts = filteredProducts.filter((prod: any) => {
      const productPrice = prod.discountPercentage && prod.discountPercentage > 0 ? prod.discountedPrice : prod.price;
  
      if (minPrice === '0') {
        // Show All - no minPrice filter
        return true; 
      } else if (minPrice === '201') {
        // Above AED 200
        return productPrice >= 201;
      } else {
        // Other price ranges (e.g., 51-100, 101-150, etc.)
        const minPriceNum = parseInt(minPrice);
        const maxPrice = minPriceNum + 49; 
        return productPrice >= minPriceNum && productPrice <= maxPrice;
      }
    });
  }
  // Filter by searchText
  if (searchText) {
    filteredProducts = filteredProducts.filter(
      (prod: any) => prod.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  // Filter by category
if (category) {
  filteredProducts = filteredProducts.filter(
    (prod: any) => prod.category === category
  );
}
  }catch(error){
    console.log("Data fetching error:",error);
  }
  return{
    props:{filteredProducts,
    minRating: minRating ? Number(minRating) : null, // Convert minRating to number if it exists
      minPrice: minPrice ? Number(minPrice) : null, // Convert minPrice to number if it exists
      category: category ? category : "",
  },
};
};
        export default function Products({
          filteredProducts,
          minRating,
          minPrice,
          category,
        }: {
          filteredProducts: Product[];
          minRating?: number;
          minPrice?: number;
          category?: string;
        }){
  return (
    <>
    <Head>
        <title>Products page</title>
      </Head>
      <div className="container-fluid text-start mb-2 mx-auto">
      <div className="row">
      <div className="col-md-3 pt-4 border-end">
      <SidebarFilterOptions minRating={minRating} minPrice={minPrice} category={category} />
       </div>
       <div className="col-md-9">
       <Suspense fallback={<Loading />}>
          {filteredProducts.length > 0 ? (
            <>
            <h5 className="mt-4 mb-0" id="topPage">Results</h5>
            <div>
                  Price and other details may vary based on product size and color.
                </div>
                <div className="d-flex flex-wrap align-items-stretch">
                { filteredProducts.map((productData: Product) => (
              <ProductCard key={productData.documentId} product={productData as Product} />
            ))}
                </div>
           
            </>
          ) : (
            <p>No products found.</p>
          )}
          </Suspense>
      </div>
      </div>
    </div>
    </>
    
  );
}




