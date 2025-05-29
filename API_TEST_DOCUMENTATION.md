{
  "authentication": {
    "description": "Most endpoints require a valid JWT token in the 'token' header. Admin routes require admin authentication."
  },
  "orders": {
    "listAllOrdersAdmin": {
      "endpoint": "POST /api/order/list",
      "headers": {
        "token": "<admin JWT token>"
      },
      "body": {},
      "exampleRequest": {
        "method": "POST",
        "url": "http://localhost:5000/api/order/list",
        "headers": {
          "Content-Type": "application/json",
          "token": "<admin JWT token>"
        },
        "body": {}
      }
    },
    "updateOrderStatusAdmin": {
      "endpoint": "POST /api/order/status",
      "headers": {
        "token": "<admin JWT token>"
      },
      "body": {
        "orderId": "<order_id>",
        "status": "shipped"
      },
      "exampleRequest": {
        "method": "POST",
        "url": "http://localhost:5000/api/order/status",
        "headers": {
          "Content-Type": "application/json",
          "token": "<admin JWT token>"
        },
        "body": {
          "orderId": "<order_id>",
          "status": "shipped"
        }
      }
    },
    "placeOrderUser": {
      "endpoint": "POST /api/order/place",
      "headers": {
        "token": "<user JWT token>"
      },
      "body": "Order details JSON"
    }
  },
  "products": {
    "listAllProducts": {
      "endpoint": "GET /api/product/list",
      "headers": {},
      "exampleRequest": {
        "method": "GET",
        "url": "http://localhost:5000/api/product/list"
      }
    },
    "addProductAdmin": {
      "endpoint": "POST /api/product/add",
      "headers": {
        "token": "<admin JWT token>"
      },
      "body": "FormData with product fields and images"
    },
    "updateProductAdmin": {
      "endpoint": "PUT /api/product/:id",
      "headers": {
        "token": "<admin JWT token>"
      },
      "body": "FormData with product fields and optional images"
    },
    "deleteProductAdmin": {
      "endpoint": "DELETE /api/product/delete/:id",
      "headers": {
        "token": "<admin JWT token>"
      }
    }
  },
  "cart": {
    "addToCartUser": {
      "endpoint": "POST /api/cart/add",
      "headers": {
        "token": "<user JWT token>"
      },
      "body": {
        "productId": "<product_id>",
        "quantity": "<quantity>"
      }
    },
    "getUserCart": {
      "endpoint": "GET /api/cart",
      "headers": {
        "token": "<user JWT token>"
      }
    }
  },
  "user": {
    "registerUser": {
      "endpoint": "POST /api/user/register",
      "body": "JSON with user details"
    },
    "loginUser": {
      "endpoint": "POST /api/user/login",
      "body": "JSON with credentials"
    },
    "getUserProfile": {
      "endpoint": "GET /api/user/profile",
      "headers": {
        "token": "<user JWT token>"
      }
    }
  },
  "notes": {
    "replaceBaseUrl": "Replace 'http://localhost:5000' with your backend URL.",
    "replaceTokens": "Replace '<admin JWT token>' and '<user JWT token>' with valid tokens.",
    "replaceIds": "Replace '<product_id>' and '<order_id>' with actual IDs.",
    "testingTools": "Use tools like Postman or curl to test these endpoints.",
    "serverRunning": "Ensure the backend server is running before testing."
  }
}
