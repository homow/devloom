import "./config.js";
import app from "./app.js";

const PORT: string | "3000" = process.env.PORT || "3000";

app.listen(PORT, (): void => {
    console.log(`server running on http://localhost:${PORT}`);
});