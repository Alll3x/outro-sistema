  const SELECT_USERDATA = () => {
  return(
    `
    SELECT
      u.id AS IdUsuario,
      u.nome,
      u.telefone
    FROM
      ofmeclara.users u
    `
  )};

  const SELECT_USERDATA_ADDRESS_ID = (id) => {
  return(
    `
    SELECT
      u.id AS IdUsuario,
      u.nome,
      u.telefone,
      u.idEndereco,
      a.cep,
      a.rua,
      a.numero,
      a.bairro,
      a.cidade,
      a.uf
    FROM
      ofmeclara.users u
    JOIN 
      ofmeclara.addresses a ON u.idEndereco = a.id
    WHERE
      u.id = ${id}
    `
  )};

  const SELECT_USERDATA_ADDRESS = () => {
    return(
      `
      SELECT
        u.id AS IdUsuario,
        u.nome,
        u.telefone,
        u.idEndereco,
        a.cep,
        a.rua,
        a.numero,
        a.bairro,
        a.cidade,
        a.uf
      FROM
        ofmeclara.users u
      JOIN 
        ofmeclara.addresses a ON u.idEndereco = a.id
      `
  )};

  const SELECT_VEHICLES_BY_USERID = (id) =>{
    return(
      `
      SELECT 
        v.id as idVeiculo,
        v.marca, 
        v.modelo,
        v.ano,
        v.placa,
        v.anotacoes,
        v.idUsuario
      FROM 
        ofmeclara.vehicles v
      WHERE 
        v.idUsuario = ${id}
      `
    )
  }

  const SELECT_TICKET_BY_USERID = (id) =>{
    return(
    `
    SELECT 
      t.id as idTicket,
      t.status,
      t.garantia,
      t.idUsuario,
      t.idVeiculo,
      v.marca,
      v.modelo,
      v.ano,
      v.placa,
      v.anotacoes
    FROM 
      ofmeclara.tickets t
    JOIN 
      ofmeclara.vehicles v on t.idVeiculo = v.id
    WHERE 
      t.idUsuario = ${id}
    `
    )
  }
module.exports = {
  //Retorna apenas nome e telefone de todos os usuários
  SELECT_USERDATA,
  // Recebe id e retorna dados do usuário e endereço
  SELECT_USERDATA_ADDRESS_ID,
  //Retorna todos os dados de todos os usuários
  SELECT_USERDATA_ADDRESS,
  //Retorna todos os veículos cadastrados com base no id do usuário
  SELECT_VEHICLES_BY_USERID,
  //Retrona todas as fichas cadastradas com base no id do usuário
  SELECT_TICKET_BY_USERID,
}