/// <reference types="cypress" />

import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
    produtosPage.visitarUrl()
  });

  it('Deve selecionar um produto da lista', () => {
    cy.get(' .product-block')
        .first()
        .click()
        cy.get('#tab-title-additional_information > a').should('contain', 'Informação adicional')
});

it('Deve selecionar um produto da lista', () => {
    cy.get(' .product-block')
        .last()
        .click()
        cy.get('#tab-title-additional_information > a').should('contain', 'Informação adicional')
});

it('Deve selecionar um produto da lista', () => {
    cy.get(' .product-block')
        .eq(2)
        .click()
        cy.get('#tab-title-additional_information > a').should('contain', 'Informação adicional')
});

it('Deve buscar um produto com sucesso', () => {
  let produto = 'Aero Daily Fitness Tee'
  produtosPage.buscarProduto(produto)
  cy.get('.product_title').should('contain',produto)
});

it('Deve visitar a página do produto', () => {
  produtosPage.visitarProduto('Aero Daily Fitness Tee')
  cy.get('.product_title').should('contain','Aero Daily Fitness Tee')
});

it('Deve adicionar produto ao carrinho', () => {
  let qtd = 7 
  produtosPage.buscarProduto('Augusta Pullover Jacket')
  produtosPage.addProdutoCarrinho('M', 'Blue', qtd)
  cy.get('.woocommerce-message').should('contain', qtd + ' × “Augusta Pullover Jacket” foram adicionados no seu carrinho.')
});

it.only('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
  cy.fixture('produtos').then(dados => { 
      produtosPage.buscarProduto(dados[0,1,2].nomeProduto)
      produtosPage.addProdutoCarrinho(
          dados[0,1,2].tamanho, 
          dados[0,1,2].cor, 
          dados[0,1,2].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[0,1,2].nomeProduto)
  })
});
})