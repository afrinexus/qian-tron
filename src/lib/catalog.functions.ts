import { createServerFn } from "@tanstack/react-start";
import { readCatalogRows } from "./catalog.server";

export const getPublicCatalog = createServerFn({ method: "GET" }).handler(async () =>
  readCatalogRows(),
);
