const { execSync } = require("child_process");

const versionType = process.argv[2]; // 'major', 'minor', or 'patch'

if (!["major", "minor", "patch"].includes(versionType)) {
    console.log(
        '\x1b[38;5;208m%s\x1b[0m',
        "Noting: Building without versioning. Usage: npm run build <major|minor|patch>"
    );
    
    try {
        execSync("node GenerateBonkLIB.js", { stdio: "inherit" });
    } catch (error) {
        console.error("Error during build:", error);
        process.exit(1);
    }
    
    console.log('\x1b[32m%s\x1b[0m', 'BonkLIB.user.js generated without version change!');
} else {
    try {
        execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: "inherit" });
        execSync("node GenerateBonkLIB.js", { stdio: "inherit" });
    } catch (error) {
        console.error("Error during versioning or build:", error);
        process.exit(1);
    }
    
    console.log('\x1b[32m%s\x1b[0m', 'BonkLIB.user.js generated!');
}
