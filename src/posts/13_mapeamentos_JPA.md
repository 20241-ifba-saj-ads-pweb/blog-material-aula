---
icon: edit
date: 2024-09-03 20:40:00.00 -3
category:
  - aula
tag:
  - persistencia
order: 13
---

# Relacionamentos com JPA

## Mapeamento Objeto-Relacional

O Mapeamento Objeto-Relacional, ou ORM (Object-Relational Mapping), é uma técnica que visa a integração entre o paradigma de programação orientada a objetos e o modelo relacional de bancos de dados. Em sistemas de software, os objetos são frequentemente usados para representar entidades do mundo real, enquanto os bancos de dados relacionais armazenam dados em tabelas. Essa diferença de paradigmas pode criar um descompasso, conhecido como "impedância", entre o modelo de objetos e o modelo relacional.

O ORM resolve esse problema ao mapear classes e objetos para tabelas e registros do banco de dados, permitindo que os desenvolvedores trabalhem com objetos e deixem que o ORM cuide da persistência desses objetos no banco de dados. Um dos principais benefícios dessa abordagem é que ela abstrai a complexidade do SQL, permitindo que os desenvolvedores interajam com os dados através de métodos e propriedades de objetos.

## Java Persistence API (JPA)

O Java Persistence API (JPA) é uma especificação Java que define como realizar o mapeamento objeto-relacional em aplicações Java. Ela fornece uma maneira padronizada de interagir com bancos de dados usando classes e objetos, sem a necessidade de escrever SQL explícito. O JPA não é uma implementação em si, mas uma especificação; frameworks como Hibernate, EclipseLink e OpenJPA implementam essa especificação.

Com JPA, os desenvolvedores podem mapear classes Java para tabelas no banco de dados, definir chaves primárias, relacionamentos entre entidades, e até mesmo executar consultas usando JPQL (Java Persistence Query Language), uma linguagem de consulta similar ao SQL, mas orientada a objetos.

### Mapeamento de Relacionamentos com JPA

Em sistemas complexos, as entidades geralmente estão relacionadas umas com as outras. JPA fornece anotações que permitem definir e gerenciar essas relações diretamente nas classes Java. Abaixo, discutiremos os principais tipos de relacionamentos:

#### Relacionamento Um-para-Muitos (One-to-Many)

No relacionamento um-para-muitos, uma entidade pode estar relacionada a muitas outras entidades. Por exemplo, um `Department` pode ter muitos `Employee`, mas cada `Funcionário` pertence a um único `Department`.

- **Mapeamento**:
    - A entidade do lado "um" (por exemplo, `Department`) é anotada com `@OneToMany`, e a entidade do lado "muitos" (por exemplo, `Employee`) é anotada com `@ManyToOne`.
    - No lado "um", a lista de objetos relacionados é representada como um `List` ou `Set`.
    - No lado "muitos", a relação é mantida com uma referência ao objeto do lado "um".

<figure>

```plantuml
class Department{
   - Long id
   - String name
   - List<Employee> employees
}
class Employee{
   - Long id
   - String name
   - Department department
}
Department ||-|{ Employee 

```
<figcaption>Relacionamento Um-para-Muitos (One-to-Many)</figcaption>

</figure>

- **Exemplo**:
    ```java
    @Entity
    public class Department {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;

        @OneToMany(mappedBy = "department")
        private List<Employee> employees;
    }

    @Entity
    public class Employee {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;

        @ManyToOne
        private Department department;
    }
    ```

#### Relacionamento Muitos-para-Um (Many-to-One)

O relacionamento muitos-para-um é o inverso do relacionamento um-para-muitos. Por exemplo, muitos `Employee` podem estar associados a um único `Department`.

- **Mapeamento**:
    - A entidade do lado "muitos" (por exemplo, `Employee`) é anotada com `@ManyToOne`, referenciando a entidade do lado "um".
    - A chave estrangeira que representa essa relação é gerada automaticamente.

<figure>

```plantuml
class Department{
   - Long id
   - String name
   - List<Employee> employees
}
class Employee{
   - Long id
   - String name
   - Department department
}
Department ||-|{ Employee 

```
<figcaption>Relacionamento Muitos-para-Um (Many-to-One)</figcaption>

</figure>

- **Exemplo**:
    ```java
    @Entity
    public class Employee {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;

        @ManyToOne
        private Department department;
    }
    ```
   

#### Relacionamento Muitos-para-Muitos (Many-to-Many)

Em um relacionamento muitos-para-muitos, várias instâncias de uma entidade podem estar relacionadas a várias instâncias de outra entidade. Por exemplo, `Student` podem se inscrever em vários `Courses`, e cada `Course` pode ter vários `Student` inscritos.

- **Mapeamento**:
    - Ambas as entidades são anotadas com `@ManyToMany`.
    - É comum criar uma tabela de junção (join table) para armazenar as associações entre as entidades, embora JPA possa gerar essa tabela automaticamente.
    - No mapeamento bidirecional, é importante definir um lado "dono" da relação usando a propriedade `mappedBy`.

<figure>

```plantuml
class Student{
   - Long id
   - String name
   - Set<Course> courses
}
class Course{
   - Long id
   - String title
   - Set<Student> students
}
Student }|-|{ Course 

```
<figcaption>Relacionamento Muitos-para-Um (Many-to-One)</figcaption>

</figure>

- **Exemplo**:
    ```java
    @Entity
    public class Student {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;

        @ManyToMany
        private Set<Course> courses;
    }

    @Entity
    public class Course {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String title;

        @ManyToMany(mappedBy = "courses")
        private Set<Student> students;
    }
    ```

#### Mapeamento de Enum
Quando uma entidade possui um atributo que é uma enumeração, JPA permite mapear essa enum diretamente para uma coluna no banco de dados. Isso pode ser feito armazenando o nome da constante ou o valor ordinal da enum.

- **Mapeamento**:
    - Usar a anotação `@Enumerated` para definir como o enum será mapeado (como `STRING` ou `ORDINAL`).

- **Exemplo**:
    ```java
    public enum Status {
        TODO,
        IN_PROGRESS,
        DONE;
    }

    @Entity
    public class Task {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String description;

        @Enumerated(EnumType.STRING)
        private Status status;
    }
    ```
