import { CouchBase } from "@triniwiz/nativescript-couchbase";
import { writable } from "svelte/store";

type CouchBaseDocument<T> = T & { id: string };

export function dbStore<O extends Object>(name: string, resetData?: O[]) {
  let database = new CouchBase(name);

  if (resetData) {
    database.destroyDatabase();
    database = new CouchBase(name);

    resetData.forEach((doc) => database.createDocument(doc));
  }

  const savedDocuments = database.query({
    select: [],
    where: [],
  });

  const { subscribe, update: updateState } = writable(
    savedDocuments as CouchBaseDocument<O>[],
  );

  return {
    subscribe,
    save: (doc: O) => {
      const documentId = database.createDocument(doc) as string;

      const savedDoc = database.getDocument(documentId) as CouchBaseDocument<O>;

      updateState((docs) => [...docs, savedDoc]);
    },
    update: (id: string, doc: Partial<O>) => {
      database.updateDocument(id, doc);

      const updatedDoc = database.getDocument(id) as CouchBaseDocument<O>;
      updateState((docs) => docs.map((d) => (d.id === id ? updatedDoc : d)));
    },
  };
}
