import Showdown from "showdown"

export const markdownToHtml = (val: string) => {
    return new Showdown.Converter().makeHtml(val)
}