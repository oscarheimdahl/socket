<script lang="ts">
  import Messages from './lib/Messages.svelte';
  import { onTopic, send } from './lib/socket';
  import { TOPICS } from '../../topics';
  import type { Message } from './lib/types';
  import ShadowBlurs from './lib/ShadowBlurs.svelte';
  import SendButton from './lib/SendButton.svelte';
  import DotBackground from './lib/DotBackground.svelte';
  import { addMessage } from './lib/store/store';

  let input = '';
  let displayNameInput: HTMLInputElement;
  let messages: Message[] = [];
  let users: string | undefined[] = [];

  onTopic(TOPICS.USER_JOIN, (data) => {
    users = data;
  });

  async function handleClick() {
    if (!input.trim()) return;
    send(TOPICS.NEW_MESSAGE, input);
    addMessage({
      sentBy: 'self',
      senderId: 'self',
      message: input,
      senderName: displayNameInput.value,
    });
    input = '';
  }

  function handleDisplayNameChange() {
    const lettersOnly = displayNameInput.value.replace(/[^a-z A-Z]/g, '');
    displayNameInput.value = lettersOnly;
    send(TOPICS.UPDATE_NAME, lettersOnly);
  }
</script>

<main class="bg-black grid place-items-center h-full">
  <ShadowBlurs />
  <DotBackground />

  <div
    class="grid-container gap-2 w-full px-2 z-10 flex justify-center sm:grid"
  >
    <div class="hidden sm:block"></div>
    <div class="flex flex-col gap-2 relative w-80">
      <input
        on:input={handleDisplayNameChange}
        bind:this={displayNameInput}
        class="h-6 flex justify-end bg-transparent text-gray-500 outline-none font-bold px-2 placeholder-gray-800"
        placeholder="Display Name"
        type="text"
      />
      <Messages />
      <form on:submit|preventDefault={() => {}} class="group flex w-full gap-2">
        <input
          class="rounded-none w-full outline-none p-1 bg-black text-white border border-gray-500"
          bind:value={input}
          type="text"
        />
        <SendButton {handleClick} />
      </form>
    </div>
    <div class="text-gray-600 mt-8 hidden sm:block">
      <ul class="flex flex-col gap-2">
        {#each users as user}
          {#if !user}
            <li
              class="bg-black italic w-fit border border-gray-500 px-2 py-1 text-gray-500"
            >
              Unknown
            </li>
          {:else}
            <li
              class="bg-black w-fit border border-gray-500 px-2 py-1 text-fuchsia-900"
            >
              {user}
            </li>
          {/if}
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
