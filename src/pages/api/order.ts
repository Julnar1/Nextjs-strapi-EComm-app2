import { NextApiRequest, NextApiResponse } from "next";
type ResponseData = {
  orderId: string;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { cartItems } = req.body;
    console.log("Ordered Products are:", cartItems);
    // **Important:Here you would typically store order data in your database using `orderId`
    // This example simulates a successful order creation by generating an order ID.
    const orderId = Math.random().toString(36).substring(2, 15);

    return res.status(200).json({
      orderId,
      message: "",
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return res.status(400).json({
      message: "Error parsing request body",
      orderId: "",
    });
  }
}
