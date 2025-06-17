import { UserService } from '../services/userService.js';

export const userController = {
  async criar(req, res) {
    try {
      const token = req.headers['authorization'];
      if (token !== 'meu-token') return res.status(401).json({ erro: 'Token inválido' });

      const user = await UserService.criar(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  async listar(req, res) {
    try {
      const usuarios = await UserService.listarTodos();
      return res.json(usuarios);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  async buscar(req, res) {
    try {
      const { nome, id, email, dataCriacao } = req.query;
      if (!id) {
        return res.status(400).json({ erro: 'Id é obrigatório' });
      }

      const user = await UserService.buscar(nome, id, email, dataCriacao);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  async atualizar(req, res) {
    try {
      const token = req.headers['authorization'];
      if (token !== 'meu-token') return res.status(401).json({ erro: 'Token inválido' });

      const { id } = req.params;
      const dadosAtualizados = req.body;

      const usuarioAtualizado = await UserService.atualizar(id, dadosAtualizados);

      if (!usuarioAtualizado) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      return res.json({ mensagem: 'Usuário atualizado com sucesso', usuario: usuarioAtualizado });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  },

  async deletar(req, res) {
    try {
      const token = req.headers['authorization'];
      if (token !== 'meu-token') return res.status(401).json({ erro: 'Token inválido' });

      const sucesso = await UserService.deletar(req.params.id);
      if (!sucesso) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      return res.status(204).send();
    } catch (err) {
      return res.status(404).json({ erro: err.message });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const user = await UserService.login(email, senha);
      return res.status(200).json({
        mensagem: 'Login bem-sucedido',
        usuario: { id: user.id, nome: user.nome, email: user.email }
      });
    } catch (err) {
      return res.status(400).json({ erro: err.message });
    }
  }
};
