---
icon: edit
date: 2024-09-02 20:40:00.00 -3
category:
  - aula
tag:
  - persistencia
order: 12
---

# JDBC, JPA, Spring Data

## JDBC

Para ilustrar a persistência de dados usando JDBC (Java Database Connectivity) e o banco de dados H2, vamos considerar uma aplicação Java simples que realiza operações CRUD (Create, Read, Update, Delete) em uma tabela de usuários. O banco de dados H2 será utilizado por ser leve, rápido, e fácil de configurar, ideal para ambientes de desenvolvimento e testes.

### Configuração do Ambiente

1. **Dependências**:
   - Você precisa adicionar a dependência do H2 e do JDBC ao seu projeto. Se estiver usando Maven, adicione o seguinte ao seu `pom.xml`:
   
     ```xml
     <dependencies>
         <dependency>
             <groupId>com.h2database</groupId>
             <artifactId>h2</artifactId>
            <version>2.3.232</version>
         </dependency>
     </dependencies>
     ```

2. **Conexão com o Banco de Dados**:
   - Vamos conectar ao banco de dados H2 usando JDBC. Crie uma classe `DatabaseConnection` que gerencia a conexão.

     ```java
     import java.sql.Connection;
     import java.sql.DriverManager;
     import java.sql.SQLException;

     public class DatabaseConnection {
         private static final String URL = "jdbc:h2:file:./database/storage";  // URL do banco H2
         private static final String USER = "sa";             // Usuário padrão do H2
         private static final String PASSWORD = "";           // Senha padrão (vazia)

         public static Connection getConnection() throws SQLException {
             return DriverManager.getConnection(URL, USER, PASSWORD);
         }
     }
     ```

### Criando a Tabela de Usuários

Vamos criar uma tabela chamada `users` para armazenar os dados dos usuários.

```java
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
```

### Operações CRUD

Agora vamos implementar as operações CRUD usando JDBC.

1. **Create (Inserir um Novo Usuário)**:

```java
import java.sql.Connection;
import java.sql.PreparedStatement;

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
}
```

2. **Read (Consultar Usuários)**:

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

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
}
```

3. **Update (Atualizar um Usuário)**:

```java
import java.sql.Connection;
import java.sql.PreparedStatement;

public class UserDAO {

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
}
```

4. **Delete (Remover um Usuário)**:

```java
import java.sql.Connection;
import java.sql.PreparedStatement;

public class UserDAO {

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
```

### Testando as Operações CRUD

Finalmente, você pode testar as operações implementadas. Aqui está um exemplo de como você pode usar a classe `UserDAO` para realizar operações CRUD:

```java
public class Main {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();

        // Criar tabela (apenas na primeira execução)
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
```

##  JPA

**JPA (Java Persistence API)** é uma especificação Java para o gerenciamento de persistência de dados em aplicações. Ela abstrai a complexidade do JDBC, permitindo que os desenvolvedores trabalhem com entidades Java (objetos) em vez de escrever SQL manualmente. Vamos reescrever o exemplo anterior usando JPA com o banco de dados H2.

### Configuração do Ambiente

1. **Dependências**:
   - Para usar JPA com H2, você precisará adicionar as dependências do Hibernate (uma implementação popular do JPA) e do H2 ao seu projeto. Se estiver usando Maven, adicione o seguinte ao seu `pom.xml`:

     ```xml
     <dependencies>
         <dependency>
             <groupId>org.hibernate</groupId>
             <artifactId>hibernate-core</artifactId>
             <version>6.2.8.Final</version>
         </dependency>
         <dependency>
             <groupId>jakarta.persistence</groupId>
             <artifactId>jakarta.persistence-api</artifactId>
             <version>3.1.0</version>
         </dependency>
         <dependency>
             <groupId>com.h2database</groupId>
             <artifactId>h2</artifactId>
             <version>2.3.232</version>
         </dependency>
     </dependencies>
     ```

2. **Configuração do `persistence.xml`**:
   - O `persistence.xml` é o arquivo de configuração principal para JPA, onde você define detalhes como a unidade de persistência e as propriedades do banco de dados. Crie este arquivo em `src/main/resources/META-INF/persistence.xml`:

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>
     <persistence xmlns="https://jakarta.ee/xml/ns/persistence"
                  version="3.0">
         <persistence-unit name="UserPU">
             <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
             <class>br.edu.ifba.saj.ads.pweb.Usuario</class>
             <properties>
                 <property name="jakarta.persistence.jdbc.driver" value="org.h2.Driver"/>
                 <property name="jakarta.persistence.jdbc.url" value="jdbc:h2:file:./database/storage"/>
                 <property name="jakarta.persistence.jdbc.user" value="sa"/>
                 <property name="jakarta.persistence.jdbc.password" value=""/>
                 <property name="hibernate.dialect" value="org.hibernate.dialect.H2Dialect"/>
                 <property name="hibernate.hbm2ddl.auto" value="update"/>
                 <property name="hibernate.show_sql" value="true"/>
             </properties>
         </persistence-unit>
     </persistence>
     ```

