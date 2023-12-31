'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Book } from '@/entities/Book'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card'
import { ChaptersList } from '@/app/books/components/chapters-list'
import { FaArrowRightLong } from 'react-icons/fa6'
import { IoBookOutline } from 'react-icons/io5'

type BookDetailsProps = {
	book: Book
}

const BookDetails = ({ book }: BookDetailsProps) => {
	return (
		<Card
			data-testid="book-details"
			className="mt-2 mb-6 bg-secondary border-green max-w-[52rem] w-full"
		>
			<CardHeader className="flex items-center gap-4 justify-between xs:flex-row">
				<CardTitle className="mt-2 text-green font-bold w-full">
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
				<div className="flex flex-col items-center gap-6">
					{book?.cover ? (
						<Image
							width={200}
							height={200}
							src={book?.cover}
							className="transition-all hover:scale-105"
							alt="Book image"
						/>
					) : (
						<IoBookOutline
							data-testid="alternative-book-image"
							size="100%"
							className="text-green transition-all hover:scale-105"
							title="Alternative book image"
						/>
					)}
					{book?.pages && (
						<Badge className="bg-green">{book?.pages} páginas</Badge>
					)}
				</div>
				<div className="flex flex-col gap-4">
					<div className="space-y-1">
						<p className="text-sm text-green font-bold leading-none">Autor</p>
						<p className="text-sm text-muted-foreground">{book?.author}</p>
					</div>
					<div className="space-y-1">
						<p className="text-sm text-green font-bold leading-none">
							Data de lançamento
						</p>
						<p className="text-sm text-muted-foreground">{book?.releaseDate}</p>
					</div>
					<div className="space-y-1 max-w-[35rem]">
						<p className="text-sm text-green font-bold leading-none">
							Dedicação
						</p>
						<p className="text-sm text-muted-foreground">{book?.dedication}</p>
					</div>
					<div className="space-y-1 max-w-[35rem]">
						<p className="text-sm text-green font-bold leading-none">Resumo</p>
						<p className="text-sm text-muted-foreground">{book?.summary}</p>
					</div>
				</div>
			</CardContent>
			<CardFooter className="mt-4 flex flex-col">
				<ChaptersList bookId={book.id} />
			</CardFooter>
		</Card>
	)
}

export { BookDetails }
