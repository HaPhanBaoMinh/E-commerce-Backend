-- customer
create TABLE CUSTOMER (
	lastname VARCHAR(50),
	firstname VARCHAR(50),
	createat DATE DEFAULT CURRENT_DATE,
	email VARCHAR(100) UNIQUE,
	phone VARCHAR(10),
	password VARCHAR(80),
	id VARCHAR(10) PRIMARY KEY not null
);

SELECT * FROM customer
-- drop TABLE CUSTOMER 
INSERT INTO customer (LASTNAME, FIRSTNAME, EMAIL, PHONE, PASSWORD, id) 
	VALUES ('Hà Phan', 'Bảo Minh', 'haphanbaominh9674@gmail.com', '0912782832', '1292002', '001')
	
INSERT INTO customer (LASTNAME, FIRSTNAME, EMAIL, PHONE, PASSWORD, id) 
	VALUES ('Hà Phan', 'Bảo Minh', 'haphanbaominh9675@gmail.com', '0912782832', '1292002', '002')

-- product
create TABLE product (
	name varchar(100),
	brand varchar(100),
	description varchar(500),
	category_id varchar(10),
	quantity int,
	sku varchar(10) PRIMARY key,
	price float,
	discount_price float,
	day_end_discount date,
	createat DATE DEFAULT CURRENT_DATE,
	CONSTRAINT fk_category
      FOREIGN KEY(category_id) 
	  REFERENCES category(id)
)


-- category
create table category (
	id varchar(10) PRIMARY key,
	name varchar(100),
	description varchar(500)
)

insert into category (id, name, description) VALUES ('001', 'Running shoes', 'Shoes for running')
insert into product (brand, name, description, category_id, quantity, sku, price, discount_price, day_end_discount) 
	VALUES ('Nike', 'Nike Air 98', 'Nike shoes', '001', 50, '001', 200000, 150000, '11-11-2022')
	
select * from product
select * from category

-- address
create table address (
	country varchar(50),
	street varchar(100),
	distric varchar(100),
	wards varchar(100),
	city varchar(100),
	detail varchar(200),
	customer_id varchar(10),
	id varchar(10) PRIMARY key,
	CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customer(id)
)


select * from address
insert into address(id, country, street, distric, city, detail, wards)
	values ('001', 'VN', 'Quang Trung', 'Đạ tẻh', 'Lâm Đồng', '87/5 khu phố 2D', 'Đạ tẻh')

-- orders
create table orders (
	address_id varchar(10),
	status varchar(20) DEFAULT 'Ordered',
	total float,
	customer_id varchar(10),
	id varchar(10) PRIMARY key,
	createat date DEFAULT CURRENT_DATE,
	CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customer(id),
	
	CONSTRAINT fk_address
      FOREIGN KEY(address_id) 
	  REFERENCES address(id)
)

select * from orders
insert into orders(address_id, total, customer_id, id)
	values ('001', 200000, '001', '002')

-- orderdetail
create table ordersdetail (
	total float,
	sku varchar(10),
	quantity int,
	order_id varchar(10),
	id varchar(10) PRIMARY key,
	createat date DEFAULT CURRENT_DATE,
	CONSTRAINT fk_order
      FOREIGN KEY(order_id) 
	  REFERENCES orders(id),
	
	CONSTRAINT fk_product
      FOREIGN KEY(sku) 
	  REFERENCES product(sku)
)

select * from ordersdetail join product on product.sku = ordersdetail.sku
insert into ordersdetail(sku, total, order_id, id, quantity)
	values ('001', 200000, '001', '001', 10)

-- cart
create table cart (
	customer_id varchar(10),
	sku varchar(10),
	quantity int,
	total float,
	CONSTRAINT fk_cusomer
      FOREIGN KEY(customer_id) 
	  REFERENCES customer(id),
	
	CONSTRAINT fk_product
      FOREIGN KEY(sku) 
	  REFERENCES product(sku),
	primary key (customer_id,sku)
)

-- Trigger auto insert new cart when insert new customer
CREATE OR REPLACE FUNCTION trg_customer() 
   RETURNS TRIGGER 
AS $$
begin
   insert into cart(customer_id) values (new.id);
   return null;
END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_Customer 
	after insert 
	on customer
	FOR EACH ROW
	EXECUTE PROCEDURE trg_customer();

INSERT INTO customer (LASTNAME, FIRSTNAME, EMAIL, PHONE, PASSWORD, id) 
	VALUES ('Hà Phan', 'Bảo Minh', 'haphanbaominh9675@gmail.com', '0912782832', '1292002', '002')

	
create table customerevaluate (
	description varchar(500),
	id varchar(10) PRIMARY key,
	user_id varchar(10),
	rate int,
	CONSTRAINT fk_customer
      FOREIGN KEY(user_id) 
	  REFERENCES customer(id)
)

create table adminAccount (
	email varchar UNIQUE,
	firstname varchar,
	lastname varchar,
	password varchar,
	role varchar,
	id varchar PRIMARY key
)

create table todolist (
	adminId varchar,
	status varchar,
	content varchar,
	id varchar PRIMARY key,
	CONSTRAINT fk_adminAccount
      FOREIGN KEY(adminId) 
	  REFERENCES adminAccount(id)
)

CREATE table store (
	facebook varchar,
    youtube varchar,
    logo varchar,
    phone varchar,
    address varchar,
	sale_span varchar[],
	title_1 varchar,
	description_1 varchar,
	span_1 varchar[],
	img_1 varchar,

	title_2 varchar,
	description_2 varchar,
	span_title_2 varchar,
	span_value_2 varchar,
	span_title_1 varchar,
	span_value_1 varchar,
	img_2 varchar
)

select * from orders

SELECT * FROM orders 
   WHERE EXTRACT(YEAR FROM createat) = 2022 and EXTRACT(MONTH FROM createat) = 10
   
   SELECT * FROM orders 
   WHERE EXTRACT(YEAR FROM createat) = 2022 and EXTRACT(MONTH FROM createat) = 10

SELECT count(id), EXTRACT(MONTH FROM createat) as Month FROM orders 
  WHERE EXTRACT(YEAR FROM createat) = 2022 group by EXTRACT(MONTH FROM createat)

create table visitorOnline (
	visit_at date
)

create table todolist (
	status varchar,
	text varchar
)

CREATE OR REPLACE FUNCTION delete_ordersdetil()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	 update orders set total = (select sum(total) as sum from ordersdetail where order_id = old.order_id group by order_id )
 		where id = old.order_id;
	delete from cart where sku = old.sku;
	return old;
END;
$$

CREATE OR REPLACE FUNCTION delete_product()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	delete from ordersdetail where sku = old.sku;
	delete from cart where sku = old.sku;
	return old;
END;
$$

CREATE OR REPLACE TRIGGER tg_orderdetail
  AFTER DELETE
  ON ordersdetail
  FOR EACH ROW
  EXECUTE PROCEDURE delete_ordersdetil();
  
 CREATE OR REPLACE TRIGGER tg_product
  BEFORE DELETE
  ON product
  FOR EACH ROW
  EXECUTE PROCEDURE delete_product();
  


  

 




