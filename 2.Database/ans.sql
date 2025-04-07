-- Customers Table
CREATE TABLE Customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE Categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Products Table
CREATE TABLE Products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- ProductVariations Table
CREATE TABLE ProductVariations (
    variation_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    variation_name VARCHAR(255) NOT NULL, -- e.g., 'Color', 'Size'
    variation_value VARCHAR(255) NOT NULL, -- e.g., 'Red', 'Large'
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

-- ShoppingCarts Table
CREATE TABLE ShoppingCarts (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

-- CartItems Table
CREATE TABLE CartItems (
    cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
    cart_id INT,
    variation_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES ShoppingCarts(cart_id),
    FOREIGN KEY (variation_id) REFERENCES ProductVariations(variation_id)
);