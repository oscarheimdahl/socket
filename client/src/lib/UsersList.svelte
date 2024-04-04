<script lang="ts">
  import { TOPICS } from '@root/topics';
  import { onTopic } from './socket/socket';
  import { subscribe } from './store/store';
  import type { User } from './types';

  let users: User[] = [];
  let userId = '';

  subscribe((store) => {
    userId = store.userId;
  });

  onTopic(TOPICS.USER_JOIN, (data: User[]) => {
    users = data
      .map((user) => {
        if (user.id === userId) return;
        return { ...user };
      })
      .filter(Boolean) as User[];
  });
</script>

<div class="text-gray-600">
  <ul class="flex flex-col gap-2">
    {#each users as user}
      <li
        class={`${user.name ? 'text-white' : 'text-gray-500 italic'}
          bg-black w-fit border border-gray-500 px-2 py-1 `}
      >
        {user.name || 'Unknown'}
      </li>
    {/each}
  </ul>
</div>
