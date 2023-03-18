SELECT
    servicio_prenda.prenda,
    servicio_tipo.descripcion,
    TO_CHAR(cotizacion_fecha, 'YYYY')YEAR,
    TO_CHAR(cotizacion_fecha, 'MONTH')MONTH,
    sum(CANTIDAD_PRENDAS) PIEZAS
FROM
         cotizacion
    INNER JOIN cotizacion_det ON cotizacion.cotizacion_id = cotizacion_det.cotizacion_id
    INNER JOIN servicio_prenda ON servicio_prenda.ser_pre_id = cotizacion_det.ser_pre_id
    INNER JOIN servicio_tipo ON servicio_tipo.sev_tipo_id = cotizacion_det.sev_tipo_id Group By SERVICIO_PRENDA.PRENDA, SERVICIO_TIPO.DESCRIPCION,TO_CHAR(cotizacion_fecha, 'YYYY'), TO_CHAR(cotizacion_fecha, 'MONTH')
    ,COTIZACION.CANTIDAD_PRENDAS