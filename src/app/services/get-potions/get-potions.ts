import { BaseApiResponse, ApiService } from '@/app/core'
import { Potion } from '@/app/entities/Potion'
import { Pagination } from '@/app/entities/Pagination'
import { httpClient } from '@/app/infra'

export type GetPotionsAPIResponse = BaseApiResponse<
	{
		id: string
		type: string
		attributes: {
			characteristics: string
			difficulty: string
			effect: string
			image: string
			ingredients: string
			inventors: string
			manufacturers: string
			name: string
			side_effects: string
			slug: string
			time: string
			wiki: string
		}
	}[]
>

export type GetPotionsDTO = Potion

export type GetPotionsRequest = {
	name?: string
	currentPage: number
	rowsPerPage: number
}

type GetPotionsResponse = Promise<Pagination<GetPotionsDTO[]>>

export const getPotions = new ApiService<GetPotionsRequest, GetPotionsResponse>(
	{
		cacheKey: 'potions',
		handler: async request => {
			const { data } = await httpClient.get<GetPotionsAPIResponse>(
				`/potions?
					page[number]=${request.currentPage}&
					page[size]=${request.rowsPerPage}&
					${request.name ? `filter[name_cont]=${request.name}` : ''}`,
			)

			const potions = data.data.map(
				potion =>
					new Potion({
						id: potion.id,
						type: potion.type,
						characteristics: potion.attributes.characteristics,
						difficulty: potion.attributes.difficulty,
						effect: potion.attributes.effect,
						image: potion.attributes.image,
						ingredients: potion.attributes.ingredients,
						inventors: potion.attributes.inventors,
						manufacturers: potion.attributes.manufacturers,
						name: potion.attributes.name,
						side_effects: potion.attributes.side_effects,
						slug: potion.attributes.slug,
						time: potion.attributes.time,
						wiki: potion.attributes.wiki,
					}),
			)

			return new Pagination({
				itemsPerPage: 10,
				data: potions,
				page: data.meta?.pagination.current,
				totalPages: data.meta.pagination.last,
				totalRows: data.meta.pagination.records,
			})
		},
	},
)
