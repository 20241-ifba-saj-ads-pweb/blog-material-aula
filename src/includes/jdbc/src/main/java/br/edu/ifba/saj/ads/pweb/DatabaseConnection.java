package br.edu.ifba.saj.ads.pweb;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:h2:file:./database/storage;NON_KEYWORDS=user"; // URL do banco H2
    private static final String USER = "sa"; // Usuário padrão do H2
    private static final String PASSWORD = ""; // Senha padrão (vazia)

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
