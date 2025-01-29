import { ServiceBase } from "./service-base";

export class ProductService extends ServiceBase {
  // Get all products with error handling
  static getProducts = async () => {
    try {
      const response = await fetch(this.getUrl("/api/products?populate=*"), {
        headers: {
          "Content-Type": "application/json",
          // Add authentication headers
          Authorization: `Bearer ${this.getApiToken()}`,
        },
        next: { revalidate: 60 * 60 }, // Revalidate every 1 hour
      });
      // console.log(response);
      // Check for successful response and valid JSON content
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/json")
      ) {
        throw new Error(`Unexpected response: ${response.statusText}`);
      }
      const { data } = await response.json();
      // console.log("products",products.data);
      // Parse data into Product objects
      return data.map((productData: any) => ({
        documentId: productData.documentId,
        title: productData.title,
        description: productData.description,
        category: productData.category,
        price: productData.price,
        color: productData.color,
        availableQty: productData.availableQty,
        rating: productData.rating,
        discountPercentage: productData.discountPercentage || null,
        image: { url: productData.image.url },
        // Calculate discounted price directly here
        discountedPrice:
          productData.discountPercentage && productData.discountPercentage > 0
            ? productData.price -
              productData.price * (productData.discountPercentage / 100)
            : null,
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Failed to load products. Please try again later.");
    }
  };

  // Get a product with error handling
  static getProductById = async (productId: string) => {
    try {
      const response = await fetch(
        this.getUrl(`/api/products/${productId}?populate=*`),
        {
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers
            Authorization: `Bearer ${this.getApiToken()}`,
          },
        }
      );
      // console.log(response);
      // Check for successful response and valid JSON content
      if (
        !response.ok ||
        !response.headers.get("content-type")?.includes("application/json")
      ) {
        throw new Error(`Unexpected response: ${response.statusText}`);
      }
      const { data } = await response.json();
      // console.log("product is", data);
      return {
        documentId: data.documentId,
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        color: data.color,
        availableQty: data.availableQty,
        rating: data.rating,
        discountPercentage: data.discountPercentage || null,
        image: { url: data.image.url },
        discountedPrice:
          data.discountPercentage && data.discountPercentage > 0
            ? data.price - data.price * (data.discountPercentage / 100)
            : null,
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      throw new Error("Failed to load product. Please try again later.");
    }
  };
}
