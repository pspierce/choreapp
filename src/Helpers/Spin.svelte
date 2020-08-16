<script>
  import { workers } from "./Stores/users.js";
  import { chores } from "./Stores/chores.js";

  function spinChores() {
    let availableWorkers = $workers.filter((w) => w.available == true);

    setInterval(() => {
      $workers[Math.floor(Math.random() * $workers.length)];
    });
  }
</script>
