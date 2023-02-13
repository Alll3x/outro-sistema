const SELECT_TICKET_BY_ID = (id) => {
  return (
    `
    SELECT 
      t.id AS idTicket,
      t.status,
      t.garantia,
      t.idUsuario,
      t.idVeiculo
    FROM 
	    ofmeclara.tickets t
    WHERE
	    t.id = ${id}
    `
  )
}

module.exports = {
  // RETORNA TODAS AS INFORMAÇÕES DO TICKET COM BASE NO ID DELE
    SELECT_TICKET_BY_ID,
}