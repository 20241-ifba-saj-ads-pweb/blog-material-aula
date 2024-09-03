package br.edu.ifba.saj.ads.pweb;

public class Main {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();

        CreateTable.main(args);

        // Adicionar usuários
        userDAO.addUser("Alice", "alice@example.com");
        userDAO.addUser("Bob", "bob@example.com");

        // Consultar usuários
        userDAO.getUsers();

        // Atualizar um usuário
        userDAO.updateUser(1, "Alice Updated", "alice.updated@example.com");
        // Consultar novamente para ver a atualização
        userDAO.getUsers();
        // Remover um usuário
        userDAO.deleteUser(2);
        // Consultar novamente para ver a remoção
        userDAO.getUsers();
    }
}