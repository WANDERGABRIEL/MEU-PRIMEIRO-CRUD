import { db } from "../config/firebaseConfig.js";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

const usersCollection = collection(db, "usuarios");

export const UserRepository = {
  async salvar(user) {
    const docRef = await addDoc(usersCollection, user);
    return { id: docRef.id, ...user };
  },

  async listarTodos() {
    const snapshot = await getDocs(usersCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async buscarPorEmail(email) {
    const q = query(usersCollection, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const docRef = snapshot.docs[0];
    return { id: docRef.id, ...docRef.data() };
  },

  async buscar(nome, id, email, dataCriacao) {
    const usuarios = await this.listarTodos();
    return usuarios.find(u => {
      if (id && u.id !== id) return false;
      if (nome && u.nome.toLowerCase() !== nome.toLowerCase()) return false;
      if (email && u.email.toLowerCase() !== email.toLowerCase()) return false;
      if (dataCriacao && u.dataCriacao !== dataCriacao) return false;
      return true;
    });
  },

  async buscarPorId(id) {
    const ref = doc(db, "usuarios", id);
    const snapshot = await getDoc(ref);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  },

  async deletarPorId(id) {
    const ref = doc(db, "usuarios", id);
    await deleteDoc(ref);
    return true;
  },

  async atualizarPorId(id, dados) {
    const ref = doc(db, "usuarios", id);
    await updateDoc(ref, dados);
    const atualizado = await getDoc(ref);
    return { id, ...atualizado.data() };
  }
};