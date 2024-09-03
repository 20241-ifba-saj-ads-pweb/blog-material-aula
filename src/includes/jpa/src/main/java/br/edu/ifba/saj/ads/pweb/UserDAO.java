package br.edu.ifba.saj.ads.pweb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class UserDAO {
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("UserPU");

    public void addUser(String name, String email) {//Create (Inserir um Novo Usuário)
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        User user = new User();
        user.setName(name);
        user.setEmail(email);

        em.persist(user); // Persiste a entidade no banco de dados
        em.getTransaction().commit();
        em.close();

        System.out.println("Usuário adicionado com sucesso.");
    }

    public void getUsers() {//Read (Consultar Usuários)
        EntityManager em = emf.createEntityManager();
        List<User> users = em.createQuery("SELECT u FROM User u", User.class).getResultList();

        for (User user : users) {
            System.out.println("ID: " + user.getId() + ", Name: " + user.getName() + ", Email: " + user.getEmail());
        }

        em.close();
    }

    public void updateUser(int id, String name, String email) {//Update (Atualizar um Usuário)
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        User user = em.find(User.class, id);  // Encontra o usuário pelo ID
        if (user != null) {
            user.setName(name);
            user.setEmail(email);
            em.getTransaction().commit();
            System.out.println("Usuário atualizado com sucesso.");
        } else {
            System.out.println("Usuário não encontrado.");
            em.getTransaction().rollback();
        }

        em.close();
    }

    public void deleteUser(int id) {//Delete (Remover um Usuário)
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        User user = em.find(User.class, id);  // Encontra o usuário pelo ID
        if (user != null) {
            em.remove(user);  // Remove o usuário do banco de dados
            em.getTransaction().commit();
            System.out.println("Usuário removido com sucesso.");
        } else {
            System.out.println("Usuário não encontrado.");
            em.getTransaction().rollback();
        }

        em.close();
    }

}
