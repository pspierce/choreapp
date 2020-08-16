<script>
  export let chore;

  let currentPlace;
  let tmpPlace;

</script>


  {#if tmpChorePlace != chores.place}
    <h3 class="chore-place">{chores.place}</h3>
  {/if}
  {(tmpPlace = chores.place)}
  <div>
    <span class="idx">{i + 1}</span>
    {chore.name} ({chore.place}) ({tmpPlace})
  </div>
{/each}
