# OpenChat

Backend da aplicação OpenChat desenvolvida para um desafio utilizando a Stack MERN.
O App consiste em um chat aberto onde usuários podem se cadastrar e enviar mensages em tempo real.

![](https://github.com/gustavocrvls/open-chat-frontend/blob/master/public/screenshots/chat_screen.png)

# O projeto
- [frontend](https://github.com/gustavocrvls/open-chat-frontend)
- [backend](https://github.com/gustavocrvls/open-chat-backend)

# Perfis de Usuário

- Usuário Padrão: Pode enviar e receber mensagens no grupo.
- Admin: Pode enviar, receber e filtrar mensagens no grupo.

# Funcionalidades

- Cadastrar usuários.
- Salvar novas mensagens no banco de dados.
- Enviar atualizações para o frontend quando uma mensagem for adicionada.
- Filtrar mensagens.

# Instalação

```bash
> npm install
```

# Inicialização
Precisa ter o mongodb rodando na máquina.

```bash
> npm start
```

Para que se possa usar a aplicação em outros aparelhos além do que ela está sendo executada é necessário que os equipamentos estejam conectados numa rede local, e que se faça a mudança da constante API_URL que se encontra em 'config/index.js' para o IP da máquina na rede.

# Author

Gustavo Carvalho Silva - [gustavocrvl42@gmail.com](mailto:gustavocrvl42@gmail.com) 

# Melhorias Futuras

- Adicionar autenticação no envio e recebimento das mensagens;
- Adicionar a autenticação no nas filtragems feitas pelo usuário do tipo Admin;
- Implementar função de excluir mensagens no perfil de Admin;
- Criar tela onde usuário admin possa adicionar usuários;
- Criar campo de senha na tela de login;

# Notas 

### Cadastro
A aplicação no momento permite que o usuário escolha na tela de cadastro se quer ser um usuário padrão ou um administrador, isso se deu pela necessidade da inserção manual do usuário do tipo administrador no banco, sendo assim, num ambiente de testes é mais simples a utilização dessa escolha.
