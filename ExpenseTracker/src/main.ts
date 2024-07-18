import { api } from "./api";

api.listen(3000, () => {
    console.log("listening on 3000");
})