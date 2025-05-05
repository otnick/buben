<script lang="ts">
    import { onMount } from 'svelte';
    import { invalidate } from '$app/navigation';
    import { page } from '$app/stores';
  
    let members: any = [];
    let name = '';
    let password = '';
    let error = '';
  
    // Lade Members beim Start
    async function loadMembers() {
      const res = await fetch('/api/member');
      if (res.ok) {
        members = await res.json();
      } else {
        error = 'Fehler beim Laden der Mitglieder';
      }
    }
  
    async function createMember() {
      const res = await fetch('/api/member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password })
      });
  
      if (res.ok) {
        name = '';
        password = '';
        await loadMembers();
      } else {
        const data = await res.json();
        error = data.message || 'Fehler beim Erstellen';
      }
    }

    async function deleteMember(id: string) {
        const res = await fetch('/api/member', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
        });

        if (res.ok) {
        await loadMembers();
        } else {
        const data = await res.json();
        error = data.message || 'Fehler beim Löschen';
        }
    }

  
    onMount(loadMembers);
  </script>
  
  <h1>Mitgliederverwaltung</h1>
  
  <form on:submit|preventDefault={createMember}>
    <input bind:value={name} placeholder="Name" required />
    <input bind:value={password} placeholder="Passwort" required type="password" />
    <button type="submit">Hinzufügen</button>
  </form>
  
  {#if error}
    <p style="color: red">{error}</p>
  {/if}
  
  <ul>
    {#each members as member}
        <li>
            <span>{member.name} {member.password}
                <button on:click={() => deleteMember(member.id)}>Löschen</button>
            </span>
        </li>
    {/each}
  </ul>
  