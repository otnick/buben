<script>
    let name = '';
    let password = '';
    let logo = ''; // Optional für das Logo
    let car = '';
    let captain = '';
  
    const submit = async () => {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, logo }),
      });
  
      if (response.ok) {
        const team = await response.json();
        console.log('Team erstellt:', team);
      } else {
        console.error('Fehler beim Erstellen des Teams');
      }
    };
  </script>
  
  <form on:submit|preventDefault={submit}>
    <label for="name">Teamname</label>
    <input type="text" bind:value={name} id="name" required />
  
    <label for="password">Passwort</label>
    <input type="password" bind:value={password} id="password" required />
  
    <label for="logo">Logo-URL (optional)</label>
    <input type="text" bind:value={logo} id="logo" />
  
    <button type="submit">Team erstellen</button>
  </form>