# Complete API Test Documentation for Orders, Products, Cart, and User

This document provides comprehensive instructions and example requests to test the backend API endpoints related to orders, products, cart, and user management.

---

## Authentication

- Most endpoints require a valid JWT token in the `token` header.
- Admin routes require admin authentication.

---

## Orders API

### List All Orders (Admin)

- **Endpoint:** `POST /api/order/list`
- **Headers:** `token: <admin JWT token>`
- **Body:** Empty JSON `{}`

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/order/list \
-H "Content-Type: application/json" \
-H "token: <admin JWT token>" \
-d '{}'
```

### Update Order Status (Admin)

- **Endpoint:** `POST /api/order/status`
- **Headers:** `token: <admin JWT token>`
- **Body:** JSON with order ID and new status

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/order/status \
-H "Content-Type: application/json" \
-H "token: <admin JWT token>" \
-d '{"orderId": "<order_id>", "status": "shipped"}'
```

### Place Order (User)

- **Endpoint:** `POST /api/order/place`
- **Headers:** `token: <user JWT token>`
- **Body:** Order details JSON

---

## Products API

### List All Products

- **Endpoint:** `GET /api/product/list`
- **Headers:** None required

**Example cURL:**
```bash
curl http://localhost:5000/api/product/list
```

### Add Product (Admin)

- **Endpoint:** `POST /api/product/add`
- **Headers:** `token: <admin JWT token>`
- **Body:** FormData with product fields and images

---

### Update Product (Admin)

- **Endpoint:** `PUT /api/product/:id`
- **Headers:** `token: <admin JWT token>`
- **Body:** FormData with product fields and optional images

**Example cURL:**
```bash
curl -X PUT http://localhost:5000/api/product/<product_id> \
-H "token: <admin JWT token>" \
-F "name=New Product Name" \
-F "category=Category" \
-F "price=100" \
-F "description=Updated description" \
-F "subCategory=Subcategory" \
-F "bestseller=true" \
-F "sizes=[\"S\",\"M\"]" \
-F "image1=@/path/to/image1.jpg" \
-F "image2=@/path/to/image2.jpg"
```

### Delete Product (Admin)

- **Endpoint:** `DELETE /api/product/delete/:id`
- **Headers:** `token: <admin JWT token>`

---

## Cart API

### Add to Cart (User)

- **Endpoint:** `POST /api/cart/add`
- **Headers:** `token: <user JWT token>`
- **Body:** JSON with product ID and quantity

---

### Get User Cart (User)

- **Endpoint:** `GET /api/cart`
- **Headers:** `token: <user JWT token>`

---

## User API

### Register User

- **Endpoint:** `POST /api/user/register`
- **Body:** JSON with user details

---

### Login User

- **Endpoint:** `POST /api/user/login`
- **Body:** JSON with credentials

---

### Get User Profile

- **Endpoint:** `GET /api/user/profile`
- **Headers:** `token: <user JWT token>`

---

## Notes

- Replace `http://localhost:5000` with your backend URL.
- Replace `<admin JWT token>` and `<user JWT token>` with valid tokens.
- Replace `<product_id>` and `<order_id>` with actual IDs.
- Use tools like Postman or curl to test these endpoints.
- Ensure the backend server is running before testing.

---

This documentation covers all primary endpoints for orders, products, cart, and user management relevant to the admin panel and user operations.
