import { BASE_API_URL } from '@/constants'
import { http } from 'msw'

export const makeCharacterListResponse = () => ({
	data: [
		{
			id: 'ada30cc8-39dd-461b-9bac-0f5766fd4638',
			attributes: {
				alias_names: [],
				animagus: null,
				blood_status: null,
				boggart: null,
				born: null,
				died: null,
				eye_color: null,
				family_members: [],
				gender: null,
				hair_color: null,
				height: null,
				house: null,
				image: null,
				jobs: [],
				marital_status: null,
				name: '1992 Gryffindor vs Slytherin Quidditch match spectators',
				nationality: null,
				patronus: null,
				romances: [],
				skin_color: null,
				species: null,
				titles: [],
				wands: [],
				weight: null,
				wiki: 'https://harrypotter.fandom.com/wiki/1992_Gryffindor_vs_Slytherin_Quidditch_match_spectators',
			},
			links: {
				self: '/v1/characters/ada30cc8-39dd-461b-9bac-0f5766fd4638',
			},
		},
		{
			id: '3838614b-9eeb-4327-86c8-64d3fa838f7b',
			attributes: {
				alias_names: [],
				animagus: null,
				blood_status: null,
				boggart: null,
				born: null,
				died: null,
				eye_color: null,
				family_members: [],
				gender: null,
				hair_color: null,
				height: null,
				house: null,
				image: null,
				jobs: [],
				marital_status: null,
				name: 'Harry Potter',
				nationality: null,
				patronus: null,
				romances: [],
				skin_color: null,
				species: null,
				titles: [],
				wands: [],
				weight: null,
				wiki: 'https://harrypotter.fandom.com/wiki/1996_Gryffindor_Quidditch_Keeper_trials_spectators',
			},
			links: {
				self: '/v1/characters/3838614b-9eeb-4327-86c8-64d3fa838f7b',
			},
		},
		{
			id: 'e9f3d579-dfac-491c-bf72-9b2ad1d2ba2f',
			attributes: {
				alias_names: [],
				animagus: null,
				blood_status: null,
				boggart: null,
				born: 'Before 1927',
				died: null,
				eye_color: null,
				family_members: [],
				gender: 'Male (most likely)',
				hair_color: null,
				height: null,
				house: null,
				image:
					'https://static.wikia.nocookie.net/harrypotter/images/a/a6/2HeadedBaby.jpg',
				jobs: ['Circus performers'],
				marital_status: null,
				name: '2-Headed Baby',
				nationality: null,
				patronus: null,
				romances: [],
				skin_color: null,
				species: 'Human',
				titles: [],
				wands: [],
				weight: null,
				wiki: 'https://harrypotter.fandom.com/wiki/2-Headed_Baby',
			},
			links: {
				self: '/v1/characters/e9f3d579-dfac-491c-bf72-9b2ad1d2ba2f',
			},
		},
		{
			id: '18166a07-4528-4f8b-b189-dc892156e893',
			attributes: {
				alias_names: [],
				animagus: null,
				blood_status: 'Muggle',
				boggart: null,
				born: '1983',
				died: null,
				eye_color: null,
				family_members: [],
				gender: 'Female',
				hair_color: null,
				height: null,
				house: null,
				image: null,
				jobs: [],
				marital_status: null,
				name: '8-year-old Muggle girl',
				nationality: null,
				patronus: null,
				romances: [],
				skin_color: null,
				species: 'Human',
				titles: [],
				wands: [],
				weight: null,
				wiki: 'https://harrypotter.fandom.com/wiki/Unidentified_8-year-old_Muggle_girl',
			},
			links: {
				self: '/v1/characters/18166a07-4528-4f8b-b189-dc892156e893',
			},
		},
		{
			id: '70c77714-8ba9-4629-abb2-70c90d38fdf8',
			attributes: {
				alias_names: [],
				animagus: null,
				blood_status: null,
				boggart: null,
				born: '31 August 1982 or earlier',
				died: null,
				eye_color: null,
				family_members: [],
				gender: 'Male',
				hair_color: null,
				height: null,
				house: 'Gryffindor',
				image: null,
				jobs: [],
				marital_status: null,
				name: 'Aamir Loonat',
				nationality: 'British or Irish',
				patronus: null,
				romances: [],
				skin_color: null,
				species: 'Human',
				titles: [],
				wands: [],
				weight: null,
				wiki: 'https://harrypotter.fandom.com/wiki/Aamir_Loonat',
			},
			links: {
				self: '/v1/characters/70c77714-8ba9-4629-abb2-70c90d38fdf8',
			},
		},
	],
	meta: {
		pagination: {
			current: 1,
			next: 2,
			last: 460,
			records: 4592,
		},
		copyright: 'Copyright © Potter DB 2023',
		generated_at: '2023-12-29T20:59:58.692+00:00',
	},
	links: {
		self: 'https://api.potterdb.com/v1/characters?page[number]=1\u0026page[size]=10\u0026',
		current:
			'https://api.potterdb.com/v1/characters?page[number]=1\u0026page[size]=10',
		next: 'https://api.potterdb.com/v1/characters?page[number]=2\u0026page[size]=10',
		last: 'https://api.potterdb.com/v1/characters?page[number]=460\u0026page[size]=10',
	},
})

export const getCharactersSuccessResponseHandler = http.get(
	`${BASE_API_URL}characters`,
	async info => {
		const url = new URL(info.request.url)
		const nameFilter = url.searchParams?.get('filter[name_cont]')

		let filteredCharacters = makeCharacterListResponse().data

		if (nameFilter) {
			filteredCharacters = filteredCharacters.filter(character =>
				character.attributes.name
					.toLowerCase()
					.includes(nameFilter.toLowerCase()),
			)
		}

		return new Response(
			JSON.stringify({
				...makeCharacterListResponse(),
				data: filteredCharacters,
			}),
			{
				status: 200,
			},
		)
	},
)

export const getCharactersNullBodyResponseHandler = http.get(
	`${BASE_API_URL}characters`,
	async () => {
		return new Response(JSON.stringify({}), {
			status: 200,
		})
	},
)

export const getCharactersEmptyResponseHandler = http.get(
	`${BASE_API_URL}characters`,
	async () => {
		return new Response(
			JSON.stringify({
				meta: makeCharacterListResponse().meta,
				links: makeCharacterListResponse().links,
				data: [],
			}),
			{
				status: 200,
			},
		)
	},
)

export const getCharactersErrorResponseHandler = http.get(
	`${BASE_API_URL}characters`,
	async () => {
		return new Response(null, {
			status: 500,
		})
	},
)
