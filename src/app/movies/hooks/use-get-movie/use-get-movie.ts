import { GetMovieRequest, getMovie } from '@/app/movies/services/get-movie'
import { useQuery } from '@tanstack/react-query'

export function useGetMovie(params?: GetMovieRequest) {
	const {
		data: movie,
		isLoading,
		isFetching,
		isSuccess,
		isError,
	} = useQuery({
		queryKey: getMovie.getCacheKey({
			id: params?.id,
		}),
		queryFn: async () => {
			const pageResult = await getMovie.execute(params)

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
		movie,
		isFetching,
		isLoading,
		isSuccess,
		isError,
	}
}
