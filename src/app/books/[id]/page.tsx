'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useGetBook } from '@/app/books/hooks/use-get-book'
import { ChaptersList } from '@/app/books/components/chapters-list'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { FaArrowRightLong } from 'react-icons/fa6'

const BookSkeleton = () => (
	<Fragment>
		<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
			<Skeleton className="h-[1.5rem] w-full max-w-[25rem]" />
			<Skeleton className="h-[2.5rem] w-[5rem]" />
		</CardHeader>
		<CardContent className="flex flex-col md:flex-row gap-8">
			<div className="flex flex-col items-center gap-6">
				<Skeleton className="h-[18rem] w-[12.5rem]" />
				<Skeleton className="h-[1.3rem] w-[5.5rem] rounded-full" />
			</div>
			<div className="w-full flex flex-col gap-4">
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
				<div className="space-y-1">
					<Skeleton className="h-[1rem] w-[5rem]" />
					<Skeleton className="h-[1rem] w-full" />
				</div>
			</div>
		</CardContent>
		<CardFooter className="mt-2 flex flex-col">
			<Skeleton className="h-[2.5rem] w-full" />
			<div className="mt-6 w-full flex flex-col gap-4">
				{Array.from({ length: 10 }, (_, index) => (
					<div key={index} className="space-y-1 w-full flex flex-col gap-4">
						<div className="flex flex-row items-center gap-2 justify-between">
							<Skeleton className="h-[1rem] w-full max-w-[12rem]" />
							<Skeleton className="h-[0.8rem] w-[0.8rem]" />
						</div>
						<Skeleton className="h-[0.1rem] w-full" />
					</div>
				))}
			</div>
		</CardFooter>
	</Fragment>
)

export default function Book() {
	const { id: bookId } = useParams()

	const { book, isLoading } = useGetBook({
		id: String(bookId),
	})

	return (
		<Fragment>
			{isLoading ? (
				<Card
					key={book?.id}
					className="my-4 bg-secondary border-green max-w-[52rem] w-full"
				>
					<BookSkeleton />
				</Card>
			) : (
				<Card
					data-testid="book-details"
					key={book?.id}
					className="my-4 bg-secondary border-green max-w-[52rem] w-full"
				>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="text-green max-w-[70%] font-bold">
							{book?.title}
						</CardTitle>
						<Link
							href={String(book?.wiki)}
							target="_blank"
							className="flex items-center gap-3"
						>
							<Button
								variant="default"
								className="flex items-center gap-3 bg-green"
							>
								Wiki
								<FaArrowRightLong />
							</Button>
						</Link>
					</CardHeader>
					<CardContent className="flex flex-col md:flex-row gap-8">
						{book?.cover && (
							<div className="flex flex-col items-center gap-6">
								<Image
									width={200}
									height={200}
									src={String(book?.cover)}
									className="transition-all hover:scale-105"
									alt="Book image"
								/>
								<Badge className="bg-green">{book?.pages} páginas</Badge>
							</div>
						)}
						<div className="flex flex-col gap-4">
							<div className="space-y-1">
								<p className="text-sm text-green font-bold leading-none">
									Autor
								</p>
								<p className="text-sm text-muted-foreground">{book?.author}</p>
							</div>
							<div className="space-y-1">
								<p className="text-sm text-green font-bold leading-none">
									Data de lançamento
								</p>
								<p className="text-sm text-muted-foreground">
									{book?.releaseDate}
								</p>
							</div>
							<div className="space-y-1 max-w-[35rem]">
								<p className="text-sm text-green font-bold leading-none">
									Dedicação
								</p>
								<p className="text-sm text-muted-foreground">
									{book?.dedication}
								</p>
							</div>
							<div className="space-y-1 max-w-[35rem]">
								<p className="text-sm text-green font-bold leading-none">
									Resumo
								</p>
								<p className="text-sm text-muted-foreground">{book?.summary}</p>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<ChaptersList bookId={String(bookId)} />
					</CardFooter>
				</Card>
			)}
		</Fragment>
	)
}
