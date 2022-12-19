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

-- category
create table category (
	id varchar(10) PRIMARY key,
	name varchar(100),
	description varchar(500),
	image varchar
)

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
	images varchar[],
	
)

--address
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

-- orders
create table orders (
	address_id varchar(10),
	status varchar(20) DEFAULT 'Ordered',
	total float,
	customer_id varchar(10),
	pay_method varchar(10),
	id varchar(10) PRIMARY key,
	createat date DEFAULT CURRENT_DATE,
	CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customer(id),
	
	CONSTRAINT fk_address
      FOREIGN KEY(address_id) 
	  REFERENCES address(id)
)

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
	
--admin
create table adminAccount (
	email varchar UNIQUE,
	firstname varchar,
	lastname varchar,
	password varchar,
	role varchar,
	id varchar PRIMARY key
)

--todolist
create table todolist (
	adminId varchar,
	status varchar,
	content varchar,
	id varchar PRIMARY key,
	CONSTRAINT fk_adminAccount
      FOREIGN KEY(adminId) 
	  REFERENCES adminAccount(id)
)

--store info
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

--vistter
create table visitorOnline (
	visit_at date
)

--tg delete product
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

ALTER TABLE orders
ADD COLUMN pay_method varchar(10);

select * from cart
select * from product
select * from orders


drop table cart



select * from orders







