"use client";


import { api } from "~/trpc/react";
import { type LyricReduced } from "~/server/api/routers/lyrics";
import { type User } from "@prisma/client";

export function Card ({ data, user }: { data: LyricReduced, user?: User }) {
	const id = data.id;
	const title = data.title;
	const author = data.author;
	const content = data.content;
	console.log("Card received: ", title);

	return(
		<div className="mx-auto flex flex-row">
		<div className={`w-[0.5em]`}></div>
		<div className={"flex flex-col rounded bg-slate-300 m-3 p-4 border-box mx-auto "
					  + "min-w-[60vw] sm:min-w-[40vw] md:min-w-[25vw] lg:min-w-[15vw] "
					  + "max-w-[250px] sm:max-w-[45vw] md:max-w-[30vw] lg:max-w-[20vw] "
						}>

			<div className="flex flex-row w-full">
				<div className="font-semibold text-lg mr-auto whitespace-nowrap">{`${title}`}</div>
				{ user && user.admin && 
                    <button type="button" onClick={() => {
                            console.log("Removing card with id ", id)
                            api.lyrics.remove.useMutation({}).mutate({id})
                        }}>
                        X
                    </button>
                }
			</div>
			<div className="font-light text-sm whitespace-nowrap">{`${author}`}</div><br/>
			<div className="text-base whitespace-pre">{`${content}`}</div>
		</div>
		<div className={`w-[0.5em]`}></div>
		</div>
	);
}

export function Cards ({ data, user }: { data: (LyricReduced | null)[] | undefined, user?: User}) {

	console.log("Card collection received");

	return (
		<div className="flex mb-auto w-full">
			<div className='w-[5vw] md:w-[3vw]'></div>
			<div className="w-full flex flex-wrap">
                {data?.map( (element, i) => (
                    element === null 
                    ? null
                    : (<Card data={element} user={user} key={i}/>)
                ))}
			</div>
			<div className='w-[5vw] sm:w-[3vw] md:w-[1vw]'></div>
		</div>
	);
}
