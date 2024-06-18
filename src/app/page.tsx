import { User } from "@prisma/client";
import { SearchElement } from "./_components/Search";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";

export default async function Home () {

	return (
		<div className="mt-24 flex flex-col w-vw h-svh">
			<SearchElement/>
			<div className="fixed top-10 right-10 p-2 px-3 bg-white rounded-lg border-2">
				<a href="/admin">Admin</a>
			</div>
		</div>
	)
}
