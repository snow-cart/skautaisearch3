"use client";

import { User } from "@prisma/client";
import { Cards } from "./Card";
import { useRef, useState, useCallback } from "react";
import { api } from "~/trpc/react";

export function SearchElement ({ user }: { user?: User}) {

	const [searchQuery, setSearchQuery] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	const query = api.lyrics.search.useQuery({ searchQuery: searchQuery })

	const doSearch = useCallback(() => {
		if (inputRef === null || inputRef.current === null) throw new Error ("Input ref not found");
		setSearchQuery(inputRef.current.value);
	}, [])


	return (
		<div className="flex flex-col w-vw h-svh">
			<div className="flex items-center max-w-sm mx-auto rounded bg-slate-300 p-2 px-3">
				<input type="text" name="searchQuery" placeholder="placeholder" className="rounded" required  ref={inputRef} /> 
				<button type="submit" onClick={ doSearch } className="p-2.5 ms-2 text-sm font-medium">
					<svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
					</svg>
				<span className="sr-only">Search</span>
			</button>
			</div>
			<Cards data={ query.data } user={user}/>
		</div>
	)
}