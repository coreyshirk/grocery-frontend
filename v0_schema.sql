CREATE TABLE Categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT
);

CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    category_id INT,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    weight DECIMAL(8, 2),
    unit VARCHAR(20),
    image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Customers (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20)
);

CREATE TABLE Orders (
    order_id INT PRIMARY KEY,
    customer_id INT,
    order_date DATETIME NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE Order_Items (
    order_item_id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Inventory (
    inventory_id INT PRIMARY KEY,
    product_id INT,
    quantity INT NOT NULL,
    last_updated DATETIME NOT NULL,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);