import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export const DELETE = async ({ params }: RequestEvent) => {
    const { memberId } = params;
    console.log('Deleting member with ID:', memberId);

    if (!memberId) {
        return json({ error: 'Member ID is required' }, { status: 400 });
    }

    try {
        await prisma.member.delete({
            where: { id: memberId },
        });
        return json({ message: 'Member deleted successfully' });
    } catch (error) {
        return json({ error: 'Failed to delete member' }, { status: 500 });
    }
};