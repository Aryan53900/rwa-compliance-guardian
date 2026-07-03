const app = require("./app");

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`🚀 RWA Compliance Guardian Backend running on port ${PORT}`);
});