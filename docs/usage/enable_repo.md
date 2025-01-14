---
title: "Enable a Repo"
---

:::note
You will need **Admin** access to the repo to be able to activate it in Vela. This is because you need **Admin** access to be able to add webhooks
to the repo.
:::

### Via the UI

For this example, we'll go over using the UI to add the repo. You can always head over to the [CLI docs](/docs/reference/cli/repo/add/) for docs on how to add a repo via CLI.

1. Log into your Vela instance.
1. Click "Add Repositories".
1. Select the Org from the available list.
1. Click "Add" next to the repo you would like to add.
   1. Alternatively you can "Add All" repos in an org.
   1. If your repo doesn't exist, try clicking "Refresh List" in the top right.

Your repo now has the necessary web hook to Vela.

:::tip
If you're coming from another CI platform you can set a starting build number by updating the counter field on the repo via the UI, [CLI](/docs/reference/cli/repo/), or [API](/docs/reference/api/repo/).
:::
