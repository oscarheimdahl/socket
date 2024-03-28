<script lang="ts">
  type Message = {
    sentBy: 'self' | 'other';
    message: string;
  };
  const socket = new WebSocket('wss://' + window.location.host + '/connect');
  // const socket = new WebSocket('wss://' + 'localhost:8080' + '/connect');
  let input = '';
  let messages: Message[] = [];

  socket.addEventListener('open', (event) => {
    socket.send('1');
  });

  socket.addEventListener('message', (event) => {
    if (event.data === '1')
      return (messages = messages.concat({
        sentBy: 'other',
        message: 'Someone joined!',
      }));
    if (event.data === '2')
      return (messages = messages.concat({
        sentBy: 'other',
        message: 'Someone Left!',
      }));
    messages = messages.concat({
      sentBy: 'other',
      message: event.data,
    });
  });

  async function handleClick() {
    if (!input.trim()) return;
    socket.send(input);
    messages = messages.concat({
      sentBy: 'self',
      message: input,
    });
    input = '';
  }
</script>

<main class="bg-gray-950 grid place-items-center h-full">
  <div class="flex justify-between flex-col gap-1">
    <div class="messages h-96 bg-teal-100 rounded-t-sm p-2">
      {#each messages as message}
        <p class={`${message.sentBy === 'self' ? 'text-right' : ''}`}>
          {message.message}
        </p>
      {/each}
    </div>
    <form on:submit|preventDefault={() => {}} class="flex gap-1">
      <input class="rounded-bl-sm" bind:value={input} type="text" />
      <button
        class="bg-blue-200 px-1 rounded-br-sm"
        type="submit"
        on:click={handleClick}>Send</button
      >
    </form>
  </div>
</main>

<style>
</style>
