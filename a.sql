PGDMP         5                w         	   dishorder    11.3    11.1 +    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    57228 	   dishorder    DATABASE     {   CREATE DATABASE dishorder WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE dishorder;
             erik    false            �            1259    57629    customer_orders    TABLE       CREATE TABLE public.customer_orders (
    customer_order_id integer NOT NULL,
    order_id integer DEFAULT 0 NOT NULL,
    order_date text NOT NULL,
    user_id integer NOT NULL,
    on_behalf_of_customer text NOT NULL,
    dish_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    unit_price real NOT NULL,
    currency text DEFAULT 'VND'::text NOT NULL,
    personal_comment text,
    created_date real DEFAULT 0 NOT NULL,
    created_by integer NOT NULL,
    review integer DEFAULT 0 NOT NULL,
    review_comment text
);
 #   DROP TABLE public.customer_orders;
       public         mastersesin    false            �            1259    57616 	   dish_tags    TABLE     ]   CREATE TABLE public.dish_tags (
    dish_id integer NOT NULL,
    tags_name text NOT NULL
);
    DROP TABLE public.dish_tags;
       public         mastersesin    false            �            1259    57672    dishes    TABLE     �  CREATE TABLE public.dishes (
    dish_id integer NOT NULL,
    supplier_code text NOT NULL,
    dish_type_code text NOT NULL,
    dish_code text NOT NULL,
    dish_description text,
    unit_price real NOT NULL,
    currency text DEFAULT 'VND'::text NOT NULL,
    review integer DEFAULT 0,
    popularity integer DEFAULT 0,
    created_date real DEFAULT 0 NOT NULL,
    created_by integer DEFAULT 0 NOT NULL,
    photo_thumbnail bytea,
    photo_default_id integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.dishes;
       public         mastersesin    false            �            1259    57670    dishes_dish_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dishes_dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dishes_dish_id_seq;
       public       mastersesin    false    204            �           0    0    dishes_dish_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dishes_dish_id_seq OWNED BY public.dishes.dish_id;
            public       mastersesin    false    203            �            1259    57652    orders_to_suppliers    TABLE     u  CREATE TABLE public.orders_to_suppliers (
    order_id integer NOT NULL,
    supplier_code text NOT NULL,
    order_date real NOT NULL,
    delivery_address text NOT NULL,
    total_amount real NOT NULL,
    currency text DEFAULT 'VND'::text NOT NULL,
    order_comment text,
    created_date real DEFAULT 0 NOT NULL,
    created_by integer NOT NULL,
    sent_date real
);
 '   DROP TABLE public.orders_to_suppliers;
       public         mastersesin    false            �            1259    57537    photos    TABLE     �   CREATE TABLE public.photos (
    photo_id integer NOT NULL,
    photo_type text NOT NULL,
    photo_type_id integer,
    photo_path text
);
    DROP TABLE public.photos;
       public         mastersesin    false            �            1259    57567 	   suppliers    TABLE     �  CREATE TABLE public.suppliers (
    supplier_code text NOT NULL,
    supplier_name text NOT NULL,
    email_address text NOT NULL,
    phone_number text,
    contact_name text,
    photo_thumbnail bytea,
    photo_default_id integer DEFAULT 0 NOT NULL,
    order_time_deadline real NOT NULL,
    minimum_order_quantity integer DEFAULT 1,
    minimum_order_amount real DEFAULT 0,
    currency text DEFAULT 'VND'::text NOT NULL,
    review integer DEFAULT 0 NOT NULL,
    popularity integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.suppliers;
       public         mastersesin    false            �            1259    57547    users    TABLE     c  CREATE TABLE public.users (
    user_id integer NOT NULL,
    email_address text,
    password text,
    first_name text NOT NULL,
    family_name text,
    photo_thumbnail bytea,
    photo_default_id integer DEFAULT 0 NOT NULL,
    creation_date real DEFAULT 0 NOT NULL,
    last_connection_date real DEFAULT 0 NOT NULL,
    profile integer DEFAULT 0
);
    DROP TABLE public.users;
       public         mastersesin    false            �            1259    57545    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public       mastersesin    false    198            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
            public       mastersesin    false    197            "           2604    57675    dishes dish_id    DEFAULT     p   ALTER TABLE ONLY public.dishes ALTER COLUMN dish_id SET DEFAULT nextval('public.dishes_dish_id_seq'::regclass);
 =   ALTER TABLE public.dishes ALTER COLUMN dish_id DROP DEFAULT;
       public       mastersesin    false    204    203    204                       2604    57550    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public       mastersesin    false    197    198    198            �          0    57629    customer_orders 
   TABLE DATA               �   COPY public.customer_orders (customer_order_id, order_id, order_date, user_id, on_behalf_of_customer, dish_id, quantity, unit_price, currency, personal_comment, created_date, created_by, review, review_comment) FROM stdin;
    public       mastersesin    false    201   ?:       �          0    57616 	   dish_tags 
   TABLE DATA               7   COPY public.dish_tags (dish_id, tags_name) FROM stdin;
    public       mastersesin    false    200   \:       �          0    57672    dishes 
   TABLE DATA               �   COPY public.dishes (dish_id, supplier_code, dish_type_code, dish_code, dish_description, unit_price, currency, review, popularity, created_date, created_by, photo_thumbnail, photo_default_id) FROM stdin;
    public       mastersesin    false    204   y:       �          0    57652    orders_to_suppliers 
   TABLE DATA               �   COPY public.orders_to_suppliers (order_id, supplier_code, order_date, delivery_address, total_amount, currency, order_comment, created_date, created_by, sent_date) FROM stdin;
    public       mastersesin    false    202   �:       �          0    57537    photos 
   TABLE DATA               Q   COPY public.photos (photo_id, photo_type, photo_type_id, photo_path) FROM stdin;
    public       mastersesin    false    196   ;       �          0    57567 	   suppliers 
   TABLE DATA               �   COPY public.suppliers (supplier_code, supplier_name, email_address, phone_number, contact_name, photo_thumbnail, photo_default_id, order_time_deadline, minimum_order_quantity, minimum_order_amount, currency, review, popularity) FROM stdin;
    public       mastersesin    false    199   A;       �          0    57547    users 
   TABLE DATA               �   COPY public.users (user_id, email_address, password, first_name, family_name, photo_thumbnail, photo_default_id, creation_date, last_connection_date, profile) FROM stdin;
    public       mastersesin    false    198   �;       �           0    0    dishes_dish_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.dishes_dish_id_seq', 8, true);
            public       mastersesin    false    203            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 15, true);
            public       mastersesin    false    197            6           2606    57641 $   customer_orders customer_orders_pkey 
   CONSTRAINT     q   ALTER TABLE ONLY public.customer_orders
    ADD CONSTRAINT customer_orders_pkey PRIMARY KEY (customer_order_id);
 N   ALTER TABLE ONLY public.customer_orders DROP CONSTRAINT customer_orders_pkey;
       public         mastersesin    false    201            4           2606    57623    dish_tags dish_tags_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.dish_tags
    ADD CONSTRAINT dish_tags_pkey PRIMARY KEY (dish_id, tags_name);
 B   ALTER TABLE ONLY public.dish_tags DROP CONSTRAINT dish_tags_pkey;
       public         mastersesin    false    200    200            :           2606    57690    dishes dishes_dish_code_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_dish_code_key UNIQUE (dish_code);
 E   ALTER TABLE ONLY public.dishes DROP CONSTRAINT dishes_dish_code_key;
       public         mastersesin    false    204            <           2606    57688     dishes dishes_dish_type_code_key 
   CONSTRAINT     e   ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_dish_type_code_key UNIQUE (dish_type_code);
 J   ALTER TABLE ONLY public.dishes DROP CONSTRAINT dishes_dish_type_code_key;
       public         mastersesin    false    204            >           2606    57686    dishes dishes_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_pkey PRIMARY KEY (dish_id);
 <   ALTER TABLE ONLY public.dishes DROP CONSTRAINT dishes_pkey;
       public         mastersesin    false    204            8           2606    57661 ,   orders_to_suppliers orders_to_suppliers_pkey 
   CONSTRAINT     p   ALTER TABLE ONLY public.orders_to_suppliers
    ADD CONSTRAINT orders_to_suppliers_pkey PRIMARY KEY (order_id);
 V   ALTER TABLE ONLY public.orders_to_suppliers DROP CONSTRAINT orders_to_suppliers_pkey;
       public         mastersesin    false    202            *           2606    57544    photos photos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (photo_id);
 <   ALTER TABLE ONLY public.photos DROP CONSTRAINT photos_pkey;
       public         mastersesin    false    196            0           2606    57582 %   suppliers suppliers_email_address_key 
   CONSTRAINT     i   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_email_address_key UNIQUE (email_address);
 O   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_email_address_key;
       public         mastersesin    false    199            2           2606    57580    suppliers suppliers_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_code);
 B   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_pkey;
       public         mastersesin    false    199            ,           2606    57561    users users_email_address_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_address_key UNIQUE (email_address);
 G   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_address_key;
       public         mastersesin    false    198            .           2606    57559    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public         mastersesin    false    198            A           2606    57647 ,   customer_orders customer_orders_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer_orders
    ADD CONSTRAINT customer_orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 V   ALTER TABLE ONLY public.customer_orders DROP CONSTRAINT customer_orders_user_id_fkey;
       public       mastersesin    false    198    3118    201            D           2606    57696 #   dishes dishes_photo_default_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_photo_default_id_fkey FOREIGN KEY (photo_default_id) REFERENCES public.photos(photo_id);
 M   ALTER TABLE ONLY public.dishes DROP CONSTRAINT dishes_photo_default_id_fkey;
       public       mastersesin    false    204    3114    196            C           2606    57691     dishes dishes_supplier_code_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_supplier_code_fkey FOREIGN KEY (supplier_code) REFERENCES public.suppliers(supplier_code);
 J   ALTER TABLE ONLY public.dishes DROP CONSTRAINT dishes_supplier_code_fkey;
       public       mastersesin    false    3122    204    199            B           2606    57662 :   orders_to_suppliers orders_to_suppliers_supplier_code_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders_to_suppliers
    ADD CONSTRAINT orders_to_suppliers_supplier_code_fkey FOREIGN KEY (supplier_code) REFERENCES public.suppliers(supplier_code);
 d   ALTER TABLE ONLY public.orders_to_suppliers DROP CONSTRAINT orders_to_suppliers_supplier_code_fkey;
       public       mastersesin    false    3122    202    199            @           2606    57583 )   suppliers suppliers_photo_default_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_photo_default_id_fkey FOREIGN KEY (photo_default_id) REFERENCES public.photos(photo_id);
 S   ALTER TABLE ONLY public.suppliers DROP CONSTRAINT suppliers_photo_default_id_fkey;
       public       mastersesin    false    196    3114    199            ?           2606    57562 !   users users_photo_default_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_photo_default_id_fkey FOREIGN KEY (photo_default_id) REFERENCES public.photos(photo_id);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT users_photo_default_id_fkey;
       public       mastersesin    false    198    196    3114            �      x������ � �      �      x������ � �      �   p   x�3����L*JM�NK,.�tJMM���42 �0?��0&��$�,�,�̔Ӑ���	��9#5�8U���(=���Д�`3|J�3�V+�g�d(�ei@� �w25      �      x������ � �      �      x�3�LIMK,�)��"�=... B�8      �   F   x������QJ-.I,-J�+�,��qH�M���K������
�T�4�T3SNCN0�s�\1z\\\ (�      �   f   x�3�����tH�M���K��s9K*9c�@Ȑ� �,�Bz%E�y��y镩y�E��:b*�ZM9K����K*�,-M��0��0 aNע�lt}1z\\\ ?�)�     