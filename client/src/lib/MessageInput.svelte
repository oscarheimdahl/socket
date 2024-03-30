<script lang="ts">
  import { TOPICS } from '../../../topics';
  import SendButton from './SendButton.svelte';

  import { send } from './socket';
  import { addMessage, subscribe } from './store/store';

  let input = '';
  let displayName = '';

  subscribe((store) => {
    displayName = store.displayName;
  });

  async function handleClick() {
    if (!input.trim()) return;
    send(TOPICS.NEW_MESSAGE, input);
    addMessage({
      sentBy: 'self',
      senderId: 'self',
      message: input,
      senderName: displayName,
    });
    input = '';
  }
</script>

<form on:submit|preventDefault={() => {}} class="group flex w-full gap-2">
  <input
    class="rounded-none w-full outline-none p-1 bg-black text-white border border-gray-500"
    bind:value={input}
    type="text"
  />
  <SendButton {handleClick} />
</form>
