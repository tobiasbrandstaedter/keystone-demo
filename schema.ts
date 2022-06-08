import { graphql, list } from "@keystone-6/core";

// We're using some common fields in the starter. Check out https://keystonejs.com/docs/apis/fields#fields-api
// for the full list of fields.
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  virtual,
} from "@keystone-6/core/fields";
// The document field is a more complicated field, so it's in its own package
// Keystone aims to have all the base field types, but you can make your own
// custom ones.
import { document } from "@keystone-6/fields-document";

// We are using Typescript, and we want our types experience to be as strict as it can be.
// By providing the Keystone generated `Lists` type to our lists object, we refine
// our types to a stricter subset that is type-aware of other lists in our schema
// that Typescript cannot easily infer.
import { Lists } from ".keystone/types";

import fetch from 'node-fetch';
// We have a users list, a blogs list, and tags for blog posts, so they can be filtered.
// Each property on the exported object will become the name of a list (a.k.a. the `listKey`),
// with the value being the definition of the list, including the fields.
export const lists: Lists = {
  // Here we define the user list.
  User: list({
    // Here are the fields that `User` will have. We want an email and password so they can log in
    // a name so we can refer to them, and a way to connect users to posts.
    fields: {
      name: text({ validation: { isRequired: true }, isIndexed: "unique" }),
      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
        isFilterable: true,
      }),
      // The password field takes care of hiding details and hashing values
      password: password({ validation: { isRequired: true } }),
    },
    // Here we can configure the Admin UI. We want to show a user's name and posts in the Admin UI
    ui: {
      listView: {
        initialColumns: ["name"],
      },
    },
  }),
  Weapon: list({
    fields: {
      name: text(),
      WeaponType: select({
        type: 'string',
        options: WeaponTypes(),
        db: { map: 'WeaponTypes' },
        validation: { isRequired: true, },
        ui: { displayMode: 'select' },
      }),
      Frame: virtual({
        field: graphql.field({
          type: graphql.list(graphql.String),
          resolve() {
            return ["A", "B"];
          },
        }),
        label: 'Frame',
        ui: { query: '' },
      }),
    }
  }),
};

function WeaponTypes(): {label: string, value: string}[]{
  return [
    {
      label: 'Auto Rifle',
      value: 'autoRifle'
    }
  ];
}

async function GetWeaponTypes(): Promise<string>{
 return Promise.reject();
}