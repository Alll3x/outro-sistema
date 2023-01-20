const SELECT_USERDATA = () => {
  return(
    `SELECT
      u.id AS IdUsuario,
      u.nome,
      u.telefone
    FROM
      ofmeclara.users u`
  )};

const SELECT_USERDATA_ADDRESS_ID = (id) => {
  return(
    `SELECT
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
      u.id = ${id}`
  )};

  const SELECT_USERDATA_ADDRESS = () => {
    return(
      `SELECT
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
        ofmeclara.addresses a ON u.idEndereco = a.id`
    )};

module.exports = {
  //Retorna apenas nome e telefone de todos os usuários
  SELECT_USERDATA,
  // Recebe id e retorna dados do usuário e endereço
  SELECT_USERDATA_ADDRESS_ID,
  //Retorna todos os dados de todos os usuários
  SELECT_USERDATA_ADDRESS,
}