import Head from "next/head";
import Image from "next/image";
import CustomerCareTollfreeIcon from "../contact-us/images/customer_Service_tollfree_icon.png";
import LiveChatIcon from "../contact-us/images/live_chat_icon.png";
import styles from "./Contact.module.css";
import classNames from "classnames";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contact us page</title>
      </Head>
      <div className="container-fluid">
        <div className={styles.contactSection}>
          <div className={styles.contactText}>
            <h2>Have More Questions?</h2>
            <p>
              You can contact our customer service via phone or chat.We are
              available 24*7.
            </p>
          </div>
          <div className={styles.contactInfo1}>
            <div className={styles.contactItem}>
              <Image
                src={CustomerCareTollfreeIcon}
                alt="Customer Care Toll Free Icon"
              />
              <p>+971-800-600-700</p>
            </div>
            <div className={styles.contactItem}>
              <Image src={LiveChatIcon} alt="WhatsApp Live chat Icon" />
              <p>Live Chat (WhatsApp)</p>
            </div>
          </div>
        </div>
        <div className={classNames("text-center", styles.contactInfo)}>
          <h3>Our Contact Information</h3>
          <ul>
            <li>
              <strong>Email:</strong> info@shoppingcart.com
            </li>
            <li>
              <strong>Phone:</strong> +971 50 123 4567
            </li>
            <li>
              <div>
                <strong>Postal Address:</strong>
              </div>
              <div>Shopping Cart Solutions FZE</div>
              <div>Office 123, Blitz Tower</div>
              <div>Dubai International City</div>
              <div>Dubai, UAE</div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contact;
