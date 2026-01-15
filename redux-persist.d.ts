import type { Storage } from "redux-persist"

declare module "redux-persist/lib/storage" {
  const storage: Storage;
  export default storage
}