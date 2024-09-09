---
icon: edit
date: 2024-09-09 20:40:00.00 -3
category:
  - aula
tag:
  - escopo
order: 14
---

# Persistir dados entre Requisições

Para persistir informações entre requisições de páginas, várias abordagens podem ser usadas, dependendo do escopo de persistência e da necessidade da aplicação. 

##  Cookies
Cookies são pequenos arquivos de texto armazenados no lado do cliente (navegador). Eles são enviados pelo servidor e automaticamente incluídos em todas as requisições subsequentes para o mesmo domínio, permitindo que informações sejam mantidas entre requisições.

::: code-tabs#java

@tab Jakarta EE

```java
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CookieServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // Criar um cookie
        Cookie cookie = new Cookie("username", "user123");
        cookie.setMaxAge(60 * 60 * 24); // Duração de 1 dia
        resp.addCookie(cookie);
        
        // Recuperar o cookie
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("username".equals(c.getName())) {
                    String username = c.getValue();
                    resp.getWriter().println("Welcome back, " + username);
                }
            }
        }
    }
}
```

@tab Spring

```java
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class CookieController {

    @GetMapping("/create-cookie")
    public String createCookie(HttpServletResponse response) {
        // Criar um novo cookie
        Cookie cookie = new Cookie("username", "user123");
        
        // Definir o tempo de vida do cookie (em segundos) - por exemplo, 1 dia
        cookie.setMaxAge(60 * 60 * 24);
        
        // Adicionar o cookie na resposta
        response.addCookie(cookie);
        
        // Redirecionar para uma página
        return "cookieCreated";
    }
}

```

:::

- **Vantagens**: Simples e direto, persistente entre fechamentos do navegador.
- **Desvantagens**: Limite de tamanho (geralmente 4KB), pode ser inseguro já que fica exposto ao cliente.



##  Session (Sessão HTTP)
As **sessões HTTP** permitem que o servidor armazene informações específicas para cada cliente. A sessão é identificada por um identificador único (**JSESSIONID**), que é armazenado no navegador, e as informações da sessão ficam no servidor.

- Exemplo de uso com Jakarta EE (Servlet):

```java
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class SessionServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        HttpSession session = req.getSession();
        
        // Armazenar informação na sessão
        session.setAttribute("username", "user123");

        // Recuperar a informação da sessão
        String username = (String) session.getAttribute("username");
        resp.getWriter().println("Hello, " + username);
    }
}
```

- **Vantagens**: Armazenamento no servidor, seguro, mantém dados do usuário entre requisições.
- **Desvantagens**: Ocupa memória no servidor, expira após um tempo inativo (configurável).



##  Application Context
O **Application Scope** é usado para armazenar informações que são compartilhadas entre todas as requisições e sessões de uma aplicação. Ele persiste até que o servidor seja reiniciado ou a aplicação seja redeployada.

- Exemplo com Jakarta EE (ServletContext):

```java
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ApplicationScopeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        ServletContext context = getServletContext();
        
        // Armazenar dados no escopo da aplicação
        context.setAttribute("globalMessage", "Welcome to the application!");

        // Recuperar dados
        String message = (String) context.getAttribute("globalMessage");
        resp.getWriter().println(message);
    }
}
```

- **Vantagens**: Compartilhado entre todos os usuários e sessões, útil para dados globais.
- **Desvantagens**: Todos os usuários veem as mesmas informações, pode causar problemas de concorrência se mal usado.



##  Escopo de Requisição
O escopo de requisição é utilizado para armazenar informações que duram apenas uma requisição HTTP. Ele é adequado para dados temporários que não precisam ser persistidos além da requisição atual.

- Exemplo com Jakarta EE (Request Scope):

```java
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RequestScopeServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        // Armazenar dado no escopo da requisição
        req.setAttribute("message", "This is a request-scoped message!");

        // Recuperar dado do escopo da requisição
        String message = (String) req.getAttribute("message");
        resp.getWriter().println(message);
    }
}
```

- **Vantagens**: Simples, não há risco de dados persistirem por mais tempo do que o necessário.
- **Desvantagens**: Dados são perdidos ao final da requisição.



##  Flash Scope
O **Flash Scope** é comumente usado em frameworks MVC, como JSF ou Spring MVC, para persistir dados entre requisições de redirecionamento (por exemplo, de um formulário POST para uma página GET). Ele é útil quando você precisa passar informações após uma ação sem usar a URL diretamente.

- **Exemplo em JSF:**

```java
import jakarta.enterprise.context.RequestScoped;
import jakarta.inject.Named;

@Named
@RequestScoped
public class FlashBean {

    public String submit() {
        FacesContext.getCurrentInstance().getExternalContext().getFlash().put("message", "Form successfully submitted!");
        return "success?faces-redirect=true"; // Redireciona para outra página
    }
}
```

Na página de destino, o valor `"message"` pode ser recuperado da variável de flash.

- **Vantagens**: Persiste por uma requisição subsequente (útil para redirecionamentos).
- **Desvantagens**: Não persiste além de uma requisição.



##  Banco de Dados
Para persistência de longo prazo e compartilhada entre sessões, o uso de um **banco de dados** é a solução mais comum. O banco de dados armazena as informações de forma persistente, independente da sessão ou da requisição.

- **Vantagens**: Totalmente persistente, compartilhado entre todos os usuários.
- **Desvantagens**: Maior complexidade e necessidade de integração com um sistema de persistência (JPA, JDBC, etc.).



