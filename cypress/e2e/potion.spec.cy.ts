import { Potion } from '@/entities/Potion'
import { PotionPropsMock } from '@/tests/mocks/potion.mock'

describe('Potion', () => {
	beforeEach(() => cy.visit('/potions/2c2a3344-2193-4628-9022-890fd5d293b6'))

	it('should present potion details', () => {
		cy.getByTestId('potion-details').should('exist')
	})

	it('should redirect to wiki when click on wiki button', () => {
		const potion = new Potion({
			...PotionPropsMock,
		})

		cy.origin(potion.wiki, () => {
			cy.on('uncaught:exception', e => {
				if (e.message.includes('Things went bad')) {
					cy.getByTestId('potion-details', {
						timeout: 10000,
					})
						.find('a')
						.first()
						.invoke('removeAttr', 'target')
						.click()

					cy.location('pathname', {
						timeout: 10000,
					}).should('contain', potion.wiki)
				}
			})
		})
	})

	it('should change tab content when click in a tab', () => {
		const characteristicsTabKey = 'characteristics'

		cy.getByTestId(`${characteristicsTabKey}-tab-item-header`, {
			timeout: 10000,
		})
			.last()
			.click()

		cy.getByTestId(`${characteristicsTabKey}-tab-item-content`).should('exist')
	})

	it('should back to potions list when click in back button', () => {
		cy.getByTestId('back-button').click()

		cy.location('pathname', {
			timeout: 10000,
		}).should('equal', '/potions')
	})
})
