*Psst — looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

# Svelte App!

This is a fork of the project template for [Svelte](https://svelte.dev) apps. It lives at https://github.com/sveltejs/template.
I updated it to work with chokidar and to run the compiler/server in docker.

You don't even need to install nodejs to get this baby going if you have docker.

Run this to make a directory for your project and get everything it needs.

`docker run --rm -it -v "%CD%":/app node /bin/bash -c "cd /app && npx degit ScienceVikings/svelte-template my-svelte-project && cd my-svelte-project && npm install"`

Note: If you're running in a Linux-y environment change the `%CD%` to `$PWD`

Change directories into the `my-svelte-project` directory.

Finally, gettergoin with a lil `docker-compose up svelte` or just type `run`. If you're on a unix-y machine, `chmod +x run.cmd` first to make it executable.

# Testing!

There was a lack of testability with the built in examples of Svelte and I like to test, so I added some sample things to this template.

These examples use my preference of running tests in docker with Jasmine for unit testing and Cypress for end to end testing.

You can run either with `docker-compose up e2e` or `docker-compose up tests`.

Make sure your `svelte` service in the docker-compose file is running before running the end to end tests. They need to be in the same docker network.

# Convenience!

I've also added a couple convenience scripts so I don't have to type a bunch of stuff. They should be perfectly executable in unix-y environments if you `chmod +x *.cmd` in that directory.

`terminal.cmd` just opens up an interactive node container so you can do `npm` command easily. `e2e.cmd` and `test.cmd` just do the `docker-compose up` equivalent commands.