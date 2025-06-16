import { hashPassword, compararSenha } from '../utils/hashPassword.js';
import { User as User } from '../models/user.js';
import { UserRepository } from '../repositories/userRepository.js';

export const UserService = {
  async criar({ nome, email, senha }) {
    if (!nome || !email || !senha) {
      throw new Error('Nome, e-mail e senha são obrigatórios');
    }

    const existe = UserRepository.buscarPorEmail(email);
    if (existe) throw new Error('Usuário já existe');

    const senhaCriptografada = await hashPassword(senha);
    const newUser = new User({ nome, email, senha: senhaCriptografada });

    UserRepository.salvar(newUser);
    return newUser;
  },

  listarTodos() {
    return UserRepository.listarTodos();
  },

  buscar(nome, id, email, dataCriacao) {
    const user = UserRepository.buscar(nome);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  },

  async atualizar(id, dados) {
    const user = UserRepository.buscarPorId(id);
    if (!user) throw new Error('Usuário não encontrado');

    if (dados.senha) {
      dados.senha = await hashPassword(dados.senha);
    }

    UserRepository.atualizar(dados);
    return user;
  },

  deletar(id) {
    const deletado = UserRepository.deletarPorId(id);
    if (!deletado) throw new Error('Usuário não encontrado');
  },

  async login(email, senha) {
    const user = UserRepository.buscarPorEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const senhaValida = await compararSenha(senha, user.senha);
    if (!senhaValida) throw new Error('Senha incorreta');

    return user;
  }
};