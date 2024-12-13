import { main } from "./main";

if (process.env.NODE_ENV !== "test") {
  main().catch((error) => {
    console.error("An error occurred:", error);
    process.exit(1);
  });
}
