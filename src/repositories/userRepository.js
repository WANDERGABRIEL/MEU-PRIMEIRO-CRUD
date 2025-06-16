let users = [];

export const UserRepository = {
  salvar(user) {
    users.push(user);
    return user;
  },

  listarTodos() {
    return users;
  },

  buscarPorEmail(email) {
    return users.find(u => u.email === email);
  },

  buscar(nome, id, email, dataCriacao) {
    return users.find(u => {
      if (id && u.id !== id) return false;
      if (nome && u.nome.toLowerCase() !== nome.toLowerCase()) return false;
      if (email && u.email.toLowerCase() !== email.toLowerCase()) return false;
      if (dataCriacao && u.dataCriacao !== dataCriacao) return false;
      return true;
    });
  },

  buscarPorId(id) {
    return users.find(u => u.id === id);
  },

  deletarPorId(id) {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      return true;
    }
    return false;
  },

  atualizarPorId(id, dados) {
     const user = users.find(u => u.id === id);
    if (!user) {
      return null;
    }

    if (dados.nome) user.nome = dados.nome;
    if (dados.email) user.email = dados.email;
    if (dados.senha) user.senha = dados.senha;
    if (dados.dataAtualizacao) user.dataAtualizacao = dados.dataAtualizacao;

    return user;
  }
};