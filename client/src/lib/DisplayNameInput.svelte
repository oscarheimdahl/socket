<script lang="ts">
  import { TOPICS } from '../../../topics';
  import { send } from './socket';

  let displayNameInput: HTMLInputElement;

  function handleDisplayNameChange() {
    const lettersOnly = displayNameInput.value.replace(/[^a-z A-Z]/g, '');
    displayNameInput.value = lettersOnly;
    send(TOPICS.UPDATE_NAME, lettersOnly);
  }
</script>

<input
  on:input={handleDisplayNameChange}
  bind:this={displayNameInput}
  class={`h-6 flex justify-end bg-transparent outline-none font-bold px-2 placeholder-[#aaaaaa88] text-white`}
  placeholder="Display Name"
  type="text"
/>
