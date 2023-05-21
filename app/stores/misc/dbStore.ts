import { CouchBase } from '@triniwiz/nativescript-couchbase';
import { writable } from "svelte/store";

type TypeWithId<T> = T & {id: string};

export function dbStore<O extends Object>(name: string) {

  const database = new CouchBase(name);

  const savedDocuments = database.query({
    select: [],
    where: []
  });

  const { subscribe, update: updateState } = writable(savedDocuments as TypeWithId<O>[]);

  return {
    subscribe,
    save: (doc: O) => {
      const documentId = database.createDocument(doc) as string;

      const savedDoc = database.getDocument(documentId) as TypeWithId<O>;

      updateState((docs) => [...docs, savedDoc]);
    },
    update: (id: string, doc: Partial<O>) => {
      database.updateDocument(id, doc);

      const updatedDoc = database.getDocument(id) as TypeWithId<O>;
      updateState((docs) => docs.map((d) => d.id === id ? updatedDoc : d));
    }
  }
}
