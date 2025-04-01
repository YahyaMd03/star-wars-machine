'use client'

import { useActionState } from "react"
import { fetchCharacterDetails } from "@/actions/characters"
import { fetchCharacters } from "@/actions/characters"


export default function Test() {
    const [state, formAction, isPending] = useActionState(fetchCharacters, [])
    console.log(state)
    return (
        <div>{state} </div>
    )
}