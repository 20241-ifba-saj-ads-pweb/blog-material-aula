---
icon: edit
date: 2024-09-02 20:20:00.00 -3
category:
  - aula
tag:
  - persistencia
order: 11
---

# Persistência de Dados

**Persistência de dados** refere-se à capacidade de uma aplicação manter dados de forma duradoura, de modo que esses dados permaneçam disponíveis mesmo após o término de uma sessão ou a interrupção do sistema. Em outras palavras, persistir dados significa armazená-los em um meio que não se perde quando o sistema é desligado, como em um banco de dados, arquivo, ou outro tipo de armazenamento permanente.

- **Dados Voláteis vs. Dados Persistentes**:
  - *Dados voláteis*: São armazenados temporariamente, como em variáveis de uma aplicação ou na memória RAM. Eles desaparecem quando o sistema é desligado ou a aplicação é reiniciada.
  - *Dados persistentes*: São mantidos em armazenamento duradouro, como bancos de dados ou arquivos no disco. Mesmo que o sistema seja desligado, esses dados ainda estarão disponíveis na próxima vez que a aplicação for executada.

## Persistência de Dados em Sistemas Web

Em sistemas web, a persistência de dados é crucial por várias razões:

- **Manutenção do Estado entre Sessões**:
  - Aplicações web geralmente são baseadas em requisições HTTP, que são *stateless* por natureza. Isso significa que, por padrão, cada requisição é independente das outras. Sem persistência de dados, seria _impossível(*)_ lembrar informações de uma requisição para outra.
  - Exemplo: Em um site de e-commerce, o carrinho de compras precisa persistir entre diferentes acessos ao site. Sem persistência, os itens do carrinho seriam perdidos cada vez que o usuário saísse da página.

- **Armazenamento de Informações do Usuário**:
  - Aplicações web muitas vezes precisam armazenar informações sobre os usuários, como perfis, preferências, histórico de atividades, e assim por diante.
  - Exemplo: Uma rede social precisa salvar os perfis dos usuários, suas postagens, comentários e outras interações.

- **Funcionalidade e Usabilidade**:
  - A persistência de dados permite que os usuários tenham uma experiência contínua e personalizada. Eles podem começar uma atividade em um dispositivo e continuar em outro, ou retomar uma tarefa de onde pararam, dias ou semanas depois.
  - Exemplo: Uma aplicação de gerenciamento de tarefas que lembra onde você parou, quais tarefas já completou, e quais ainda estão pendentes, independentemente de quantas vezes você acessar o sistema.

- **Integridade e Confiabilidade**:
  - A persistência de dados também é essencial para garantir que informações críticas não sejam perdidas. Isso é especialmente importante em sistemas que lidam com transações financeiras, registros médicos, ou qualquer outro tipo de dado sensível.
  - Exemplo: Em um banco, as transações precisam ser registradas com precisão para que o saldo da conta do cliente seja sempre atualizado corretamente.

## JDBC

**JDBC (Java Database Connectivity)** é uma API (Application Programming Interface) da linguagem Java que permite que aplicações Java se comuniquem com diferentes tipos de bancos de dados relacionais. Ele fornece um conjunto de interfaces e classes para conectar-se a um banco de dados, executar consultas e comandos SQL, e processar os resultados.

### Principais Componentes do JDBC

#### Driver Manager

É uma classe que gerencia um conjunto de drivers de banco de dados. Um driver JDBC é um componente que atua como uma ponte entre a aplicação Java e o banco de dados. O `DriverManager` é responsável por carregar os drivers apropriados e estabelecer uma conexão com o banco de dados.

```java
Connection conn = DriverManager.getConnection(url, user, password);
```

No exemplo acima, o método `getConnection` é usado para estabelecer uma conexão com o banco de dados usando a URL do banco, o nome de usuário e a senha.

#### Connection

Representa uma conexão ativa com um banco de dados. Através do objeto `Connection`, a aplicação pode interagir com o banco de dados, executando comandos SQL e gerenciando transações.
   
```java
Connection conn = DriverManager.getConnection(url, user, password);
```
::: important

As conexões devem ser fechadas após o uso para liberar os recursos.

:::

#### Statement

