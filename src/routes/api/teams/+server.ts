// src/routes/api/teams/index.ts
import { prisma } from '$lib/prisma';
import { json } from '@sveltejs/kit';

import type { RequestEvent } from '@sveltejs/kit';

export const POST = async ({ request }: RequestEvent) => {
  const { name, password, logo } = await request.json();
  
  try {
    const team = await prisma.team.create({
      data: {
        name,
        password,
        logo: logo || null, // Wenn kein Logo übergeben wird, setzen wir es auf null
      },
    });
    return json(team, { status: 201 });
  } catch (error) {
    return json({ message: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
};

export async function GET() {
  try {
    // Alle Teams aus der Datenbank abrufen
    const teams = await prisma.team.findMany({
      include: {
        members: true, // Falls du auch die Mitglieder mit einbeziehen möchtest
        challenges: true, // Falls du auch die zugehörigen Challenges mit einbeziehen möchtest
      },
    });

    return new Response(JSON.stringify(teams), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Fehler beim Abrufen der Teams', { status: 500 });
  }
}

export async function DELETE({ request }: RequestEvent) {
  const { id } = await request.json();

  try {
    const deletedTeam = await prisma.team.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedTeam), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Fehler beim Löschen des Teams', { status: 500 });
  }
}

export async function PATCH({ request }: RequestEvent) {
  const { id, name, password, logo } = await request.json();

  try {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        password,
        logo: logo || null, // Wenn kein Logo übergeben wird, setzen wir es auf null
      },
    });

    return new Response(JSON.stringify(updatedTeam), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Fehler beim Aktualisieren des Teams', { status: 500 });
  }
}