PGDMP     :                     |            konecta    14.1    14.1                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    17636    konecta    DATABASE     d   CREATE DATABASE konecta WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE konecta;
                postgres    false            �            1259    17689    Administrador    TABLE     g   CREATE TABLE public."Administrador" (
    "ID" integer NOT NULL,
    "ID_EMPLEADO" integer NOT NULL
);
 #   DROP TABLE public."Administrador";
       public         heap    postgres    false            �            1259    17688    Administrador_ID_seq    SEQUENCE     �   CREATE SEQUENCE public."Administrador_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public."Administrador_ID_seq";
       public          postgres    false    214            	           0    0    Administrador_ID_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public."Administrador_ID_seq" OWNED BY public."Administrador"."ID";
          public          postgres    false    213            �            1259    17645    Empleado    TABLE     �   CREATE TABLE public."Empleado" (
    "ID" integer NOT NULL,
    "FECHA_INGRESO" date NOT NULL,
    "NOMBRE" character varying NOT NULL,
    "SALARIO" integer NOT NULL,
    "CONTRASENA" character varying DEFAULT 'a'::character varying NOT NULL
);
    DROP TABLE public."Empleado";
       public         heap    postgres    false            �            1259    17644    Empleado_ID_seq    SEQUENCE     �   CREATE SEQUENCE public."Empleado_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."Empleado_ID_seq";
       public          postgres    false    210            
           0    0    Empleado_ID_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."Empleado_ID_seq" OWNED BY public."Empleado"."ID";
          public          postgres    false    209            �            1259    17675 	   Solicitud    TABLE     �   CREATE TABLE public."Solicitud" (
    "ID" integer NOT NULL,
    "CODIGO" character varying NOT NULL,
    "DESCRIPCION" character varying NOT NULL,
    "RESUMEN" character varying NOT NULL,
    "ID_EMPLEADO" integer NOT NULL
);
    DROP TABLE public."Solicitud";
       public         heap    postgres    false            �            1259    17674    Solicitud_ID_seq    SEQUENCE     �   CREATE SEQUENCE public."Solicitud_ID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Solicitud_ID_seq";
       public          postgres    false    212                       0    0    Solicitud_ID_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Solicitud_ID_seq" OWNED BY public."Solicitud"."ID";
          public          postgres    false    211            i           2604    17692    Administrador ID    DEFAULT     z   ALTER TABLE ONLY public."Administrador" ALTER COLUMN "ID" SET DEFAULT nextval('public."Administrador_ID_seq"'::regclass);
 C   ALTER TABLE public."Administrador" ALTER COLUMN "ID" DROP DEFAULT;
       public          postgres    false    214    213    214            f           2604    17648    Empleado ID    DEFAULT     p   ALTER TABLE ONLY public."Empleado" ALTER COLUMN "ID" SET DEFAULT nextval('public."Empleado_ID_seq"'::regclass);
 >   ALTER TABLE public."Empleado" ALTER COLUMN "ID" DROP DEFAULT;
       public          postgres    false    210    209    210            h           2604    17678    Solicitud ID    DEFAULT     r   ALTER TABLE ONLY public."Solicitud" ALTER COLUMN "ID" SET DEFAULT nextval('public."Solicitud_ID_seq"'::regclass);
 ?   ALTER TABLE public."Solicitud" ALTER COLUMN "ID" DROP DEFAULT;
       public          postgres    false    212    211    212                      0    17689    Administrador 
   TABLE DATA           >   COPY public."Administrador" ("ID", "ID_EMPLEADO") FROM stdin;
    public          postgres    false    214   �       �          0    17645    Empleado 
   TABLE DATA           ^   COPY public."Empleado" ("ID", "FECHA_INGRESO", "NOMBRE", "SALARIO", "CONTRASENA") FROM stdin;
    public          postgres    false    210   �                  0    17675 	   Solicitud 
   TABLE DATA           ^   COPY public."Solicitud" ("ID", "CODIGO", "DESCRIPCION", "RESUMEN", "ID_EMPLEADO") FROM stdin;
    public          postgres    false    212   <                  0    0    Administrador_ID_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."Administrador_ID_seq"', 1, true);
          public          postgres    false    213                       0    0    Empleado_ID_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Empleado_ID_seq"', 18, true);
          public          postgres    false    209                       0    0    Solicitud_ID_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."Solicitud_ID_seq"', 9, true);
          public          postgres    false    211            o           2606    17694     Administrador Administrador_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."Administrador"
    ADD CONSTRAINT "Administrador_pkey" PRIMARY KEY ("ID_EMPLEADO");
 N   ALTER TABLE ONLY public."Administrador" DROP CONSTRAINT "Administrador_pkey";
       public            postgres    false    214            k           2606    17652    Empleado ID 
   CONSTRAINT     ^   ALTER TABLE ONLY public."Empleado"
    ADD CONSTRAINT "ID" PRIMARY KEY ("ID") INCLUDE ("ID");
 9   ALTER TABLE ONLY public."Empleado" DROP CONSTRAINT "ID";
       public            postgres    false    210            m           2606    17687    Solicitud Solicitud_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."Solicitud"
    ADD CONSTRAINT "Solicitud_pkey" PRIMARY KEY ("ID");
 F   ALTER TABLE ONLY public."Solicitud" DROP CONSTRAINT "Solicitud_pkey";
       public            postgres    false    212            p           2606    17681    Solicitud ID_EMPLEADO    FK CONSTRAINT     �   ALTER TABLE ONLY public."Solicitud"
    ADD CONSTRAINT "ID_EMPLEADO" FOREIGN KEY ("ID_EMPLEADO") REFERENCES public."Empleado"("ID");
 C   ALTER TABLE ONLY public."Solicitud" DROP CONSTRAINT "ID_EMPLEADO";
       public          postgres    false    3179    210    212            q           2606    17695    Administrador ID_EMPLEADO    FK CONSTRAINT     �   ALTER TABLE ONLY public."Administrador"
    ADD CONSTRAINT "ID_EMPLEADO" FOREIGN KEY ("ID_EMPLEADO") REFERENCES public."Empleado"("ID");
 G   ALTER TABLE ONLY public."Administrador" DROP CONSTRAINT "ID_EMPLEADO";
       public          postgres    false    3179    214    210                  x�3�4����� ]      �   5  x����NC!���}�fn�&��I/��ts8@[kmSu���$r� !,>���Q@�x*�������x�(`-�m4�}{�g��Q�>>O����d�X�4�g��r�|x����|�%�LH���l���+m�U�kfO�G-9�L��'�12����Rk�h;��R�U���.y����LʮS&���SR��p�R9]44�:�b}�Z��&��n=[��2���w1��4ɷ�+���0m�,d[
@�\K=��𣧁�l-����e0ը�=�j���j��|�Q�`-���+`�v�G���/>�BOwB�/�~��          u   x���=�0@��>�O��2vd��X���  ��7#H��{%�]�`�eS6���I�F�t,i��%Vдu_btDJ����<^c�=x�;&<rF);�^��g➉&��T�D|     