SELECT
    servicio_tipo.descripcion,
    servicio_prenda.prenda,
    servicio_tipo.*,
    servicio_prenda.*,
    lavanderia.factura_detalle.*,
    lavanderia.factura.*
FROM
         servicio_prenda
    INNER JOIN lavanderia.factura_detalle ON servicio_prenda.ser_pre_id = lavanderia.factura_detalle.ser_pre_id
    INNER JOIN servicio_tipo ON lavanderia.factura_detalle.sev_tipo_id = servicio_tipo.sev_tipo_id
    INNER JOIN lavanderia.factura ON lavanderia.factura.factura_id = lavanderia.factura_detalle.factura_id
    and cotizacion_id=:cotizacion_id