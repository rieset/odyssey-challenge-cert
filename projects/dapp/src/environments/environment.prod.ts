export const environment = {
  production: true,

  apis: {
    nodes: 'https://nodes-testnet.wavesnodes.com',
    signer: 'https://testnet.waves.exchange/signer/',
    rest: 'https://nodes-testnet.wavesnodes.com',
    contractAddress: '3Mvbw1Sx9xtM6akJrBPorkPpp4B3sJRFPFX'
  },

  // Routing constants on page
  routing: {
    listing: '',
    entity: 'entity/:entityId',
    application: 'entity/:entityId/application',
    about: 'about',
    applyGrant: 'apply-grant/:entityId',
    setting: 'settings',
    create: 'create',
    stylesheet: 'stylesheet'
  }
}
