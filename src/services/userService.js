import { hashPassword, compararSenha } from '../utils/hashPassword.js';
import { User as User } from '../models/user.js';
import { UserRepository } from '../repositories/userRepository.js';

export const UserService = {
  async criar({ nome, email, senha }) {
    if (!nome || !email || !senha) {
      throw new Error('Nome, e-mail e senha são obrigatórios');
    }

    const existe = await UserRepository.buscarPorEmail(email);
    if (existe) throw new Error('Usuário já existe');

    const senhaCriptografada = await hashPassword(senha);
    const newUser = new User({ nome, email, senha: senhaCriptografada });

    const userSalvo = await UserRepository.salvar(newUser);
    return userSalvo;
  },

  async listarTodos() {
    return await UserRepository.listarTodos();
  },

  async buscar(nome, id, email, dataCriacao) {
    const user = await UserRepository.buscar(nome, id, email, dataCriacao);
    if (!user) throw new Error('Usuário não encontrado');
    return user;
  },

  async atualizar(id, dados) {
    const user = await UserRepository.buscarPorId(id);
    if (!user) throw new Error('Usuário não encontrado');

    if (dados.senha) {
      dados.senha = await hashPassword(dados.senha);
    }

    dados.dataAtualizacao = new Date().toISOString();

    const userAtualizado = await UserRepository.atualizarPorId(id, dados);
    return userAtualizado;
  },

  async deletar(id) {
    const user = await UserRepository.buscarPorId(id);
    if (!user) throw new Error('Usuário não encontrado');
    await UserRepository.deletarPorId(id);
    return true;
  },

  async login(email, senha) {
    const user = await UserRepository.buscarPorEmail(email);
    if (!user) throw new Error('Usuário não encontrado');

    const senhaValida = await compararSenha(senha, user.senha);
    if (!senhaValida) throw new Error('Senha incorreta');

    return user;
  }
};
