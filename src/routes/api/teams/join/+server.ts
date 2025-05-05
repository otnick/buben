import { prisma } from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();
	const { name: teamName, member: memberName, password } = body;

	if (!teamName || !memberName) {
		return json({ message: 'Teamname und Mitgliedsname sind erforderlich' }, { status: 400 });
	}

	// 1. Team finden
	const team = await prisma.team.findFirst({
		where: { name: teamName },
		include: { members: true }
	});
	if (!team) {
		return json({ message: 'Team nicht gefunden' }, { status: 404 });
	}

	// 2. Passwort prüfen (falls gesetzt)
	if (team.password && team.password !== password) {
		return json({ message: 'Falsches Passwort' }, { status: 401 });
	}

	// 3. Member finden
	const member = await prisma.member.findUnique({
		where: { id: memberName }
	});
	if (!member) {
		return json({ message: 'Mitglied nicht gefunden' }, { status: 404 });
	}

	// 4. Prüfen ob Member schon in einem Team ist
	if (member.teamId) {
		return json({ message: 'Du bist bereits in einem Team' }, { status: 400 });
	}

	// 5. Member aktualisieren: Team beitreten
	await prisma.member.update({
		where: { id: member.id },
		data: { teamId: team.id }
	});

	return json({ message: `Beigetreten zu Team ${team.name}` });
};
