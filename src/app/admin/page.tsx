"use server";

import { getServerAuthSession } from '~/server/auth';
import { db } from '~/server/db';
import { AdminLoggedIn, SigninRedirect } from './client';

export default async function Admin () {

	const session = await getServerAuthSession();

	if (!session?.user)
		return (<SigninRedirect/>);

	
	const user = await db.user.findUnique({
		where: {
			id: session?.user.id,
		}
	})

	return (
		<>
		<div className="fixed top-10 right-10 p-2 px-3 bg-white rounded-lg border-2">
			<a href="/">Home</a>
		</div>
		{ !user 
			? "Error fetching user"
			: user.admin
             ? <AdminLoggedIn user={user}/>
             : "Ask head admin for permissions"
        }
		</>
	);
}

