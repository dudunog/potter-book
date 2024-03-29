import { Spell } from '@/entities/Spell'
import { SpellPropsMock } from '@/tests/mocks/spell.mock'

describe('Spell', () => {
	beforeEach(() => cy.visit('/spells/c8f024e0-8b1a-441b-8138-013fdbf42e3e'))

	it('should present spell details', () => {
		cy.getByTestId('spell-details').should('exist')
	})

	it('should redirect to wiki when click on wiki button', () => {
		const spell = new Spell({
			...SpellPropsMock,
		})

		cy.origin(spell.wiki, () => {
			cy.on('uncaught:exception', e => {
				if (e.message.includes('Things went bad')) {
					cy.getByTestId('spell-details', {
						timeout: 10000,
					})
						.find('a')
						.first()
						.invoke('removeAttr', 'target')
						.click()

					cy.location('pathname', {
						timeout: 10000,
					}).should('contain', spell.wiki)
				}
			})
		})
	})

	it('should back to spells list when click in back button', () => {
		cy.getByTestId('back-button').click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('equal', '/spells')
	})
})
