import type {Actions, PageServerLoad} from "./$types";
import {prisma} from "$lib/server/db";
import {zfd} from "zod-form-data";
import {z} from "zod";
import {fail} from "@sveltejs/kit";

export const load: PageServerLoad = async ({params, locals}) => {
    const [restocked, consumed] = await Promise.all([
        prisma.restock.aggregate({
            where: {drinkId: params.drink},
            _sum: {amount: true},
        }),
        prisma.consumption.count({
            where: {workspaceId: locals.workspace!.id, drinkId: params.drink}
        })
    ]);
    return {
        drink: await prisma.drink.findFirst({where: {workspaceId: locals.workspace!.id, id: params.drink,}}),
        stock: (restocked._sum.amount ?? 0) - consumed,
        last_restock: await prisma.restock.findFirst({
            where: {drinkId: params.drink},
            orderBy: {timestamp: "desc"}
        }),
    };
}

export const actions = {
    update: async ({request, params}) => {
        const {data, success, error} = updateScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        await prisma.drink.update({
            data: {
                name: data?.name,
                price: data?.price,
            },
            where: {id: params.drink}
        });
    },
    reskin: async ({request, params}) => {
        const {data, success, error} = reskinScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        const imageBytes = await data?.image.bytes();
        const imageType = data.image.name.substring(data.image.name.lastIndexOf("."));
        await prisma.drink.update({
            data: {image: imageBytes ? `data:image/${imageType};base64,${imageBytes.toBase64()}` : null},
            where: {id: params.drink}
        });
    },
    hide: async ({params}) => {
        const current = await prisma.drink.findFirst({where: {id: params.drink}});
        if (!current) {
            return fail(400);
        }
        await prisma.drink.update({
            where: {id: params.drink},
            data: {hidden: !current.hidden},
        });
    },
    restock: async ({request, params}) => {
        const {data, success, error} = restockScheme.safeParse(await request.formData());
        if (!success) {
            return fail(400);
        }
        await prisma.restock.create({
            data: {
                drinkId: params.drink,
                amount: data?.amount
            }
        });
    }
} satisfies Actions;

const updateScheme = zfd.formData({
    name: zfd.text(z.string().min(3)),
    price: zfd.numeric(z.int().min(0)),
});

const reskinScheme = zfd.formData({
    image: zfd.file(),
});

const restockScheme = zfd.formData({
    amount: zfd.numeric(z.int().min(1)),
})