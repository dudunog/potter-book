import {
	DEFAULT_PAGINATION_PAGE,
	DEFAULT_PAGINATION_PAGE_SIZE,
} from '@/constants'
import { getCharacters } from '@/shared/services/get-characters'
import { server } from '@/setup-tests'
import {
	getCharactersErrorResponseHandler,
	getCharactersSuccessResponseHandler,
} from '@/tests/hooks/handlers'
import { HttpHandler } from 'msw'

const makeSut = (handler: HttpHandler) => {
	server.use(handler)

	return {}
}

describe('get-characters service', () => {
	test('should return a list of characters', async () => {
		makeSut(getCharactersSuccessResponseHandler)

		const characters = await getCharacters.execute()

		expect(characters.data).toHaveLength(5)
	})

	test('should return a list of characters when filters was passed', async () => {
		makeSut(getCharactersSuccessResponseHandler)

		const characters = await getCharacters.execute({
			name: 'Harry Potter',
			currentPage: DEFAULT_PAGINATION_PAGE,
			rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
		})

		expect(characters.data).toHaveLength(1)
	})

	test.fails('should fails when the request fails', async () => {
		makeSut(getCharactersErrorResponseHandler)

		const characters = await getCharacters.execute({
			name: 'Harry Potter',
			currentPage: DEFAULT_PAGINATION_PAGE,
			rowsPerPage: DEFAULT_PAGINATION_PAGE_SIZE,
		})

		expect(characters).toBeNull()
	})
})
