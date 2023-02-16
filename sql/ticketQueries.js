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

const SELECT_TICKET_BY_ID_WITH_USER_AND_CAR = (id) => {
  return (
    `
  SELECT
    t.id AS idTicket,
      t.status,
      t.garantia,
      DATE_FORMAT(t.createdAt, '%d-%m-%Y') AS createdAt,
    u.id AS idUsuario,
      u.nome,
      u.telefone,
    v.id AS idVeiculo,
      v.marca,
      v.modelo,
      v.ano,
      v.placa,
      v.anotacoes,
    a.id AS IdEndereco,
      a.cep,
      a.rua,
      a.numero,
      a.bairro,
      a.cidade,
      a.uf
  FROM
    ofmeclara.tickets t
  JOIN
    ofmeclara.users u
  ON
    t.idUsuario = u.id
  JOIN
    ofmeclara.vehicles v
  ON
    t.idVeiculo = v.id
  JOIN 
    ofmeclara.addresses a
  ON
    a.id = u.idEndereco
  WHERE
    t.id = ${id}
    `
  )
}

const SELECT_ITEMSTICKET_BY_TICKETID = (id) =>{
  return(  
    `
  SELECT
	  it.id AS idItemTicket,
      it.valorUn,
      it.quantidade,
      it.valorTot,
      DATE_FORMAT(it.createdAt, '%d-%m-%Y') AS createdAt,
    i.id As IdItem,
		  i.nome
  FROM
	  ofmeclara.itemtickets it
  JOIN 
	  ofmeclara.items i
  ON
	  i.id = it.idItem
  where
	  it.idTicket = ${id}
    `
  )
}
module.exports = {
  // RETORNA TODAS AS INFORMAÇÕES DO TICKET COM BASE NO ID DELE
    SELECT_TICKET_BY_ID, 
  // RETORNA TODAS AS INFORMAÇÕES COM BASE NO ID DELE
    SELECT_TICKET_BY_ID_WITH_USER_AND_CAR,
  //RETORNA TODAS OS ITEM DO TICKET
    SELECT_ITEMSTICKET_BY_TICKETID,
} 