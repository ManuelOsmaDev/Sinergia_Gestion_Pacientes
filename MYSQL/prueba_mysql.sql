use prueba;
SELECT * FROM prueba.productos;


##indicando para cada uno su id_fabricante, id_producto, descripción,
#precio y precio con I.V.A. incluido (es el precio anterior aumentado en un 10%).
SELECT 
    id_fabricante,
    id_producto,
    descripcion,
    precio,
    ROUND(precio* 0.10,2) iva,
    ROUND(precio * 1.10, 2) AS precio_con_iva
FROM 
    productos;

# Obtenga la cantidad total de existencias por producto.
SELECT 
    id_producto,
    SUM(existencia) AS total_existencia
FROM 
    productos
GROUP BY 
    id_producto;
   
#Obtenga el promedio de precio por fabricante.
SELECT 
    id_fabricante,
    ROUND(AVG(precio), 2) AS promedio_precio
FROM 
    productos
GROUP BY 
    id_fabricante;

   
#Obtenga el producto con mayor precio.
   SELECT 
    id_fabricante,
    id_producto,
    descripcion,
    precio
FROM 
    productos
ORDER BY 
    precio DESC
LIMIT 1;
 

#////////////////////////////////
#Cargar en el sistema un nuevo pedido de 500 Curas que envió el fabricante Bic.
UPDATE productos
SET existencia = existencia + 500
WHERE id_fabricante = 'Bic' AND id_producto = '41003';


INSERT INTO productos (id_fabricante, id_producto, descripcion, precio, existencia)
VALUES ('Bic', '41003', 'Curas', 120, 500);


#/////////////////////

#El fabricante Osa ya no es nuestro proveedor y se deben eliminar sus productos de la BD.
DELETE FROM productos
WHERE id_fabricante = 'Qsa';




