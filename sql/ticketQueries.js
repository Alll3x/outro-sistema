const SELECT_TICKET_BY_ID = (id) => {
  return (
    `
    SELECT 
      t.id AS idTicket,
      t.status,
      t.valorFinal,
      t.garantia,
      t.idUsuario,
      t.idVeiculo
    FROM 
	    ${process.env.DB_NAME}.tickets t
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
      t.valorFinal,
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
    ${process.env.DB_NAME}.tickets t
  JOIN
    ${process.env.DB_NAME}.users u
  ON
    t.idUsuario = u.id
  JOIN
    ${process.env.DB_NAME}.vehicles v
  ON
    t.idVeiculo = v.id
  JOIN 
    ${process.env.DB_NAME}.addresses a
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
      it.idTicket,
      DATE_FORMAT(it.createdAt, '%d-%m-%Y') AS createdAt,
    i.id As IdItem,
		  i.nome
  FROM
	  ${process.env.DB_NAME}.itemtickets it
  JOIN 
	  ${process.env.DB_NAME}.items i
  ON
	  i.id = it.idItem
  where
	  it.idTicket = ${id}
    `
  )
}

const DELETE_ITEMSTICKET_BY_ITEMTICKETID = (id) =>{
  return(
  `
DELETE FROM 
  ${process.env.DB_NAME}.itemtickets
WHERE 
  id = ${id}
  `
  )
}

const UPDATE_TICKET_VALUE_BY_IDTICKET = (id, valor) =>{
  return(
  `
  UPDATE 
    ${process.env.DB_NAME}.tickets t
  SET
    t.valorFinal = ${valor}
  WHERE 
    t.id = ${id};
  `
  )
}

module.exports = {
  // RETORNA TODAS AS INFORMAÇÕES DO TICKET COM BASE NO ID DELE
    SELECT_TICKET_BY_ID, 
  // RETORNA TODAS AS INFORMAÇÕES COM BASE NO ID DELE
    SELECT_TICKET_BY_ID_WITH_USER_AND_CAR,
  // RETORNA TODAS OS ITEM DO TICKET
    SELECT_ITEMSTICKET_BY_TICKETID,
  // DELETA O ITEMTICKET PELO ID
    DELETE_ITEMSTICKET_BY_ITEMTICKETID,
  // INSERE O VALOR FINAL DO TICKET
    UPDATE_TICKET_VALUE_BY_IDTICKET,
} 