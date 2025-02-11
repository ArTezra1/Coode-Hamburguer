# Coode-Burguer 🍔
Um site incrível para uma hamburgueria!

A ideia por trás do Coode-Hamburguer surgiu de uma vontade de criar um projeto FullStack do zero, onde eu pudesse aprender todos os aspectos de uma aplicação completa. E o que poderia ser mais divertido e saboroso do que montar o site de uma hamburgueria? Mas não seria qualquer site, meu amigo! Eu queria algo dinâmico, interativo e com um uso fácil como os totens de pedidos que vemos no McDonald's e Burger King. Afinal, quem não ama fazer aquele pedido de forma rápida e prática?

🍟 A Ideia
A proposta do Coode-Hamburguer é oferecer uma experiência completa e eficiente tanto para os clientes quanto para os administradores da hamburgueria. Vou te contar como cada parte do site funciona:

🧑‍🍳 Para os Clientes:
Os usuários podem navegar pelo cardápio, adicionar itens ao carrinho, acompanhar o progresso do pedido em tempo real. Tudo isso, claro, de forma intuitiva, com um design pensado para que o processo de compra seja rápido e agradável. O cliente também pode ver o status do pedido enquanto ele avança - quase como se estivesse assistindo seu pedido ganhar vida!

🧑‍💻 Para os Administradores:
Os administradores têm o controle total sobre os produtos da hamburgueria. Com a funcionalidade CRUD (Criar, Ler, Atualizar, Deletar), é fácil gerenciar o cardápio de forma ágil e sem complicações. Eles também conseguem visualizar todos os pedidos em tempo real e, para facilitar o gerenciamento, usei o método Kanban para acompanhar o status de cada pedido. Assim, fica fácil saber em que parte do processo está o pedido de cada cliente, sem perder nenhum detalhe. E claro, existe uma comunicação direta e em tempo real com os clientes, garantindo uma experiência sem frustrações.

💻 Tecnologias Usadas:
Front-End:
Para criar uma interface moderna e responsiva, usei React com NextJS e Styled Components. Essa combinação garante que o site seja super intuitivo, com um design bonito e funcional para o cliente e para o administrador, em qualquer dispositivo. Não importa onde o cliente esteja, o site vai funcionar perfeitamente.

Back-End:
No back-end, a base é Express, onde criei a API que conecta todo o sistema. Para o banco de dados, escolhi MongoDB, que funciona de forma flexível e escalável, sem perder performance. A estrutura do código segue o famoso padrão MVC, proporcionando uma arquitetura limpa, organizada e fácil de entender.

Além disso, para garantir que o banco de dados fosse acessado de forma simples e eficaz, utilizei a lib Mongoose. Já para assegurar a integridade e segurança do projeto, implementei o bcrypt para criptografar senhas e o JsonWebToken (JWT) para gerenciar o login e as permissões de acesso. Tudo isso foi feito com o objetivo de criar uma aplicação robusta, segura e eficiente.

🔧 Outras Funcionalidades:
- Comunicação em tempo real: o sistema de chat entre cliente e administrador é completamente funcional e rápido, garantindo que não haja falhas na comunicação.
- Responsividade: o design se adapta perfeitamente a qualquer tela, seja no celular, tablet ou desktop.

Em resumo, o Coode-Hamburguer foi desenvolvido para ser um projeto desafiador e ao mesmo tempo divertido, com o objetivo de integrar o conhecimento de desenvolvimento FullStack em uma aplicação real, mas com um toque de sabor e muita paixão por hambúrgueres! 🍔💻
