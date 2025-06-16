import bcrypt from 'bcrypt';

export async function hashPassword(senha) {
  if (!senha) throw new Error('Senha necessária');
  return await bcrypt.hash(senha, 10);
}

export async function compararSenha(senha, hash) {
  return await bcrypt.compare(senha, hash);
}