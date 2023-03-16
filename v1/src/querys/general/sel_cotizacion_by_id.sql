SELECT
    cotizacion.cotizacion_id,
    cotizacion_det.det_id_coti,
    cotizacion_det.del_pre_tot,
    cotizacion_det.del_pre_uni,
    cotizacion_det.det_cantidad,
    servicio_tipo.descripcion,
    servicio_prenda.prenda,
    cotizacion.pedido_total,
    cotizacion.estado,
    cotizacion.cotizacion_fecha,
    cotizacion.cantidad_prendas,
    cotizacion.fecha_devolucion,
    cotizacion.id_cliente
FROM
         cotizacion
    INNER JOIN cotizacion_det ON cotizacion.cotizacion_id = cotizacion_det.cotizacion_id
    INNER JOIN servicio_prenda ON servicio_prenda.ser_pre_id = cotizacion_det.ser_pre_id
    INNER JOIN servicio_tipo ON cotizacion_det.sev_tipo_id = servicio_tipo.sev_tipo_id
    where cotizacion.cotizacion_id=:cotizacion_id
    
    