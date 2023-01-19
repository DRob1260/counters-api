export const env = () => {
   return process.env.PROD ? {
        DB_URL: "",
        DB_USER: "",
        DB_PASSWORD: "",
        DB_PORT: 5432
    } : {
        DB_URL: "localhost",
        DB_USER: "drewrobert",
        DB_PASSWORD: "password",
        DB_PORT: 5432
    }
}