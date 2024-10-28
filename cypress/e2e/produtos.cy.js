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

it.only('Deve adicionar produto ao carrinho', () => {
  let qtd = 4 
  produtosPage.buscarProduto('Augusta Pullover Jacket')
  produtosPage.addProdutoCarrinho('M', 'Blue', qtd)
  cy.get('.woocommerce-message').should('contain', qtd + ' × “Augusta Pullover Jacket” foram adicionados no seu carrinho.')
});

it('Deve adicionar produto ao carrinho buscando da massa de dados', () => {
  cy.fixture('produtos').then(dados => { 
      produtosPage.buscarProduto(dados[0].nomeProduto)
      produtosPage.addProdutoCarrinho(
          dados[0].tamanho, 
          dados[0].cor, 
          dados[0].quantidade)
      cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
  })
})

it.only('Deve completar a compra do produto', () => {
  cy.fixture('produtos').then(dados => { 
      produtosPage.buscarProduto(dados[0].nomeProduto)
      produtosPage.addProdutoCarrinho(
          dados[0].tamanho, 
          dados[0].cor, 
          dados[0].quantidade)
          cy.get('.woocommerce-message > .button').click()
          cy.get('.checkout-button').click()
          cy.get('#billing_first_name').type('Gabriel')
          cy.get('#billing_last_name').type('Rodrigues')
          cy.get('#billing_address_1').type('Rua Martins Bastos')
          cy.get('#billing_address_2').type('Casa')
          cy.get('#billing_city').type('Uruguaiana')
          cy.get('#billing_postcode').type('97511168')
          cy.get('#billing_phone').type('55999054945')
          cy.get('#billing_email').type('gabrielrodrigues2223@hotmail.com')
          cy.get('#place_order').click()
          cy.get('#payment_method_bacs').click()
          cy.get('#terms').click()
          cy.get('#place_order').click()
          cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
  })
})
})