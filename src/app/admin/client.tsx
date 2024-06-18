"use client";

import { Cards } from '../_components/Card';
import { SearchElement } from '../_components/Search';
import { api } from '~/trpc/react';
import { LyricReduced } from '~/server/api/routers/lyrics';
import { User } from '@prisma/client';

import { useRouter } from "next/navigation"

export function AdminLoggedIn ({ user }: { user: User }) {

	let isSearchToggle = false;
	let formData: LyricReduced = {
		id: 0,
		title: "Untitled",
		author: "-",
		content: "Empty"
	}

    const mutation = api.lyrics.add.useMutation();

	const handleSubmit = () => {
		let emptyFieldStr = `Found empty input fields in`;

		if (!formData?.title   || formData.title === "")    emptyFieldStr += ` title,`;
		if (!formData?.author  || formData.author === "")   emptyFieldStr+=` author,`;
		if (!formData?.content || formData.content === "")  emptyFieldStr+=` content,`;

        if (emptyFieldStr !== `Found empty input fields in`) {
            console.error(emptyFieldStr);
            alert(emptyFieldStr.slice(0, -1));
            return;
        }
        mutation.mutate(formData)
    }

	function setSearchToggle () {
		isSearchToggle = !isSearchToggle;
	}

	return (
	<div className='flex flex-col w-full h-fit'>
		<form className='mx-auto m-4 my-6 bg-slate-300 w-fit p-2 rounded'>
			<div className='flex flex-row'>
				<button type="button" onClick={handleSubmit} className='m-1 p-1 px-2 rounded bg-green-400'> Pateikti </button><br/>
			</div>
			<input placeholder='Pavadinimas...' onChange={(e) => {  formData.title = e.target.value;  }} type="text" name="title" className='h-8 w-80 p-1 rounded'/><br/>
			<div className='h-1'/>
			<input placeholder='Autorius...' onChange={(e) => {  formData.author = e.target.value;  }} type="text" name="author" className='h-8 w-80 p-1 rounded'/><br/>
			<div className='h-1'/>
			<textarea placeholder='Dainos žodžiai...' onChange={(e) => {  formData.content = e.target.value;  }} name="content" className='h-96 w-80 p-1 rounded'/><br/>
		</form>

		<div className="fixed top-10 right-36 p-2 px-3 bg-white rounded-lg border-2">
			<label>toggleSearch </label>
			<input onClick={setSearchToggle} type="checkbox" />
		</div>
  		<SearchElement user={user}/>
	</div>
	);
}


export function SigninRedirect () {
    const router = useRouter()
    router.push('/api/auth/signin')
    return (
        <h1> Redirecting so sign in page... </h1>
    )
}