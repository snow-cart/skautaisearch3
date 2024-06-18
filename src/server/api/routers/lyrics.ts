import { z } from "zod";
import { type Lyric } from "@prisma/client";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";


export const lyricRouter = createTRPCRouter({

    all: publicProcedure
        .query( async ({ ctx }) => {
            return (await ctx.db.lyric.findMany({})).map( (value: Lyric) => { return LyricReduced.from(value)});
        }),

    select: publicProcedure
    .input(z.object({
        id: z.number().min(1),
    }))
    .query( async ({ ctx, input }) => {
        return LyricReduced.from( await ctx.db.lyric.findUnique({
            where:{
                id: input.id,
            }
        }))
    }),

    search: publicProcedure
        .input(z.object({
            searchQuery: z.string().min(0),
        }))
        .query ( async ({ctx, input}) => {
            return ( await ctx.db.lyric.findMany({
                where: {
                    OR: [
                        {
                            title: {
                            contains: input.searchQuery,
                            mode: 'insensitive', // optional, for case-insensitive search
                            },
                        },
                        {
                            author: {
                            contains: input.searchQuery,
                            mode: 'insensitive', // optional, for case-insensitive search
                            },
                        },
                        {
                            content: {
                            contains: input.searchQuery,
                            mode: 'insensitive', // optional, for case-insensitive search
                            },
                        },
                    ],
                }
            }))
            .map( (value: Lyric) => { return LyricReduced.from(value)});
        }),

    add: adminProcedure
        .input(z.object({ 
            title: z.string().min(1), 
            author: z.string().min(1), 
            content: z.string().min(1),
        }))
        .mutation( async ({ctx, input}) => {
            return LyricReduced.from(await ctx.db.lyric.create({
                data: {
                    title: input.title,
                    author: input.author,
                    content: input.content,
                    createdBy: {
                        connect: {
                            id: ctx.session.user.id
                        }
                    },
                },
            }))
        }),

    remove: adminProcedure
    .input(z.object({ 
        id: z.number().min(0),
    }))
    .mutation( async ({ctx, input}) => {
        return LyricReduced.from(await ctx.db.lyric.delete({
            where: {
                id: input.id,
            },
        }))
    }),
    
});

class LyricReduced {
    constructor({id, title, author, content}: {id: number, title: string, author: string, content: string}) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
    }
  
    static from(lyric: Lyric | null): LyricReduced | null {
        if (lyric === null) return null;
        return new LyricReduced({id: lyric.id, title: lyric.title, author: lyric.author, content: lyric.content});
    }
     
    public id: number;
    public title: string;
    public author: string;
    public content: string;

  }

export { type Lyric } from "@prisma/client";
export { LyricReduced };