import { omit } from "lodash";

function whereFilter(options: Record<string, unknown>) {
  const where = omit({ ...options }, [
    "orderBy",
    "page",
    "limit",
    "search",
    "orderColumn",
  ]);
  for (const key in where) {
    if (Object.hasOwnProperty.call(where, key)) {
      const element = where[key];
      if (element === null || element === undefined || element === "") {
        delete where[key];
      }

      if (key === "status" && (element === "all" || element === "")) {
        delete where["status"];
      }
    }
  }

  return where;
}

export default whereFilter;
