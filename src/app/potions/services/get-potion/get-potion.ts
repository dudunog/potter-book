import { BaseApiResponse, ApiService } from '@/app/core'
import { Potion } from '@/app/entities/Potion'
import { httpClient } from '@/app/infra'

export type GetPotionAPIResponse = BaseApiResponse<{
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
}>

export type GetPotionDTO = Potion

export type GetPotionRequest = {
	id: string
}

type GetPotionResponse = Promise<GetPotionDTO>

export const getPotion = new ApiService<GetPotionRequest, GetPotionResponse>({
	cacheKey: 'potion',
	handler: async request => {
		const {
			data: { data: potion },
		} = await httpClient.get<GetPotionAPIResponse>(`/potions/${request.id}`)

		return new Potion({
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
			sideEffects: potion.attributes.side_effects,
			slug: potion.attributes.slug,
			time: potion.attributes.time,
			wiki: potion.attributes.wiki,
		})
	},
})
