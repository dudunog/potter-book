import { GetBookRequest, getBook } from '@/app/books/services/get-book'
import { useQuery } from '@tanstack/react-query'

export function useGetBook(params?: GetBookRequest) {
	const {
		data: book,
		isLoading,
		isFetching,
		isSuccess,
		isError,
	} = useQuery({
		queryKey: getBook.getCacheKey({
			id: params?.id,
		}),
		queryFn: async () => {
			const pageResult = await getBook.execute(params)

			if (pageResult) {
				return pageResult
			}

			return null
		},
		enabled: true,
		refetchOnWindowFocus: false,
		staleTime: Infinity,
		keepPreviousData: true,
	})

	return {
		book,
		isFetching,
		isLoading,
		isSuccess,
		isError,
	}
}
