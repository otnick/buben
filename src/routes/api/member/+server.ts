import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';


export const GET = async () => {
  const members = await prisma.member.findMany();
  return json(members);
};

// POST: Member erstellen
export async function POST({ request, cookies }) {
	const { name, password } = await request.json();

  const existing = await prisma.member.findFirst({ where: { name } });
  if (existing) throw new Error('Name bereits vergeben');

	const member = await prisma.member.create({
		data: { name, password }
	});

	cookies.set('memberId', member.id, {
		path: '/',
		httpOnly: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30 // 30 Tage
	});

	return json({ success: true, id: member.id });
}

export async function PUT({ request }) {
  const { memberId, teamId } = await request.json(); // memberId und teamId aus der Anfrage

  try {
    // Aktualisiere das Team des Members
    const updatedMember = await prisma.member.update({
      where: { id: memberId },
      data: {
        team: { connect: { id: teamId } }, // Verbinde das Member mit dem Team
      }
    });

    return new Response(JSON.stringify(updatedMember), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response('Fehler beim Zuweisen des Members zu einem Team', { status: 500 });
  }
}

export const DELETE = async ({ request }) => {
  const { id } = await request.json();

  try {
    await prisma.member.delete({
      where: { id }
    });
    return json({ success: true });
  } catch (error) {
    return json({ message: error instanceof Error ? error.message : 'Fehler beim Löschen' }, { status: 500 });
  }
};

export const PATCH = async ({ request }) => {
  const { name, password } = await request.json();

  try {
    const member = await prisma.member.findFirst({
      where: { name }
    });

    if (!member || member.password !== password) {
      return json({ message: 'Falscher Name oder Passwort' }, { status: 401 });
    }

    return json(member);
  } catch (error) {
    return json({ message: 'Login fehlgeschlagen' }, { status: 500 });
  }
};
