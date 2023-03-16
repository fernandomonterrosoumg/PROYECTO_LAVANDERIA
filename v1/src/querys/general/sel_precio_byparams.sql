SELECT
    precios.precio,
    precios.ser_pre_id,
    precios.sev_tipo_id,
    '0' TOTAL_NETO,
		'0'	PIEZAS
FROM
         precios
    INNER JOIN servicio_prenda ON precios.ser_pre_id = servicio_prenda.ser_pre_id
    INNER JOIN servicio_tipo ON precios.sev_tipo_id = servicio_tipo.sev_tipo_id
    where servicio_prenda.ser_pre_id=:ser_pre_id
    and servicio_tipo.sev_tipo_id=:sev_tipo_id