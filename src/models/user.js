import crypto from 'crypto';

export class User {
  constructor({ nome, email, senha }) {
    this.id = crypto.randomUUID();
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCriacao = new Date().toISOString();
    this.dataAtualizacao = null;
  }

  atualizar(dados) {
    if (dados.nome) this.nome = dados.nome;
    if (dados.email) this.email = dados.email;
    if (dados.senha) this.senha = dados.senha;
    this.dataAtualizacao = new Date().toISOString();
  }
}