Uma `Statement` é usada para executar comandos SQL estáticos, como `SELECT`, `INSERT`, `UPDATE` ou `DELETE`. Existem três tipos principais de objetos `Statement` no JDBC:
   - **Statement**: Para executar consultas simples.
   - **PreparedStatement**: Para consultas parametrizadas, que são mais seguras e eficientes.
   - **CallableStatement**: Para executar stored procedures (procedimentos armazenados) em um banco de dados.

```java
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT * FROM users");
```

No exemplo acima, um objeto `Statement` é criado para executar uma consulta SQL que recupera todos os registros da tabela `users`.

#### ResultSet

Um `ResultSet` contém os dados retornados por uma consulta SQL. Ele atua como um cursor que aponta para os dados retornados e permite iterar sobre as linhas do resultado.
   
```java
while (rs.next()) {
    int id = rs.getInt("id");
    String name = rs.getString("name");
    String email = rs.getString("email");
    System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
}
```

Neste exemplo, o `ResultSet` é usado para iterar sobre os resultados da consulta e processar cada linha.

#### PreparedStatement

Uma `PreparedStatement` é uma versão pré-compilada de um `Statement`. Ela permite que você defina parâmetros nas consultas SQL, o que não só aumenta a segurança (prevenindo ataques de SQL injection), mas também melhora o desempenho em operações repetitivas.

```java
String sqlInsert = "INSERT INTO users (name, email) VALUES (?, ?)";
PreparedStatement pstmt = conn.prepareStatement(sqlInsert);
pstmt.setString(1, "Alice");
pstmt.setString(2, "alice@example.com");
pstmt.executeUpdate();
```

Neste exemplo, o `PreparedStatement` é usado para inserir um novo registro na tabela `users`, com os valores dos parâmetros sendo definidos dinamicamente.

#### CallableStatement

Usado para chamar stored procedures no banco de dados, que são procedimentos armazenados que podem realizar operações complexas.

```java
CallableStatement cstmt = conn.prepareCall("{call procedure_name(?, ?)}");
cstmt.setString(1, "param1");
cstmt.setInt(2, 123);
cstmt.execute();
```

Nesse exemplo, uma `CallableStatement` é usada para chamar uma stored procedure no banco de dados.

#### Benefícios do JDBC

- **Portabilidade**: JDBC permite que sua aplicação seja independente do banco de dados. Desde que você use a API JDBC, você pode mudar o banco de dados subjacente (como MySQL, Oracle, H2, etc.) com poucas ou nenhuma alteração no código.
  
- **Facilidade de Uso**: JDBC oferece uma interface simples para executar comandos SQL, gerenciar transações e processar resultados.

- **Flexibilidade**: JDBC suporta a execução de SQL dinâmico, permitindo que você construa consultas em tempo de execução com base nas necessidades da aplicação.

- **Segurança**: O uso de `PreparedStatement` previne SQL injection, uma vulnerabilidade comum em sistemas que aceitam entrada de dados do usuário.

#### Como o JDBC Funciona

1. **Carregamento do Driver**(JDBC versões mais antigas):
   - Antes de conectar-se a um banco de dados, é necessário carregar o driver JDBC específico do banco. Este driver é responsável por traduzir as chamadas JDBC para comandos específicos do banco de dados.
   
   ```java
   Class.forName("org.h2.Driver"); // Carrega o driver do H2
   ```

2. **Conexão ao Banco de Dados**:
   - Usando o `DriverManager`, a aplicação estabelece uma conexão com o banco de dados.
   
   ```java
   Connection conn = DriverManager.getConnection("jdbc:h2:~/test", "sa", "");
   ```

3. **Execução de Comandos SQL**:
   - Com a conexão estabelecida, a aplicação pode criar um `Statement` ou `PreparedStatement` para executar comandos SQL.
   
   ```java
   Statement stmt = conn.createStatement();
   ResultSet rs = stmt.executeQuery("SELECT * FROM users");
   ```

4. **Processamento dos Resultados**:
   - O `ResultSet` contém os resultados da consulta, que podem ser processados linha por linha.
   
   ```java
   while (rs.next()) {
       System.out.println(rs.getString("name"));
   }
   ```

5. **Fechamento dos Recursos**:
   - É crucial fechar os recursos (`Connection`, `Statement`, `ResultSet`) após o uso para evitar vazamentos de recursos.
   
   ```java
   rs.close();
   stmt.close();
   conn.close();
   ```