## Resumos dos Escopo

| Escopo         | Persistência | Compartilhado entre Sessões | Exemplo de Uso                  |
|----------------|--------------|-----------------------------|----------------------------------|
| **Cookies**    | Persistente  | Não                         | Lembrar preferências do usuário |
| **Sessão**     | Temporário   | Não                         | Carrinho de compras             |
| **Aplicação**  | Persistente  | Sim                         | Configurações globais           |
| **Requisição** | Temporário   | Não                         | Dados de uma requisição         |
| **Flash**      | Temporário   | Não                         | Dados após redirecionamento     |
| **Banco de Dados** | Persistente | Sim                      | Dados críticos e persistentes   |

Essas técnicas são utilizadas de acordo com as necessidades da aplicação para armazenar e compartilhar informações entre requisições e usuários.

## Usos dos escopos com CDI

A definição de escopos para componetes é gerenciada principalmente pelo CDI (Context and Dependency Injection). O CDI oferece vários escopos pré-definidos que podem ser usados para controlar o ciclo de vida dos objetos injetados na aplicação. 


Quando desenvolvemos aplicações web com **Spring MVC** ou **Jakarta EE**, precisamos entender como os dados são armazenados e gerenciados em diferentes escopos durante o ciclo de vida de uma requisição. Diferentes escopos servem para diferentes propósitos, como o escopo de uma requisição HTTP, a sessão do usuário, ou mesmo o ciclo de vida global da aplicação.

### Escopo Request (Requisição)

O escopo de requisição (`@RequestScope`) é usado para definir um componente que existe apenas durante uma única requisição HTTP. Ele é criado no início de uma requisição e destruído no final.

#### Exemplo:

```java
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@RequestScope
public class RequestScopedBean {
    private String value = "Request Scoped Value";

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
```

- Controlador Spring MVC:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestController {

    @Autowired
    private RequestScopedBean requestScopedBean;

    @GetMapping("/request")
    public String getRequestScopedValue() {
        return requestScopedBean.getValue();
    }
}
```

Cada vez que você acessa a URL `/request`, um novo componente `RequestScopedBean` é criado. Assim, o valor desse componente está limitado àquela requisição em particular.



### Escopo Session (Sessão)

O escopo de sessão (`@SessionScope`) define um componente que é criado e associado à sessão do usuário. O componente permanece vivo enquanto a sessão do usuário durar.

#### Exemplo:

```java
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class SessionScopedBean {
    private int counter = 0;

    public int getCounter() {
        return counter;
    }

    public void incrementCounter() {
        counter++;
    }
}
```

- Controlador Spring MVC:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SessionController {

    @Autowired
    private SessionScopedBean sessionScopedBean;

    @GetMapping("/session")
    public String getSessionScopedValue() {
        sessionScopedBean.incrementCounter();
        return "Session Scoped Counter: " + sessionScopedBean.getCounter();
    }
}
```

O contador é mantido por toda a duração da sessão do usuário. Cada vez que o mesmo usuário acessa a URL `/session`, o contador é incrementado.



### Escopo Application (Singleton)

O escopo de aplicação (`@Scope("singleton")`, que é o padrão no Spring) define um componente que é instanciado uma única vez e vive durante todo o ciclo de vida da aplicação. Todos os usuários e requisições compartilham a mesma instância desse componente.

#### Exemplo:

```java
import org.springframework.stereotype.Component;

@Component
public class ApplicationScopedBean {
    private String value = "Application Scoped Value";

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
```

- Controlador Spring MVC:

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {

    @Autowired
    private ApplicationScopedBean applicationScopedBean;

    @GetMapping("/application")
    public String getApplicationScopedValue() {
        return applicationScopedBean.getValue();
    }

    @GetMapping("/setApplication")
    public String setApplicationScopedValue(String newValue) {
        applicationScopedBean.setValue(newValue);
        return "Updated value!";
    }
}
```

O valor do `ApplicationScopedBean` é compartilhado entre todas as requisições e usuários. Quando um usuário altera o valor, todos os usuários passam a visualizar o novo valor.

### Flash Scope

Flash Scope é usado para persistir dados entre requisições redirecionadas, comum em navegações de formulário (padrão POST-REDIRECT-GET).

No Spring MVC, o `FlashAttributes` é usado para armazenar dados temporários no Flash Scope durante um redirecionamento (geralmente via `RedirectAttributes`).

```java
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class FlashController {

    @PostMapping("/submitForm")
    public String submitForm(RedirectAttributes redirectAttributes) {
        // Armazenar dados no Flash Scope
        redirectAttributes.addFlashAttribute("message", "Form submitted successfully!");
        
        // Redirecionar para a página de sucesso
        return "redirect:/success";
    }

    @GetMapping("/success")
    public String successPage(Model model) {
        // O FlashAttribute "message" estará disponível aqui
        return "success";  // Mapeia para a página success.html (ou outro view resolver)
    }
}

```

form.html

```html
<form action="/submitForm" method="post">
    <label for="name">Enter your name:</label>
    <input type="text" id="name" name="name">
    <button type="submit">Submit</button>
</form>

```

success.html

```html
<h1>Success Page</h1>
<p th:text="${message}">Default message</p>

```


### WebSocket
WebSocket permite que o cliente e o servidor troquem dados de forma eficiente e em tempo real. Diferente do HTTP, onde cada requisição/Resposta é independente e isolada, o WebSocket estabelece uma conexão persistente que permite comunicação bidirecional contínua.

