<script lang="ts">
  import { onTopic, send } from './lib/socket';
  import { TOPICS } from '../../topics';
  import type { Message } from './lib/types';
  import MessageBubble from './lib/MessageBubble.svelte';
  import ShadowBlurs from './lib/ShadowBlurs.svelte';
  import SendButton from './lib/SendButton.svelte';
  import DotBackground from './lib/DotBackground.svelte';

  let input = '';
  let messageDiv: HTMLDivElement;
  let messages: Message[] = [];
  let users: string | undefined[] = [];

  function scrollToBottom() {
    setTimeout(() => {
      messageDiv.scrollTop = messageDiv.scrollHeight;
    }, 0);
  }

  onTopic(TOPICS.NEW_MESSAGE, (data) => {
    messages = messages.concat({
      sentBy: 'other',
      message: data,
    });
    scrollToBottom();
  });

  onTopic(TOPICS.USER_JOIN, (data) => {
    console.log(data);
    users = data;
  });

  async function handleClick() {
    if (!input.trim()) return;
    send(TOPICS.NEW_MESSAGE, input);
    messages = messages.concat({
      sentBy: 'self',
      message: input,
    });
    input = '';
    scrollToBottom();
  }

  function handleDisplayNameChange(e: Event) {
    const target = e.target as HTMLInputElement;
    send(TOPICS.UPDATE_NAME, target.value);
  }
</script>

<main class="bg-black grid place-items-center h-full">
  <ShadowBlurs />
  <DotBackground />

  <div class="grid-container grid gap-2 w-full px-2 z-10">
    <div class=""></div>
    <div class="flex flex-col gap-2 relative w-80">
      <input
        on:input={(e) => handleDisplayNameChange(e)}
        class="h-6 flex justify-end bg-transparent text-gray-500 outline-none font-bold px-2 placeholder-gray-800"
        placeholder="Display Name"
        type="text"
      />
      <div
        bind:this={messageDiv}
        class="h-96 w-full no-scrollbar bg-black border-gray-500 border p-4 overflow-y-scroll flex flex-col gap-2"
      >
        {#each messages as message}
          <MessageBubble {message} />
        {/each}
      </div>
      <form on:submit|preventDefault={() => {}} class="group flex w-full gap-2">
        <input
          class="rounded-none w-full outline-none p-1 bg-black text-white border border-gray-500"
          bind:value={input}
          type="text"
        />
        <SendButton {handleClick} />
      </form>
    </div>
    <div class="text-gray-600 mt-8">
      <ul class="flex flex-col gap-2">
        {#each users as user}
          <li class="bg-black w-fit border border-gray-500 p-1 text-gray-500">
            {user || 'Unknown'}
          </li>
        {/each}
      </ul>
    </div>
  </div>
</main>

<style>
  .grid-container {
    grid-template-columns: 1fr auto 1fr;
  }
</style>
