---
icon: edit
date: 2024-09-23 20:20:00.00 -3
category:
  - atividade
tag:
  - entrega
order: 17
---


# Consumindo serviço REST

Add dependência para o WebClient no pom.xml

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-webflux</artifactId>
</dependency>
```

criar WebClient para recuperar lista
 
```java
@Service
public class EnderecoService {

    WebClient client = WebClient.create("http://localhost:8080");

    public Endereco get(Long id) {

        String responseBody = client.get()
                .uri("/api/enderecos/" + id)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        System.out.println(responseBody);
        // Convertendo a string JSON para uma lista de objetos Endereco
        ObjectMapper objectMapper = new ObjectMapper();
        Endereco endereco = null;
        try {
            endereco = objectMapper.readValue(responseBody, Endereco.class);
        } catch (JsonProcessingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return endereco;

    }

}

```
mapear como  Transient

```java
@Entity
public class Transportadora {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private Long enderecoId;
    @Transient
    private Endereco endereco;

```
chamar servico de endereço no serviço de transportadora
```java
@Service
public class TransportadoraService {

    @Autowired
    EnderecoService enderecoService;

    static List<Transportadora> transportadoras = List.of(new Transportadora(1l, "Sol", 1l), new Transportadora(1l, "Lua", 1l));

    public List<Transportadora> findAll(){
        for (Transportadora transportadora : transportadoras) {
            transportadora.setEndereco(enderecoService.get(transportadora.getEnderecoId()));
        }
        return transportadoras;        
    }
    
}
```