     - **`hibernate.hbm2ddl.auto=update`**: Essa propriedade faz com que o Hibernate crie ou atualize as tabelas automaticamente com base nas entidades mapeadas.
     - **`hibernate.show_sql=true`**: Essa propriedade exibe o SQL gerado no console.

### Definição da Entidade `User`

A entidade `User` representará a tabela `users` no banco de dados.

```java
package br.edu.ifba.saj.ads.pweb;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;

    // Getters e Setters

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

### Operações CRUD com JPA

Agora vamos criar a classe `UserDAO` para realizar operações CRUD usando JPA.

1. **Create (Inserir um Novo Usuário)**:

```java
package br.edu.ifba.saj.ads.pweb;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class UserDAO {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("UserPU");

    public void addUser(String name, String email) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        Usuario user = new Usuario();
        user.setName(name);
        user.setEmail(email);

        em.persist(user);  // Persiste a entidade no banco de dados
        em.getTransaction().commit();
        em.close();

        System.out.println("Usuário adicionado com sucesso.");
    }
}
```

2. **Read (Consultar Usuários)**:

```java
package br.edu.ifba.saj.ads.pweb;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.List;

public class UserDAO {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("UserPU");

    public void getUsers() {
        EntityManager em = emf.createEntityManager();
        List<Usuario> users = em.createQuery("SELECT u FROM Usuario u", User.class).getResultList();

        for (Usuario user : users) {
            System.out.println("ID: " + user.getId() + ", Name: " + user.getName() + ", Email: " + user.getEmail());
        }

        em.close();
    }
}
```

3. **Update (Atualizar um Usuário)**:

```java
package br.edu.ifba.saj.ads.pweb;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class UserDAO {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("UserPU");

    public void updateUser(int id, String name, String email) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        Usuario user = em.find(Usuario.class, id);  // Encontra o usuário pelo ID
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
}
```

4. **Delete (Remover um Usuário)**:

```java
package br.edu.ifba.saj.ads.pweb;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class UserDAO {

    private EntityManagerFactory emf = Persistence.createEntityManagerFactory("UserPU");

    public void deleteUser(int id) {
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();

        Usuario user = em.find(Usuario.class, id);  // Encontra o usuário pelo ID
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
```

### Testando as Operações CRUD

Finalmente, aqui está um exemplo de como você pode usar a classe `UserDAO` para realizar as operações CRUD:

```java
package br.edu.ifba.saj.ads.pweb;

public class Main {
    public static void main(String[] args) {
        UserDAO userDAO = new UserDAO();

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
```
## Spring Data JPA

### Dependências

Adicione as seguintes dependências ao seu `pom.xml` para incluir o Spring Boot, Spring Data JPA e H2:

```xml
<dependencies>
    <!-- Spring Boot Starter Web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- H2 Database -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>

    <!-- Spring Boot Starter Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### Configuração do Spring Boot

Configure o `application.properties` para usar o banco de dados H2 e Spring Data JPA:

```properties
# Configurações do H2
spring.datasource.url=jdbc:h2:file:./database/storage
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# Configurações do JPA
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### Entidade 

```java
package br.edu.ifba.saj.ads.pweb.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;

    // Getters e Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
```

### DTO

```java
package br.edu.ifba.saj.ads.pweb.dto;

public record UserDTO(int id, String name, String email) {}

```

### UserMapper

```java
package br.edu.ifba.saj.ads.pweb.mapper;

import br.edu.ifba.saj.ads.pweb.model.Usuario;
import br.edu.ifba.saj.ads.pweb.dto.UserDTO;

public class UserMapper {

    public static UserDTO toDTO(Usuario user) {
        if (user == null) {
            return null;
        }
        return new UserDTO(user.getId(), user.getName(), user.getEmail());
    }

    public static Usuario toEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        Usuario user = new Usuario();
        user.setId(userDTO.id());
        user.setName(userDTO.name());
        user.setEmail(userDTO.email());
        return user;
    }
}

```

### Repositório

O Spring Data JPA simplifica a criação do repositório. Basta criar uma interface que estende `JpaRepository`.

```java
package br.edu.ifba.saj.ads.pweb.repository;

import br.edu.ifba.saj.ads.pweb.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Usuario, Integer> {
}
```

### UserService

```java
package br.edu.ifba.saj.ads.pweb.service;

import br.edu.ifba.saj.ads.pweb.dto.UserDTO;
import br.edu.ifba.saj.ads.pweb.mapper.UserMapper;
import br.edu.ifba.saj.ads.pweb.model.Usuario;
import br.edu.ifba.saj.ads.pweb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDTO addUser(UserDTO userDTO) {
        Usuario user = UserMapper.toEntity(userDTO);
        Usuario savedUser = userRepository.save(user);
        return UserMapper.toDTO(savedUser);
    }

    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    public UserDTO updateUser(UserDTO userDTO) {
        if (userRepository.existsById(userDTO.id())) {
            Usuario user = UserMapper.toEntity(userDTO);
            Usuario updatedUser = userRepository.save(user);
            return UserMapper.toDTO(updatedUser);
        } else {
            return null;
        }
    }

    public void deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
    }
}

```

### UserController

```java
package br.edu.ifba.saj.ads.pweb.controller;

import br.edu.ifba.saj.ads.pweb.dto.UserDTO;
import br.edu.ifba.saj.ads.pweb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public UserDTO addUser(@RequestBody UserDTO userDTO) {
        return userService.addUser(userDTO);
    }

    @GetMapping
    public List<UserDTO> getUsers() {
        return userService.getUsers();
    }

    @PutMapping
    public UserDTO updateUser(@RequestBody UserDTO userDTO) {
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
    }
}
```

### Application

```java
package br.edu.ifba.saj.ads.pweb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### Testando o Aplicativo

Inicie a aplicação Spring Boot e acesse o H2 Console em `http://localhost:8080/h2-console`. A URL JDBC para o console deve ser `jdbc:h2:file:./database/storage`.

#### Exemplo de Uso via cURL ou Postman:

- **Adicionar Usuário**:
  ```bash
  curl -X POST http://localhost:8080/users -H "Content-Type: application/json" -d '{"name":"Alice","email":"alice@example.com"}'
  ```

- **Obter Usuários**:
  ```bash
  curl http://localhost:8080/users
  ```

- **Atualizar Usuário**:
  ```bash
  curl -X PUT http://localhost:8080/users -H "Content-Type: application/json" -d '{"id":1,"name":"Alice Updated","email":"alice.updated@example.com"}'
  ```

- **Excluir Usuário**:
  ```bash
  curl -X DELETE http://localhost:8080/users/1
  ```

