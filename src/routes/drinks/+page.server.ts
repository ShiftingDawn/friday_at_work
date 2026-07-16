import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({url, locals}) => {
    const showHidden = new URLSearchParams(url.search).has("hidden", "true")
    return {
        drinks: await prisma.drink.findMany({
            where: {
                workspaceId: locals.workspace!.id,
                hidden: false
            }
        }),
        hidden: showHidden ? await prisma.drink.findMany({
            where: {
                workspaceId: locals.workspace!.id,
                hidden: true
            }
        }) : undefined
    };
}

export const actions = {
    default: async ({request, locals}) => {
        const {data, success, error} = createScheme.safeParse(await request.formData());
        console.log({data, success, error});
        if (!success) {
            return fail(400);
        }
        const imageBytes = data?.image ? await data?.image?.bytes() : null;
        const imageType = data?.image && data.image.name.lastIndexOf(".") >= data.image.name.length - 5
            ? data.image.name.substring(data.image.name.lastIndexOf(".")) : null;
        await prisma.drink.create({
            data: {
                workspaceId: locals.workspace!.id,
                name: data?.name,
                price: data?.price,
                image: imageBytes ? `data:image/${imageType};base64,${imageBytes.toBase64()}` : null
            }
        });
    }
} satisfies Actions;

const createScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
    price: zfd.numeric(z.int().min(0)),
    image: zfd.file(z.instanceof(File).optional()),
});