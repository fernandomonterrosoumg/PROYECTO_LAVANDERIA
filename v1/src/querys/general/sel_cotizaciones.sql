SELECT
    cliente.id_cliente,
    cliente.apellido,
    cliente.nombre,
    cotizacion.cotizacion_id,
    cotizacion.cotizacion_fecha,
    cotizacion.estado,
    cotizacion.fecha_devolucion,
    FLOOR(TRUNC(SYSDATE+1)-COTIZACION_FECHA) DIAS_TOTAL,
    FLOOR(FECHA_DEVOLUCION-TRUNC(SYSDATE)) DIAS_ENTREGA
FROM
         cotizacion
    INNER JOIN cliente ON cotizacion.id_cliente = cliente.id_cliente