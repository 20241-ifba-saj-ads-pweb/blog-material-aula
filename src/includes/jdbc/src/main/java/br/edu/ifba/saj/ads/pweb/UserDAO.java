package br.edu.ifba.saj.ads.pweb;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

    public void addUser(String name, String email) {
        String sqlInsert = "INSERT INTO users (name, email) VALUES (?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sqlInsert)) {

            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.executeUpdate();
            System.out.println("Usuário adicionado com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void getUsers() {
        String sqlSelect = "SELECT * FROM users";

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement pstmt = conn.prepareStatement(sqlSelect);
                ResultSet rs = pstmt.executeQuery()) {

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateUser(int id, String name, String email) {
        String sqlUpdate = "UPDATE users SET name = ?, email = ? WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sqlUpdate)) {

            pstmt.setString(1, name);
            pstmt.setString(2, email);
            pstmt.setInt(3, id);
            pstmt.executeUpdate();
            System.out.println("Usuário atualizado com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteUser(int id) {
        String sqlDelete = "DELETE FROM users WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sqlDelete)) {

            pstmt.setInt(1, id);
            pstmt.executeUpdate();
            System.out.println("Usuário removido com sucesso.");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
