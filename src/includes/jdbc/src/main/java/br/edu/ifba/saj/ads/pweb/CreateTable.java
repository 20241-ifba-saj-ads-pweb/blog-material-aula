package br.edu.ifba.saj.ads.pweb;

import java.sql.Connection;
import java.sql.Statement;

public class CreateTable {
    public static void main(String[] args) {
        String sqlCreate = "CREATE TABLE IF NOT EXISTS users ("
                + "id INT AUTO_INCREMENT PRIMARY KEY, "
                + "name VARCHAR(255), "
                + "email VARCHAR(255) "
                + ");";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement()) {

            stmt.execute(sqlCreate);
            System.out.println("Tabela 'users' criada com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
