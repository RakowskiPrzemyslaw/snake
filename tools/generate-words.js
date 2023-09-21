import { parse } from "csv-string";
import fs from "fs";

const categories = fs.readdirSync("./resources/words").map((file) => {
    const results = parse(
        fs.readFileSync(`./resources/words/${file}`, "utf8"),
        {
            columns: true,
            skip_empty_lines: true,
        }
    );

    return {
        name: file.replace(".csv", "").replaceAll("-", " "),
        words: results.map((result) => result[0]),
    };
});

const output = categories.reduce((acc, category) => {
    acc[category.name] = category.words;
    return acc;
}, {});

fs.writeFileSync("./words.json", JSON.stringify(output, null, 4));
