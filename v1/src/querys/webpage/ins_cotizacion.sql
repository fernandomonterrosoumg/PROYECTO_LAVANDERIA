INSERT INTO cotizacion (
    cotizacion_id,
    cotizacion_fecha,
    cantidad_prendas,
    fecha_devolucion,
    pedido_total,
    id_cliente
) VALUES (
    :cotizacion_id,
    sysdate,
    :cantidad_prendas,
    TO_DATE(:fecha_devolucion,'YYYY-MM-DD'),
    :pedido_total,
    :id_cliente
)