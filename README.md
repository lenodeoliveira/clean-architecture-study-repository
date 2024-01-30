# Projeto de estudo clean architecture

## Use Case
- Inteção do usuário ou do sistema;
- Clareza de cada comportamento do software;
- Detalhes não devem impactar nas regras de negócio (framework, bancos e APIs não devem impactar as regras);

## Use Cases - SRP (Cada use case precisa ser diferente)
- Usecases precisam estar em conformidade com single responsibility principle (SRP), mesmo que seja parecido com outro usecase, pois cada usecase tem inteções diferentes;
- SRP (Single Responsability Principle) => mudam por razões diferentes;

## Duplicação real vs acidental
- (acidental) Duplição de validação nesse caso devemos usar o DRY (don't repeat yourself).
- (real) Caso de uso de inserção e de alteração;

## Usecase contam uma história (O fluxo dos use cases)

EX:

Montar dados para um novo emprestimo.
Input: Nome, endereço, data de nascimento, renda mensal.
OutPut: as mesmas informações para releitura mais a pontuação de crédito.

Curso primário:
1. Aceitar e validar o nome;
2. Validar endereço, data de nascimento e renda mensal;
3. Obter a pontuação de crédito de acordo com regras de negócio;
4. Se a pontuação de crédito for inferior a 500 ativar negação;
5. Caso contrário criar um usuário e ativar emprestimo estimado.

O usecase acessa as regras de negócio e gera um fluxo lógico de acordo com o que a empresa precisa.
O usecase dita a automação.

- Regras de negócio;
- Caso de uso;

O caso de uso seria parte da camada de aplicação.


## Limites arquiteturais

(Devices, Web, DB, External Interfaces, UI) **->** Controller, Gateways, Presenters<br/>
(Controllers, Gateways, Presenters) **->** Usecases<br/>
(Usecases) **->** Entities<br/>

(Frameworks e Drives): **Devices, Web, DB, External Interfaces, UI**.<br/>
(Interfaces e adaptadores): **Controllers, Gateways, Presenters**.<br/>
(Regras de negócios de aplicação): **Usecases**.<br/>
(Regras de negócios empresariais): **Entities**.<br/>

O Clean Architecture nos permite fazer uma separação decente dos limites arquiteturais para que os nossos componentes sejam divididos, contratos sejam estabelecidos e que o software consiga se comportar em fluxos e em momentos diferentes de acordo com esses componentes.

Tudo que não impacta diretamente nas regras de negócio não deve estar em um limite arquitetural diferente.
Ex: não será o frontend ou banco de dados que mudarão as regras de negócio da aplicação.

Se precisamos nos comunicar com uma camada de repositório, não podemos conectar diretamente com nosso repositório que fala com um banco `MYSQL` com a nossa regra de negócio. Primeiramente devemos criar uma interface para que a camada de negócio se comunique com essa interface que deve ser implementada por um repositório.

## Input vs OutPut

- No final do dia, tudo se resume a um Input que retorna um OutPut;
- Ex: 
    - Criar um pedido (dados do pedido = input);
    - Pedido criado (dados de retorno do pedido = output);
- Devemos simplificar nosso raciocínio ao criar um software sempre pensando em **Input** e **OutPut**;


### DTO (Data Transfer Object)

- Ajuda a trafegar os dados entre os limites arquiteturais;
- EX: 
    - Dado que está vindo da web precisa ser transformado para que possa ser enviado para o usecase;
- Objeto anêmico, sem comportamento (somente dados);
- Contém dados (DTO -> Input ou DTO -> OutPut);
- Sem regras de negócio ou comportamento;
- Cada intenção do sistema pode conter diferentes DTOs.

**EX:** 
- **API -> CONTROLLER -> USECASE -> ENTITY**
- Controller cria um DTO com os dados recebidos e envia para o Use Case;
- Use case executa seu fluxo, pega o resultado, cria um DTO para output e retorna para o Controller.


### Presenters

- Presenters são objetos de transformação. 
- Adequa o DTO de output no formato correto para entregar o resultado;
- Lembrando: um sistema pode ter diversos formatos de entrega: ex: `XML`, `JSON`, `Protobuf`, `GraphQL`, `CLI` etc. Os presenters transformam os dados recebidos via API para entregar nos formatos necessários.

**EX:**

<pre>
input = new CategoryInputDTO("name");
output = CreateCategoryUseCase(input); // retorna um DTO de output
jsonResult = CategoryPresenter(output).toJson(); // configura o formato da resposta para um json
xmlResult = CategoryPresenter(output).toXML(); // configura o formato da resposta para um XML
</pre>

## Entities vs DDD

- As entities da clean architecture são diferentes das entities do DDD;
- Clean Architecture define a entity como camada de regras de negócio;
- Elas se aplicam em qualquer situação;
- É uma camada invariável;
- É o core da aplicação;
- Não há definição explicita de como criar as entities;
- Normalmente utilizamos as táticas do DDD;

**EX:**<br/>
- Nessa camada podemos ter agregados, entidades, objetos de valor, contratos;
- Entities do clean architecture é uma resultante dos agregados e dos domains services do DDD;
- Normalmente é feita uma separação clara do que é agregado do que é domain service. São camadas diferentes que pertecem ao domínio;
- Entitie = Domínio (Agregados domain services, eventos);

> Sobre as diferenças:
* Entities na clean architecture: é uma camada, um conceito que diz que as regras de negócio devem estar nessa camada.
* Entities no Domain Driven Design: é a representação de algo único na aplicação. (Fazem parte eventualmente de um agregado).


> Por que um usecase não faz parte de uma entitie?
Porque o usecase pode variar de acordo com o fluxo, já a entitie não, ela tem a regra solidificada.










































