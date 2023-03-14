SELECT
    id_persona,
    nombre,
    apellido,
    direccion,
    telefono,
    identificacion,
    (
    SELECT COUNT(*) FROM CUENTA BB WHERE persona.id_persona=BB.ID_PERSONA
    ) NUM_CUENTAS
FROM
    persona