export const state = () => ({
  staticIcons: [
    { id: 1, name: 'deck' },
    { id: 2, name: 'verified' },
    { id: 3, name: 'work' },
    { id: 4, name: 'assignment_ind' },
    { id: 5, name: 'outdoor_grill' },
    { id: 6, name: 'sports_esports' },
    { id: 7, name: 'outlet' },
    { id: 8, name: 'whatshot' },
    { id: 9, name: 'sick' },
    { id: 10, name: 'cruelty_free' },
    { id: 11, name: 'sports_baseball' },
    { id: 12, name: 'cookie' },
    { id: 13, name: 'paragliding' },
    { id: 14, name: 'ice_skating' },
    { id: 15, name: 'roller_skating' },
    { id: 16, name: 'handshake' },
    { id: 17, name: 'piano' },
    { id: 18, name: 'catching_pokemon' },
    { id: 19, name: 'hiking' },
    { id: 20, name: 'cake' },
  ],
})

export const getters = {
  getIcons: (state) => state.staticIcons,
}
