import translate from 'translate'

export default async function translateToEnglish(word: string) {
    return await translate(word.toLowerCase().trim(), {from: "es", to:"en"})
}