// import nodemailer from "nodemailer";

// export const sendOrderEmail = async (order, user) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//   });

//   const itemsHtml = order.items
//     .map(
//       (item) =>
//         `<p>${item.name} (${item.size}) x${item.qty} - ₹${item.price}</p>`
//     )
//     .join("");

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: user.email,
//     subject: `Order Confirmation - #${order._id}`,
//     html: `
//       <h1>Thank you for your order!</h1>
//       <p>Order ID: ${order._id}</p>
//       <p>Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
//       <h3>Items:</h3>
//       ${itemsHtml}
//       <h2>Total: ₹${order.totalPrice}</h2>
//       <p>We appreciate your business.</p>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };


import nodemailer from "nodemailer";

const sendOrderEmail = async (order, user) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "Clothify <no-reply@clothify.app>",
    to: user.email,
    subject: `Order Confirmation - ${order._id}`,
    html: `
      <h2>Thanks for shopping with Clothify!</h2>

      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

      <h3>Items:</h3>
      <ul>
        ${order.items
          .map(
            i =>
              `<li>
                ${i.name} (${i.size}) × ${i.qty} — ₹${i.price}
               </li>`
          )
          .join("")}
      </ul>

      <h2>Total: ₹${order.totalPrice}</h2>
      <p>Your stylish order is on the way 😎</p>
    `
  });
};

export default sendOrderEmail;

