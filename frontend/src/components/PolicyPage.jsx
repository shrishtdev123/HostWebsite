import React from 'react';

const PolicyPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Return, Refund, Cancellation & Warranty Policy
      </h1>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Return Policy</h2>
        <p>
          After you have received an item, you have 10 days to return it. To ensure that this process is quick and seamless, please note the following:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li>You can <a href="#" className="text-blue-600 underline">click here</a> to raise your return request.</li>
          <li>You can also write to our customer support at <span className="font-medium"> communication@starinnigs1.com</span>.</li>
          <li>Images (front & back) of the product are required before initiating a reverse pickup.</li>
          <li>Pickup is from the original delivery address only; address changes aren't accepted.</li>
          <li>No refunds for:
            <ul className="list-disc ml-6 mt-1">
              <li>Items not in original condition, damaged, or missing parts not due to our error.</li>
              <li>Items returned after 10 days of delivery.</li>
            </ul>
          </li>
          <li>Proof of Purchase (invoice/email receipt) is required for processing.</li>
          <li>Online purchases cannot be returned or exchanged in offline stores, and vice versa.</li>
          <li>Share an unboxing video clearly showing product, tags, and issue.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund of Purchase Price</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Refunds are credited to the original mode of payment.</li>
          <li>COD refunds require valid bank details shared via registered email or return form.</li>
          <li>Refunds are processed after warehouse QC and take 10–12 working days.</li>
          <li>Only the actual paid amount will be refunded (discounts not refunded).</li>
          <li>No revalidation of coupon codes will be done.</li>
          <li>Bank account validation is the customer's responsibility.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund of Prepaid Orders</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Refunds go to the source account used for payment.</li>
          <li>No change of payment method allowed.</li>
          <li>Shipping charges are non-refundable.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund of Cash on Delivery (COD) Orders</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Customer must provide bank details during return request.</li>
          <li>Account details cannot be changed once shared.</li>
          <li>We are not responsible for incorrect account numbers.</li>
          <li>Refund covers product value only; shipping/COD charges are not refunded.</li>
          <li>Post-approval, confirmation email and bank transfer follow for COD refunds.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Cancellation Policy</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>Orders can be canceled before dispatch via account or Customer Care.</li>
          <li>Prepaid refund approval: 1–2 working days; refund initiation: 3–4 days.</li>
          <li>Refunds go to the original payment account with notification via email/SMS.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Policy for Discounted Merchandise</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>No returns or replacements on discounted items.</li>
          <li>Only size replacement within 7 days, based on stock availability.</li>
          <li>Order cancellation may happen due to stock, QC, or other issues. Email confirmation will be sent.</li>
          <li>Unboxing video with product and tags is required for issues.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Warranty</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li>3-month manufacturing defect warranty — same product and size only.</li>
          <li>No color or style change allowed during return/exchange.</li>
          <li>Company will assess if the product has been used or damaged.</li>
        </ul>
      </section>
    </div>
  );
};

export default PolicyPage;
