import Head from "next/head";
import Button from "./Button";
export const getServerSideProps = (context: {
  params: { orderId: string };
}) => {
  const { params } = context;

  const { orderId } = params;

  return {
    props: { orderId },
  };
};

export default function OrderConfirmationPage({
  orderId,
}: {
  orderId: string;
}) {
  return (
   <>
    <Head>
        <title>Order Confirmation page</title>
    </Head>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h2 className="text-success">Thank You for Shopping with Us!</h2>
          <p>
            Your order have been placed succesfully.Your order ID is:{" "}
            <span className="fw-bold">{orderId}</span>
          </p>
          <p>You will receive an order confirmation email shortly.</p>
          <Button />
        </div>
      </div>
    </div>
   </> 
  );
}
