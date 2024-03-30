<script lang="ts">
  import { TOPICS } from '../../../topics';
  import { onTopic } from './socket';

  let users: string | undefined[] = [];

  onTopic(TOPICS.USER_JOIN, (data) => {
    users = data;
  });
</script>

<div class="text-gray-600">
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
